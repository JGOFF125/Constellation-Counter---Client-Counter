"use client";

import { useEffect, useState } from "react";

type HourlyRecord = {
  direction_1: number | null;
  direction_2: number | null;
};

export const SelectDate = () => {
  const [dateString, setDateString] = useState("2026-04-19");
  const [count, setCount] = useState<{ in: number; out: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDate() {
      try {
        const response = await fetch(
          `/api/attendance/history?date=${encodeURIComponent(dateString)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Unable to retrieve historical data");

        const data: { results: HourlyRecord[] } = await response.json();
        if (!Array.isArray(data.results)) throw new Error("Invalid historical data");

        // I ignore a response after the date changes
        if (controller.signal.aborted) return;
        const record = data.results[0];
        setCount(
          record
            ? { in: record.direction_1 ?? 0, out: record.direction_2 ?? 0 }
            : null,
        );
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to load this date — try another date or check your connection");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadDate();
    return () => controller.abort();
  }, [dateString]);

  return (
    <div className="history-selector">
      <label htmlFor="history-date">Historical date</label>
      <input
        id="history-date"
        type="date"
        value={dateString}
        onChange={(event) => {
          if (!event.target.value) return;
          setDateString(event.target.value);
          setCount(null);
          setError("");
          setLoading(true);
        }}
      />
      <p className="muted">Melbourne sensor 11 / 09:00 to 10:00 local time</p>
      <div aria-live="polite" aria-busy={loading}>
        {loading ? (
          <p>Loading historical readings</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : count ? (
          <dl className="history-counts">
            <div><dt>Direction 1</dt><dd>{count.in.toLocaleString()}</dd></div>
            <div><dt>Direction 2</dt><dd>{count.out.toLocaleString()}</dd></div>
          </dl>
        ) : (
          <p>No readings available for this date</p>
        )}
      </div>
      <p className="muted">Directional pedestrian counts / Spark occupancy and ticket data remain separate</p>
    </div>
  );
};
