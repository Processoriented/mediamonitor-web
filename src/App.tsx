import { useEffect, useState } from "react";
import * as api from "./api/client";
import type { WorkItem } from "./api/types";
import "./App.css";

function formatTitle(w: WorkItem): string {
  if (w.title) {
    if (w.type === "episode" && w.season != null && w.episode != null) {
      return `${w.title} S${String(w.season).padStart(2, "0")}E${String(w.episode).padStart(2, "0")}`;
    }
    return w.title;
  }
  return w.id;
}

export default function App() {
  const [health, setHealth] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<WorkItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const h = await api.getHealthz();
        if (!cancelled) setHealth(h.ok ? "OK" : "unexpected");
        const list = await api.listWorkItems();
        if (!cancelled) setItems(list.items ?? []);
        setError(null);
      } catch (e) {
        if (!cancelled) {
          setHealth(null);
          setError(e instanceof Error ? e.message : String(e));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>MediaMonitor</h1>
        <p className="sub">Dev UI — talks to mediamonitor-api via <code>/api</code> proxy.</p>
      </header>

      <section className="card">
        <h2>API</h2>
        {error ? (
          <p className="err" role="alert">
            {error}
          </p>
        ) : (
          <p className="ok">
            <strong>GET /healthz</strong> → {health ?? "…"}
          </p>
        )}
      </section>

      <section className="card">
        <h2>Recent work items</h2>
        {items.length === 0 && !error ? <p className="muted">No items yet.</p> : null}
        <ul className="list">
          {items.slice(0, 25).map((w) => (
            <li key={w.id}>
              <span className="title">{formatTitle(w)}</span>
              <span className="meta">
                <code>{w.stage}</code> · <code>{w.health}</code>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
