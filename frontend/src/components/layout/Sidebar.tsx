"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ActivityIcon,
  GaugeIcon,
  WifiHighIcon,
  UserCircleIcon,
  SignOutIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { authService } from "@/services/auth.service";

const navItems = [
  { href: "/dashboard", icon: GaugeIcon, label: "Dashboard" },
  { href: "/apis", icon: WifiHighIcon, label: "Minhas APIs" },
  { href: "/profile", icon: UserCircleIcon, label: "Perfil" },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10">
            <ActivityIcon size={20} weight="fill" className="text-orange-400" />
          </div>
          <div>
            <h1 className="text-sm font-black">Pulse Watch</h1>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-white md:hidden">
            <XIcon size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}>
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
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-black/50 p-2 backdrop-blur-xl md:hidden"
      >
        <ListIcon size={20} className="text-orange-400" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/[0.08] bg-black/90 backdrop-blur-xl md:hidden"
            >
              <NavContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/[0.08] bg-black/40 backdrop-blur-xl md:flex">
        <NavContent />
      </aside>
    </>
  );
}