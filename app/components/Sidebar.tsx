"use client";

import {
  Wallet,
  ClockFading,
  ChartPie,
  Target,
  Settings,
  House,
  Plus,
  SquareArrowRightExit,
  User,
  Mail,
  Newspaper,
  Mails,
} from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

import Image from "next/image";

export default function SidebarAdmin() {
  const router = useRouter();
  const pathname = usePathname();

  //   Handle Logout
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sessionUser = sessionStorage.getItem("user-admin");
      let token = "";
      if (sessionUser) {
        try {
          const parsed = JSON.parse(sessionUser);
          token = parsed.token || "";
        } catch (err) {}
      }

      await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.removeItem("user-admin");
      window.location.href = "/login";
    }
  };Link

  // Path Active Logic
  const getPathActive = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center gap-2 rounded-lg px-4 py-2 transition-all  ${
      isActive
        ? "text-black dark:text-white bg-transparent font-bold"
        : "text-gray-500 dark:text-gray-400 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-bold"
    }`;
  };

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col justify-between border-e bg-[#FAFAFA] dark:bg-neutral-950 border-gray-200 dark:border-white/5 transition-colors duration-300">
      <div className="px-4 py-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 ml-4 text-gray-700 dark:text-gray-200"
        >
          <img
            src="https://myfinanceku.vercel.app/icon/logo.png"
            alt="Logo"
            width={30}
            height={30}
          />
          <p className="font-semibold text-black dark:text-white text-[13px]">
            MyFinanceKu{" "}
            <span className="text-blue-600 dark:text-blue-400">CMS</span>
          </p>
        </Link>

        <ul className="mt-6 space-y-1">
            {/* Route CMS */}
          <li>
            <Link href="/dashboard" className={getPathActive("/dashboard")}>
              <House />
              <span className="text-sm font-medium"> Dashboard </span>
            </Link>
          </li>

            {/* Route CMS */}
          <li>
            <Link href="/berita " className={getPathActive("/berita ")}>
              <Newspaper />
              <span className="text-sm font-medium"> Tambah Berita </span>
            </Link>
          </li>

            {/* Route CMS */}
          <li>
            <Link href="/data-berita" className={getPathActive("/data-berita")}>
              <Mails />
              <span className="text-sm font-medium"> Data Berita </span>
            </Link>
          </li>

          
          
          
          
          <li>
            <Link href="/user-admin" className={getPathActive("/user-admin")}>
              <User className="text-red-500" />
              <span className="text-sm font-medium"> User Admin </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t bg-white dark:bg-neutral-950 p-2 border-gray-200 dark:border-white/5 transition-colors duration-300">
        {/* Handle Logout */}
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            className="group relative flex w-full h-10 items-center gap-2 justify-center rounded-lg px-2 py-1.5 text-sm bg-black dark:bg-white text-white dark:text-black cursor-pointer hover:bg-black/70 dark:hover:bg-white/70 hover:text-white dark:hover:text-black transition-all"
          >
            <SquareArrowRightExit width={16} height={16} />

            <span className="text-sm font-bold">Keluar</span>
          </button>
        </form>
      </div>
    </div>
  );
}