"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SystemStatus = "Healthy" | "Under Load" | "Critical" | "Recovering";

interface Metrics {
  users: number;
  rps: number;
  latency: number;
  aiLoad: number;
  status: SystemStatus;
}

interface LogEntry {
  time: string;
  msg: string;
  type: "info" | "warn" | "error" | "success";
}

const INITIAL: Metrics = {
  users: 120,
  rps: 34,
  latency: 42,
  aiLoad: 18,
  status: "Healthy",
};

function useAnimatedNumber(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const ref = useRef(target);
  useEffect(() => {
    const start = ref.current;
    const diff = target - start;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + diff * eased));
      if (p < 1) requestAnimationFrame(tick);
      else ref.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return display;
}

function MetricCard({
  label,
  value,
  unit,
  color,
  bar,
  max,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
  bar?: boolean;
  max: number;
}) {
  const animated = useAnimatedNumber(value);
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(circle at top right, ${color}, transparent)` }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">{label}</span>
      <div className="flex items-end gap-1">
        <span className="text-3xl font-black tabular-nums" style={{ color }}>{animated.toLocaleString()}</span>
        <span className="text-sm text-gray-500 mb-1 font-mono">{unit}</span>
      </div>
      {bar && (
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: SystemStatus }) {
  const config: Record<SystemStatus, { color: string; bg: string; dot: string; pulse: boolean }> = {
    Healthy: { color: "#22c55e", bg: "rgba(34,197,94,0.08)", dot: "#22c55e", pulse: false },
    "Under Load": { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", dot: "#f59e0b", pulse: true },
    Critical: { color: "#ef4444", bg: "rgba(239,68,68,0.10)", dot: "#ef4444", pulse: true },
    Recovering: { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", dot: "#3b82f6", pulse: true },
  };
  const c = config[status];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold tracking-wide"
        style={{ color: c.color, borderColor: `${c.color}30`, backgroundColor: c.bg }}
      >
        <span className="relative flex h-2 w-2">
          {c.pulse && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: c.dot }} />}
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: c.dot }} />
        </span>
        {status}
      </motion.div>
    </AnimatePresence>
  );
}

function LogPanel({ logs }: { logs: LogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  const colors = { info: "#6b7280", warn: "#f59e0b", error: "#ef4444", success: "#22c55e" };

  return (
    <div ref={ref} className="h-40 overflow-y-auto bg-[#070a0f] border border-white/[0.06] rounded-xl p-4 font-mono text-xs space-y-1 scroll-smooth">
      {logs.map((l, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
          <span className="text-gray-600 shrink-0">{l.time}</span>
          <span style={{ color: colors[l.type] }}>{l.msg}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function SystemSimulator() {
  const [metrics, setMetrics] = useState<Metrics>(INITIAL);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "00:00:00", msg: "System initialized. All services nominal.", type: "success" },
    { time: "00:00:01", msg: "Health check passed. Latency: 42ms", type: "info" },
  ]);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  const now = () => new Date().toLocaleTimeString("en-GB");

  const addLog = (msg: string, type: LogEntry["type"]) =>
    setLogs((prev) => [...prev.slice(-30), { time: now(), msg, type }]);

  // Passive micro-fluctuation
  useEffect(() => {
    tickRef.current = setInterval(() => {
      setMetrics((m) => {
        if (m.status === "Critical") return m;
        const jitter = (n: number, range: number) => n + Math.round((Math.random() - 0.5) * range);
        return {
          ...m,
          rps: Math.max(5, jitter(m.rps, 6)),
          latency: Math.max(10, jitter(m.latency, 8)),
          aiLoad: Math.max(0, Math.min(100, jitter(m.aiLoad, 5))),
        };
      });
    }, 1800);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []);

  const increaseLoad = () => {
    setMetrics((m) => ({
      ...m,
      users: Math.min(m.users + Math.round(80 + Math.random() * 120), 2000),
      rps: m.rps + Math.round(40 + Math.random() * 30),
      latency: m.latency + Math.round(60 + Math.random() * 80),
      aiLoad: Math.min(m.aiLoad + 25, 98),
      status: m.latency > 300 ? "Critical" : "Under Load",
    }));
    addLog("Traffic spike detected. Scaling pressure increasing...", "warn");
    addLog("AI request queue depth rising. Processing backlog.", "warn");
  };

  const scaleSystem = () => {
    setMetrics((m) => ({
      ...m,
      latency: Math.max(30, Math.round(m.latency * 0.45)),
      rps: Math.round(m.rps * 1.3),
      aiLoad: Math.max(15, m.aiLoad - 30),
      status: "Healthy",
    }));
    addLog("Auto-scaler triggered. +3 nodes provisioned.", "success");
    addLog("Load balancer rebalanced. Latency normalizing.", "success");
    addLog("AI workers scaled horizontally. Queue draining.", "info");
  };

  const simulateFailure = () => {
    setMetrics((m) => ({
      ...m,
      latency: 980 + Math.round(Math.random() * 200),
      rps: Math.round(m.rps * 0.15),
      aiLoad: 99,
      status: "Critical",
    }));
    addLog("CRITICAL: Primary node unresponsive!", "error");
    addLog("ALERT: Latency exceeded SLA threshold (>500ms)", "error");
    addLog("AI inference engine timeout. Requests queuing.", "error");
    addLog("Sending PagerDuty alert to on-call engineer...", "error");
  };

  const recoverSystem = () => {
    setMetrics((m) => ({
      ...m,
      users: Math.max(120, Math.round(m.users * 0.6)),
      latency: 55 + Math.round(Math.random() * 20),
      rps: 40 + Math.round(Math.random() * 20),
      aiLoad: 20,
      status: "Recovering",
    }));
    addLog("Recovery sequence initiated. Spinning up fallback nodes...", "info");
    addLog("Traffic rerouted to healthy region. Draining failed node.", "info");
    setTimeout(() => {
      setMetrics((m) => ({ ...m, status: "Healthy" }));
      addLog("System fully recovered. All services nominal.", "success");
    }, 2200);
  };

  const buttons = [
    { label: "Increase Load", icon: "↑", fn: increaseLoad, color: "#f59e0b", border: "border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10" },
    { label: "Scale System", icon: "⬡", fn: scaleSystem, color: "#22c55e", border: "border-green-500/30 hover:border-green-500/60 hover:bg-green-500/10" },
    { label: "Simulate Failure", icon: "⚡", fn: simulateFailure, color: "#ef4444", border: "border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10" },
    { label: "Recover System", icon: "↺", fn: recoverSystem, color: "#3b82f6", border: "border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10" },
  ];

  const statusColor: Record<SystemStatus, string> = {
    Healthy: "#22c55e", "Under Load": "#f59e0b", Critical: "#ef4444", Recovering: "#3b82f6"
  };

  return (
    <section className="w-full py-24 md:py-32 relative border-t border-white/5 bg-[#080b10]">
      {/* Ambient glow based on status */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: metrics.status === "Critical" ? 0.06 : 0.02 }}
        transition={{ duration: 0.8 }}
        style={{ background: `radial-gradient(ellipse at center, ${statusColor[metrics.status]}, transparent 70%)` }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-blue-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">Live Simulation</p>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
              See How I Build<br />
              <span className="text-gray-500">Systems</span>
            </h3>
            <p className="text-gray-400 mt-4 font-light max-w-lg leading-relaxed">
              Interact with a simplified simulation of real-time, scalable architecture. Trigger real engineering scenarios.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-gray-600 font-mono uppercase tracking-widest">System Status</span>
            <StatusBadge status={metrics.status} />
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <MetricCard label="Active Users" value={metrics.users} unit="users" color={metrics.users > 1000 ? "#ef4444" : "#3b82f6"} bar max={2000} />
          <MetricCard label="Requests / sec" value={metrics.rps} unit="rps" color="#a78bfa" bar max={300} />
          <MetricCard label="Latency" value={metrics.latency} unit="ms" color={metrics.latency > 400 ? "#ef4444" : metrics.latency > 150 ? "#f59e0b" : "#22c55e"} bar max={1200} />
          <MetricCard label="AI Processing" value={metrics.aiLoad} unit="%" color={metrics.aiLoad > 80 ? "#ef4444" : "#f472b6"} bar max={100} />
        </motion.div>

        {/* Controls + Logs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Control Panel */}
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-5">Control Panel</p>
            <div className="grid grid-cols-2 gap-3">
              {buttons.map((btn) => (
                <motion.button
                  key={btn.label}
                  onClick={btn.fn}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all duration-200 text-left ${btn.border}`}
                >
                  <span className="text-xl" style={{ color: btn.color }}>{btn.icon}</span>
                  <span className="text-sm font-semibold text-white leading-tight">{btn.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* System Log */}
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">System Log</p>
              <span className="text-[10px] font-mono text-gray-600 bg-white/5 px-2 py-1 rounded-md">LIVE</span>
            </div>
            <LogPanel logs={logs} />
          </div>
        </motion.div>

        {/* Footer quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 text-center text-gray-500 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed italic"
        >
          "This is how I think about systems —{" "}
          <span className="text-white font-medium not-italic">not just building them, but making them scale.</span>"
        </motion.p>
      </div>
    </section>
  );
}
