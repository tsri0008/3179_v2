// main.js: puts each chart into its box on the page.
// Each chart file (chart1_waffle.js ... chart13_...js) has already created a variable
// called vg_1 ... vg_13.

// vegaEmbed("#box-id", recipe, options) draws a recipe inside the page element with that id.
// "#" means "look for an element whose id is ...". The options {actions: false} hides the "..." menu.
// ".catch(console.error)" prints a message in the browser console if something goes wrong.

// Wait until the web fonts have loaded, so the charts measure their text with the final font.
document.fonts.ready.then(function () {
  // Chart 1: waffle chart
  vegaEmbed("#chart-waffle", vg_1, { actions: false }).catch(console.error);
  // Chart 2: slope chart
  vegaEmbed("#chart-slope", vg_2, { actions: false }).catch(console.error);
  // Chart 3: streamgraph
  vegaEmbed("#chart-stream", vg_3, { actions: false }).catch(console.error);
  // Chart 4: bump chart
  vegaEmbed("#chart-bump", vg_4, { actions: false }).catch(console.error);
  // Chart 5: proportional symbol map
  vegaEmbed("#chart-symbol", vg_5, { actions: false }).catch(console.error);
  // Chart 6: flow map
  vegaEmbed("#chart-flow", vg_6, { actions: false }).catch(console.error);
  // Chart 7: choropleth map
  vegaEmbed("#chart-choropleth", vg_7, { actions: false }).catch(console.error);
  // Chart 8: tile grid map
  vegaEmbed("#chart-tiles", vg_8, { actions: false }).catch(console.error);
  // Chart 9: lollipop chart of languages
  vegaEmbed("#chart-languages", vg_9, { actions: false }).catch(console.error);
  // Chart 10: heatmap of religion
  vegaEmbed("#chart-religion", vg_10, { actions: false }).catch(console.error);
  // Chart 11: population pyramid
  vegaEmbed("#chart-pyramid", vg_11, { actions: false }).catch(console.error);
  // Chart 12: lollipop chart of citizenship
  vegaEmbed("#chart-citizenship", vg_12, { actions: false }).catch(console.error);
  // Chart 13: stacked area chart of visa streams
  vegaEmbed("#chart-streams", vg_13, { actions: false }).catch(console.error);
});
