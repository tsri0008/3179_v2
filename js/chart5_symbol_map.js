// CHART 5: PROPORTIONAL SYMBOL MAP (circles sized by the number of people born in each country)
// vg_5 is a variable holding this chart's recipe.
var vg_5 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the map in pixels.
  "width": 780,
  // Height of the map in pixels.
  "height": 420,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // "projection" is the maths that flattens the round Earth onto a flat screen.
  // "equalEarth" keeps areas the right relative size, which matters when circle size means something.
  "projection": {"type": "equalEarth"},
  // This map has two layers: first the grey world map, then the circles on top.
  "layer": [
    // LAYER 1: the grey base map of the world.
    {
      // This layer has its own data: a TopoJSON file of country shapes.
      "data": {
        // The file's location.
        "url": "data/world_110m.topojson",
        // "format" explains the file type. "feature" is the name of the shapes object inside the file.
        "format": {"type": "topojson", "feature": "ne_110m_admin_0_countries"}
      },
      // "geoshape" draws map shapes. Light grey fill with white borders.
      "mark": {"type": "geoshape", "fill": "#D9D4C7", "stroke": "white"}
    },
    // LAYER 2: one circle per country of birth.
    {
      // The CSV has one row per country: country, region, lat, lon, people.
      "data": {"url": "data/chart5_world_symbol_map_overseas_born_2025.csv"},
      // "circle" draws a circle. "opacity" makes circles see-through so overlapping ones can still be seen.
      "mark": {"type": "circle", "opacity": 0.75},
      // Connect CSV columns to visual properties.
      "encoding": {
        // The circle's horizontal place on the map comes from the longitude column.
        "longitude": {"field": "lon", "type": "quantitative"},
        // The circle's vertical place on the map comes from the latitude column.
        "latitude": {"field": "lat", "type": "quantitative"},
        // Circle SIZE shows the number of people. "range" sets the smallest and biggest circle area in pixels.
        "size": {
          // The CSV column.
          "field": "people",
          // A number on a number line.
          "type": "quantitative",
          // The smallest circle has area 0, the biggest has area 1500. Area grows in proportion to people.
          "scale": {"range": [0, 1500]},
          // The legend title and where it goes. "format": "~s" writes big numbers in short form (200k, 1M).
          "legend": {"title": "People living in Australia", "orient": "bottom", "format": "~s"}
        },
        // Circle COLOUR shows the region of the world.
        "color": {
          // The CSV column.
          "field": "region",
          // Unordered categories.
          "type": "nominal",
          // Region names and colours (the same colours as the other charts).
          "scale": {
            "domain": ["Europe", "Middle East & North Africa", "Sub-Saharan Africa", "Americas", "Oceania", "Asia"],
            "range": ["#3B6FB6", "#B5495B", "#7A9A3F", "#8E6BB0", "#5FA8A0", "#E8A33D"]
          },
          // The legend title and where it goes.
          "legend": {"title": "Region of birth", "orient": "bottom"}
        },
        // "order" decides which circle is drawn first. Sorting biggest first puts small circles on top of big ones.
        "order": {"field": "people", "sort": "descending"},
        // The hover box.
        "tooltip": [
          // Country name.
          {"field": "country", "type": "nominal", "title": "Country of birth"},
          // Region.
          {"field": "region", "type": "nominal", "title": "Region"},
          // Number of people with commas.
          {"field": "people", "type": "quantitative", "title": "People living in Australia", "format": ","}
        ]
      }
    },
    // Annotation
    {
      // Same CSV as the circles.
      "data": {"url": "data/chart5_world_symbol_map_overseas_born_2025.csv"},
      "transform": [
        // Keep only the countries with more than 400,000 people living in Australia (that is five countries).
        {"filter": "datum.people > 400000"},
        // Make a new column called "note" that joins the country name to its number, e.g. "India: 971,020".
        {"calculate": "datum.country + ': ' + format(datum.people, ',')", "as": "note"}
      ],
      // A text mark. "dy": -26 lifts the words 26 pixels above the middle of the circle so they sit above it.
      "mark": {"type": "text", "fontSize": 12, "fontWeight": "bold", "dy": -26, "color": "#2B2A28"},
      // Put the text at each country's longitude and latitude, the same place as its circle.
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "text": {"field": "note", "type": "nominal"}
      }
    }
  ]
};
