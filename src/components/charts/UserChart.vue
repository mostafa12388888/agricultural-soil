<template>
    <ejs-chart id="user-chart" :title="title" :primaryXAxis="primaryXAxis">
      <e-series-collection>
        <e-series :dataSource="seriesData" type="Line" xName="month" yName="count" name="Users"> </e-series>
      </e-series-collection>
    </ejs-chart>
  </template>
  
  <script setup>
  import { onMounted, ref, provide } from 'vue';
  import { ChartComponent as EjsChart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries, LineSeries, Legend, Category } from "@syncfusion/ej2-vue-charts";
  import Cookies from 'js-cookie';
  import axios from 'axios';
  
  const seriesData = ref([]);
  const title = 'Users Analysis';
  const primaryXAxis = { valueType: 'Category' };
  const chart = [LineSeries, Legend, Category];
  provide('chart', chart);
  
  onMounted(async () => {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const result = await axios.get("/transaction/getMonthlyCounts", { headers });
      if (result.status === 200) {
        seriesData.value = result.data.map(item => ({
          month: item.month,
          count: item.count
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  </script>
  