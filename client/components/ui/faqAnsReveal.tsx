"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
// import { faqItems } from "@/components/resources/faq";

export default function FAQAccordion(
  { faqItems }: { faqItems: { question: string; answer: string }[] }
) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-4xl font-medium">Frequently Asked</h2>
        <h2 className="text-5xl font-bold text-green-600">Questions?</h2>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-[var(--word)]/20">
            <button
              onClick={() => toggleQuestion(index)}
              className="flex justify-between items-center w-full py-4 text-left font-medium"
            >
              <span
                className={cn(
                  "text-base transition-colors duration-200",
                  openIndex === index
                    ? "text-[var(--green)]"
                    : "text-[var(--word)] "
                )}
              >
                <span className="font-medium">{index + 1}. </span>
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-[var(--green)] transition-transform duration-200",
                  openIndex === index ? "rotate-180" : ""
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openIndex === index ? "max-h-96 pb-4" : "max-h-0"
              )}
            >
              <p className="text-[var(--word)]">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
