# Data notes: Many Communities, One Australia

Author: Nuttapath Sirsawat (FIT3179, Assignment 2, October 2026). Cleaned files are in the same simple form used in the studio (one row per record, short column names). No values were changed or invented; rows were filtered, regrouped and summed. AI (Claude) helped write the cleaning script; results were checked against ABS headline figures (e.g. 22.3% speak a language other than English at home; 28% born overseas).

| File | Chart | Source and what was done |
|---|---|---|
| chart1_waffle_100_squares.csv | 1 Waffle | ABS 2021 Census, Cultural diversity, Table 1 (born in Australia / overseas / not stated). |
| chart2_slope_country_of_birth_2015_2025.csv | 2 Slope | ABS Australia's population by country of birth, June 2025, Table 1.1 (ERP). Ranks recalculated; 2025 preliminary. |
| chart3_streamgraph_arrivals_by_region.csv | 3 Stream | Home Affairs Historical Migration Statistics 2024-25 (settler arrivals). Countries grouped into six regions. |
| chart4_bump_rank_by_country_of_birth_1996_2025.csv | 4 Bump | ABS ERP by country of birth, 1996-2025 (Tables 1.1-1.3). Top 10 in 1996 or 2025, Netherlands excluded (rank 32 in 2025). |
| chart5_world_symbol_map_overseas_born_2025.csv | 5 Symbol map | ABS ERP June 2025 (countries with at least 1,000 people) joined to country centre points (mledoze/countries, ODbL). UK = England + Scotland + Wales + N. Ireland + Isle of Man + Guernsey + Jersey. |
| chart6_flow_permanent_visas.csv, chart6_flow_arcs.topojson | 6 Flow map | Home Affairs Migration Program outcome by citizenship 2024-25 (family + skill + special eligibility; "<5" counted as 0). Great-circle arcs to Canberra computed from country centres. NZ citizens absent (no visa needed). |
| chart7_language_by_state.csv, aus_states.topojson | 7 Choropleth | ABS 2021 Census Table 5 and Table 7. Percent = (Total - English - Not stated) / Total. NT includes Indigenous languages. Boundaries: rowanhogan/australian-states. |
| chart8_state_tiles.csv | 8 Tile grid | ABS 2021 Census Table 1: share born overseas and share arrived 2016-2021. Tile positions are hand-set. |
| chart9_top_languages.csv | 9 Lollipop | ABS 2021 Census Table 5: 12 most common languages other than English. |
| chart10_religion_by_birthplace_region.csv | 10 Heatmap | ABS 2021 Census Table 7, percent of each birthplace region. "No religion" includes secular beliefs. |
| chart11_age_profile_born_in_australia_vs_overseas.csv | 11 Pyramid | ABS 2021 Census Table 1, age groups as % of own group. |
| chart12_citizenship_by_birthplace.csv | 12 Lollipop | ABS 2021 Census Table 2: citizens / (citizens + non-citizens), 16 largest overseas-born groups. |
| chart13_permanent_migration_by_stream.csv | 13 Stacked area | Home Affairs Historical Migration Statistics 2024-25, 1984-85 to 2024-25. |
| world_110m.topojson | 5, 6 | Natural Earth 1:110m countries (public domain), from the FIT3179 studio. |

Charts 5, 6, 7 and 8 are the four map idioms (symbol, flow, choropleth, tile grid).

## Changes made for the simplified version
To keep the chart code short, small data-preparation steps that used to live inside the chart code were moved into the CSV files (no values were changed):
- chart1: 100 rows, one per waffle square (id, column, row, category). Counts are 67 / 28 / 5 squares.
- chart2: added a `trend` column (Moved up / Moved down / Same rank) and renamed `rank_in_year` to `rank`.
- chart3: partial first period and "Not stated / other" rows removed; columns are year, region, persons.
- chart7: added `abbr`, `label_lon`, `label_lat` and `label` columns so state labels can be drawn without extra code.
- chart8: added `arrived_label` (for example "5.4%").
- chart13: reshaped to long format (year, stream, visas); family and child visas are added together as "Family and child".
