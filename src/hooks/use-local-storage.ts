"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * SSR-safe localStorage state backed by a single shared store per key.
 *
 * Every component instance that uses the same key reads/writes the SAME
 * source of truth (localStorage), and updates propagate synchronously within
 * the tab — so bookmarking several items accumulates instead of each button's
 * stale copy overwriting the others. Cross-tab changes sync via `storage`.
 *
 * Returns `[value, setValue, hydrated]`; `hydrated` is false until mounted
 * on the client (use it to avoid hydration flicker).
 */

const listeners = new Map<string, Set<() => void>>();
// Cache the last raw string + parsed value per key so getSnapshot returns a
// stable reference (required by useSyncExternalStore).
const cache = new Map<string, { raw: string | null; value: unknown }>();

function subscribe(key: string, cb: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(cb);

  function onStorage(e: StorageEvent) {
    if (e.key === key) {
      cache.delete(key); // force a fresh read from the other tab's write
      cb();
    }
  }
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.get(key)?.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function emit(key: string) {
  listeners.get(key)?.forEach((cb) => cb());
}

function readSnapshot<T>(key: string, initial: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    /* storage unavailable */
  }
  const cached = cache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value: T = initial;
  if (raw != null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initial;
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export function useLocalStorage<T>(key: string, initial: T) {
  // Stabilize `initial` so inline literals (e.g. `[]`) don't change identity.
  const initialRef = useRef(initial);
  const init = initialRef.current;

  const value = useSyncExternalStore<T>(
    useCallback((cb: () => void) => subscribe(key, cb), [key]),
    useCallback(() => readSnapshot<T>(key, init), [key, init]),
    useCallback(() => init, [init]),
  );

  const setValue = useCallback(
    (update: T | ((prev: T) => T)) => {
      // Always apply the update to the LATEST stored value, never a stale copy.
      const current = readSnapshot<T>(key, init);
      const next =
        typeof update === "function"
          ? (update as (prev: T) => T)(current)
          : update;
      const raw = JSON.stringify(next);
      try {
        window.localStorage.setItem(key, raw);
      } catch {
        /* storage full or unavailable */
      }
      cache.set(key, { raw, value: next });
      emit(key);
    },
    [key, init],
  );

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return [value, setValue, hydrated] as const;
}
