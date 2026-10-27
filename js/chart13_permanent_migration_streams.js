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
  "layer": [
    {
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
  },
  // Annotation 1
    {
      "data": {"values": [{"year": 1984, "py": 40, "note": "1984-85: 81% of permanent visas\nwere family and child visas\n(44,200 of 54,500)."}]},
      // "align": "left" starts the text at the year. "baseline": "top" hangs the text down from py. \n starts a new line.
      "mark": {"type": "text", "align": "left", "baseline": "top", "dx": 6, "fontSize": 13, "lineBreak": "\n", "lineHeight": 15, "color": "#3A3A3A"},
      "encoding": {
        "x": {"field": "year", "type": "quantitative"},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"}
      }
    },
    // Annotation 2
    {
      "data": {"values": [{"year": 2024, "py": -16, "note": "2024-25: 71% of permanent visas were skill visas (132,148 of 185,001)"}]},
      // "align": "right" ends the text at 2024 so it does not run off the right edge.
      "mark": {"type": "text", "align": "right", "baseline": "top", "fontSize": 13, "fontWeight": "bold", "color": "#3A3A3A"},
      "encoding": {
        "x": {"field": "year", "type": "quantitative"},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"}
      }
    }
]
};
