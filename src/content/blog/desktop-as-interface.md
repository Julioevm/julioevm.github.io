---
title: Desktop as Interface
date: 2026-05-09
summary: Turning a portfolio into a small operating system without making visitors learn a gimmick.
tags:
  - Design
  - React
  - UX
---

# Desktop as Interface

A portfolio can do more than list work. It can model how the work feels: spatial, tactile, and organized around exploration.

This desktop shell keeps the familiar parts of a classic OS:

- windows that can be moved and resized
- documents that open in place
- a taskbar that shows what is running
- direct links for people who want to share a specific page

The trick is restraint. The UI should feel playful, but the content still needs to load quickly, read cleanly, and work on small screens.

```ts
type WindowState = {
  id: string;
  route: string;
  isMinimized: boolean;
};
```

That state is enough to make the portfolio feel like a workspace instead of a flat list.
