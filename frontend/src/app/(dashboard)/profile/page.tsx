"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCircleIcon } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/services/auth.service";
import { User } from "@/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getProfile().then(setUser);
  }, []);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black">Perfil</h1>
        <p className="text-muted-foreground">Suas informações</p>
      </motion.div>

      <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
        <CardContent className="flex items-center gap-6 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
            <UserCircleIcon size={40} weight="fill" className="text-orange-400" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <span className="inline-block rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400">
              {user.status}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}