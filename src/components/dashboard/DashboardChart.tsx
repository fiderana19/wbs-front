import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';


const DashboardChart: FunctionComponent = () => {
  //initializing the chart value
  const [chartData, setChartData] = useState<{ options: any; series: any[] }>({
    options: {
      xaxis: {
        categories: [] 
      }
    },
    series: []
  });
  //fetching value for the chart
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/product/',
    })
    .then((response) => {
        const data = response.data;

        const newchartData = {
          options: {
            xaxis: {
              categories: data.map((item: any) => item.libelle), 
            },
          },
          series: [
            {
              name: 'Stock',
              data: data.map((item: any) => item.stock),
            }
          ],
        };
        setChartData(newchartData);
      })
      .catch((error) => {
        console.error('DashboardChart : Erreur lors de la récupération des données :', error);
      });
  }, []);

  return (
    <div>
      <ReactApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="bar" 
        height={300} 
      />
    </div>
  )
}

export default DashboardChart;