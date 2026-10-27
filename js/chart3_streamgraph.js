// CHART 3: STREAMGRAPH (people arriving to settle in Australia each year, by region of the world)
// vg_3 is a variable holding this chart's recipe.
var vg_3 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels.
  "width": 700,
  // Height of the drawing area in pixels.
  "height": 380,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The CSV has one row per year per region: year, region, persons.
  "data": {"url": "data/chart3_streamgraph_arrivals_by_region.csv"},
  "layer": [
    {
    // "area" fills the space under a line. Stacked areas make a "stream".
    // "interpolate": "monotone" makes the edges smooth curves instead of sharp corners.
    "mark": {"type": "area", "interpolate": "monotone"},
    // Connect CSV columns to visual properties.
    "encoding": {
      // x = the year. "quantitative" because years are numbers on a line.
      "x": {
        // The CSV column.
        "field": "year",
        // A number on a number line.
        "type": "quantitative",
        // The axis runs from 1947 to 2016 exactly. "nice": false stops Vega-Lite from stretching it to round numbers like 1940 and 2020.
        "scale": {"domain": [1947, 2016], "nice": false},
        // Axis settings: format "d" shows 1950 instead of "1,950"; no grid lines; the title explains the year.
        "axis": {"format": "d", "grid": false, "title": "Year (financial year starting in July)"}
      },
      // y = how many people. "stack": "center" stacks the regions around a middle line, which makes a stream.
      "y": {
        // The CSV column.
        "field": "persons",
        // A number on a number line.
        "type": "quantitative",
        // Stack the bands in the centre (the "stream" shape). Without this they would sit on the bottom line.
        "stack": "center",
        // Hide the y axis: in a streamgraph the thickness of a band matters, not its position.
        "axis": null
      },
      // Colour = region of the world.
      "color": {
        // The CSV column.
        "field": "region",
        // Unordered categories.
        "type": "nominal",
        // Our chosen colours: the same colour is used for each region on every chart in the page.
        "scale": {
          // The region names...
          "domain": ["Europe", "Middle East & North Africa", "Sub-Saharan Africa", "Americas", "Oceania", "Asia"],
          // ...and their colours in the same order.
          "range": ["#3B6FB6", "#B5495B", "#7A9A3F", "#8E6BB0", "#5FA8A0", "#E8A33D"]
        },
        // Legend at the bottom, no title.
        "legend": {"orient": "bottom", "title": null}
      },
      // The box that appears when you hover over a band.
      "tooltip": [
        // The region you are hovering on.
        {"field": "region", "type": "nominal", "title": "Region"},
        // The year.
        {"field": "year", "type": "quantitative", "title": "Year starting", "format": "d"},
        // The number of people, written with commas.
        {"field": "persons", "type": "quantitative", "title": "People arriving", "format": ","}
      ]

    }
  }, 
  // ANNOTATION 1: two dashed vertical lines at the years when the way arrivals were counted changed.
    {
      // Each row is a year. The column is called "year", the same as in the chart's own data.
      "data": {"values": [{"year": 1959}, {"year": 1996}]},
      // A thin dashed grey vertical line (a "rule") at each year.
      "mark": {"type": "rule", "strokeDash": [4, 4], "strokeWidth": 1, "color": "#666666"},
      // x uses the year column, exactly like the main chart, so each line lands on the right year.
      "encoding": {"x": {"field": "year", "type": "quantitative"}}
    },
    // ANNOTATION 2: the words for the lines, plus a note about 1983. Each row says which year it is next to (x),
    // how far down from the top it sits in pixels (py), and what it says (note).
    {
      "data": {"values": [
        {"year": 1959, "py": 6, "note": "1959: counting method changes"},
        {"year": 1996, "py": 6, "note": "1996: counting method changes again"},
        {"year": 1983, "py": 60, "note": "1983: Asia first sends more\npeople than Europe"}
      ]},
      // "align": "left" starts the text at the point. "dx": 5 nudges it 5 pixels right of the line. "baseline": "top" hangs the text down from py.
      "mark": {"type": "text", "align": "left", "baseline": "top", "dx": 5, "fontSize": 13, "lineBreak": "\n", "lineHeight": 15, "color": "#3A3A3A"},
      "encoding": {
        "x": {"field": "year", "type": "quantitative"},
        // py is a pixel distance from the top, so "scale": null stops Vega-Lite from stretching it.
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"}
      }
    },
    // Annotation
    {
      "data": {"values": [{"year": 2012, "py": -16, "note": "Peak: 246,114 people in 2012-13"}]},
      // "align": "right" ends the text at the year, so it does not run off the right edge.
      "mark": {"type": "text", "align": "right", "baseline": "top", "fontSize": 13, "fontWeight": "bold", "color": "#3A3A3A"},
      "encoding": {
        "x": {"field": "year", "type": "quantitative"},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"}
      }
    }
  ]
};
