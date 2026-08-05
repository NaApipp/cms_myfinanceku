"use client";

import {
  House,
  Newspaper,
  Mails,
  User,
  SquareArrowRightExit,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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
  };

  const isLinkActive = (href: string) => {
    return pathname === href.trim();
  };

  return (
    <>
      <style>{`
        :root {
            --paper: #f6f4ee;
            --paper-raised: #fdfcf9;
            --ink: #1c1b17;
            --ink-soft: #6b6558;
            --rule: #ddd7c8;
            --ledger: #2f4a3c;
            --ledger-soft: #e4ebe6;
            --amber: #a97a2f;
            --rust: #a1432a;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --paper: #161511;
                --paper-raised: #1d1c17;
                --ink: #ece7db;
                --ink-soft: #948d7c;
                --rule: #34322a;
                --ledger: #7fa88e;
                --ledger-soft: #202821;
                --amber: #d1a35c;
                --rust: #d97b5f;
            }
        }

        .sb-root {
            display: none;
            height: 100vh;
            width: 16rem;
            flex-direction: column;
            justify-content: space-between;
            border-right: 2px solid var(--ink);
            background: var(--paper-raised);
            color: var(--ink);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
            flex-shrink: 0;
        }
        @media (min-width: 1024px) {
            .sb-root {
                display: flex;
            }
        }
        .sb-header {
            padding: 1.5rem 1rem;
        }
        .sb-brand {
            display: flex;
            align-items: center;
            gap: .5rem;
            text-decoration: none;
            color: var(--ink);
            margin-bottom: 2rem;
        }
        .sb-brand-text {
            font-size: .85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .05em;
            margin: 0;
        }
        .sb-brand-text .accent {
            color: var(--ledger);
        }
        .sb-nav-list {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: .35rem;
        }
        .sb-link {
            display: flex;
            align-items: center;
            gap: .75rem;
            padding: .65rem 1rem;
            text-decoration: none;
            font-size: .85rem;
            font-weight: 500;
            color: var(--ink-soft);
            border-left: 3px solid transparent;
            transition: all .15s;
        }
        .sb-link svg {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
        }
        .sb-link:hover {
            background: var(--ledger-soft);
            color: var(--ink);
        }
        .sb-link.active {
            color: var(--ink);
            background: var(--ledger-soft);
            border-left-color: var(--ledger);
            font-weight: 600;
        }
        .sb-footer {
            border-top: 1px solid var(--rule);
            background: var(--paper-raised);
            padding: 1rem;
        }
        .btn-logout {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .5rem;
            width: 100%;
            padding: .6rem 1rem;
            font-size: .8rem;
            font-weight: 600;
            border: 1px solid var(--ink);
            background: var(--ink);
            color: var(--paper-raised);
            cursor: pointer;
            transition: background .15s, color .15s;
        }
        .btn-logout:hover {
            background: transparent;
            color: var(--ink);
        }
      `}</style>
      <div className="sb-root">
        <div className="sb-header">
          <Link href="/dashboard" className="sb-brand">
            <img
              src="https://myfinanceku.vercel.app/icon/logo.png"
              alt="Logo"
              width={26}
              height={26}
            />
            <p className="sb-brand-text">
              MyFinanceKu <span className="accent">CMS</span>
            </p>
          </Link>

          <ul className="sb-nav-list">
            <li>
              <Link href="/dashboard" className={`sb-link${isLinkActive("/dashboard") ? " active" : ""}`}>
                <House />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link href="/berita" className={`sb-link${isLinkActive("/berita") ? " active" : ""}`}>
                <Newspaper />
                <span>Tambah Berita</span>
              </Link>
            </li>

            <li>
              <Link href="/data-berita" className={`sb-link${isLinkActive("/data-berita") ? " active" : ""}`}>
                <Mails />
                <span>Data Berita</span>
              </Link>
            </li>

            <li>
              <Link href="/user-admin" className={`sb-link${isLinkActive("/user-admin") ? " active" : ""}`}>
                <User />
                <span>User Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sb-footer">
          <form onSubmit={handleLogout}>
            <button type="submit" className="btn-logout">
              <SquareArrowRightExit width={14} height={14} />
              <span>Keluar</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}