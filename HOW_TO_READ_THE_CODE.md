# How to read this project

1. `index.html` is the page. Its `<script>` lines load Vega-Lite and then one file per chart.
2. `js/chartN_*.js` hold one chart each. Every line of code has a plain-English comment above it. A chart file creates one variable (`vg_1` ... `vg_13`) that holds the chart's recipe, called a *specification*.
3. `js/main.js` draws each recipe into its box on the page with `vegaEmbed("#box-id", vg_N)` (the same pattern as the Week 7 studio).
4. `data/` holds the CSV and TopoJSON files that the charts read.

Why `.js` and not `.vg.json`? JSON files cannot contain comments. A `.js` file holds exactly the same Vega-Lite object but allows `//` comments. To test a chart in the online Vega editor, copy the `{ ... }` part, delete the comment lines, and paste it there.

Every chart follows the same four steps: (1) say where the data is, (2) pick a mark (bar, line, circle...), (3) connect columns to visual properties (x, y, colour, size) in `encoding`, (4) optionally add layers, interaction (`params`) or data changes (`transform`).
