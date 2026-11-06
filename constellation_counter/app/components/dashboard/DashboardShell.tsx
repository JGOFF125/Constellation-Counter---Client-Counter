"use client";

import { useEffect, useState } from "react";
import FeaturePanel from "./FeaturePanel";
import SparkBrand from "../SparkBrand";
import type { AttendanceResponse } from "@/types/attendance";

type View = "overview" | "attendance" | "tickets";

const views: {
  id: View;
  label: string;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
    number: "01",
    title: "A clearer view of your day",
    description: "Building occupancy and attendance, together in one place",
  },
  {
    id: "attendance",
    label: "Attendance",
    number: "02",
    title: "See the bigger picture",
    description:
      "Explore attendance over time to understand the rhythm of the building",
  },
  {
    id: "tickets",
    label: "Ticket sales",
    number: "03",
    title: "Every visit starts here",
    description: "A dedicated space for ticket totals and admission types",
  },
];

// Attendance panel
function AttendancePlaceholder({
  attendance,
  loading,
  error,
}: {
  attendance: AttendanceResponse | null;
  loading: boolean;
  error: string | null;
}) {
  // Show only the 5 most recent readings
  const recentRecords = attendance?.records?.slice(-5).reverse() ?? [];

  return (
    <FeaturePanel
      eyebrow="Attendance"
      title="The flow of the day"
      description="A snapshot of pedestrian activity throughout the day"
    >
      <div className="chart-placeholder">
        {loading ? (
          <div className="empty-message">
            <strong>Loading attendance data...</strong>
            <p>Connecting to pedestrian counting API</p>
          </div>
        ) : error ? (
          <div className="empty-message">
            <span className="empty-symbol">!</span>
            <strong>Unable to load attendance</strong>
            <p>{error}</p>
            <span className="status-label">Connection error</span>
          </div>
        ) : recentRecords.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.65)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              borderRadius: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "14px",
                marginBottom: "4px",
                color: "#888",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              <span>TIME</span>
              <span>PEDESTRIAN COUNT</span>
            </div>

            {recentRecords.map((record, index) => (
              <div
                key={record.dateTime}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom:
                    index === recentRecords.length - 1
                      ? "none"
                      : "1px solid rgba(0, 0, 0, 0.07)",
                }}
              >
                <span
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  {record.time}
                </span>

                <strong
                  style={{
                    color: "#222",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {record.total.toLocaleString()}
                </strong>
              </div>
            ))}

            {attendance?.records && attendance.records.length > 5 && (
              <p
                style={{
                  margin: "12px 0 0",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                  color: "#999",
                  fontSize: "0.75rem",
                  textAlign: "center",
                }}
              >
                Showing 5 most recent readings
              </p>
            )}
          </div>
        ) : (
          <div className="empty-message">
            <strong>No attendance data available</strong>
            <p>Waiting for pedestrian readings</p>
          </div>
        )}
      </div>
    </FeaturePanel>
  );
}

// Ticket panel
function TicketPlaceholder() {
  return (
    <FeaturePanel
      eyebrow="Admissions"
      title="Ticket sales"
      description="Ticket totals and the breakdown by admission type"
    >
      <div className="ticket-placeholder">
        <span className="empty-symbol" aria-hidden="true">
          ▤
        </span>

        <strong>Ticket summary goes here</strong>

        <p>Ticket sales will be displayed separately from pedestrian counts</p>

        <span className="status-label">Awaiting component</span>
      </div>
    </FeaturePanel>
  );
}

