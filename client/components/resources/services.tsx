import React from "react";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle } from "lucide-react";

const softData = [
  "Custom software built for performance, security, and scale.",
  "End-to-end web and mobile app development.",
  "Modern frontend tech (React, Vue, Angular).",
  "Scalable backend systems (Node.js, .NET, Java).",
  "Native and cross-platform mobile apps (Flutter, React Native).",
  "API design and integration.",
  "Database architecture (SQL, NoSQL).",
  "DevOps support with CI/CD pipelines.",
  "Legacy system modernization.",
  "SaaS product development.",
  ];
  
  
  const qaData = [
  "Manual functional and regression testing.",
  "Automated testing scripts using Selenium, Cypress, etc.",
  "Test planning and strategy development.",
  "Performance/load testing.",
  "UI/UX usability testing.",
  "Mobile app testing on iOS/Android.",
  "API testing with Postman or Swagger.",
  "CI-integrated testing.",
  ];
  
  
  const bpoData = [
  "Structured and unstructured data processing.",
  "Market and competitor research.",
  "Menu data entry and validation.",
  "OCR and manual data extraction.",
  "Product categorization and taxonomy tagging.",
  "CRM and lead data curation.",
  "SLA-based delivery.",
  "High-volume operations scalability.",
  "Excel/CSV data transformations.",
  "eCommerce data support.",
  ];
  
  
  const supportData = [
  "Tiered support model (L1–L3).",
  "Live bug fixing and hot patch deployment.",
  "Uptime monitoring and incident response.",
  "Knowledge base and documentation support.",
  "Feature walkthroughs for clients.",
  "Ticketing and issue tracking systems.",
  "Post-launch product training.",
  "Usage analytics and reporting.",
  "SLA-bound response times.",
  ];
  
  
  const staffData = [
  "Rapid developer/QA onboarding.",
  "Cultural and language-aligned hiring.",
  "Flexible contracts and scale-up models.",
  "Dedicated team or team extension models.",
  "Embedded team members in agile workflows.",
  "Daily syncs with client-side PMs.",
  "Skilled in React, Node.js, .NET, Python, SQL, and more.",
  "Interview-based selection by clients.",
  ];


export function Services() {
  const data = [
    {
      title: "1. Software Development",
      content: (
        <div className="flex flex-col items-center mt-4">
          <div className="mb-8">
            {softData.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle size={18} className="text-[var(--green)] mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="https://assets.aceternity.com/templates/startup-2.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2. QA & Testing",
      content: (
        <div>
          <div className="mb-8">
            {qaData.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle size={18} className="text-[var(--green)] mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image  
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "3. Data Processing",
      content: (
        <div>
          <div className="mb-8">
            {bpoData.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle size={18} className="text-[var(--green)] mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "4. Client Services",
      content: (
        <div>
          <div className="mb-8">
            {supportData.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle size={18} className="text-[var(--green)] mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "5. Product Support",
      content: (
        <div>
          <div className="mb-8">
            {staffData.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle size={18} className="text-[var(--green)] mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <h3 className="text-lg w-full md:text-4xl -mb-5 md:-mb-20 text-[var(--word)]/70 font-bold text-center">
        Our Services
      </h3>
      <Timeline data={data} />
    </div>
  );
}
