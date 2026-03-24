import { permanentRedirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const category = searchParams.category ?? "all";
  const params = new URLSearchParams(searchParams);

  if (category) params.delete("category");

  return permanentRedirect(
    `/marketplace/categories/${category}?${params.toString()}`,
  );
}
