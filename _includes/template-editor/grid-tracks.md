## Grid Tracks

Grid and Table Panels are built from tracks: columns and rows. Tracks can have their own size and background.

<div class="te-property__sections">
  <div class="te-property__section">
    <div class="te-property__subhead">Selecting Tracks</div>
    <p>Hover a column or row on the canvas and click its track selector to edit that track. The right sidebar switches to the selected column or row and shows track-specific controls.</p>
    <p class="te-property__meta">When the panel itself is selected, the right sidebar also includes a collapsible <strong>Rows/Columns</strong> item. Open it to select a row or column without using the canvas hover target.</p>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Track Size</div>
    <p>Use track size to control how much space a row or column receives inside the panel.</p>
    <ul class="te-compact-list">
      <li><strong>Defined</strong> uses a value with <code>fr</code>, <code>%</code>, or <code>px</code> units.</li>
      <li><strong>Auto</strong> lets the track size itself from its contents.</li>
      <li><strong>Min Content</strong> sizes the track to the smallest content-based size it can use.</li>
      <li><strong>Max Content</strong> sizes the track around its largest content-based size.</li>
    </ul>
  </div>

  <div class="te-property__section">
    <div class="te-property__subhead">Track Background</div>
    <p>Track backgrounds apply to the selected row or column. Use them for bands, separators, highlighted columns, or table-like layouts.</p>
    <p class="te-property__meta">A child block's own background is drawn above the track background. Transparent blocks let the track background show through.</p>
  </div>
</div>
