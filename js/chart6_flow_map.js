// CHART 6: FLOW MAP (curved lines from each country to Canberra; thicker line = more permanent visas)
// vg_6 is a variable holding this chart's recipe.
var vg_6 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the map in pixels.
  "width": 780,
  // Height of the map in pixels.
  "height": 420,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The same flat-map maths as the symbol map.
  "projection": {"type": "equalEarth"},
  // "params" are interactive settings. This one is a SLIDER the viewer can drag.
  "params": [
    {
      // A name we choose. We use it below in the "filter" to hide small flows.
      "name": "min_visas",
      // The slider's starting value.
      "value": 1000,
      // "bind" connects the setting to a form control on the page. "range" = a slider.
      // "min", "max" and "step" are the slider's smallest value, biggest value and jump size.
      // "name" is the text shown next to the slider.
      "bind": {"input": "range", "min": 1000, "max": 10000, "step": 500, "name": "Show countries with at least this many visas: "}
    }
  ],
  // Two layers: the grey world map, then the coloured flow lines on top.
  "layer": [
    // LAYER 1: the grey world map.
    {
      // The TopoJSON file with the country shapes.
      "data": {"url": "data/world_110m.topojson", "format": {"type": "topojson", "feature": "ne_110m_admin_0_countries"}},
      // Light grey shapes with white borders.
      "mark": {"type": "geoshape", "fill": "#D9D4C7", "stroke": "white"}
    },
    // LAYER 2: one curved line per country. The lines were pre-calculated and saved in a TopoJSON file.
    {
      // The TopoJSON file of curved lines. "flow_arcs" is the name of the lines object inside the file.
      "data": {"url": "data/chart6_flow_arcs.topojson", "format": {"type": "topojson", "feature": "flow_arcs"}},
      // "filter" keeps only the lines whose visa count is at least the slider's value.
      // "datum.properties.total" is the visa count stored inside each line.
      "transform": [{"filter": "datum.properties.total >= min_visas"}],
      // "geoshape" draws the lines. "filled": false means draw only the outline (a line), not a filled area.
      "mark": {"type": "geoshape", "filled": false, "stroke": "#C4631A", "opacity": 0.7},
      // Connect data to visual properties.
      "encoding": {
        // Line thickness = number of visas. "range" is the thinnest and thickest line in pixels.
        "strokeWidth": {
          // The visa count is stored under "properties" inside the TopoJSON file.
          "field": "properties.total",
          // A number on a number line.
          "type": "quantitative",
          // Thinnest 0.5 px, thickest 12 px.
          "scale": {"range": [0.5, 12]},
          // "legend": null switches the legend off. The caption under the chart explains that thicker line = more visas.
          "legend": null
        },
        // The hover box.
        "tooltip": [
          // Country of citizenship.
          {"field": "properties.citizenship", "type": "nominal", "title": "Citizenship"},
          // Visas granted, with commas.
          {"field": "properties.total", "type": "quantitative", "title": "Permanent visas, 2024-25", "format": ","}
        ]
      }
    },
    // Annotation
    {
      "data": {"values": [
        // India is at longitude 77, latitude 20.
        {"lon": 77, "lat": 20, "note": "India: 48,326 permanent visas,\nthe most of any country"},
        // Canberra is at longitude 149.1, latitude -35.3.
        {"lon": 149.1, "lat": -35.3, "note": "Every arc ends at Canberra.\nIt is a symbolic end point,\nnot a flight path."}
      ]},
      // "align": "right" ends the text at the point, so the note sits to the LEFT of it. "dy" nudges it up or down. "lineBreak" splits lines at \n.
      "mark": {"type": "text", "align": "right", "dx": -12, "dy": 24, "fontSize": 12, "lineBreak": "\n", "lineHeight": 14, "color": "#2B2A28"},
      // Place each note by its longitude and latitude columns.
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "note", "type": "nominal"}
      }
    }
  ]
};
