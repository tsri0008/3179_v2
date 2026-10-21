// CHART 9: LOLLIPOP CHART (the 12 most common languages other than English spoken at home)
// vg_9 is a variable holding this chart's recipe.
var vg_9 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels.
  "width": 600,
  // Height of the drawing area in pixels.
  "height": 400,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The CSV has one row per language: language, speakers.
  "data": {"url": "data/chart9_top_languages.csv"},
  // The encodings written once here are shared by all three layers below.
  "encoding": {
    // y = the language name. "sort": "-x" lists the language with the biggest x value first.
    "y": {"field": "language", "type": "nominal", "sort": "-x", "title": null},
    // x = the number of speakers. "format": "~s" writes big numbers in short form on the axis (100k, 200k).
    "x": {"field": "speakers", "type": "quantitative", "title": "People who speak it at home", "axis": {"format": "~s"}}
  },
  // Three layers: the stick, the dot and the number.
  "layer": [
    // LAYER 1: the "stick" of the lollipop.
    {
      // "rule" draws a straight line. It goes from x (speakers) to x2 (zero).
      "mark": {"type": "rule", "color": "#E8A33D", "strokeWidth": 3},
      // "x2" is the other end of the line. "datum": 0 means a fixed value of zero.
      "encoding": {"x2": {"datum": 0}}
    },
    // LAYER 2: the "sweet" (the dot) at the end of the stick.
    {
      // "circle" draws a dot. "size" is its area in pixels.
      "mark": {"type": "circle", "color": "#E07B2D", "size": 140},
      // The hover box.
      "encoding": {
        "tooltip": [
          // Language name.
          {"field": "language", "type": "nominal", "title": "Language"},
          // Number of speakers, with commas.
          {"field": "speakers", "type": "quantitative", "title": "Speakers", "format": ","}
        ]
      }
    },
    // LAYER 3: the number written next to each dot.
    {
      // "text" writes words. "align": "left" puts it to the right of the dot, "dx" is a small gap.
      "mark": {"type": "text", "align": "left", "dx": 12},
      // The words come from the speakers column, formatted with commas.
      "encoding": {"text": {"field": "speakers", "type": "quantitative", "format": ","}}
    }
  ]
};
