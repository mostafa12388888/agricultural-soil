<template>
    <ejs-chart id="container" :title="title" :primaryXAxis="primaryXAxis">
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
  
  // Declare seriesData as a ref
  const seriesData = ref([]);
  
  onMounted(async () => {
    const token = Cookies.get('token');
    // Set Authorization header with token
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
    
    try {
      const result = await axios.get("/transaction/getMonthlyCounts", { headers });
      if (result.status === 200) {
        // Modify data if needed
        seriesData.value = result.data.map(item => ({
          month: item.month , // Example: Adding 5 to month
          count: item.count  // Example: Adding 20 to count
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  const title = 'Users Analysis';
  const primaryXAxis = { valueType: 'Category' };
  const chart = [LineSeries, Legend, Category];
  provide('chart', chart);
  </script>
  