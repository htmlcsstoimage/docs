---
layout: page
title: Extra CSS
permalink: /template-editor/advanced/extra-css/
parent: Advanced
grand_parent: Template Editor
nav_order: 3
description: >-
  Use Extra CSS in the template editor when the built-in controls are not enough.
---
# Extra CSS
{: .no_toc }
{: .fs-9 }

Use Extra CSS for small styling details that are not covered by editor controls.
{: .fs-4 .fw-300 }

<hr>

Extra CSS is available from the selected block controls in the right sidebar. Prefer the built-in controls for backgrounds, borders, shadows, typography, and layout. Use Extra CSS when the template needs a small browser-supported style that the editor does not expose yet.

## Modes

| Mode | Use it when |
|:-----|:------------|
| Root | Add declarations to the selected block |
| Raw Style | Write a full CSS rule |
| Child Selector | Target content inside the selected block |

## When To Use It

- A CSS property that does not have an editor control yet
- A one-off style for an HTML block
- A child selector for carefully scoped markup
- Minor browser-supported effects

## Guardrails

- Keep Extra CSS small.
- Use editor controls when they exist.
- Avoid relying on internal editor markup.
- Test with real template values before using the template in production.
