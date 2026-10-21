// CHART 2: SLOPE CHART (rank of each community in 2015 compared with 2025)
// vg_2 is a variable holding this chart's recipe.
var vg_2 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels. The country names are drawn inside this space.
  "width": 600,
  // Height of the drawing area in pixels. 30 rows need quite a lot of height.
  "height": 600,
  // Use the same font as the rest of the page.
  // "view": {"stroke": null} removes the thin box that is normally drawn around the chart.
  "config": {"font": "Source Sans 3", "view": {"stroke": null}},
  // Where the numbers come from: a CSV with 2 rows per country (one for 2015, one for 2025).
  "data": {"url": "data/chart2_slope_country_of_birth_2015_2025.csv"},
  // The encodings below are written ONCE here, at the top, and every layer further down shares them.
  "encoding": {
    // x position = the year. "ordinal" gives 2015 and 2025 one slot each.
    "x": {
      // Which CSV column to use.
      "field": "year",
      // Treat the years as ordered categories (not as a continuous number line).
      "type": "ordinal",
      // "padding" adds empty space at both ends so the country names fit beside the dots.
      "scale": {"padding": 1.2},
      // Put the year labels at the top of the chart, remove the axis title, and make the labels horizontal (angle 0).
      "axis": {"orient": "top", "title": null, "labelFontSize": 16, "labelAngle": 0}
    },
    // y position = the rank. Rank 1 (the biggest community) must be at the TOP.
    "y": {
      // Which CSV column to use.
      "field": "rank",
      // "quantitative" means a number on a number line.
      "type": "quantitative",
      // "reverse": true flips the axis so small numbers (rank 1) are at the top.
      "scale": {"reverse": true},
      // Hide the y axis, because the ranks are written next to the country names instead.
      "axis": null
    },
    // Colour shows whether the community moved up or down the ranking (a column in the CSV).
    "color": {
      // The CSV column holding "Moved up", "Moved down" or "Same rank".
      "field": "trend",
      // Unordered categories.
      "type": "nominal",
      // Pick our own colours: teal for up, red for down, grey for same.
      "scale": {"domain": ["Moved up", "Moved down", "Same rank"], "range": ["#1F7A6D", "#C2452F", "#8A8A8A"]},
      // Place the legend at the bottom with no title.
      "legend": {"orient": "bottom", "title": null}
    },
    // "detail" means "draw a separate line for each country" without giving it its own colour.
    "detail": {"field": "country_of_birth", "type": "nominal"}
  },
  // "layer" stacks several drawings on top of each other, all using the shared encoding above.
  "layer": [
    // LAYER 1: the lines connecting a country's 2015 dot to its 2025 dot.
    {
      // "line" joins the dots that share the same "detail" (the same country) with a straight line.
      "mark": {"type": "line", "strokeWidth": 3}
    },
    // LAYER 2: a dot at each end of every line.
    {
      // "circle" draws a filled circle for every row of data. "size" is the circle's area.
      "mark": {"type": "circle", "size": 80},
      // The tooltip shown when you hover over a dot.
      "encoding": {
        "tooltip": [
          // Country name.
          {"field": "country_of_birth", "type": "nominal", "title": "Country of birth"},
          // The year of the dot you are hovering over.
          {"field": "year", "type": "ordinal", "title": "Year"},
          // The rank in that year.
          {"field": "rank", "type": "quantitative", "title": "Rank"},
          // The number of people, with a comma format such as 971,020.
          {"field": "population", "type": "quantitative", "title": "People", "format": ","}
        ]
      }
    },
    // LAYER 3: country names on the LEFT side (beside the 2015 dots).
    {
      // "transform" changes the data before drawing. "filter" keeps only the rows where the test is true.
      "transform": [{"filter": "datum.year == 2015"}],
      // "text" writes words. "align": "right" puts the text to the left of the dot, "dx" nudges it 10px away.
      "mark": {"type": "text", "align": "right", "dx": -10},
      // Which column provides the words to write.
      "encoding": {"text": {"field": "country_of_birth", "type": "nominal"}}
    },
    // LAYER 4: country names on the RIGHT side (beside the 2025 dots).
    {
      // Keep only the 2025 rows.
      "transform": [{"filter": "datum.year == 2025"}],
      // "align": "left" puts the text to the right of the dot, "dx" nudges it 10px away.
      "mark": {"type": "text", "align": "left", "dx": 10},
      // The words to write come from the country column again.
      "encoding": {"text": {"field": "country_of_birth", "type": "nominal"}}
    }
  ]
};
