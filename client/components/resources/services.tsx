import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle } from "lucide-react";
export function Services() {
  const data = [
    {
      title: "1. Software Development",
      content: (
        <div>
          <div className="mb-8">
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Custom application development tailored for scalability and
                performance.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Expertise in full-stack development, including frontend,
                backend, and mobile applications.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Agile methodology with rapid iteration and client collaboration.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Delivered for both startups and enterprise-level clients.
              </span>
            </li>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
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
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Manual and automated testing across web, mobile, and enterprise
                platforms.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Continuous integration of QA into development pipelines.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>Focus on test coverage, performance, and reliability.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>Tools used may include Selenium, Postman, Jest, etc.</span>
            </li>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
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
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>Data research, cleansing, and transformation tasks.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Large-scale, repetitive operations handled with precision and
                SLA focus.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Industries served include hospitality, food service, and retail.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Supports clients like MarginEdge with critical operational
                tasks(e.g., menu building).
              </span>
            </li>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
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
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Seamless team integration—developers and QA work like internal
                staff.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Fast onboarding and flexible resourcing for scaling up or down.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Emphasis on culture fit, communication, and technical skill.
              </span>
            </li>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
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
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>24/7 or dedicated time zone-aligned support options.</span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Issue tracking, debugging, and feature assistance for live
                products.
              </span>
            </li>
            <li className="flex items-center">
              <CheckCircle size={18} className="text-[var(--green)] mr-2" />
              <span>
                Long-term support partnerships that evolve with the product.
              </span>
            </li>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
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
      <h3 className="text-lg w-full md:text-4xl -mb-20 text-[var(--word)]/70 font-bold text-center">
        Our Services
      </h3>
      <Timeline data={data} />
    </div>
  );
}
