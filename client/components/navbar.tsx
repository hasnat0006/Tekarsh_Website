"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavThemeChanger,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export function NavbarDemo() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setDone(true);
  }, [pathname]);

  if (!done) {
    return null;
  }

  return (
    <>
      {!isAdmin && <NavbarComponent />}
      {isAdmin && <div></div>}
    </>
  );
}

export const NavbarComponent = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Services",
      link: "/#services",
    },
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-16 flex items-start w-full sticky top-0 z-50">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavThemeChanger />
            <Link href="/career">
              <NavbarButton variant="primary">Career</NavbarButton>
            </Link>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavThemeChanger />
              <Link
                href="/career"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <NavbarButton variant="primary" className="w-full">
                  Career
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};
