"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ActivityIcon,
  CheckCircleIcon,
  WarningIcon,
  XCircleIcon,
  WifiHighIcon,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { monitoringService } from "@/services/monitoring.service";
import { MonitoredApi } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import { getErrorMessage } from "@/hooks/useApiError";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [apis, setApis] = useState<MonitoredApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    monitoringService
      .getApis()
      .then((data) => {
        setApis(data);
        setLoading(false);
      })
      .catch((err) => {
        if (getErrorMessage(err).includes("401")) {
          router.push("/login");
        }
        setLoading(false);
      });
  });
  const up = apis.filter((a) => a.currentStatus === "UP").length;
  const down = apis.filter((a) => a.currentStatus === "DOWN").length;
  const degraded = apis.filter((a) => a.currentStatus === "DEGRADED").length;
  const uptime = apis.length > 0 ? ((up / apis.length) * 100).toFixed(1) : "0";

  const stats = [
    {
      label: "Total de APIs",
      value: apis.length,
      icon: WifiHighIcon,
      color: "orange",
    },
    { label: "Operacionais", value: up, icon: CheckCircleIcon, color: "green" },
    { label: "Com falha", value: down, icon: XCircleIcon, color: "red" },
    {
      label: "Degradadas",
      value: degraded,
      icon: WarningIcon,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-muted-foreground">
          Uptime geral:{" "}
          <span className="font-semibold text-orange-400">{uptime}%</span>
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const colors: Record<string, string> = {
            orange: "border-orange-500/20 bg-orange-500/10 text-orange-400",
            green: "border-green-500/20 bg-green-500/10 text-green-400",
            red: "border-red-500/20 bg-red-500/10 text-red-400",
            yellow: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
          };
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className={`rounded-xl border p-3 ${colors[stat.color]}`}
                  >
                    <Icon size={20} weight="fill" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* APIs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">APIs monitoradas</h2>
          <Link
            href="/apis"
            className="text-sm text-orange-400 hover:text-orange-300"
          >
            Ver todas →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <ActivityIcon size={32} className="animate-spin text-orange-400" />
          </div>
        ) : apis.length === 0 ? (
          <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03]">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <WifiHighIcon size={40} className="text-muted-foreground" />
              <p className="text-muted-foreground">
                Nenhuma API cadastrada ainda
              </p>
              <Link
                href="/apis"
                className="text-sm text-orange-400 hover:underline"
              >
                Cadastrar primeira API →
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {apis.slice(0, 5).map((api, i) => (
              <motion.div
                key={api.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/apis/${api.id}`}>
                  <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03] transition hover:border-orange-500/20 hover:bg-orange-500/[0.02]">
                    <CardContent className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            api.currentStatus === "UP"
                              ? "bg-green-400"
                              : api.currentStatus === "DOWN"
                                ? "bg-red-400"
                                : api.currentStatus === "DEGRADED"
                                  ? "bg-yellow-400"
                                  : "bg-zinc-400"
                          } animate-pulse`}
                        />
                        <div>
                          <p className="font-medium">{api.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {api.url}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={api.currentStatus} />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
