# Project Style & Behavioral Guidelines

## Tailwind CSS v4 & VS Code Clean Code Rules
- **No Arbitrary Brackets**: Never use arbitrary pixel/rem brackets like `max-w-[32rem]`, `tracking-[-0.05em]`, `leading-[1.0]`, `translate-y-[-1px]`, `text-[10px]`, `max-w-[130px]`, `aspect-16/9`, or `[transform:...]` when standard Tailwind CSS v4 utility classes exist (`max-w-lg`, `tracking-tighter`, `leading-none`, `-translate-y-px`, `text-xs`, `max-w-32`, `aspect-video`, `transform-gpu`).
- **No Non-Standard Spacing Values**: Never use non-existent spacing values like `min-w-65` (always use standard `min-w-64`, `min-w-72`, `min-w-80`).
- **No Input Pseudo-Class Linter Conflicts**: Never place conflicting duplicate property modifiers on inputs/textareas. Always write clean standard input utility sequences:
  - **Light Inputs**: `border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-600 outline-none`
  - **Dark Inputs**: `border border-slate-800 bg-slate-900 text-white placeholder-slate-500 focus:border-blue-600 outline-none`
- **Tailwind v4 Gradients**: Always use Tailwind v4 gradient directions (`bg-linear-to-r`, `bg-linear-to-l`, `bg-linear-to-t`) instead of legacy v3 syntax (`bg-gradient-to-*`).
- **No Border Conflicts**: Do not place `divide-y divide-*` and `border-y border-*` on the same parent `<div>` element to prevent linter conflicts. Use `border-b border-* last:border-none` on item elements or clean wrapper borders.
- **Zero Warnings**: Ensure all code edited or created is 100% free of ESLint, TypeScript, and Tailwind CSS IntelliSense warnings in VS Code.

## Color Palette & Brand Consistency (TLUX Landing Palette Standard)
- **Mandatory Brand Palette**: All new sections, components, subpages, and internal routes (including `/blog` and `/blog/[slug]`) MUST strictly respect and adhere to the official TLUX Landing Page color palette and design system tokens:
  - **Primary Backgrounds**: Dark Slate (`bg-slate-950`, `bg-slate-900`, `bg-[#0a0a0a]`) or Clean Light Slate (`bg-white`, `bg-slate-50`).
  - **Brand Accent 1 (TLUX Blue Gradient)**: `from-[#4F46E5]` to `to-[#2DD4BF]` / `text-blue-600` / `bg-blue-600` / `border-blue-600`.
  - **Brand Accent 2 (Teal / Cyan)**: `text-teal-400` / `text-cyan-400` / `border-cyan-500/40` / `bg-cyan-950/40`.
  - **Borders & Dividers**: Crisp 1px borders (`border-slate-800` in dark mode, `border-slate-200` in light mode).
  - **Geometry**: Strict `rounded-none` sharp corners across all buttons, cards, tags, inputs, containers, and widgets.
- **No Ad-Hoc Off-Brand Colors**: Do not introduce off-brand colors outside the official TLUX palette tokens.
