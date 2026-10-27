// CHART 7: CHOROPLETH MAP (each state is coloured by the % of people who speak another language at home)
// vg_7 is a variable holding this chart's recipe.
var vg_7 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the map in pixels.
  "width": 700,
  // Height of the map in pixels.
  "height": 460,
  // Use the same font as the rest of the page. "view": {"stroke": null} removes the box around the map.
  "config": {"font": "Source Sans 3", "view": {"stroke": null}},
  // The same flat-map maths as the other maps. Vega-Lite zooms the map to fit the Australian shapes.
  "projection": {"type": "equalEarth"},
  // Two layers: the coloured states, then the text labels on top.
  "layer": [
    // LAYER 1: the states, coloured by data.
    {
      // The TopoJSON file with the state shapes. "aus_states" is the name of the shapes object inside the file.
      "data": {"url": "data/aus_states.topojson", "format": {"type": "topojson", "feature": "aus_states"}},
      // "transform" prepares the data. "lookup" joins two tables together (like a VLOOKUP in Excel).
      "transform": [
        {
          // "properties.STATE_NAME" is the state name stored in the map file (the key we match on).
          "lookup": "properties.STATE_NAME",
          // "from" says which table to look in: our CSV file...
          "from": {
            // The CSV file with one row per state.
            "data": {"url": "data/chart7_language_by_state.csv"},
            // ...matched using its "state" column...
            "key": "state",
            // ...and these are the CSV columns copied onto each map shape.
            "fields": ["percent_other_language", "top_other_language"]
          }
        }
      ],
      // "geoshape" draws the state shapes. White borders separate the states.
      "mark": {"type": "geoshape", "stroke": "white", "strokeWidth": 1.5},
      // Connect data to visual properties.
      "encoding": {
        // Fill colour = the percentage.
        "color": {
          // The column copied in by the lookup above.
          "field": "percent_other_language",
          // A number on a number line.
          "type": "quantitative",
          // A "threshold" scale cuts the numbers into groups at the cut points listed in "domain".
          // Cut points 10, 20, 25, 30 make 5 groups: under 10, 10-20, 20-25, 25-30, 30 and over.
          // "range" lists one colour per group (light to dark orange from ColorBrewer).
          "scale": {"type": "threshold", "domain": [10, 20, 25, 30], "range": ["#FEEDDE", "#FDBE85", "#FD8D3C", "#E6550D", "#A63603"]},
          // The legend title and where it goes.
          "legend": {"title": "Speak another language at home (%)", "orient": "bottom"}
        },
        // The hover box.
        "tooltip": [
          // The state name from the map file.
          {"field": "properties.STATE_NAME", "type": "nominal", "title": "State"},
          // The percentage, with one decimal place.
          {"field": "percent_other_language", "type": "quantitative", "title": "Speak another language at home (%)", "format": ".1f"},
          // The most common language other than English.
          {"field": "top_other_language", "type": "nominal", "title": "Most common other language"}
        ]
      }
    },
    // LAYER 2: a text label (for example "NSW 27%") placed on each state.
    {
      // The same CSV file again. It has label_lon and label_lat columns saying where to put each label.
      "data": {"url": "data/chart7_language_by_state.csv"},
      // "text" writes words. The font size is 12 pixels and the words are bold.
      "mark": {"type": "text", "fontSize": 12, "fontWeight": "bold"},
      // Connect data to visual properties.
      "encoding": {
        // Where the label goes on the map (longitude, then latitude).
        "longitude": {"field": "label_lon", "type": "quantitative"},
        // The latitude of the label.
        "latitude": {"field": "label_lat", "type": "quantitative"},
        // The words to write come from the "label" column.
        "text": {"field": "label", "type": "nominal"}
      }
    },
    // Annotation
    {
      // Each row is one note: where it starts and what it says.
      "data": {"values": [
        {"px": 585, "py": 40, "note": "The Northern Territory has the\nhighest share (32.4%). Its most\ncommon other language is Kriol.\nIn every other state and territory\nit is Mandarin."},
        {"px": 585, "py": 190, "note": "Across Australia, 22.3% of people\nspeak a language other than\nEnglish at home."}
      ]},
      // A text mark that starts at the left and breaks lines wherever the note contains \n.
      "mark": {"type": "text", "align": "left", "baseline": "top", "fontSize": 13, "lineBreak": "\n", "lineHeight": 16, "color": "#3A3A3A"},
      // x and y come from the px and py columns. "scale": null means "these are already pixels, do not stretch them".
      "encoding": {
        "x": {"field": "px", "type": "quantitative", "scale": null},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"}
      }
    }
  ]
};
