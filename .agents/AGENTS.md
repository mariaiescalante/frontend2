# Project Style & Behavioral Guidelines

## Tailwind CSS v4 & VS Code Clean Code Rules
- **No Arbitrary Brackets**: Never use arbitrary pixel/rem brackets like `max-w-[32rem]`, `tracking-[-0.05em]`, `leading-[1.0]`, `translate-y-[-1px]`, or `[transform:...]` when standard Tailwind CSS v4 utility classes exist (`max-w-lg`, `tracking-tighter`, `leading-none`, `-translate-y-px`, `transform-gpu`).
- **Tailwind v4 Gradients**: Always use Tailwind v4 gradient directions (`bg-linear-to-r`, `bg-linear-to-l`, `bg-linear-to-t`) instead of legacy v3 syntax (`bg-gradient-to-*`).
- **No Border Conflicts**: Do not place `divide-y divide-*` and `border-y border-*` on the same parent `<div>` element to prevent linter conflicts. Use `border-b border-* last:border-none` on item elements or clean wrapper borders.
- **Zero Warnings**: Ensure all code edited or created is 100% free of ESLint, TypeScript, and Tailwind CSS IntelliSense warnings in VS Code.
