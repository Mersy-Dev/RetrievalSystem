import malariaData from "@/components/data/malaria-knowledge.json";


export interface MalariaKnowledge {
  id: string;
  category: string;
  question_en: string;
  answer_en: string;
  question_yo: string;
  answer_yo: string;
}

const malariaList: MalariaKnowledge[] =
  Object.values(malariaData) as unknown as MalariaKnowledge[];

export function getKnowledgeByCategory(category: string): MalariaKnowledge[] {
  return malariaList.filter(item => item.category === category);
}

export function searchKnowledge(query: string): MalariaKnowledge[] {
  const lower = query.toLowerCase();

  return malariaList.filter(
    item =>
      item.question_en.toLowerCase().includes(lower) ||
      item.answer_en.toLowerCase().includes(lower) ||
      item.question_yo.toLowerCase().includes(lower) ||
      item.answer_yo.toLowerCase().includes(lower)
  );
}