export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
}

export const articles: Article[] = [
  {
    id: "symptoms",
    title: "Common Symptoms of Malaria in Children",
    description:
      "Overview of early warning signs and clinical patterns identified in children under age 12...",
    content: `
      Children with malaria may experience high fever, chills, loss of appetite,
      nausea, and vomiting. Early detection is critical to prevent severe complications.
      Clinical diagnosis often involves blood smears and rapid diagnostic tests.
    `,
    date: "2025-01-10",
    author: "Dr. Jane Doe",
  },
  {
    id: "guidelines",
    title: "2025 WHO Guidelines for Malaria Treatment",
    description:
      "Summary of treatment protocols for both mild and severe malaria cases...",
    content: `
      The WHO 2025 guidelines emphasize the use of artemisinin-based combination therapy (ACT)
      for uncomplicated malaria, and intravenous artesunate for severe cases. 
      Special considerations are provided for children and pregnant women.
    `,
    date: "2025-02-05",
    author: "World Health Organization",
  },
  {
    id: "outbreaks",
    title: "Malaria Outbreaks in West Africa – Case Report",
    description:
      "An analysis of reported outbreak cases in 2024 across selected West African regions...",
    content: `
      In 2024, West Africa experienced multiple malaria outbreaks due to increased rainfall 
      and inadequate mosquito control. This report reviews epidemiological trends and 
      recommends improved surveillance systems.
    `,
    date: "2025-03-15",
    author: "Dr. John Smith",
  },
];
