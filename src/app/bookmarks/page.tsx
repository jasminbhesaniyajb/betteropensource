import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/common/page-header";
import { BookmarksList } from "@/components/bookmarks/bookmarks-list";

export const metadata = buildMetadata({
  title: "Your Bookmarks",
  description: "Open-source tools you've saved for later.",
  path: "/bookmarks",
  noIndex: true,
});

export default function BookmarksPage() {
  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <PageHeader
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Bookmarks" }]}
        title="Your bookmarks"
        description="Tools you've saved, stored locally in your browser — no account needed."
        className="mb-8"
      />
      <BookmarksList />
    </div>
  );
}
