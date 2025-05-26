"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Zap, Layers, Shield, RefreshCw } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { AnimatedTestimonialsDemo } from "@/components/resources/testimonial-info";
import FAQAccordion from "@/components/ui/faqAnsReveal";
import { FlipWords } from "@/components/ui/flip-words";
import { Services } from "@/components/resources/services";
import SmoothScroll from "@/components/smooth-scroll";

import { faqItems } from "@/components/resources/faq";
export default function Home() {
  const words = [
    "faster",
    "better",
    "together",
    "smarter",
    "safer",
    "stronger",
  ];

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <Spotlight />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto p-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 p-8">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Building{" "}
                  <span className="text-[var(--word)]/90">
                    Quality
                    <br /> Software,
                  </span>{" "}
                  <FlipWords words={words} />
                </h1>
                <p className="text-[var(--muted-foreground)] max-w-md">
                  Scalable tech solutions with built-in quality and speed.
                  Tekarsh specializes in delivering agile software, robust QA,
                  and dedicated support services for global businesses across
                  industries.
                </p>
                <Link
                  href="/#services"
                  className="inline-flex items-center rounded-md bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Explore Our Services <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="flex justify-end">
                {/* <div className="absolute -z-10 rounded-full bg-green-50 w-[500px] h-[500px] -right-20 -top-20"></div> */}
                <Image
                  src="/landing-hero-back.svg"
                  alt="Developers working"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover absolute -right-0 top-20"
                />
                <Image
                  src="/landing-hero.svg"
                  alt="Developers working"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover z-1"
                />
              </div>
            </div>
          </section>
          <div id="services">
            <Services />
          </div>

          {/* Why Tekarsh Section */}
          <section className="container mx-auto py-16" id="about">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">
                Why <span className="text-green-600">Tekarsh</span>?
              </h2>
              <p className="text-gray-600">
                Delivering Excellence Through Innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12">
              <div className="flex justify-center h-96 items-center relative">
                <Image
                  src="/why-tek.svg"
                  alt="Why Tekarsh"
                  width={300}
                  height={300}
                  className="rounded-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pr-8 ">
                <div className="space-y-3">
                  <div className="p-2 bg-green-50 rounded-full inline-block">
                    <Layers className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Seamless Integration
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We don&apos;t just deliver — we embed ourselves as part of
                    your team
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-2 bg-green-50 rounded-full inline-block">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Rapid Innovation</h3>
                  <p className="text-gray-600 text-sm">
                    Agile teams structured for quick iterations and faster
                    delivery
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-2 bg-green-50 rounded-full inline-block">
                    <RefreshCw className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Maximum Value</h3>
                  <p className="text-gray-600 text-sm">
                    Lean operational model focused on efficiency
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-2 bg-green-50 rounded-full inline-block">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Quality-First Mindset
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Built-in quality assurance from project inception
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                What Our Clients Say
              </h2>
              <AnimatedTestimonialsDemo />
            </div>
          </section>
          {/* FAQ Section */}
          <section className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="max-w-3xl mx-auto px-4 py-12">
                <FAQAccordion faqItems={faqItems} />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/faq.svg"
                  alt="FAQ Illustration"
                  width={450}
                  height={450}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </SmoothScroll>
  );
}
