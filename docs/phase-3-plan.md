# Phase 3 work plan

I am using the integrated prototype as our starting point while Spark database access is pending

I have split the implementation into three workstreams for Daniel, Adeeb and Jinglin, with integration and final submission on my side

## What the assignment needs

| Deliverable | Marks | Completion check |
| --- | --- | --- |
| Four sequence diagrams | 10 | One diagram for each instructor-assigned use case, with classes and method names matching the revised class diagram |
| WBS and separate Gantt file | 10 | Whole PROJ 309 semester, named owners, milestones and matching tasks and dependencies |
| Prototype demonstration and source ZIP | 30 | Important workflows run end to end, follow the design architecture, save and retrieve data, and match the demonstrated source |

The final design document also needs the Phase 2 feedback applied and its earlier sections kept consistent

## Starting point

| Area | Current state |
| --- | --- |
| Shared dashboard and branding | Integrated |
| Melbourne live counts | Integrated from Daniel's branch through main |
| Historical date selector | Integrated under Attendance through a server API route |
| Historical sample | Sensor 11, one hour starting at 09:00 Melbourne local time, separate from the sensor 3 live overview |
| Login | Local demo credentials only, no real access control |
| Ticket sales | Placeholder |
| Persistence | Not implemented |
| Spark connection | Pending approved access |

The date selector is a narrow historical sample, not a completed daily report or a filter for the live overview

## Workstream 1 — Daniel

Data access and persistence

- Match the local test database and seed records to the approved Phase 2 schema and storage design
- Extend the server data layer for shared date ranges and reporting periods while keeping external Melbourne access behind the API routes
- Store imported readings and retrieve them through the same repository or service interface the UI uses
- Prevent duplicate imports and keep source, sensor, timestamp and timezone with each reading
- Support fixture mode for a repeatable demo and an explicitly selected live Melbourne mode
- Keep synthetic Spark-style and ticket fixtures labelled as demo data
- Handle unavailable services and empty results without silently switching sources
- Own one of the instructor-assigned sequence diagrams for a matching data workflow
- Review the persistence, entity and architecture sections against the code

Completion check: import or seed records, restart the app, and retrieve the same records from the designed storage layer without needing the external API

## Workstream 2 — Adeeb

Ticket workflow and reporting

- Implement the ticket screen using the shared stored demo records
- Show ticket totals and admission categories using the fields agreed with Daniel
- Support the chosen reporting period and show a clear empty state
- Keep tickets, pedestrian counts and estimated occupancy as separate measures
- Implement any storage-backed ticket action required by the assigned use cases, rather than stopping at a static summary
- Own one of the instructor-assigned sequence diagrams for a matching workflow
- Review its extended use case description and associated class methods

Completion check: run the assigned ticket workflow from start to finish and verify its results against the stored fixture records

## Workstream 3 — Jinglin

Attendance history, charts and schedule

- Extend the integrated date selector through Daniel's shared data layer
- Agree on one sensor and explicit time period per report
- Add attendance history and the chart or table required by the approved use cases
- Include loading, error, no-record and invalid-period states
- Keep sensor timestamps and report labels in a consistent timezone
- Prepare the WBS and the separate editable Gantt file using the actual PROJ 309 course schedule
- Include every semester milestone, owner and dependency, including presentations, code reviews and final submissions
- Own one of the instructor-assigned sequence diagrams for the history workflow

Completion check: two known reporting periods produce the expected totals, an empty period shows no records, and the WBS and Gantt tasks agree

## Integration — Joaquin

- Confirm the four assigned use cases and divide one sequence diagram per person
- Confirm the Phase 2 feedback, approved architecture and class methods before the diagrams are finalized
- Define the shared API and data contracts with Daniel before UI work splits
- Own the fourth instructor-assigned sequence diagram
- Integrate the components into the branded layout and review desktop and mobile behaviour
- Confirm which authentication or role workflow belongs in this prototype based on the assigned use cases
- Assemble the revised final design document and include the WBS
- Run the complete demo, review the source ZIP and complete the single group submission

Completion check: a fresh checkout runs using the documented setup, each member can explain their contribution, and the submitted source matches the demonstration

## Internal targets

I am using these as planning targets, not the official Brightspace due date

| Target | Milestone | Owner |
| --- | --- | --- |
| November 23 | Assigned use cases, Phase 2 feedback, data contract and storage design confirmed | Joaquin with all members |
| November 25 | Stored test data and first complete workflow per workstream | Daniel, Adeeb and Jinglin |
| November 27 | Integrated prototype and four draft sequence diagrams | All members |
| November 30 | Design document review, WBS and Gantt cross-check, full demo rehearsal | Joaquin with all members |
| Official due date pending | Instructor demonstration and single group submission | Joaquin with all members |

If the posted due date is earlier, the internal targets need to move forward

These targets cover Phase 3 preparation only and do not replace the required whole-semester Gantt chart

## Inputs still needed

- Latest Phase 2 submission and instructor feedback
- The exact four instructor-assigned use cases
- PROJ 309 semester schedule with presentations, code reviews and submission dates
- Phase 3 Brightspace due date and arranged demonstration time

I will keep these as unresolved inputs rather than invent class methods, assigned use cases or official dates

## Submission check

- One final design document in DOCX or PDF, using the Phase 1 formatting rules
- Four consistent UML sequence diagrams
- WBS included in the final design document
- Separate editable Gantt file in MS Project, GanttProject or Excel format
- Complete prototype source ZIP, excluding generated build and dependency folders
- Instructor demonstration before the due date
- Each member ready to explain their own code

Source: Project Phase 3 – Final Design and Project Timeline assignment supplied on November 20, 2026
