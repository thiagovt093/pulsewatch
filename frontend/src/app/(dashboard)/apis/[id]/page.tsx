"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ActivityIcon, ArrowLeftIcon, ClockIcon } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { monitoringService } from "@/services/monitoring.service";
import { MonitoredApi, MonitoringCheck } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

export default function ApiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [api, setApi] = useState<MonitoredApi | null>(null);
  const [history, setHistory] = useState<MonitoringCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      monitoringService.getApiById(id),
      monitoringService.getHistory(id),
    ]).then(([apiData, historyData]) => {
      setApi(apiData);
      setHistory(historyData.reverse());
      setLoading(false);
    }).catch((err) => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ActivityIcon size={32} className="animate-spin text-orange-400" />
      </div>
    );
  }

  if (!api) return null;

  const chartData = history.map((h, i) => ({
    name: i + 1,
    latency: h.responseTime,
    status: h.status,
  }));

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/apis" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-white">
          <ArrowLeftIcon size={16} /> Voltar
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">{api.name}</h1>
            <p className="text-sm text-muted-foreground">{api.url}</p>
          </div>
          <StatusBadge status={api.currentStatus} />
        </div>
      </motion.div>

      {/* Gráfico */}
      <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-bold">Latência (ms)</h2>
          {chartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              Nenhum dado de histórico ainda
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" tick={{ fontSize: 12 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid #27272a", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="latency" stroke="#f97316" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Histórico */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Histórico de checks</h2>
        <div className="space-y-2">
          {history.slice(-20).reverse().map((check, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      check.status === "UP" ? "bg-green-400" :
                      check.status === "DOWN" ? "bg-red-400" : "bg-yellow-400"
                    }`} />
                    <div>
                      <p className="text-sm font-medium">
                        Status {check.statusCode} — {check.responseTime}ms
                      </p>
                      {check.errorMessage && (
                        <p className="text-xs text-red-400">{check.errorMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ClockIcon size={12} />
                    {new Date(check.checkedAt).toLocaleString("pt-BR")}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}