Design a professional, modern GIS-based web dashboard called “PathPradarshan”.

PROJECT CONTEXT:
PathPradarshan is an AI + GIS-based road-network resilience and decision-support platform designed for disaster-prone regions such as Assam and Northeast India.

The platform analyzes road networks extracted from satellite imagery, converts them into a graph where intersections are nodes and roads are edges, identifies critical roads and junctions using network analysis such as betweenness centrality, simulates road/bridge/junction failures, measures the resulting network disruption using a resilience index, identifies alternative/resilient routes, and helps authorities and city planners make better infrastructure decisions.

The platform should NOT look like Google Maps or a normal navigation app. It should look like a professional GIS / disaster-management / infrastructure-planning command center.

PRIMARY USERS:
1. Disaster management authorities
2. City and infrastructure planners
3. Transportation planners
4. Emergency response teams
5. Government decision-makers

DESIGN STYLE:
- Professional, futuristic but practical
- GIS / infrastructure command-center aesthetic
- Clean and trustworthy
- Modern dashboard rather than a normal consumer website
- Dark navy/charcoal base with white/light panels and restrained green, orange, yellow and red status colors
- Use color primarily to communicate network conditions:
  Green = healthy/resilient
  Yellow = moderate risk
  Orange = high risk
  Red = critical/failure
- Avoid excessive gradients, excessive glassmorphism, or flashy animations
- Use clear typography and strong visual hierarchy
- Use rounded cards with subtle borders and shadows
- Use Lucide-style simple line icons
- Make the interface realistic enough that it could later be implemented in React

CREATE THE FOLLOWING SCREENS:

==================================================
SCREEN 1 — MAIN RESILIENCE DASHBOARD
==================================================

Header:
- PathPradarshan logo/name on the left
- Small subtitle: “Road Network Resilience & Decision Support”
- Navigation:
  Dashboard
  Network Analysis
  Simulation
  Planning
  Reports
- Right side:
  Search
  Notifications
  User/profile icon

Main dashboard layout:

LEFT / CENTER:
Large interactive GIS map occupying approximately 65% of the screen.

Map should visually represent:
- Roads as connected lines
- Intersections as nodes
- District/region boundaries
- Important roads highlighted
- Critical junctions shown using colored markers
- A few affected/blocked roads shown in red
- Alternative/resilient route shown in green
- Flood-risk/affected region represented with a subtle transparent overlay

Add a map legend:
- Normal road
- Critical road
- Blocked road
- Resilient/alternative route
- Critical junction
- Affected area

RIGHT SIDEBAR:
Create a “Network Overview” panel.

Cards:
- Network Resilience: 72%
- Critical Junctions: 8
- Affected Road Segments: 14
- Isolated Areas: 3

Use a circular or horizontal resilience visualization for the 72%.

Below this:
“Critical Infrastructure”

Example:
Junction #12
Criticality: HIGH
Betweenness Centrality: 0.78
Connected Regions: 5
Failure Impact: Severe

Include a “View Details” button.

Below that:
“Current Network Status”
- Healthy segments
- At-risk segments
- Failed segments

BOTTOM SECTION:
Add small analytical cards:
- Road Network
- Critical Junctions
- Simulation Impact
- Resilient Routes
- Resilience Report
- Better Decisions

==================================================
SCREEN 2 — NETWORK ANALYSIS
==================================================

Title:
“Network Analysis”

Subtitle:
“Identify critical infrastructure and understand network dependencies.”

Main map on the left.

Right analysis panel:

“Select Analysis”
Dropdown:
- Betweenness Centrality
- Connectivity
- Critical Junctions
- Network Density
- Resilience

When “Betweenness Centrality” is selected:
Show a visual scale from LOW → MEDIUM → HIGH.

Show:
Most Critical Junction
Junction #12
Centrality Score: 0.78

Also show:
Top Critical Roads
1. Road Segment A
2. Road Segment B
3. Road Segment C

Add a button:
“View Network Report”

Use tooltips explaining technical terms in simple language.

For example:
“Betweenness Centrality — indicates how important a road or junction is because many routes pass through it.”

==================================================
SCREEN 3 — FAILURE SIMULATION
==================================================

Title:
“Network Failure Simulation”

Subtitle:
“Test how the road network responds when critical infrastructure becomes unavailable.”

LEFT:
Large map.

Controls floating over the map:
“Simulation Mode”

Failure Type:
- Road
- Junction
- Bridge
- Multiple failures

Location:
Dropdown/search:
“Select road or junction”

Scenario:
- Flood
- Landslide
- Bridge failure
- Road closure
- Custom

