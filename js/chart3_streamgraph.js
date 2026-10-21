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
};
