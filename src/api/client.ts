import type { IntegrationRow, WorkItem, WorkItemDetail } from "./types";

/** Dev: Vite proxies `/api` → `VITE_DEV_API_TARGET`. Prod: serve same-origin `/api` via nginx/caddy. */
const API_PREFIX = "/api";

function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_PREFIX}${p}`;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path));
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${text ? `: ${text}` : ""}`);
  }
  return res.json() as Promise<T>;
}

export async function getHealthz(): Promise<{ ok: boolean }> {
  return apiGet("/healthz");
}

export async function listWorkItems(params?: Record<string, string | undefined>): Promise<{ items: WorkItem[] }> {
  const q = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") q.set(k, v);
    }
  }
  const qs = q.toString();
  return apiGet(`/work-items${qs ? `?${qs}` : ""}`);
}

export async function getWorkItemTimeline(id: string): Promise<WorkItemDetail> {
  const enc = encodeURIComponent(id);
  return apiGet(`/work-items/${enc}/timeline`);
}

export async function listIntegrations(): Promise<{ integrations: IntegrationRow[] }> {
  return apiGet("/integrations");
}
