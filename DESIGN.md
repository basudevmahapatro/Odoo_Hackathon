# FleetFlow Design Language

This document defines the visual design system for FleetFlow. All frontend components must follow these guidelines to ensure consistency across the application.

---

## Color Palette

### Primary Colors

| Color    | Hex       | Tailwind   | Usage                                      |
| -------- | --------- | ---------- | ------------------------------------------ |
| Black    | `#0a0a0a` | `black`    | Sidebar bg, filled buttons, "On Trip" pill |
| White    | `#FFFFFF` | `white`    | Page background, card backgrounds          |
| Gray-50  | `#FAFAFA` | `gray-50`  | Subtle section backgrounds                 |
| Gray-100 | `#F5F5F5` | `gray-100` | "Ready" / neutral pill backgrounds         |
| Gray-200 | `#E5E5E5` | `gray-200` | Card borders, table row dividers           |
| Gray-400 | `#A3A3A3` | `gray-400` | Secondary/muted text                       |
| Gray-500 | `#737373` | `gray-500` | Placeholder text                           |
| Gray-700 | `#404040` | `gray-700` | Sidebar icon color (inactive)              |

### Status Colors

| Status            | Background                        | Text            | Shape               |
| ----------------- | --------------------------------- | --------------- | ------------------- |
| On Trip / Active  | `bg-black`                        | `text-white`    | `rounded-full` pill |
| Ready / Available | `bg-gray-100`                     | `text-gray-600` | `rounded-full` pill |
| In Shop           | `bg-gray-100`                     | `text-gray-800` | `rounded-full` pill |
| Out of Service    | `bg-gray-100`                     | `text-gray-400` | `rounded-full` pill |
| Draft / Pending   | `bg-white border border-gray-300` | `text-gray-600` | `rounded-full` pill |

---

## Typography

### Font Family

- **Primary:** Geist Sans (or Inter as fallback; system fallback: ui-sans-serif, system-ui, sans-serif)
- **Monospace:** Geist Mono for data/IDs

### Font Sizes

| Size | Class       | Usage                                                    |
| ---- | ----------- | -------------------------------------------------------- |
| xs   | `text-xs`   | Table column headers (`uppercase tracking-wide`), badges |
| sm   | `text-sm`   | Table cell content, body text, button labels             |
| base | `text-base` | Card labels, nav items                                   |
| lg   | `text-lg`   | Section titles ("Active Trips")                          |
| 2xl  | `text-2xl`  | KPI numbers (e.g. "42", "7", "13")                       |
| 3xl+ | `text-3xl`+ | Reserved for hero/landing contexts                       |

### Font Weights

- **Normal (400):** `font-normal` — Table cell content, body text
- **Medium (500):** `font-medium` — Column headers, labels, pill text
- **Semibold (600):** `font-semibold` — KPI labels, section headings
- **Bold (700):** `font-bold` — KPI numbers, page-level headings

---

## Spacing Scale

Based on 4px grid:

| Token | Value | Class          |
| ----- | ----- | -------------- |
| xs    | 4px   | `p-1`, `gap-1` |
| sm    | 8px   | `p-2`, `gap-2` |
| md    | 16px  | `p-4`, `gap-4` |
| lg    | 24px  | `p-6`, `gap-6` |
| xl    | 32px  | `p-8`, `gap-8` |

---

## Border System

### Border Width

- Default: `border` (1px)
- Emphasis: `border-2` (2px, use sparingly)

### Border Color

- **Card/Container borders:** `border-gray-200` — light, subtle
- **Input borders:** `border-gray-200` on default, `border-gray-400` on focus
- **Dividers (table rows):** `divide-y divide-gray-100`
- **Sidebar:** no border — uses background color contrast

### Border Radius

| Element               | Radius | Class          |
| --------------------- | ------ | -------------- |
| Cards / Containers    | 12px   | `rounded-xl`   |
| Buttons               | 8px    | `rounded-lg`   |
| Inputs / Search bars  | 8px    | `rounded-lg`   |
| Status Pills / Badges | full   | `rounded-full` |
| Sidebar icon wrappers | 8px    | `rounded-lg`   |
| User avatar           | full   | `rounded-full` |

**Note:** FleetFlow uses softly rounded shapes. Cards use `rounded-xl`, buttons/inputs use `rounded-lg`, and status indicators are always full pills. Never use `rounded-none` on interactive elements.

