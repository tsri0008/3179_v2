// CHART 11: POPULATION PYRAMID (age profile of people born in Australia, left, and born overseas, right)
// vg_11 is a variable holding this chart's recipe.
var vg_11 = {
  // Which version of Vega-Lite's rules this recipe follows.
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  // Width of the drawing area in pixels.
  "width": 600,
  // Height of the drawing area in pixels (18 age groups).
  "height": 440,
  // Use the same font as the rest of the page.
  "config": {"font": "Source Sans 3"},
  // The CSV has one row per age group per birthplace: age_group, birthplace, percent_of_group.
  "data": {"url": "data/chart11_age_profile_born_in_australia_vs_overseas.csv"},
  // "transform" prepares the data before drawing.
  "transform": [
    {
      // "calculate" makes a new column. For people born in Australia we turn the percent NEGATIVE,
      // so that their bars grow to the LEFT of zero. Everyone else stays positive (grows to the right).
      "calculate": "datum.birthplace == 'Born in Australia' ? -datum.percent_of_group : datum.percent_of_group",
      // The name of the new column.
      "as": "signed_percent"
    }
  ],
  "layer": [
    {
    // "bar" draws a bar for every row of data.
    "mark": "bar",
    // Connect data to visual properties.
    "encoding": {
      // y = age group. The list says the order we want: oldest at the top, youngest at the bottom.
      "y": {
        // The CSV column.
        "field": "age_group",
        // Ordered categories.
        "type": "ordinal",
        // The order from top to bottom.
        "sort": ["85+", "80-84", "75-79", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"],
        // The axis title.
        "axis": {"title": "Age group (years)"}
      },
      // x = the signed percentage made above (negative bars go left).
      "x": {
        // The new column.
        "field": "signed_percent",
        // A number on a number line.
        "type": "quantitative",
        // "labelExpr" is a small formula for the axis labels. abs() removes the minus sign, so both sides read 5%, 10%.
        "axis": {"title": "% of people in the group", "labelExpr": "abs(datum.value) + '%'"}
      },
      // Colour = born in Australia or overseas.
      "color": {
        // The CSV column.
        "field": "birthplace",
        // Unordered categories.
        "type": "nominal",
        // Our colours: blue-grey for Australia-born, orange for overseas-born.
        "scale": {"domain": ["Born in Australia", "Born overseas"], "range": ["#9FB0C0", "#E07B2D"]},
        // The legend title and where it goes.
        "legend": {"title": null, "orient": "bottom"}
      },
      // The hover box.
      "tooltip": [
        // Which group.
        {"field": "birthplace", "type": "nominal", "title": "Group"},
        // Age group.
        {"field": "age_group", "type": "ordinal", "title": "Age group"},
        // The original (not negative) percentage, with one decimal place.
        {"field": "percent_of_group", "type": "quantitative", "title": "% of the group", "format": ".1f"}
      ]
    }
  }, 
  // Annotation 
  {
      "data": {"values": [
        {"px": 425, "py": 352, "note": "Under 15s: 5.1% of people born\noverseas, against 23.9% of people\nborn in Australia."},
        {"px": 60, "py": 10, "note": "Aged 25-44:\n36.4% of people\nborn overseas, vs\n24.5% of people\nborn in Australia."}
      ]},
      // A text mark that starts at the left of the point and breaks lines wherever the note contains \n.
      "mark": {"type": "text", "align": "left", "baseline": "top", "fontSize": 13, "lineBreak": "\n", "lineHeight": 16, "color": "#3A3A3A"},
      "encoding": {
        // x and y come from the px and py columns. "scale": null means "these are already pixels, do not stretch them".
        "x": {"field": "px", "type": "quantitative", "scale": null},
        "y": {"field": "py", "type": "quantitative", "scale": null},
        "text": {"field": "note", "type": "nominal"}
      }
    }
]
};
