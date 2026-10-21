// CHART 4: BUMP CHART (rank of the largest overseas-born communities, 1996 to 2025)
// vg_4 is a variable holding this chart's recipe.
var vg_4 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels (the country names are drawn at the right inside it).
  "width": 700,
  // Height of the drawing area in pixels.
  "height": 460,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The CSV has one row per country per year: country_of_birth, region, year, rank, population.
  "data": {"url": "data/chart4_bump_rank_by_country_of_birth_1996_2025.csv"},
  // The encodings written once here are shared by every layer below.
  "encoding": {
    // x = the year.
    "x": {
      // The CSV column.
      "field": "year",
      // A number on a number line.
      "type": "quantitative",
      // "domain" sets the start and end of the axis. It ends at 2032 to leave room for the country names.
      // "nice": false stops Vega-Lite from rounding the ends to tidy numbers.
      "scale": {"domain": [1996, 2032], "nice": false},
      // Show tick marks only at these years, and format "d" prints 2005 instead of "2,005".
      "axis": {"values": [1996, 2000, 2005, 2010, 2015, 2020, 2025], "format": "d", "grid": false, "title": null}
    },
    // y = the rank. Rank 1 must be at the top.
    "y": {
      // The CSV column.
      "field": "rank",
      // A number on a number line.
      "type": "quantitative",
      // Show ranks 1 to 28 only (0.5 and 28.5 leave a little room so rank 1 is not cut in half).
      // Nepal was 97th in 1996, so its line leaves the bottom of the chart.
      // "reverse": true puts rank 1 at the top.
      "scale": {"domain": [0.5, 28.5], "reverse": true},
      // The axis title.
      "axis": {"title": "Rank (1 = largest community)", "tickMinStep": 1, "grid": false}
    },
    // Colour = region of the world (same colours as the streamgraph).
    "color": {
      // The CSV column.
      "field": "region",
      // Unordered categories.
      "type": "nominal",
      // Region names and their colours. Only the regions found in this chart are listed.
      "scale": {"domain": ["Europe", "Sub-Saharan Africa", "Oceania", "Asia"], "range": ["#3B6FB6", "#7A9A3F", "#5FA8A0", "#E8A33D"]},
      // Legend at the top. Clicking it highlights a region (see "params" above).
      "legend": {"orient": "top", "title": "Region of birth (click to highlight)"}
    },
    // Opacity = see-through-ness. If the viewer has picked a region, that region is solid (1) and the rest are faint (0.15).
    "opacity": {
      // "condition" means "if this is true, use this value".
      // "param" refers to the selection called region_pick (defined above).
      // If nothing is selected, everything is shown normally.
      "condition": {"param": "region_pick", "value": 1},
      // The value used for everything that does not meet the condition (faint).
      "value": 0.15
    },
    // "detail" draws one separate line for every country.
    "detail": {"field": "country_of_birth", "type": "nominal"}
  },
  // Layers drawn on top of each other.
  "layer": [
    // LAYER 1: the lines.
    {
      // "params" are interactive settings. This one lets the viewer click the legend to highlight a region.
      // (It is written inside the first layer, because Vega-Lite needs a selection to belong to just one layer.)
      "params": [
        {
          // A name we choose, so we can refer to this selection later (in the "opacity" encoding above).
          "name": "region_pick",
          // "point" = select individual items, and "fields" says which column decides what is selected.
          "select": {"type": "point", "fields": ["region"]},
          // "legend" connects the selection to the legend, so clicking a legend entry makes the selection.
          "bind": "legend"
        }
      ],
      // "line" joins the points of each country. "clip": true cuts the line where it leaves the chart (Nepal).
      // "interpolate": "monotone" gives smooth curves.
      "mark": {"type": "line", "strokeWidth": 3, "clip": true, "interpolate": "monotone"}
    },
    // LAYER 2: a dot for each year.
    {
      // "circle" draws a dot for every row. "clip": true hides dots that fall outside the chart.
      "mark": {"type": "circle", "size": 40, "clip": true},
      // The hover box.
      "encoding": {
        "tooltip": [
          // Country name.
          {"field": "country_of_birth", "type": "nominal", "title": "Country of birth"},
          // The year.
          {"field": "year", "type": "quantitative", "title": "Year", "format": "d"},
          // The rank in that year.
          {"field": "rank", "type": "quantitative", "title": "Rank"},
          // The number of people, with commas.
          {"field": "population", "type": "quantitative", "title": "People", "format": ","}
        ]
      }
    },
    // LAYER 3: the country name written at the end of each line (2025 only).
    {
      // Keep only the rows for 2025 (the end of every line).
      "transform": [{"filter": "datum.year == 2025"}],
      // "text" writes words. "align": "left" puts them to the right of the dot, "dx" is a small gap.
      "mark": {"type": "text", "align": "left", "dx": 8},
      // The words come from the country column.
      "encoding": {"text": {"field": "country_of_birth", "type": "nominal"}}
    }
  ]
};
