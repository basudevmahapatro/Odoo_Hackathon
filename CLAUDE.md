# FleetFlow - Modular Fleet & Logistics Management System

## Project Overview

FleetFlow is a centralized, rule-based digital hub that optimizes the lifecycle of a delivery fleet, monitors driver safety, and tracks financial performance. It replaces inefficient, manual logbooks with a modern web application.

---

## Target Users

| Role                   | Responsibilities                                                  |
| ---------------------- | ----------------------------------------------------------------- |
| **Fleet Managers**     | Oversee vehicle health, asset lifecycle, and scheduling           |
| **Dispatchers**        | Create trips, assign drivers, and validate cargo loads            |
| **Safety Officers**    | Monitor driver compliance, license expirations, and safety scores |
| **Financial Analysts** | Audit fuel spend, maintenance ROI, and operational costs          |

---

## Core System Pages

### 1. Login & Authentication

- Email/Password authentication
- "Forgot Password" functionality
- Role-Based Access Control (RBAC)

### 2. Command Center (Main Dashboard)

- **KPIs:**
  - Active Fleet: Count of vehicles "On Trip"
  - Maintenance Alerts: Vehicles marked "In Shop"
  - Utilization Rate: % of fleet assigned vs idle
  - Pending Cargo: Shipments awaiting assignment
- **Filters:** Vehicle Type, Status, Region

### 3. Vehicle Registry (Asset Management)

- CRUD operations for physical assets
- **Data Points:** Name/Model, License Plate (Unique ID), Max Load Capacity, Odometer
- **Logic:** Manual toggle for "Out of Service" (Retired)

### 4. Trip Dispatcher & Management

- Creation Form: Select Available Vehicle + Available Driver
- **Validation:** Prevent trip if CargoWeight > MaxCapacity
- **Lifecycle:** Draft → Dispatched → Completed → Cancelled

### 5. Maintenance & Service Logs

- Preventative and reactive health tracking
- **Auto-Logic:** Adding to "Service Log" sets vehicle status to "In Shop"

### 6. Completed Trip, Expense & Fuel Logging

- Record Liters, Cost, Date
- Automated "Total Operational Cost" calculation per Vehicle

### 7. Driver Performance & Safety Profiles

- **Compliance:** License expiry tracking (blocks assignment if expired)
- **Performance:** Trip completion rates, Safety Scores
- **Status:** On Duty, Off Duty, Suspended

### 8. Operational Analytics & Financial Reports

- **Metrics:** Fuel Efficiency (km/L), Vehicle ROI
- **Exports:** CSV/PDF for monthly payroll and health audits

---

## Business Logic & Workflows

### Vehicle Intake

```
Add Vehicle → Status: Available → Visible in Dispatcher Pool
```

### Compliance Check

```
Add Driver → Verify License Validity → Block if Expired
```

### Dispatching Workflow

```
1. Select Vehicle + Driver
2. Validate: CargoWeight < MaxCapacity
3. Update Status: Vehicle & Driver → "On Trip"
```

### Completion Workflow

```
1. Driver marks trip "Done"
2. Enter final Odometer
3. Update Status: Vehicle & Driver → "Available"
```

### Maintenance Workflow

```
1. Manager logs service (e.g., "Oil Change")
2. Auto-Logic: Status → "In Shop"
3. Vehicle hidden from Dispatcher
```

---

## Database Schema (MongoDB)

### Collections

#### users

```typescript
{
  _id: ObjectId;
  email: string(unique);
  name: string;
  passwordHash: string;
  role: "fleet_manager" | "dispatcher" | "safety_officer" | "financial_analyst";
  createdAt: Date;
  updatedAt: Date;
}
```

#### vehicles

