// CHART 1: WAFFLE CHART (100 squares, each square = 1 in every 100 people)
// "var vg_1" makes a variable called vg_1. It holds the whole chart recipe (a "specification").
// The curly bracket { opens the recipe. Everything inside it describes the chart.
var vg_1 = {
  // Tells Vega-Lite which version of its rules (schema) this recipe follows (version 5).
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // The size of the drawing area in pixels. The waffle is a square, so width = height.
  "width": 300,
  // Height of the drawing area in pixels.
  "height": 300,
  // The font used for all text in this chart (it is loaded in index.html from Google Fonts).
  // "view": {"stroke": null} removes the thin box that is normally drawn around the chart.
  "config": {"font": "Source Sans 3", "view": {"stroke": null}},
  // "data" says where the numbers come from.
  "data": {
    // "url" is the CSV file. It has 100 rows (one per square) and columns: id, column, row, category.
    "url": "data/chart1_waffle_100_squares.csv"
  },
  "layer": [{
    // "mark" is the shape drawn for every row of data. "rect" = a rectangle (a square here).
    "mark": {"type": "rect", "cornerRadius": 3},
    // "encoding" connects columns in the CSV to visual properties (position, colour, ...).
    "encoding": {
      // x position of each square comes from the "column" column (0 to 9).
      // "ordinal" means "ordered categories", which gives every square its own equal-width slot.
      // "axis": null hides the axis, because the numbers 0-9 mean nothing to the reader.
      // "scale": {"paddingInner": 0.1} leaves a small gap (10%) between squares.
      "x": {"field": "column", "type": "ordinal", "axis": null, "scale": {"paddingInner": 0.1}},
      // y position of each square comes from the "row" column (0 to 9). Row 0 is drawn at the top.
      // The same small gap between rows.
      "y": {"field": "row", "type": "ordinal", "axis": null, "scale": {"paddingInner": 0.1}},
      // Colour comes from the "category" column (born in Australia / overseas / not stated).
      "color": {
        // Which CSV column decides the colour.
        "field": "category",
        // "nominal" means "unordered categories" (just names, no order).
        "type": "nominal",
        // "scale" lets us pick our own colours instead of the default ones.
        "scale": {
          // "domain" lists the category names...
          "domain": ["Born in Australia", "Born overseas", "Not stated / inadequately described"],
          // ..."range" lists the colours, in the same order as the names above (grey, orange, pale).
          "range": ["#C5CDD4", "#E07B2D", "#E3DCCD"]
        },
        // Put the colour key (legend) under the chart and give it no title.
        "legend": {"orient": "bottom", "title": null}
      },
      // "tooltip" is the little box that appears when you hover over a square.
      // We give it just the category name, which is enough because each square is "1 in 100 people".
      "tooltip": [{"field": "category", "type": "nominal", "title": "Group"}]
    }
  }, 
  // Annotation layer 
  {
      "data": {"values": [
        {"px": 318, "py": 70, "color": "#5B6670", "note": "67 in every 100 people\nwere born in Australia\n(17.0 million people)"},
        {"px": 318, "py": 205, "color": "#C2561A", "note": "28 in every 100 people\nwere born overseas\n(7.0 million people)"},
        {"px": 318, "py": 272, "color": "#8A8272", "note": "5 in every 100:\nbirthplace not stated"}
      ]},
      // A text mark that starts at the left of the point and breaks lines wherever the note contains \n.
      "mark": {"type": "text", "align": "left", "baseline": "top", "fontSize": 13, "fontWeight": "bold", "lineBreak": "\n", "lineHeight": 16},
      "encoding": {
        // x and y come from the px and py columns. "scale": null means "these are already pixels, do not stretch them".
        "x": {"field": "px", "type": "quantitative", "scale": null},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"},
        // Each note takes its own colour from the "color" column. "scale": null means "use the colour code as written".
        "color": {"field": "color", "type": "nominal", "scale": null, "legend": null}
      }
    }
  ]
  // The curly bracket } closes the recipe. The semicolon ends the JavaScript line.
};
