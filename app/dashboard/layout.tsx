"use client";

import CheckAuth from "@/components/checkAuth";
import { useSnackbarContext } from "@/components/snackbar/SnackbarProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Briefcase,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  User2,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiRipple } from "react-icons/si";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage About",
    href: "/dashboard/about",
    icon: User2,
  },
  {
    title: "Manage Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "Manage Skills",
    href: "/dashboard/skills",
    icon: Wrench,
  },
  {
    title: "Contact Messages",
    href: "/dashboard/messages",
    icon: Mail,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { addSnackbar } = useSnackbarContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [logginOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setLoading(false);
    }
  }, [router]);

  function logoutUser() {
    try {
      setLoggingOut(true);
      // No need for backend logout if using localStorage, just clear the token
      localStorage.removeItem("token");
      router.push("/login"); // Redirect to login page
    } catch (error: any) {
      addSnackbar({
        header: "Login Failed",
        description: error.message,
        expandedContent: JSON.stringify(error),
        status: "error",
        timeout: 5000,
      });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <>
      {loading ? (
        <CheckAuth />
      ) : (
        <div className="relative flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside
            className={`fixed hidden h-screen border-r border-gray-800 bg-black text-white md:block ${
              isSidebarOpen ? "w-64" : "w-16"
            } transition-all duration-300`}
          >
            <div className="flex h-full flex-col">
              <div className="border-b p-4 ">
                <div className="flex content-around">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  {isSidebarOpen && (
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-gray-500">admin@example.com</p>
                    </div>
                  )}
                  <Button onClick={logoutUser}>
                    <div className="border border-solid border-white h-min w-min p-1 rounded-sm bg-white text-black">
                      {logginOut ? (
                        <SiRipple color="#000000" size="small" />
                      ) : (
                        <LogOut />
                      )}
                    </div>
                  </Button>
                </div>
              </div>
              <nav className="flex-1 space-y-2 p-4">
                {sidebarItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-800 ${
                        pathname === item.href ? "bg-gray-800" : ""
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`}
                      />
                      {isSidebarOpen && <span>{item.title}</span>}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="border-t p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-white hover:bg-gray-800"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      isSidebarOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isSidebarOpen && <span>Collapse</span>}
                </Button>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-black text-white">
              <SheetHeader className="border-b p-4">
                <SheetTitle>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Admin User</p>
                      <p className="text-sm text-gray-500">admin@example.com</p>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-1 space-y-2 p-4">
                {sidebarItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-gray-800 ${
                        pathname === item.href ? "bg-gray-800" : ""
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${!isSidebarOpen && "mx-auto"}`}
                      />
                      <span>{item.title}</span>
                    </span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main
            className={`flex-1 overflow-y-auto transition-all duration-300 md:ml-16  ${
              isSidebarOpen ? "md:ml-64" : ""
            }`}
          >
            <div className="container mx-auto p-8">{children}</div>
          </main>
        </div>
      )}
    </>
  );
}