// Main dashboard
export default function DashboardShell() {
  const [view, setView] = useState<View>("overview");

  const [attendance, setAttendance] = useState<AttendanceResponse | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // Fetch attendance data
  useEffect(() => {
    let cancelled = false;

    async function fetchAttendance() {
      try {
        const response = await fetch("/api/attendance");

        if (!response.ok) {
          throw new Error("Failed to load attendance data");
        }

        const data: AttendanceResponse = await response.json();

        if (!data.success) {
          throw new Error("Attendance API returned an error");
        }

        if (!cancelled) {
          setAttendance(data);
          setError(null);
        }
      } catch (err) {
        console.error("Attendance fetch error:", err);

        if (!cancelled) {
          setError("Unable to load attendance data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAttendance();

    // Refresh every 60 seconds
    const interval = setInterval(fetchAttendance, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const active = views.find((item) => item.id === view)!;

  // Metric data
  const metrics = [
    {
      label: "Total pedestrians",
      value: attendance?.summary.total,
      detail: "Combined directional readings",
      symbol: "◎",
    },
    {
      label: "Direction 1",
      value: attendance?.summary.direction1,
      detail: "Pedestrian count",
      symbol: "↘",
    },
    {
      label: "Direction 2",
      value: attendance?.summary.direction2,
      detail: "Pedestrian count",
      symbol: "↗",
    },
    {
      label: "Latest reading",
      value: attendance?.lastUpdated
        ? new Date(attendance.lastUpdated).toLocaleTimeString()
        : "—",
      detail: "Most recent sensor timestamp",
      symbol: "◷",
    },
  ];

  return (
    <div className="workspace">
      {/* Sidebar */}
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div>
          <p className="sidebar-label">WORKSPACE</p>

          <nav className="section-nav" aria-label="Dashboard sections">
            {views.map((item) => (
              <button
                key={item.id}
                type="button"
                className={view === item.id ? "nav-item active" : "nav-item"}
                aria-current={view === item.id ? "page" : undefined}
                onClick={() => setView(item.id)}
              >
                <span className="nav-number">{item.number}</span>

                {item.label}

                <span className="nav-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <SparkBrand variant="wordmark" className="sidebar-logo" />

          <strong>Room for discovery</strong>

          <p>Helping teams plan around the people who make Spark come alive</p>

          <span className="sidebar-caption">
            Constellation Counter / Early prototype
          </span>
        </div>
      </aside>

      {/* Dashboard content */}
      <div className="dashboard-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          Workspace <span aria-hidden="true">/</span>{" "}
          <strong>{active.label}</strong>
        </div>

        {/* Page heading */}
        <div className="page-heading">
          <div>
            <p className="eyebrow">TELUS SPARK · VISITOR INSIGHTS</p>

            <h1>{active.title}</h1>

            <p className="page-description">{active.description}</p>
          </div>

          <span className="location-badge">
            <span aria-hidden="true">◎</span> Calgary, AB
          </span>
        </div>

        {/* Demo notice */}
        <div className="demo-notice" role="note">
          <span className="notice-icon" aria-hidden="true">
            i
          </span>

          <p>
            <strong>Demo mode</strong>

            <span>
              This prototype uses Melbourne pedestrian sensor data for
              demonstration. TELUS Spark's database is not connected.
            </span>
          </p>

          <span className="notice-tag">INTERFACE PREVIEW</span>
        </div>

        {/* Main view */}
        <div id="view-content" key={view} className="view-content">
          {/* OVERVIEW */}
          {view === "overview" && (
            <>
              <div className="section-title">
                <h2>Building at a glance</h2>

                <span>
                  {loading
                    ? "Updating..."
                    : attendance?.lastUpdated
                      ? `Last updated: ${new Date(
                          attendance.lastUpdated,
                        ).toLocaleTimeString()}`
                      : "No data connected"}
                </span>
              </div>

              {/* Metrics */}
              <div className="metrics-grid">
                {metrics.map((metric) => (
                  <section className="metric-card" key={metric.label}>
                    <div className="metric-top">
                      <h3>{metric.label}</h3>

                      <span aria-hidden="true">{metric.symbol}</span>
                    </div>

                    <p
                      className="metric-value"
                      aria-label={
                        error
                          ? "Data unavailable"
                          : loading
                            ? "Loading"
                            : String(metric.value ?? "No data")
                      }
                    >
                      {loading
                        ? "Loading..."
                        : error
                          ? "Unavailable"
                          : (metric.value ?? "—")}
                    </p>

                    <p className="metric-detail">{metric.detail}</p>
                  </section>
                ))}
              </div>

              {/* Overview panels */}
              <div className="overview-panels">
                <AttendancePlaceholder
                  attendance={attendance}
                  loading={loading}
                  error={error}
                />

                <TicketPlaceholder />
              </div>

              {/* Scope note */}
              <div className="scope-note">
                <SparkBrand className="note-spark" />

                <div>
                  <strong>One place to understand attendance</strong>

                  <p>
                    The finished dashboard will bring together occupancy,
                    attendance history, and ticket information to support daily
                    planning.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ATTENDANCE */}
          {view === "attendance" && (
            <>
              <AttendancePlaceholder
                attendance={attendance}
                loading={loading}
                error={error}
              />

              <div className="scope-note">
                <span aria-hidden="true">↗</span>

                <div>
                  <strong>Busy times & trends</strong>

                  <p>
                    Explore pedestrian readings and directional movement over
                    time. A full attendance chart can be added here next.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* TICKETS */}
          {view === "tickets" && (
            <>
              <TicketPlaceholder />

              <div className="scope-note">
                <span aria-hidden="true">◎</span>

                <div>
                  <strong>Different measures, different purposes</strong>

                  <p>
                    Tickets sold, pedestrian counts, and estimated occupancy are
                    separate measurements and will be displayed independently.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <span>Constellation Counter</span>
          <span>Built for a better view</span>
        </footer>
      </div>
    </div>
  );
}