---

## Layout

### Application Shell

```
┌──────────────────────────────────────────────────────┐
│  [Sidebar 56px]  │  [Main Content Area]              │
│                  │  ┌─────────────────────────────┐  │
│  Icon-only nav   │  │ Search / Filter Toolbar     │  │
│  Black bg        │  ├─────────────────────────────┤  │
│                  │  │ Action Buttons (right-align)│  │
│                  │  ├─────────────────────────────┤  │
│                  │  │ KPI Cards (3-col grid)      │  │
│                  │  ├─────────────────────────────┤  │
│                  │  │ Data Table                  │  │
│                  │  └─────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Sidebar

```tsx
<aside className="flex h-screen w-14 flex-col items-center gap-2 bg-black py-4">
  {/* App logo at top */}
  <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
    <Logo />
  </div>

  {/* Nav icons */}
  <nav className="flex flex-1 flex-col items-center gap-1">
    {/* Active */}
    <a
      href="/dashboard"
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white"
      aria-label="Dashboard"
    >
      <LayoutDashboard size={18} />
    </a>
    {/* Inactive */}
    <a
      href="/vehicles"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Vehicles"
    >
      <Truck size={18} />
    </a>
  </nav>

  {/* User avatar at bottom */}
  <div className="mt-auto">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-xs font-medium text-white">
      U
    </div>
  </div>
</aside>
```

**Sidebar rules:**

- Width: `w-14` (56px), icon-only — no labels
- Background: `bg-black`
- Active icon wrapper: `bg-white/15 text-white rounded-lg`
- Inactive icon wrapper: `text-white/50 hover:bg-white/10 hover:text-white rounded-lg transition-colors`
- Icon size: 18px; wrapper: `h-9 w-9`

### Search & Filter Toolbar

```tsx
<div className="flex items-center gap-3">
  <div className="relative flex-1">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={16}
    />
    <input
      type="text"
      placeholder="Search trips, vehicles, drivers..."
      className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-black placeholder-gray-400 transition-colors focus:border-gray-400 focus:outline-none"
    />
  </div>
  <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50">
    Group by
  </button>
  <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50">
    Filter
  </button>
  <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50">
    Sort by
  </button>
</div>
```

### Standard Page Structure

```tsx
<div className="flex h-screen overflow-hidden bg-white">
  <Sidebar />
  <main className="flex-1 overflow-auto">
    <div className="space-y-5 p-6">
      <SearchToolbar />
      <div className="flex justify-end gap-3">
        <ActionButtons />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <KpiCard />
      </div>
      <DataTable />
    </div>
  </main>
</div>
```

---

## Components

### KPI Cards

```tsx
<div className="rounded-xl border border-gray-200 bg-white p-6">
  <p className="text-4xl font-bold text-black">42</p>
  <p className="mt-1 text-sm text-gray-500">Active Fleet</p>
</div>
```

- Border: `border border-gray-200` (subtle, not heavy black)
- Radius: `rounded-xl`
- Number: `text-4xl font-bold text-black`
- Label: `text-sm text-gray-500 mt-1`

### Buttons

#### Primary Action Button

```tsx
<button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
  New Trip
</button>
```

#### Secondary / Toolbar Button

```tsx
<button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50">
  Filter
</button>
```

#### Destructive Button

```tsx
<button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700">
  Delete
</button>
```

### Form Inputs

#### Text Input

```tsx
<input
  type="text"
  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black placeholder-gray-400 transition-colors focus:border-gray-400 focus:outline-none"
  placeholder="Enter value"
/>
```

#### Select

```tsx
<select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-black transition-colors focus:border-gray-400 focus:outline-none">
  <option>Select option</option>
</select>
```

#### Label

```tsx
<label className="block text-sm font-medium text-gray-700">Field Label</label>
```

### Cards & Containers

```tsx
<div className="rounded-xl border border-gray-200 bg-white p-6">
  {/* Content */}
</div>
```

### Status Pills / Badges

Always `rounded-full`. Size: `px-2.5 py-0.5 text-xs font-medium`.

```tsx
// On Trip / Active
<span className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white">
  On Trip
</span>

// Ready / Available
<span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
  Ready
</span>

// In Shop
<span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
  In Shop
