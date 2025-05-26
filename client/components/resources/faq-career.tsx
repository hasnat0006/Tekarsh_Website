export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "What is the interview process like?",
    answer:
      "Our interview process typically includes an initial screening call, a technical assessment relevant to the role, and 2-3 interviews with team members and leadership. The entireprocess usually takes 2-3 weeks.",
  },
  {
    question: "Do you offer remote work options?",
    answer:
      "Yes, we offer flexible work arrangements including fully remote, hybrid, and in-office options depending on the role and team needs. We believe in creating an environment where you can do your best work.",
  },
  {
    question: "What opportunities are there for career growth?",
    answer:
      "We're committed to helping our employees grow. We offer mentorship programs, learning stipends, conference opportunities, and clear career progression paths. Regular performance reviews help identify growth areas and advancement opportunities",
  },
  {
    question: "I don't see a role that fits my skills. Can I still apply?",
    answer:
      "We're always looking for talented individuals. Submit your resume for general consideration, and we'll reach out if a suitable position becomes available.",
  },
];
