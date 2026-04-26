/** Mirrors mediamonitor-api `work_items` rows (subset for the UI). */
export type WorkItem = {
  id: string;
  type: string;
  title: string | null;
  year: number | null;
  season: number | null;
  episode: number | null;
  stage: string;
  health: string;
  stalled_since: string | null;
  stall_reason: string | null;
  expected_next_event: string | null;
  created_at: string;
  updated_at: string;
};

export type TimelineEvent = {
  ts: string;
  type: string;
  source: string;
  severity: string;
  message?: string;
  data?: unknown;
};

export type WorkItemDetail = {
  item: WorkItem;
  timeline: TimelineEvent[];
};

export type IntegrationRow = {
  integration: string;
  last_ok_at: string | null;
  last_error_at: string | null;
  last_error_message: string | null;
};