</span>

// Out of Service / Suspended
<span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
  Out of Service
</span>

// Draft / Pending
<span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-500">
  Draft
</span>
```

### Tables

Tables use horizontal row dividers only — **no vertical borders between cells**.

```tsx
<div className="rounded-xl border border-gray-200 bg-white">
  <div className="border-b border-gray-100 px-6 py-4">
    <h2 className="text-base font-semibold text-black">Active Trips</h2>
  </div>
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-100">
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
          Trip
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
          Vehicle
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
          Driver
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      <tr className="transition-colors hover:bg-gray-50">
        <td className="px-6 py-4 text-sm font-medium text-black">TR-2041</td>
        <td className="px-6 py-4 text-sm text-gray-600">Van-05</td>
        <td className="px-6 py-4 text-sm text-gray-600">Alex Ray</td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white">
            On Trip
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Table rules:**

- Outer container: `rounded-xl border border-gray-200 bg-white`
- Column headers: `text-xs font-medium uppercase tracking-wide text-gray-400`
- Row dividers: `divide-y divide-gray-100`
- Row hover: `hover:bg-gray-50 transition-colors`
- Primary identifier cell (Trip ID): `text-sm font-medium text-black`
- Other data cells: `text-sm text-gray-600`
- No vertical (`border-r`) borders between cells

### Alerts & Messages

#### Error

```tsx
<div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
  Error message text
</div>
```

#### Info

```tsx
<div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Informational text
</div>
```

### Form Layout

```tsx
<form className="space-y-5">
  <div>
    <label className="block text-sm font-medium text-gray-700">Field</label>
    <input className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none" />
  </div>
  <div className="flex justify-end gap-3 pt-2">
    <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
      Cancel
    </button>
    <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
      Submit
    </button>
  </div>
</form>
```

---

## Icons

Use Lucide React icons with consistent sizing:

- **Small (16px):** `size={16}` — Inside inputs (search), inline with text
- **Medium (18px):** `size={18}` — Sidebar nav icons
- **Standard (20px):** `size={20}` — Button icons, toolbar icons
- **Large (24px):** `size={24}` — Page-level standalone icons

```tsx
import { Truck, LayoutDashboard, Search } from "lucide-react";

<Truck size={18} className="text-white/50" />
<Search size={16} className="text-gray-400" />
```

---

## Animations & Transitions

Transition colors/backgrounds only — keep animations minimal and functional:

```tsx
className = "transition-colors hover:bg-gray-50";
className = "transition-colors hover:bg-gray-800";
```

Avoid:

- Drop shadows on cards (use `border border-gray-200` instead)
- Spinning loaders (use skeleton loading)
- Bounce / wiggle / scale effects
- Fade transitions on page loads

---

## Responsive Breakpoints

| Breakpoint | Prefix    | Min Width |
| ---------- | --------- | --------- |
| Mobile     | (default) | 0px       |
| Tablet     | `md:`     | 768px     |
| Desktop    | `lg:`     | 1024px    |
| Wide       | `xl:`     | 1280px    |

---

## Accessibility

- All interactive elements must have visible focus states
- Sidebar icon buttons must include `aria-label`
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<table>`, etc.)
- Ensure color contrast ratio meets WCAG AA (minimum 4.5:1)
- Form inputs must have associated `<label>` elements

---

## Do's and Don'ts

### Do

- Use `rounded-xl` for cards and containers
- Use `rounded-lg` for buttons and inputs
- Use `rounded-full` for status pills only
- Use `border border-gray-200` for subtle card/container borders
- Use `divide-y divide-gray-100` for table row dividers
- Keep the sidebar icon-only, black background, `w-14` (56px)
- Right-align primary action buttons ("New Trip", "New Vehicle")
- Style table column headers with `uppercase tracking-wide text-gray-400`
- Use `text-sm text-gray-600` for secondary table cell content
- Make primary identifiers (Trip ID, License Plate) `font-medium text-black`

### Don't

- Use `border-black` on cards, containers, or inputs
- Add vertical `border-r` borders between table cells
- Add drop shadows (`shadow-*`) to cards or buttons
- Use color gradients or decorative fills
- Use non-pill shapes for status badges
- Add text labels to sidebar navigation items
- Place primary action buttons on the left side
- Use `rounded-none` on any interactive elements
