import { FunctionComponent, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useGetProductForChart } from '../../hooks/useGetProductForChart';

const DashboardChart: FunctionComponent = () => {
  const { data: products4Chart } = useGetProductForChart();
  const [chartData, setChartData] = useState<{ options: any; series: any[] }>({
    options: {
      xaxis: {
        categories: [] 
      }
    },
    series: []
  });
  useEffect(() => {
    fetchProductForChart();
  }, []);

  async function fetchProductForChart() {
    if(products4Chart) {
      const newchartData = {
        options: {
          xaxis: {
            categories: products4Chart.map((item: any) => item.libelle), 
          },
        },
        series: [
          {
            name: 'Stock',
            data: products4Chart.map((item: any) => item.stock),
          }
        ],
      };
      setChartData(newchartData);
    }
  }

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