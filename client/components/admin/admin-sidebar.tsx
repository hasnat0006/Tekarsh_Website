"use client";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Overview from "./overview";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Applicants",
      href: "/admin/applicants",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Job Listings",
      href: "/admin/jobs",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      label: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <LogOut className="h-5 w-5" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("flex min-h-screen absolute md:relative")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between items-start gap-10 sticky top-0">
          {open ? <Logo /> : <LogoIcon />}
          <div className="flex flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Hasnat0006",
                href: "#",
                icon: (
                  <Image
                    src="/profile.jpg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={500}
        height={200}
        className="h-8 w-20 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white"
      />
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo-small.png"
        alt="Logo"
        width={200}
        height={200}
        className="h-8 w-8 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white"
      />
    </a>
  );
};

