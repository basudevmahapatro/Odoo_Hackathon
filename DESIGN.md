# FleetFlow Design Language

This document defines the visual design system for FleetFlow. All frontend components must follow these guidelines to ensure consistency across the application.

---

## Color Palette

### Primary Colors

| Color    | Hex       | Usage                            |
| -------- | --------- | -------------------------------- |
| Black    | `#000000` | Primary text, borders, buttons   |
| White    | `#FFFFFF` | Backgrounds, input fields        |
| Gray-100 | `#F5F5F5` | Hover states, subtle backgrounds |
| Gray-300 | `#D4D4D4` | Disabled states, dividers        |
| Gray-500 | `#737373` | Placeholder text, secondary text |
| Gray-700 | `#404040` | Muted text                       |

### Status Colors (Monochrome Adaptation)

| Status               | Background    | Text            | Border                       |
| -------------------- | ------------- | --------------- | ---------------------------- |
| Available/Success    | `bg-black/5`  | `text-black`    | `border-black`               |
| On Trip/Active       | `bg-black`    | `text-white`    | `border-black`               |
| In Shop/Warning      | `bg-black/10` | `text-black`    | `border-black`               |
| Out of Service/Error | `bg-black/5`  | `text-black/50` | `border-black/30`            |
| Pending              | `bg-white`    | `text-black`    | `border-black border-dashed` |

---

## Typography

### Font Family

- **Primary:** Manrope (weights 200-800, system fallback: ui-sans-serif, system-ui, sans-serif)
- **Monospace:** System monospace for data/numbers

### Font Sizes

| Size | Class       | Usage                                    |
| ---- | ----------- | ---------------------------------------- |
| xs   | `text-xs`   | Labels, captions, badges                 |
| sm   | `text-sm`   | Form inputs, table cells, secondary text |
| base | `text-base` | Body text, paragraphs                    |
| lg   | `text-lg`   | Section headers                          |
| xl   | `text-xl`   | Page titles                              |
| 2xl  | `text-2xl`  | Hero numbers, KPIs                       |
| 3xl  | `text-3xl`  | Main headings                            |

### Font Weights (Manrope 200-800)

- **Light (300):** `font-light` - Large display text, hero numbers
- **Normal (400):** `font-normal` - Body text
- **Medium (500):** `font-medium` - Labels, emphasis
- **Semibold (600):** `font-semibold` - Subheadings
- **Bold (700):** `font-bold` - Headings, buttons
- **Extrabold (800):** `font-extrabold` - Strong emphasis, large KPIs

---

## Spacing Scale

Based on 4px grid:
| Token | Value | Class |
|-------|-------|-------|
| xs | 4px | `p-1`, `gap-1` |
| sm | 8px | `p-2`, `gap-2` |
| md | 16px | `p-4`, `gap-4` |
| lg | 24px | `p-6`, `gap-6` |
| xl | 32px | `p-8`, `gap-8` |
| 2xl | 48px | `p-12`, `gap-12` |

---

## Border System

### Border Width

- Default: `border` (1px)
- Emphasis: `border-2` (2px)

### Border Radius

| Element | Radius | Class                          |
| ------- | ------ | ------------------------------ |
| None    | 0px    | `rounded-none` (default)       |
| Small   | 4px    | `rounded`                      |
| Medium  | 8px    | `rounded-md`                   |
| Full    | 9999px | `rounded-full` (pills, badges) |

**Note:** FleetFlow uses sharp, rectangular shapes by default. Only use rounded corners for badges/pills.

---

## Components

### Buttons

#### Primary Button

```tsx
<button className="border border-black bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50">
  Primary Action
</button>
```

#### Secondary Button

```tsx
<button className="border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5">
  Secondary Action
</button>
```

#### Destructive Button

```tsx
<button className="border border-black/30 bg-white px-4 py-2 text-sm font-medium text-black/70 transition-colors hover:border-black hover:bg-black/5 hover:text-black">
  Delete
</button>
```

### Form Inputs

#### Text Input

```tsx
<input
  type="text"
  className="block w-full border border-black px-3 py-2 text-black placeholder-black/40 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
  placeholder="Enter value"
/>
```

#### Select

```tsx
<select className="block w-full border border-black bg-white px-3 py-2 text-black focus:border-black focus:ring-1 focus:ring-black focus:outline-none">
  <option>Select option</option>
</select>
```

#### Label

