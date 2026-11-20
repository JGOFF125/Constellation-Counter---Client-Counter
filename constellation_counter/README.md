# Constellation Counter

I am building this TELUS Spark dashboard prototype while we wait for approved database access

## Run locally

I open a terminal inside the constellation_counter folder

```bash
npm ci
npm run dev
```

On Windows PowerShell I use npm.cmd if npm.ps1 is blocked

```powershell
npm.cmd ci
npm.cmd run dev
```

I open the local address printed in the terminal, usually http://localhost:3000

Demo email: test@example.com

Demo password: password123

I use this account for local testing only and it does not protect the dashboard

## Current features

- Responsive dashboard with TELUS Spark branding
- Overview, Attendance and Ticket sales navigation
- Live Melbourne sensor 3 directional counts, refreshed every 60 seconds
- Five newest available readings in the attendance panel
- Historical date selection under Attendance for sensor 11 at 09:00 Melbourne local time
- Loading, empty and error states for the historical sample

I keep the historical sample separate from the live overview because they use different sensors and reporting windows

I use April 19, 2026 as the starting historical sample date and other dates may have no available records

I display Melbourne directional counts as test data, not Spark occupancy or unique visitors

## Still pending

- Spark database connection
- Persistent storage and repeatable demo fixtures
- Ticket sales component
- Full attendance charts and reporting periods
- Real authentication and authorization where required by the approved use cases

I keep the team tasks and submission requirements in [the Phase 3 work plan](../docs/phase-3-plan.md)

## Checks

```bash
npm run lint
npm run build
```
