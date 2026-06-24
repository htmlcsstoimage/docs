---
layout: page
title: Panels
permalink: /template-editor/advanced/panels/
parent: Advanced
grand_parent: Template Editor
nav_order: 2
description: >-
  Choose between free, flex, grid, and table panels in the template editor.
---
# Panels
{: .no_toc }
{: .fs-9 }

Panels group blocks and control how those blocks are arranged.
{: .fs-4 .fw-300 }

<hr>

Add panels from the left sidebar. Select a panel to edit its own settings, or select a child block to edit how that child behaves inside the panel.

## Choosing a Panel

| Use case | Panel |
|:---------|:------|
| Group blocks that keep canvas-style positioning | [Free Panel](/template-editor/blocks/free-panel/) |
| Stack items in a row or column | [Flex Panel](/template-editor/blocks/flex-panel/) |
| Flow children through rows and columns | [Grid Panel](/template-editor/blocks/grid-panel/) |
| Assign children to specific rows and columns | [Table Panel](/template-editor/blocks/table-panel/) |

## Common Panel Workflows

- Put related blocks into a panel so they move together.
- Use padding to keep children away from the panel edge.
- Use gaps and margins for repeatable spacing.
- Use overflow when content should be clipped to the panel.
- Use child alignment overrides when one block needs different placement from the panel default.
- Use child auto sizing when blocks should fill the space a grid or table gives them.

## Panel Notes

Free Panels keep child positioning local to the panel. Flex Panels flow in one direction. Grid Panels flow children through a two-dimensional layout. Table Panels assign children to specific table positions.

Flex, Grid, and Table Panels all have default alignment settings. Children can override those defaults when a single block needs different alignment.
