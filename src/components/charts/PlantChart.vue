<template>
    <ejs-accumulationchart id="plant-chart" :legendSettings="legendSettings" :tooltip="tooltip">
      <e-accumulation-series-collection>
        <e-accumulation-series :dataSource="data" xName="x" yName="y" innerRadius="20%"> </e-accumulation-series>
      </e-accumulation-series-collection>
    </ejs-accumulationchart>
  </template>
  
  <script setup>
  import { onMounted, provide, ref } from 'vue';
  import Cookies from 'js-cookie';
  import axios from 'axios';
  
  import { AccumulationChartComponent as EjsAccumulationchart, AccumulationSeriesCollectionDirective
     as EAccumulationSeriesCollection, AccumulationSeriesDirective as EAccumulationSeries,
      AccumulationLegend, PieSeries, AccumulationTooltip } from "@syncfusion/ej2-vue-charts";
  const data=ref([]);
//    data = [
//     { x: 'Argentina', y: 505370 },
//     { x: 'Belgium', y: 551500 },
//     { x: 'Cuba', y: 312685 },
//     { x: 'Dominican Republic', y: 350000 },
//     { x: 'Egypt', y: 301000 },
//     { x: 'Kazakhstan', y: 300000 },
//     { x: 'Somalia', y: 357022 }
//   ];
  onMounted(async()=>{
    try {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const result = await axios.get('/plant-admin', { headers });
    if (result.status === 200) {
        data.value = result.data.map(item => ({
          y: item.watering,
          x: item.name
        }));}
  } catch (error) {
    console.error('Error fetching plants:', error);
  }
  });
  const legendSettings = { visible: true };
  const tooltip = { enable: true };
  const accumulationchart = [PieSeries, AccumulationLegend, AccumulationTooltip];
  provide('accumulationchart', accumulationchart);
  </script>
  