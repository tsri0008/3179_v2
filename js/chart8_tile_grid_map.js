// CHART 8: TILE GRID MAP (every state is drawn as one equal-sized square placed roughly where it lies on a map)
// vg_8 is a variable holding this chart's recipe.
var vg_8 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the grid in pixels (4 columns of tiles).
  "width": 440,
  // Height of the grid in pixels (4 rows of tiles).
  "height": 440,
  // Use the same font as the rest of the page. Remove the box around the chart.
  "config": {"font": "Source Sans 3", "view": {"stroke": null}},
  // The CSV has one row per state: state, abbr, tile_col, tile_row, percent_overseas_born, percent_arrived_2016_2021, arrived_label.
  "data": {"url": "data/chart8_state_tiles.csv"},
  // The encodings written once here are shared by the layers below.
  "encoding": {
    // x = which column of the grid the tile sits in (0 to 3).
    // "ordinal" gives each column an equal-width slot. "axis": null hides the axis.
    "x": {"field": "tile_col", "type": "ordinal", "axis": null},
    // y = which row of the grid the tile sits in (0 is the top row).
    "y": {"field": "tile_row", "type": "ordinal", "axis": null}
  },
  // Two layers: coloured squares, then text on top of them.
  "layer": [
    // LAYER 1: the coloured squares.
    {
      // "rect" draws rectangles. "stroke": "white" and "strokeWidth" draw a gap between tiles.
      "mark": {"type": "rect", "stroke": "white", "strokeWidth": 4},
      // Connect data to visual properties.
      "encoding": {
        // Fill colour = % of residents who arrived in 2016-2021.
        "color": {
          // The CSV column.
          "field": "percent_arrived_2016_2021",
          // A number on a number line.
          "type": "quantitative",
          // "range" gives the lightest and darkest colour. Colours in between are mixed automatically.
          "scale": {"range": ["#E5F5E0", "#41AB5D"]},
          // The legend title and where it goes.
          "legend": {"title": "Arrived 2016-2021 (% of residents)", "orient": "bottom"}
        },
        // The hover box.
        "tooltip": [
          // State name.
          {"field": "state", "type": "nominal", "title": "State"},
          // % arrived in the five years before the Census.
          {"field": "percent_arrived_2016_2021", "type": "quantitative", "title": "Arrived 2016-2021 (%)", "format": ".1f"},
          // % born overseas at any time.
          {"field": "percent_overseas_born", "type": "quantitative", "title": "Born overseas (%)", "format": ".1f"}
        ]
      }
    },
    // LAYER 2: the short state name (for example NSW) in the middle of each tile.
    {
      // "text" writes words. "dy": -8 moves the text 8 pixels up so there is room for a second line underneath.
      "mark": {"type": "text", "fontSize": 18, "fontWeight": "bold", "dy": -8},
      // The words come from the "abbr" column.
      "encoding": {"text": {"field": "abbr", "type": "nominal"}}
    },
    // LAYER 3: the percentage under the state name.
    {
      // "dy": 14 moves the text 14 pixels down.
      "mark": {"type": "text", "fontSize": 14, "dy": 14},
      // The words come from the "arrived_label" column (for example "5.4%").
      "encoding": {"text": {"field": "arrived_label", "type": "nominal"}}
    }
  ]
};
