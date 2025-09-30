---
title: "Observability"
---

import { CardInfo } from '@site/src/components/card/card';
import { Steps, Step } from '@site/src/components/steps/steps';

<span className="page-description">How to monitor the quality of your data?</span>

## Overview
Formal Observability provide valuable insights by tracking the quality and frequency of data queries across your organization. 

With the Observability app, admin users can gain visibility into the consumption of specific columns or row values by users within a defined time period. This enables you to analyze and visualize the query patterns and usage trends for enhanced data understanding and decision-making.

You can see data consumption at multiple levels:
- At the resource level
- At the column level
- At the user level
- At the table level
- Per row values

At each level, you have the flexibility to apply filters based on specific users and time ranges. This allows for precise and targeted analysis of data consumption metrics tailored to your organization's requirements.

<CardInfo>
Users have the capability to create customized dashboards and visualizations using our API.
</CardInfo>

## Accessing Metrics via Logs

<Steps>
  <Step title="First Step">
    Go to the Logs application.
  </Step>
  <Step title="Second Step">
    Filter the logs from the specific level (from the Resource to the table level) for which you want to view metrics from the left panel.
  </Step>
  <Step title="Third Step">
    Select the desired time frame to see the consumption details.
  </Step>
</Steps>

<CardInfo>The query engine of Formal Logs is built on top of [Lucene](https://lucene.apache.org/core/3_6_0/queryparsersyntax.html).</CardInfo>

## Accessing Metrics via Aggregation

Aggregation offers a powerful visualization tool for analyzing data consumption throughout your entire organization.

<Steps>
  <Step title="First Step">
    Navigate to the Logs application and select `aggregation` from the dropdown menu.
    <img src="/img/aggregation_example.png" className="rounded-lg" />
  </Step>
  <Step title="Second Step">
    Select a view. You can select one of the following:
      - Table
      - Timeseries chart
      - Bar chart
      - Pie chart
      - Line chart
  </Step>
  <Step title="Third Step">
    Select one or multiple group by conditions.
  </Step>
</Steps>

### Exporting Metrics 

<Steps>
  <Step title="First Step">
    Go to the Logs application.
    <img src="/img/export_csv.png" className="rounded-lg" />
  </Step>
  <Step title="Second Step">
    Download data as CSV.
  </Step>
</Steps>

## Trackers
Formal Connectors enable you to track the query frequency of specific row values for each user accessing the data.

This feature facilitates anomaly detection by alerting you to unusually high query frequencies compared to the average for specific values. 

### Creating a Tracker
<Steps>
  <Step title="First Step">
    Navigate to the Trackers application in the menu and click the `Create Row Level Metric` button.
  </Step>
  <Step title="Second Step">
    Choose the relevant Resource.
  </Step>
  <Step title="Third Step">
    Provide the column path of the row for which you want to create the row level metric.
  </Step>
  <Step title="Fourth Step">
    Decide how the clear text value should be stored in the control plane:
        - **Option 1**: Values will be hashed.
        - **Option 2**: Values will be stored in plain text.
  </Step>
  <Step title="Fifth Step">
    After creating the row level metric, in the list of row level metrics, click on the arrow to navigate to the specific row level metric.
  </Step>
  <Step title="Sixth Step">
    Select the desired time frame and user to see the consumption details.
  </Step>
</Steps>