```tsx
<label className="block text-sm font-medium text-black">Field Label</label>
```

### Cards & Containers

#### Standard Card

```tsx
<div className="border border-black bg-white p-6">{/* Content */}</div>
```

#### Dashboard Card (KPI)

```tsx
<div className="border border-black bg-white p-6">
  <p className="text-sm text-black/60">Metric Label</p>
  <p className="text-2xl font-bold text-black">1,234</p>
</div>
```

### Status Pills/Badges

```tsx
// Available
<span className="inline-flex items-center border border-black bg-black/5 px-2 py-1 text-xs font-medium text-black">
  Available
</span>

// On Trip
<span className="inline-flex items-center border border-black bg-black px-2 py-1 text-xs font-medium text-white">
  On Trip
</span>

// In Shop
<span className="inline-flex items-center border border-black bg-black/10 px-2 py-1 text-xs font-medium text-black">
  In Shop
</span>

// Out of Service
<span className="inline-flex items-center border border-black/30 bg-black/5 px-2 py-1 text-xs font-medium text-black/50">
  Out of Service
</span>
```

### Tables

```tsx
<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-black">
      <th className="border-r border-black px-4 py-3 text-left text-sm font-medium text-black last:border-r-0">
        Column Header
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-black/20">
      <td className="border-r border-black/20 px-4 py-3 text-sm text-black last:border-r-0">
        Cell Content
      </td>
    </tr>
  </tbody>
</table>
```

### Alerts & Messages

#### Error

```tsx
<div className="border border-black bg-black/5 px-4 py-3 text-sm text-black">
  Error message text
</div>
```

#### Info

```tsx
<div className="border border-black bg-white px-4 py-3 text-sm text-black">
  <strong>Note:</strong> Informational text
</div>
```

---

## Layout Patterns

### Page Layout

```tsx
<div className="min-h-screen bg-white">
  {/* Header */}
  <header className="border-b border-black px-6 py-4">
    {/* Navigation */}
  </header>

  {/* Main Content */}
  <main className="p-6">{/* Page content */}</main>
</div>
```

### Form Layout

```tsx
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-black">Field</label>
    <input className="mt-1 block w-full border border-black px-3 py-2" />
  </div>

  <div className="flex gap-4">
    <button className="border border-black bg-black px-4 py-2 text-white">
      Submit
    </button>
    <button className="border border-black bg-white px-4 py-2 text-black">
      Cancel
    </button>
  </div>
</form>
```

### Dashboard Grid

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {/* KPI Cards */}
</div>
```

---

## Icons

Use Lucide React icons with consistent sizing:

- **Small (16px):** `size={16}` - Inline with text, badges
- **Medium (20px):** `size={20}` - Buttons, inputs
- **Large (24px):** `size={24}` - Standalone icons, headers

```tsx
import { Truck, User, AlertCircle } from "lucide-react";

<Truck className="text-black" size={20} />;
```

---

## Animations & Transitions

Keep animations minimal and functional:

```tsx
// Hover transitions
className = "transition-colors hover:bg-black/5";

// For interactive elements
className = "transition-all hover:border-black/80";
```

Avoid:

- Spinning loaders (use skeleton loading)
- Bounce/wiggle effects
- Fade transitions for page loads

---

## Responsive Breakpoints

| Breakpoint | Prefix    | Min Width |
| ---------- | --------- | --------- |
| Mobile     | (default) | 0px       |
| Tablet     | `md:`     | 768px     |
| Desktop    | `lg:`     | 1024px    |
| Wide       | `xl:`     | 1280px    |

### Mobile-First Approach

```tsx
// Mobile: full width, Desktop: constrained
<div className="w-full max-w-md">

// Mobile: 1 column, Tablet: 2, Desktop: 4
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
```

---

## Accessibility

- All interactive elements must have visible focus states
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Include `aria-label` for icon-only buttons
- Ensure color contrast ratio meets WCAG AA (minimum 4.5:1)
- Form inputs must have associated `<label>` elements

---

## Do's and Don'ts

### Do

- Use sharp edges and borders
- Maintain high contrast (black on white)
- Keep layouts clean and scannable
- Use consistent spacing
- Apply status pills for quick identification
- Use data tables for lists

### Don't

- Use rounded corners on cards/containers
- Add drop shadows
- Use color gradients
- Mix different border styles
- Use light gray text on white backgrounds
- Add decorative elements without function
