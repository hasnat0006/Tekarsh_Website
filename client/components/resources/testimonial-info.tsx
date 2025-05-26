import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Tekarsh has been instrumental to our growth at MarginEdge. Their developers are deeply integrated into our team and deliver top-tier work, making them an essential extension of our in-house tech talent.",
      name: "Brian Mills",
      designation: "Co-Founder, CTO, MarginEdge",
      src: "https://tekarsh.com/wp-content/uploads/2022/08/Mills.jpg",
      company_logo:
        "https://www.marginedge.com/hs-fs/hubfs/marginedge-logo-new.png?width=375&name=marginedge-logo-new.png",
    },
    {
      quote:
        "The Tekarsh team has been crucial in helping us scale efficiently. They consistently go above and beyond—delivering timely, quality results across tasks like data research and complex menu builds.",
      name: "Ashley Frausto",
      designation: "Director, Operations, GoTab",
      src: "https://tekarsh.com/wp-content/uploads/2022/08/Ashley.png",
      company_logo:
        "https://cdn.prod.website-files.com/63d0c7d22bb75d6179e260fe/63f8ec43aa0761ae48ae447a_GoTab_Logo_Orange_RBG.png",
    },
    {
      quote:
        "Tekarsh is more than a vendor — they're a reliable partner. Their professional approach, attention to detail, and versatile support across BPO, QA, and dev have been key to our success.",
      name: "Brian Penn",
      designation: "VP, Operations, MarginEdge",
      src: "https://tekarsh.com/wp-content/uploads/2022/08/Penn.jpg",
      company_logo:
        "https://www.marginedge.com/hs-fs/hubfs/marginedge-logo-new.png?width=375&name=marginedge-logo-new.png",
    },
    {
      quote:
        "Tekarsh's developers and QA team are invaluable. Their seamless integration, diverse ideas, and efficient quality assurance were crucial in MarginEdge's successful development and high-quality delivery.",
      name: "Joshua Leavnton",
      designation: "VP, Product Development, MarginEdge",
      src: "https://tekarsh.com/wp-content/uploads/2022/08/Josh.jpg",
      company_logo:
        "https://www.marginedge.com/hs-fs/hubfs/marginedge-logo-new.png?width=375&name=marginedge-logo-new.png",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
