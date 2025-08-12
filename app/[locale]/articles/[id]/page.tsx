// app/[locale]/articles/[id]/page.tsx  (Server Component)
import { articles } from "@/lib/articles";
import ArticleDetailClient from "./ArticleDetailClient";

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  return (
    <ArticleDetailClient article={article} />
  );
}