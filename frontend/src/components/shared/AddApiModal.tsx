"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { monitoringService } from "@/services/monitoring.service";
import { getErrorMessage } from "@/hooks/useApiError";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddApiModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    expectedStatusCode: 200,
    checkInterval: 60,
    timeout: 3000,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["expectedStatusCode", "checkInterval", "timeout"].includes(name)
        ? Number(value)
        : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await monitoringService.createApi(form);
      toast.success("API cadastrada com sucesso!");
      onSuccess();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg rounded-3xl border border-white/[0.08] bg-[#0f0f0f] p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black">Nova API</h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-white"
              >
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Minha API"
                  required
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="space-y-1">
                <Label>URL</Label>
                <Input
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://api.exemplo.com/health"
                  required
                  className="border-white/10 bg-white/5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Método</Label>
                  <select
                    name="method"
                    value={form.method}
                    onChange={handleChange}
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
                  >
                    {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Status esperado</Label>
                  <Input
                    name="expectedStatusCode"
                    type="number"
                    value={form.expectedStatusCode}
                    onChange={handleChange}
                    className="border-white/10 bg-white/5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Intervalo (s)</Label>
                  <Input
                    name="checkInterval"
                    type="number"
                    value={form.checkInterval}
                    onChange={handleChange}
                    className="border-white/10 bg-white/5"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Timeout (ms)</Label>
                  <Input
                    name="timeout"
                    type="number"
                    value={form.timeout}
                    onChange={handleChange}
                    className="border-white/10 bg-white/5"
                  />
                </div>
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 text-black hover:bg-orange-400"
              >
                {loading ? (
                  <CircleNotchIcon size={18} className="animate-spin" />
                ) : (
                  "Cadastrar API"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
