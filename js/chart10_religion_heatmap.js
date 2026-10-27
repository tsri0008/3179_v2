// CHART 10: HEATMAP (religion by region of birth; darker square = bigger share of that group)
// vg_10 is a variable holding this chart's recipe.
var vg_10 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels (10 columns).
  "width": 560,
  // Height of the drawing area in pixels (8 rows).
  "height": 320,
  // Use the same font as the rest of the page. Remove the box around the chart.
  "config": {"font": "Source Sans 3", "view": {"stroke": null}},
  // The CSV has one row per religion per region of birth: religion, birthplace_region, percent.
  "data": {"url": "data/chart10_religion_by_birthplace_region.csv"},
  // The encodings written once here are shared by both layers below.
  "encoding": {
    // x = region of birth (columns of the heatmap).
    "x": {
      // The CSV column.
      "field": "birthplace_region",
      // Unordered categories.
      "type": "nominal",
      // "sort" lists the columns in the order we want, instead of A to Z.
      "sort": ["Australia", "Oceania (excl. Australia)", "North-West Europe", "Southern & Eastern Europe", "North Africa & Middle East", "South-East Asia", "North-East Asia", "Southern & Central Asia", "Americas", "Sub-Saharan Africa"],
      // Put the labels at the top and tilt them 45 degrees upward so they fit. No axis title.
      "axis": {"orient": "top", "labelAngle": -45, "title": null}
    },
    // y = religion (rows of the heatmap).
    "y": {
      // The CSV column.
      "field": "religion",
      // Unordered categories.
      "type": "nominal",
      // The order of the rows, biggest religions first.
      "sort": ["Christianity", "No religion / secular beliefs", "Islam", "Hinduism", "Buddhism", "Sikhism", "Judaism", "Other religions"],
      // No axis title.
      "axis": {"title": null}
    }
  },
  // Two layers: the coloured squares, then the numbers on top.
  "layer": [
    // LAYER 1: the coloured squares.
    {
      // "rect" draws a rectangle for every row of data.
      "mark": {"type": "rect", "stroke": "white"},
      // Connect data to visual properties.
      "encoding": {
        // Fill colour = the percentage.
        "color": {
          // The CSV column.
          "field": "percent",
          // A number on a number line.
          "type": "quantitative",
          // "threshold" groups the numbers at the cut points 1, 5, 15, 30, 50 (so there are 6 groups).
          // "range" gives one orange colour per group, from lightest to darkest.
          "scale": {"type": "threshold", "domain": [1, 5, 15, 30, 50], "range": ["#FEEDDE", "#FDD0A2", "#FDAE6B", "#FD8D3C", "#E6550D", "#A63603"]},
          // The legend title and where it goes.
          "legend": {"title": "% of people born in that region", "orient": "bottom"}
        },
        // The hover box.
        "tooltip": [
          // Religion.
          {"field": "religion", "type": "nominal", "title": "Religion"},
          // Region of birth.
          {"field": "birthplace_region", "type": "nominal", "title": "Region of birth"},
          // The percentage with one decimal place.
          {"field": "percent", "type": "quantitative", "title": "% of people", "format": ".1f"}
        ]
      }
    },
    // LAYER 2: the percentage written in each square.
    {
      // "text" writes words. fontSize 11 so the numbers fit inside the squares.
      "mark": {"type": "text", "fontSize": 11},
      // Connect data to visual properties.
      "encoding": {
        // The words come from the percent column, with one decimal place.
        "text": {"field": "percent", "type": "quantitative", "format": ".1f"},
        // Text colour: white on the darkest squares (over 30%) so it can be read, otherwise dark.
        "color": {"condition": {"test": "datum.percent > 30", "value": "white"}, "value": "#2B2A28"}
      }
    },
    // Annotation 1
    {
      // "filter" keeps a row only if the test is true: Christianity x Southern & Eastern Europe, or No religion x North-East Asia.
      "transform": [{"filter": "(datum.religion == 'Christianity' && datum.birthplace_region == 'Southern & Eastern Europe') || (datum.religion == 'No religion / secular beliefs' && datum.birthplace_region == 'North-East Asia')"}],
      // A rectangle with no fill and a thick black border. It inherits x and y, so it lands exactly on the cell.
      "mark": {"type": "rect", "fill": null, "stroke": "#111111", "strokeWidth": 3}
    },
    // Annotation 2
    {
      // One empty row of data, so one note.
      "data": {"values": [{}]},
      // The words of the note. Each piece in the list is one line.
      "mark": {"type": "text", "align": "left", "baseline": "top", "fontSize": 13, "color": "#3A3A3A",
               "text": ["Black outlines:", "77.4% of people born in", "Southern & Eastern Europe", "are Christian, and 67.6% of", "people born in North-East", "Asia have no religion."]},
      // Start 15 pixels to the right of the heatmap (its width is 470) and 10 pixels from the top.
      "encoding": {"x": {"value": 570}, "y": {"value": 10}}
    }
  ]
};
