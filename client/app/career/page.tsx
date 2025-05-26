import {
  Briefcase,
  MapPin,
  Users,
  Coffee,
  Zap,
  Heart,
  Award,
  ChevronRight,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SmoothScroll from "@/components/smooth-scroll";
import JobListings from "@/components/resources/job-listings";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQAccordion from "@/components/ui/faqAnsReveal";
import { faqItems } from "@/components/resources/faq-career";

export default function CareersPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r text-[var(--word)]">
          <div className="absolute inset-0 mix-blend-multiply" />
          <div className="relative container mx-auto px-4 py-16 md:py-24 flex-row items-center justify-center border-0 border-amber-600 w-5/6 rounded-lg">
            <div className="max-w-xl space-x-4">
              <h1 className="text-4xl ml-4 md:text-5xl font-bold mb-4 text-[var(--word)]/80 ">
                Join Our Team &
              </h1>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--word)]/80 ">
                <ContainerTextFlip
                  words={["Build", "Create", "Develop", "Lead", "Code"]}
                />
                &nbsp;the Future
              </h1>
              <p className="text-lg ml-4 mb-8 text-[var(--word)]/50 ">
                We&apos;re looking for passionate individuals who want to make
                an impact. Discover exciting opportunities and grow your career
                with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 m-4">
                <Button
                  size="lg"
                  className="px-4 py-2 rounded-md bg-[var(--green)]/80 hover:bg-[var(--green)]/90 button text-[var(--white)] text-sm tracking-wider font-md relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center"
                  asChild
                >
                  <a href="#open-positions">
                    View Open Positions <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[var(--green)]/50 text-[var(--green)]/90"
                  asChild
                >
                  <a href="#company-culture">Learn About Our Culture</a>
                </Button>
              </div>
            </div>
            <Image
              src="/landing-hero-back.svg"
              alt="Developers working"
              width={500}
              height={300}
              className="absolute -right-10 top-5 rounded-lg object-cover"
            />
            <Image
              src="/landing-hero.svg"
              alt="Developers working"
              width={500}
              height={300}
              className="absolute -right-0 top-20 rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 " id="company-culture">
          <div className="mx-auto px-4 flex flex-col items-center justify-center border-0 border-amber-700">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-xl lg:text-5xl font-bold mb-4">
                Why
                <span className="text-green-600"> Join</span>
                &nbsp;Our Team?
              </h2>
              <p className=" text-lg">
                We offer more than just a job. Join us and be part of a culture
                that values innovation, growth, and well-being.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full md:w-10/12 items-center justify-center border-0 border-amber-700">
              <div
                className="bg-gray-100 dark:bg-white/2 p-6 rounded-xl
                hover:shadow-2xl transition duration-300 ease-in-out hover:translate-y-0.5"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Innovative Projects
                </h3>
                <p className="text-gray-600">
                  Work on cutting-edge technologies and challenging projects
                  that make a real impact.
                </p>
              </div>

              <div
                className="bg-gray-100 dark:bg-white/2 p-6 rounded-xl
                hover:shadow-2xl transition duration-300 ease-in-out hover:translate-y-0.5"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Collaborative Culture
                </h3>
                <p className="text-gray-600">
                  Join a diverse team of talented professionals who support and
                  inspire each other.
                </p>
              </div>

              <div
                className="bg-gray-100 dark:bg-white/2 p-6 rounded-xl
                hover:shadow-2xl transition duration-300 ease-in-out hover:translate-y-0.5"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Growth Opportunities
                </h3>
                <p className="text-gray-600">
                  Continuous learning with mentorship, training programs, and
                  clear career progression paths.
                </p>
              </div>

              <div
                className="bg-gray-100 dark:bg-white/2 p-6 rounded-xl
                hover:shadow-2xl transition duration-300 ease-in-out hover:translate-y-0.5"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Work-Life Balance
                </h3>
                <p className="text-gray-600">
                  Flexible work arrangements, wellness programs, and competitive
                  benefits package.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50 dark:bg-white/2" id="benefits">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 px-4 lg:px-8">
                <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                  <span className="text-[var(--green)]">Benefits</span> Package
                </h1>
                <p className="text-gray-600 mb-8">
                  We believe in taking care of our team members with competitive
                  compensation and benefits that support your health, wealth,
                  and well-being.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Coffee className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg ">
                        Health & Wellness
                      </h3>
                      <p className="text-gray-600 lg:pr-8">
                        Comprehensive health insurance, mental health support,
                        and wellness programs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Financial Benefits
                      </h3>
                      <p className="text-gray-600 lg:pr-8">
                        Competitive salary, performance bonuses, stock options,
                        and retirement plans.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Flexible Work</h3>
                      <p className="text-gray-600 lg:pr-8">
                        Remote work options, flexible hours, and generous paid
                        time off policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/team.webp?height=600&width=800"
                    alt="Team collaboration"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section
          className="py-10 border-0 border-amber-300"
          id="open-positions"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-4xl font-bold text-bai mb-4">
                Open Positions
              </h2>
              <p className="text-gray-600 text-lg">
                Find your perfect role and join our team of passionate
                professionals building the future of technology.
              </p>
            </div>

            <Tabs
              defaultValue="all"
              className="w-full flex justify-center items-center border-0 border-amber-300"
            >
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Positions</TabsTrigger>
                  <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="product">Product</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <JobListings category="all" />
              </TabsContent>
              <TabsContent value="engineering">
                <JobListings category="engineering" />
              </TabsContent>
              <TabsContent value="design">
                <JobListings category="design" />
              </TabsContent>
              <TabsContent value="product">
                <JobListings category="product" />
              </TabsContent>
              <TabsContent value="marketing">
                <JobListings category="marketing" />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-12" id="application-process">
          <div className="container mx-auto lg:w-6xl px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Our Application Process
              </h2>
              <p className="text-gray-600 text-lg">
                We&apos;ve designed a straightforward process to help you find
                your place in our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="w-12 h-12 bg-green-100 text-[var(--green)] rounded-full flex items-center justify-center mb-4 z-10 relative">
                  1
                </div>
                <div className="absolute top-6 left-6 h-[calc(100%-24px)] w-0.5 bg-green-200 -z-10 md:block hidden"></div>
                <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                <p className="text-gray-600">
                  Browse our open positions and submit your application with
                  your resume and cover letter.
                </p>
              </div>

              <div className="relative">
                <div className="w-12 h-12 bg-green-100 text-[var(--green)] rounded-full flex items-center justify-center mb-4 z-10 relative">
                  2
                </div>
                <div className="absolute top-6 left-6 h-[calc(100%-24px)] w-0.5 bg-green-200 -z-10 md:block hidden"></div>
                <h3 className="text-xl font-semibold mb-2">
                  Initial Screening
                </h3>
                <p className="text-gray-600">
                  Our recruitment team will review your application and reach
                  out for an initial conversation.
                </p>
              </div>

              <div className="relative">
                <div className="w-12 h-12 bg-green-100 text-[var(--green)] rounded-full flex items-center justify-center mb-4 z-10 relative">
                  3
                </div>
                <div className="absolute top-6 left-6 h-[calc(100%-24px)] w-0.5 bg-green-200 -z-10 md:block hidden"></div>
                <h3 className="text-xl font-semibold mb-2">
                  Interview Process
                </h3>
                <p className="text-gray-600">
                  Meet with team members through a series of interviews to
                  assess mutual fit and alignment.
                </p>
              </div>

              <div className="relative">
                <div className="w-12 h-12 bg-green-100 text-[var(--green)] rounded-full flex items-center justify-center mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Welcome Aboard</h3>
                <p className="text-gray-600">
                  Receive your offer and join our team! We&apos;ll ensure a
                  smooth onboarding experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-gray-50 dark:bg-white/2" id="faq">
          <FAQAccordion faqItems={faqItems} />
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-green-white to-gray-700 text-[var(--word)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the next step in your career journey and become part of our
              innovative team building the future of technology.
            </p>
            <Button
              size="lg"
              className="bg-[var(--green)]/80 text-[var(--word)] hover:bg-white/90"
              asChild
            >
              <a href="#open-positions">
                View Open Positions <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
}
