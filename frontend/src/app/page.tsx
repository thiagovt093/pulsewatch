"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Activity,
  ArrowRight,
  Bell,
  CheckCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";

import {
  GithubLogoIcon,
  GlobeHemisphereWestIcon,
  XLogoIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Serviços monitorados",
    value: "128+",
    icon: Activity,
  },
  {
    title: "Uptime médio",
    value: "99.98%",
    icon: ShieldCheck,
  },
  {
    title: "Alertas enviados",
    value: "24k",
    icon: Bell,
  },
];

const features = [
  {
    icon: Activity,
    title: "Monitoramento em tempo real",
    description:
      "Acompanhe APIs, servidores e microsserviços com métricas atualizadas instantaneamente.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description:
      "Receba notificações automáticas quando algum serviço cair ou degradar.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e estabilidade",
    description:
      "Arquitetura robusta com autenticação JWT e monitoramento contínuo.",
  },
  {
    icon: Zap,
    title: "Performance extrema",
    description:
      "Dashboard rápido, responsivo e otimizado para grandes volumes de dados.",
  },
];

const monitors = [
  {
    name: "Auth API",
    status: "ONLINE",
    latency: "32ms",
  },
  {
    name: "Gateway Service",
    status: "ONLINE",
    latency: "41ms",
  },
  {
    name: "Payments API",
    status: "DEGRADED",
    latency: "240ms",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-orange-500/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-orange-400/20 blur-[120px]" />
        <div className="absolute left-[40%] top-[30%] h-[300px] w-[300px] rounded-full bg-orange-600/10 blur-[80px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10">
              <Activity className="h-5 w-5 text-orange-400" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">Pulse Watch</h1>

              <p className="text-xs text-muted-foreground">
                Monitoring Platform
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition hover:text-white"
            >
              Recursos
            </Link>

            <Link
              href="#dashboard"
              className="text-sm text-muted-foreground transition hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="#stats"
              className="text-sm text-muted-foreground transition hover:text-white"
            >
              Estatísticas
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden text-sm md:flex">
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild className="rounded-xl bg-orange-500 text-black hover:bg-orange-400">
              <Link href="/register">Começar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
            Plataforma moderna de monitoramento
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Monitore seus serviços
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              {" "}
              em tempo real
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Dashboard SaaS premium com monitoramento de APIs, alertas, métricas
            em tempo real e uptime tracking.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group rounded-2xl bg-orange-500 px-8 text-black hover:bg-orange-400">
              <Link href="/dashboard">
                Acessar dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
              <Link href="#dashboard">Ver demonstração</Link>
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-20 w-full max-w-5xl"
        >
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-orange-500/10 backdrop-blur-2xl">
            <CardContent className="p-0">
              <div className="border-b border-white/10 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Infraestrutura</h3>

                    <p className="text-sm text-muted-foreground">
                      Status dos serviços monitorados
                    </p>
                  </div>

                  <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                    Tudo operacional
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                {monitors.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-orange-500/30 hover:bg-orange-500/5"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          service.status === "ONLINE"
                            ? "bg-emerald-400"
                            : "bg-yellow-400"
                        } animate-pulse`}
                      />

                      <div>
                        <h4 className="font-medium">{service.name}</h4>

                        <p className="text-sm text-muted-foreground">
                          Latência: {service.latency}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        service.status === "ONLINE"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {service.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Stats */}
      <section
        id="stats"
        className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
                    <Icon className="h-6 w-6 text-orange-400" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>

                    <h3 className="text-3xl font-black">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-black md:text-5xl">
            Recursos poderosos
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Tudo que você precisa para monitorar aplicações modernas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ring-1 ring-inset ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-orange-500/[0.05] hover:shadow-2xl hover:shadow-orange-500/10 hover:ring-orange-500/20">
                  <CardContent className="p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
                      <Icon className="h-6 w-6 text-orange-400" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>

                    <p className="leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Card className="overflow-hidden rounded-[2rem] border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-black backdrop-blur-2xl">
          <CardContent className="relative flex flex-col items-center justify-between gap-8 p-10 text-center lg:flex-row lg:text-left">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,140,0,0.25),transparent_40%)]" />

            <div className="relative z-10">
              <h2 className="text-4xl font-black">
                Pronto para monitorar tudo?
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-orange-100/80">
                Tenha total controle da sua infraestrutura com uma plataforma
                rápida, moderna e elegante.
              </p>
            </div>

            <div className="relative z-10">
              <Button asChild size="lg" className="rounded-2xl bg-orange-500 px-8 text-black hover:bg-orange-400">
                <Link href="/register">Começar agora</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10">
                <Activity className="h-5 w-5 text-orange-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold">Pulse Watch</h3>

                <p className="text-sm text-muted-foreground">
                  Plataforma moderna de observabilidade
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Monitore APIs, microsserviços e infraestrutura em tempo real com
              uma experiência premium e ultra performática.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-orange-500/30 hover:bg-orange-500/10"
              >
                <GithubLogoIcon size={20} weight="fill" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-orange-500/30 hover:bg-orange-500/10"
              >
                <XLogoIcon size={20} weight="fill" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-orange-500/30 hover:bg-orange-500/10"
              >
                <GlobeHemisphereWestIcon size={20} weight="fill" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Produto</h4>

            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="#features" className="transition hover:text-white">
                  Recursos
                </Link>
              </li>

              <li>
                <Link href="#dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="#stats" className="transition hover:text-white">
                  Estatísticas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Empresa</h4>

            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Sobre
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-white">
                  Privacidade
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground md:flex-row">
            <p>© 2026 Pulse Watch. Todos os direitos reservados.</p>

            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="h-4 w-4" />
              Sistema operacional
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
