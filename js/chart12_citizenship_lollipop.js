// CHART 12: LOLLIPOP CHART (% of each overseas-born community who are Australian citizens)
// vg_12 is a variable holding this chart's recipe.
var vg_12 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels.
  "width": 600,
  // Height of the drawing area in pixels.
  "height": 440,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The CSV has one row per country of birth: country_of_birth, percent_citizen, people.
  "data": {"url": "data/chart12_citizenship_by_birthplace.csv"},
  // The encodings written once here are shared by all three layers below.
  "encoding": {
    // y = country, with the highest percentage at the top ("-x" means sort by x from biggest to smallest).
    "y": {"field": "country_of_birth", "type": "nominal", "sort": "-x", "title": null},
    // x = the percentage who are citizens. The axis always runs from 0 to 100, with a label every 20.
    "x": {"field": "percent_citizen", "type": "quantitative", "scale": {"domain": [0, 100]}, "axis": {"values": [0, 20, 40, 60, 80, 100]}, "title": "% who are Australian citizens"}
  },
  // Three layers: the stick, the dot and the number.
  "layer": [
    // LAYER 1: the "stick" of the lollipop.
    {
      // "rule" draws a straight line from x to x2.
      "mark": {"type": "rule", "color": "#5FA8A0", "strokeWidth": 3},
      // x2 = zero, so the stick starts at the left edge.
      "encoding": {"x2": {"datum": 0}}
    },
    // LAYER 2: the dot at the end of the stick.
    {
      // "circle" draws a dot.
      "mark": {"type": "circle", "color": "#1F7A6D"},
      // Connect data to visual properties.
      "encoding": {
        // Dot SIZE = how many people were born in that country (bigger dot = bigger community). "format": "~s" gives short numbers in the legend (200k).
        "size": {"field": "people", "type": "quantitative", "legend": {"title": "People born there", "orient": "bottom", "format": "~s"}},
        // The hover box.
        "tooltip": [
          // Country name.
          {"field": "country_of_birth", "type": "nominal", "title": "Country of birth"},
          // % who are citizens.
          {"field": "percent_citizen", "type": "quantitative", "title": "% who are citizens", "format": ".1f"},
          // Number of people, with commas.
          {"field": "people", "type": "quantitative", "title": "People born there", "format": ","}
        ]
      }
    },
    // LAYER 3: the number written next to each dot.
    {
      // "text" writes words. "align": "left" puts it to the right of the dot, "dx" is a gap big enough for the dot.
      "mark": {"type": "text", "align": "left", "dx": 14},
      // The words come from the percentage column, with no decimals, e.g. 79.
      "encoding": {"text": {"field": "percent_citizen", "type": "quantitative", "format": ".0f"}}
    },
    // Annotation 1
    {
      // One row of data. It uses the chart's own column name (percent_citizen), so the line lands at 62.1 on the x axis.
      "data": {"values": [{"percent_citizen": 62.1}]},
      // A "rule" is a straight line. "strokeDash": [5, 4] makes it dashed (5 pixels line, 4 pixels gap).
      "mark": {"type": "rule", "strokeDash": [5, 4], "strokeWidth": 1.5, "color": "#3A3A3A"},
      // y = 0 to y2 = "height" makes the line run from the top to the bottom of the chart. (x is inherited: it is percent_citizen.)
      "encoding": {"y": {"value": 0}, "y2": {"value": "height"}}
    },
    // Annotation 2
    {
      // Each row is one note: where it starts (pixels from the left and top) and what it says.
      "data": {"values": [
        {"px": 385, "py": 392, "note": "All overseas-born people: 62.1%"},
        {"px": 385, "py": 330, "note": "Nepal-born people: only 21% are\ncitizens, the lowest of these 16 countries."}
      ]},
      // A text mark that starts at the left ("align": "left") and breaks lines wherever the note contains \n.
      "mark": {"type": "text", "align": "left", "baseline": "top", "fontSize": 13, "lineBreak": "\n", "lineHeight": 15},
      // x and y come from the px and py columns, with "scale": null meaning "these are already pixels, do not stretch them".
      // "color" is set to a fixed value because the chart's main colouring does not apply to a note.
      "encoding": {
        "x": {"field": "px", "type": "quantitative", "scale": null},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"},
        "color": {"value": "#3A3A3A"}
      }
    }
  ]
};
