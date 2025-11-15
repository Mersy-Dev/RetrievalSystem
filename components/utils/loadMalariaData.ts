import malariaData from "@/components/data/malaria-knowledge.json";

export function getKnowledgeByCategory(category: string) {
  return malariaData.filter((item) => item.category === category);
}

export function searchKnowledge(query: string) {
  const lower = query.toLowerCase();
  return malariaData.filter(
    (item) =>
      item.question_en.toLowerCase().includes(lower) ||
      item.answer_en.toLowerCase().includes(lower) ||
      item.question_yo.toLowerCase().includes(lower) ||
      item.answer_yo.toLowerCase().includes(lower)
  );
}
