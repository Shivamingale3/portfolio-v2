"use client";

import ChangingRoute from "@/components/changingRoute";
import CheckAuth from "@/components/checkAuth";
import LoggingOut from "@/components/loggingOut";
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
import axiosInstance from "@/lib/axiosInstance";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { set } from "date-fns";
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
import Error from "next/error";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [changingRoute, setChangingRoute] = useState(false);

  const logoutUser = async () => {
    try {
      setLoggingOut(true);
      setTimeout(() => {
        localStorage.removeItem("token");
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      setLoggingOut(true);
      addSnackbar({
        header: "Logout Failed",
        description: error.message,
        expandedContent: JSON.stringify(error),
        status: "error",
        timeout: 5000,
      });
      setLoggingOut(false); // Only reset on error
    }
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/auth/verify-user");
      if (response.status === 200) {
        return response.data.data;
      } else {
        setLoggingOut(true);
        router.push("/login");
        throw new Error({
          statusCode: 401,
          title: "User could not be verified",
        });
      }
    } catch (error: any) {
      setLoggingOut(true);
      addSnackbar({
        header: "Session Failed! Log In again!",
        description: error.message,
        expandedContent: JSON.stringify(error),
        status: "error",
        timeout: 5000,
      });
    }
  };

  useEffect(() => {
    setChangingRoute(true); // Start showing loader
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          addSnackbar({
            header: "Session Expired! Log In failed!",
            status: "error",
            timeout: 5000,
          });
          router.push("/login");
          return;
        }

        const userData = await getUserData();
        if (!userData) {
          addSnackbar({
            header: "Session Expired! Log In again!",
            status: "error",
            timeout: 5000,
          });
          router.push("/login");
        } else {
          setUserData(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    setChangingRoute(false);
  }, [router]);

  return (
    <>
      {loading ? (
        <CheckAuth />
      ) : (
        <div className="relative flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside
            className={`fixed hidden h-screen border-r border-gray-800 bg-black text-white md:block ${
              isSidebarOpen ? "w-72" : "w-20"
            } transition-all duration-300`}
          >
            <div className="flex h-full flex-col w-full py-5">
              <div
                className="w-full flex flex-row justify-around items-center"
                aria-label="profile-section"
              >
                <Avatar>
                  <AvatarImage src={userData.profilePicture} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                {isSidebarOpen && (
                  <>
                    <div className="ml-2 flex text-wrap flex-wrap">
                      <p className="font-medium">{`${userData.firstName} ${userData.lastName}`}</p>
                      <p className="text-sm text-gray-500 ">{userData.email}</p>
                    </div>
                    <IconButton onClick={logoutUser}>
                      <div className="border border-solid border-white h-min w-min p-1 rounded-sm bg-white text-black">
                        <LogOut />
                      </div>
                    </IconButton>
                  </>
                )}
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
            <div className="container mx-auto p-8">
              {React.cloneElement(children as React.ReactElement, { userData })}
            </div>

            {loggingOut && <LoggingOut loggingOut={loggingOut} />}
            {changingRoute && <ChangingRoute changingRoute={changingRoute} />}
          </main>
        </div>
      )}
    </>
  );
}
