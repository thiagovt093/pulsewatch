"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ActivityIcon,
  GaugeIcon,
  WifiHighIcon,
  UserCircleIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { authService } from "@/services/auth.service";

const navItems = [
  { href: "/dashboard", icon: GaugeIcon, label: "Dashboard" },
  { href: "/apis", icon: WifiHighIcon, label: "Minhas APIs" },
  { href: "/profile", icon: UserCircleIcon, label: "Perfil" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/[0.08] bg-black/40 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
          <ActivityIcon size={20} weight="fill" className="text-orange-400" />
        </div>
        <div>
          <h1 className="text-sm font-black">Pulse Watch</h1>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  isActive
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} weight={isActive ? "fill" : "regular"} />
                {item.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-orange-400" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/[0.08] p-4">
        <button
          onClick={() => authService.logout()}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-red-500/10 hover:text-red-400"
        >
          <SignOutIcon size={18} weight="regular" />
          Sair
        </button>
      </div>
    </aside>
  );
}