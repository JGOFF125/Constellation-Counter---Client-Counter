"use client";

import { useState } from "react";
import FeaturePanel from "./FeaturePanel";
import SparkBrand from "../SparkBrand";

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

// I left the values empty until we connect the shared data
const metrics = [
  {
    label: "Estimated occupancy",
    detail: "People currently inside",
    symbol: "◎",
  },
  {
    label: "Building capacity",
    detail: "Occupancy against the agreed limit",
    symbol: "◔",
  },
  { label: "Entries", detail: "Recorded door entries", symbol: "↘" },
  { label: "Exits", detail: "Recorded door exits", symbol: "↗" },
];

// I kept this separate so we can add the chart here later
function AttendancePlaceholder() {
  return (
    <FeaturePanel
      eyebrow="Attendance"
      title="The flow of the day"
      description="A space to compare entry and exit counts over time"
    >
      <div className="chart-placeholder">
        <div className="chart-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="empty-message">
          <span className="empty-symbol" aria-hidden="true">
            ⌁
          </span>
          <strong>Attendance chart goes here</strong>
          <p>Sample data and date controls will be added by the team</p>
          <span className="status-label">Awaiting component</span>
        </div>
      </div>
      <div className="panel-foot">
        <span>Entries & exits</span>
        <span>No data connected</span>
      </div>
    </FeaturePanel>
  );
}

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
        <p>Ticket sales will be displayed separately from door entries</p>
        <span className="status-label">Awaiting component</span>
      </div>
    </FeaturePanel>
  );
}

export default function DashboardShell() {
  const [view, setView] = useState<View>("overview");
  const active = views.find((item) => item.id === view)!;

  return (
    <div className="workspace">
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
      <div className="dashboard-content">
        <div className="breadcrumb">
          Workspace <span aria-hidden="true">/</span>{" "}
          <strong>{active.label}</strong>
        </div>
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
        <div className="demo-notice" role="note">
          <span className="notice-icon" aria-hidden="true">
            i
          </span>
          <p>
            <strong>Demo mode</strong>
            <span>
              This prototype shows the planned interface — sample data will be
              added; TELUS Spark’s database is not connected
            </span>
          </p>
          <span className="notice-tag">INTERFACE PREVIEW</span>
        </div>
        <div id="view-content" key={view} className="view-content">
          {view === "overview" && (
            <>
              <div className="section-title">
                <h2>Building at a glance</h2>
                <span>Last updated: not connected</span>
              </div>
              <div className="metrics-grid">
                {metrics.map((metric) => (
                  <section className="metric-card" key={metric.label}>
                    <div className="metric-top">
                      <h3>{metric.label}</h3>
                      <span aria-hidden="true">{metric.symbol}</span>
                    </div>
                    <p className="metric-value" aria-label="No data available">
                      —
                    </p>
                    <p className="metric-detail">{metric.detail}</p>
                  </section>
                ))}
              </div>
              <div className="overview-panels">
                <AttendancePlaceholder />
                <TicketPlaceholder />
              </div>
              <div className="scope-note">
                <SparkBrand className="note-spark" />
                <div>
                  <strong>One place to understand attendance</strong>
                  <p>
                    The finished dashboard will bring together occupancy,
                    attendance history, and ticket information to support daily
                    planning
                  </p>
                </div>
              </div>
            </>
          )}
          {view === "attendance" && (
            <>
              <AttendancePlaceholder />
              <div className="scope-note">
                <span aria-hidden="true">↗</span>
                <div>
                  <strong>Busy times & trends</strong>
                  <p>
                    The team will add date selection and a busiest-period
                    summary alongside the attendance chart
                  </p>
                </div>
              </div>
            </>
          )}
          {view === "tickets" && (
            <>
              <TicketPlaceholder />
              <div className="scope-note">
                <span aria-hidden="true">◎</span>
                <div>
                  <strong>Different measures, different purposes</strong>
                  <p>
                    Tickets sold, door entries, and estimated occupancy will be
                    shown as separate measurements
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <footer className="dashboard-footer">
          <span>Constellation Counter</span>
          <span>Built for a better view</span>
        </footer>
      </div>
    </div>
  );
}
