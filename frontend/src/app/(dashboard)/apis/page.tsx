"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ActivityIcon,
  PlusIcon,
  TrashIcon,
  WifiHighIcon,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { monitoringService } from "@/services/monitoring.service";
import { MonitoredApi } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { AddApiModal } from "@/components/shared/AddApiModal";

export default function ApisPage() {
  const [apis, setApis] = useState<MonitoredApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await monitoringService.getApis();
      setApis(data);
      setLoading(false);
    })();
  }, []);

  async function loadApis() {
    const data = await monitoringService.getApis();
    setApis(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await monitoringService.deleteApi(id);
    setApis((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-black">Minhas APIs</h1>
          <p className="text-muted-foreground">{apis.length} APIs monitoradas</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-orange-500 text-black hover:bg-orange-400"
        >
          <PlusIcon size={18} weight="bold" className="mr-2" />
          Nova API
        </Button>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <ActivityIcon size={32} className="animate-spin text-orange-400" />
        </div>
      ) : apis.length === 0 ? (
        <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <CardContent className="flex flex-col items-center gap-3 py-20 text-center">
            <WifiHighIcon size={40} className="text-muted-foreground" />
            <p className="text-muted-foreground">Nenhuma API cadastrada</p>
            <Button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-orange-500 text-black hover:bg-orange-400"
            >
              Cadastrar agora
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {apis.map((api, i) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03] transition hover:border-orange-500/20">
                  <CardContent className="flex items-center justify-between p-5">
                    <Link href={`/apis/${api.id}`} className="flex flex-1 items-center gap-3">
                      <div className={`h-2.5 w-2.5 rounded-full animate-pulse ${
                        api.currentStatus === "UP" ? "bg-green-400" :
                        api.currentStatus === "DOWN" ? "bg-red-400" :
                        api.currentStatus === "DEGRADED" ? "bg-yellow-400" : "bg-zinc-400"
                      }`} />
                      <div>
                        <p className="font-medium">{api.name}</p>
                        <p className="text-xs text-muted-foreground">{api.url}</p>
                      </div>
                    </Link>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={api.currentStatus} />
                      <button
                        onClick={() => handleDelete(api.id)}
                        className="rounded-lg p-2 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <TrashIcon size={16} weight="regular" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AddApiModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => { loadApis(); setShowModal(false); }}
      />
    </div>
  );
}