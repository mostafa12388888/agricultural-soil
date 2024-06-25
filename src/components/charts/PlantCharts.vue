<template>
    <div id="app">
      <ejs-chart id="container" :title='title' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis' :legendSettings='legendSettings' :tooltip='tooltip' width="700px" height="400px" background="white" :border='border' :palette='palette'>
        <e-series-collection>
          <e-series :dataSource='seriesData' type='Column' xName='Name' yName='watering' name='Watering' fill='#33FF57' :border='seriesBorder'> </e-series>
          <e-series :dataSource='seriesData' type='Column' xName='Name' yName='humidity' name='Humidity' fill='#3357FF' :border='seriesBorder'> </e-series>
          <e-series :dataSource='seriesData' type='Column' xName='Name' yName='temperature' name='Temperature' fill='#FF5733' :border='seriesBorder'> </e-series>
          <e-series :dataSource='seriesData' type='Column' xName='Name' yName='soil_Humidity' name='Soil Humidity' fill='#FF33A6' :border='seriesBorder'> </e-series>
        </e-series-collection>
      </ejs-chart>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, provide } from 'vue';
  import { ChartComponent as EjsChart, SeriesCollectionDirective as ESeriesCollection, SeriesDirective as ESeries, ColumnSeries, Category, Tooltip } from '@syncfusion/ej2-vue-charts';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  
  // Ref for holding the series data
  const seriesData = ref([]);
  
  // Fetching the data on component mount
  onMounted(async () => {
    try {
      const token = Cookies.get('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const result = await axios.get('/plant-admin', { headers });
      if (result.status === 200) {
        seriesData.value = result.data.map(item => ({
          watering: item.watering,
          Name: item.name,
          temperature: item.temperature,
          humidity: item.humidity,
          soil_Humidity: item.soil_Humidity,
        }));
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  });
  
  // X-axis configuration
  const primaryXAxis = {
    valueType: 'Category',
    title: 'Plants',
    labelRotation: 45,
    interval: 1,
    majorGridLines: { width: 0 },
    edgeLabelPlacement: 'Shift'
  };
  
  // Y-axis configuration
  const primaryYAxis = {
    title: 'Values',
    labelFormat: '{value}%',
    interval: 10,
    minimum: 0,
    maximum: 100,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
  };
  
  // Legend settings
  const legendSettings = {
    visible: true,
    position: 'Bottom'
  };
  
  // Tooltip settings
  const tooltip = {
    enable: true,
    format: '${point.x} : <b>${point.y}</b>'
  };
  
  // Border settings
  const border = {
    color: '#000000',
    width: 2
  };
  
  // Palette settings
  const palette = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'];
  
  // Series border settings
  const seriesBorder = {
    color: '#000000',
    width: 1
  };
  
  // Providing chart components
  provide('chart', [ColumnSeries, Category, Tooltip]);
  </script>
  
  <style>
  #container {
    height: 350px;
  }
  </style>
  