Button:
“RUN SIMULATION”

RIGHT SIDEBAR:

“Simulation Results”

Display:
Connectivity Remaining: 77%
Connectivity Lost: 23%
Affected Areas: 3
Isolated Areas: 2
Alternative Routes: 4

Add a visual before/after comparison:
BEFORE FAILURE
Network connected

AFTER FAILURE
Several disconnected segments

Show a small network graph illustrating the failed connections.

Then:
“Recommended Resilient Routes”

Route 1:
Distance: 18.4 km
Risk: Low
Connectivity: High

Route 2:
Distance: 21.1 km
Risk: Moderate

Add:
“View Route Details”

==================================================
SCREEN 4 — TOPOLOGICAL HEALING
==================================================

Title:
“Topological Healing”

Subtitle:
“Restore connectivity after network disruption using alternative connections.”

Show a clear BEFORE / AFTER visualization.

BEFORE:
A road network with one or more broken connections.

Highlight disconnected areas.

Label:
“Network disruption”

AFTER:
Show alternative connections being established between disconnected areas.

Label:
“Connectivity restored”

Right panel:
Disconnected Areas: 3
Recovered Connections: 2
Connectivity Restored: 91%

Button:
“Apply Healing Scenario”

Include a simple explanation:
“Topological healing identifies alternative connections that can reconnect affected parts of the road network.”

==================================================
SCREEN 5 — INFRASTRUCTURE PLANNING
==================================================

Title:
“Infrastructure Planning”

Subtitle:
“Evaluate how proposed infrastructure could change network connectivity and resilience.”

This screen should demonstrate the flyover/bridge planning use case.

LEFT:
Large GIS map.

Toolbar:
- Add Flyover
- Add Bridge
- Add Road
- Add Bypass
- Remove Proposal

Allow the user to place a proposed infrastructure element on the map.

RIGHT:
“Proposed Infrastructure”

Type:
Flyover

Status:
Simulation Ready

Create a BEFORE vs AFTER comparison:

BEFORE:
Network Resilience: 61%
Critical Junctions: 9
Alternative Routes: 2

AFTER:
Network Resilience: 78%
Critical Junctions: 6
Alternative Routes: 4

Show changes using arrows and simple visual indicators.

Add:
“Run Impact Analysis”

and:
“Compare Scenarios”

The design should communicate that PathPradarshan can help planners answer:
“What happens to the road network if we build this infrastructure here?”

==================================================
SCREEN 6 — REPORTS
==================================================

Title:
“Resilience Reports”

Show cards for:
- District Resilience Report
- Critical Infrastructure Report
- Failure Simulation Report
- Infrastructure Planning Report

Include:
Date
Region
Resilience Score
Critical Junctions
Affected Roads

Buttons:
View
Download PDF
Share

Add a chart showing resilience over time.

==================================================
SCREEN 7 — CRITICAL JUNCTION DETAILS
==================================================

When a user clicks a critical junction on the map, open a detailed panel.

Title:
“Junction #12”

Status:
CRITICAL

Information:
Betweenness Centrality: 0.78
Connected Roads: 6
Connected Regions: 5
Failure Impact: Severe

Show:
“Why is this junction important?”

Simple explanation:
“Multiple routes between surrounding areas pass through this junction. Its failure may significantly reduce network connectivity.”

Add:
“Simulate Failure”

and:
“View Alternative Routes”

==================================================
COMPONENTS TO CREATE
==================================================

Create reusable components:
- Header/navbar
- Sidebar
- GIS map container
- Map legend
- Status cards
- Resilience score card
- Critical junction card
- Risk badges
- Dropdowns
- Search bars
- Primary/secondary buttons
- Simulation controls
- Before/after comparison cards
- Charts
- Report cards
- Modal for junction details
- Toast/notification component

RESPONSIVE DESIGN:
Create desktop-first design optimized for approximately 1440px width.

Also ensure the layout can eventually adapt to tablet screens.

IMPORTANT UX PRINCIPLES:
- The map should always be the main visual element.
- Do not overwhelm users with technical information.
- Use simple explanations alongside technical metrics.
- Every critical metric should have clear context.
- Use color consistently for risk levels.
- Users should be able to understand the network condition within a few seconds.
- The interface should feel like a real decision-support system used by planners, not a student project.

BRANDING:
Name: PATHPRADARSHAN

Suggested tagline:
“Understanding Roads. Predicting Disruptions. Building Resilience.”

Use a subtle road/network-inspired logo combining:
- road/path
- connected nodes
- directional movement

Make the final design polished, coherent, realistic, and suitable for an SIH project demonstration.