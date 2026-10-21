// CHART 13: STACKED AREA CHART (permanent visas granted each year, by type of visa)
// vg_13 is a variable holding this chart's recipe.
var vg_13 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels.
  "width": 700,
  // Height of the drawing area in pixels.
  "height": 360,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The CSV has one row per year per visa stream: year, stream, visas.
  "data": {"url": "data/chart13_permanent_migration_by_stream.csv"},
  // "area" fills the space under a line. Several areas are stacked on top of each other automatically.
  "mark": "area",
  // Connect data to visual properties.
  "encoding": {
    // x = the year (the year the financial year starts, e.g. 1984 means 1984-85).
    "x": {
      // The CSV column.
      "field": "year",
      // A number on a number line.
      "type": "quantitative",
      // The axis runs from 1984 to 2024 exactly ("nice": false stops Vega-Lite from rounding it to 1980 and 2024+).
      "scale": {"domain": [1984, 2024], "nice": false},
      // "values" lists the years that get a label (every 5 years). "format": "d" prints 1990 instead of "1,990". No grid lines. The title explains the year.
      "axis": {"values": [1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020], "format": "d", "grid": false, "title": "Year (financial year starting in July)"}
    },
    // y = number of visas. Areas are stacked, so the top edge shows the total. "format": "~s" writes 200000 as 200k.
    "y": {"field": "visas", "type": "quantitative", "axis": {"format": "~s", "title": "Permanent visas granted per year"}},
    // Colour = type of visa.
    "color": {
      // The CSV column.
      "field": "stream",
      // Unordered categories.
      "type": "nominal",
      // Our colours for the three streams.
      "scale": {"domain": ["Skill", "Family and child", "Special eligibility"], "range": ["#1B6A80", "#CBA634", "#9AA3A8"]},
      // Legend at the bottom with no title.
      "legend": {"orient": "bottom", "title": null}
    },
    // The hover box.
    "tooltip": [
      // Which type of visa.
      {"field": "stream", "type": "nominal", "title": "Visa stream"},
      // Which year.
      {"field": "year", "type": "quantitative", "title": "Year starting", "format": "d"},
      // How many visas, with commas.
      {"field": "visas", "type": "quantitative", "title": "Visas granted", "format": ","}
    ]
  }
};