```typescript
{
  _id: ObjectId;
  name: string;
  model: string;
  licensePlate: string(unique);
  type: "truck" | "van" | "bike";
  maxCapacity: number; // in kg
  odometer: number;
  status: "available" | "on_trip" | "in_shop" | "out_of_service";
  region: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### drivers

```typescript
{
  _id: ObjectId
  name: string
  email: string
  phone: string
  licenseNumber: string
  licenseExpiry: Date
  licenseCategory: ("truck" | "van" | "bike")[]
  status: "on_duty" | "off_duty" | "suspended"
  safetyScore: number // 0-100
  tripsCompleted: number
  currentVehicleId: ObjectId | null
  createdAt: Date
  updatedAt: Date
}
```

#### trips

```typescript
{
  _id: ObjectId;
  vehicleId: ObjectId;
  driverId: ObjectId;
  cargoWeight: number;
  origin: string;
  destination: string;
  status: "draft" | "dispatched" | "completed" | "cancelled";
  startOdometer: number;
  endOdometer: number | null;
  distance: number | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

#### maintenance

```typescript
{
  _id: ObjectId;
  vehicleId: ObjectId;
  type: "preventive" | "reactive";
  description: string;
  cost: number;
  serviceDate: Date;
  status: "scheduled" | "in_progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
```

#### fuelLogs

```typescript
{
  _id: ObjectId;
  vehicleId: ObjectId;
  tripId: ObjectId | null;
  liters: number;
  cost: number;
  odometer: number;
  date: Date;
  createdAt: Date;
}
```

---

## API Routes Structure

```
/api/auth/*           - Authentication (Better Auth)
/api/vehicles/*       - Vehicle CRUD
/api/drivers/*        - Driver CRUD
/api/trips/*          - Trip management
/api/maintenance/*    - Service logs
/api/fuel/*           - Fuel logging
/api/analytics/*      - Reports & metrics
/api/dashboard/*      - KPI data
```

---

## Role-Based Access Control (RBAC)

| Permission       | Fleet Manager | Dispatcher | Safety Officer | Financial Analyst |
| ---------------- | :-----------: | :--------: | :------------: | :---------------: |
| View Dashboard   |       ✓       |     ✓      |       ✓        |         ✓         |
| Manage Vehicles  |       ✓       |     ✗      |       ✗        |         ✗         |
| Create Trips     |       ✓       |     ✓      |       ✗        |         ✗         |
| Manage Drivers   |       ✓       |     ✗      |       ✓        |         ✗         |
| View Maintenance |       ✓       |     ✓      |       ✗        |         ✗         |
| Log Maintenance  |       ✓       |     ✗      |       ✗        |         ✗         |
| View Analytics   |       ✓       |     ✗      |       ✓        |         ✓         |
| Export Reports   |       ✓       |     ✗      |       ✗        |         ✓         |

---

## Development Standards

### File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Authenticated routes
│   ├── api/                # API routes
│   └── sign-in/            # Auth pages
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── forms/              # Form components
│   ├── tables/             # Data table components
│   └── layout/             # Layout components
├── server/
│   ├── better-auth/        # Auth configuration
│   ├── mongodb/            # Database client
│   └── services/           # Business logic services
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
└── hooks/                  # Custom React hooks
```

### Naming Conventions

- **Components:** PascalCase (e.g., `VehicleCard.tsx`)
- **Utilities:** camelCase (e.g., `formatCurrency.ts`)
- **API Routes:** kebab-case (e.g., `/api/fuel-logs`)
- **Types:** PascalCase with descriptive names (e.g., `VehicleStatus`)

### Code Quality

- All files must use TypeScript with strict types
- No `any` types - use proper type definitions
- Run `bun run lint` and `bun run typecheck` before commits
- Use Zod for runtime validation

### Import Aliases

- Use `~/` for src imports (e.g., `import { db } from "~/server/mongodb/client"`)

---

## Environment Variables

```env
# Authentication
BETTER_AUTH_SECRET=""
BETTER_AUTH_GITHUB_CLIENT_ID=""
BETTER_AUTH_GITHUB_CLIENT_SECRET=""

# Database
MONGODB_URI=""

# Application
NEXT_PUBLIC_APP_URL=""
```

---

## Commands

```bash
bun run dev        # Start development server
bun run build      # Production build
bun run lint       # Run ESLint
bun run typecheck  # TypeScript check
bun run start      # Start production server
```
