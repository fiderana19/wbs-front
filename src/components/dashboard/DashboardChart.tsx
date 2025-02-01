import { FunctionComponent, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { getProductForChart } from '../../api/Dashboard';
import { HttpStatus } from '../../constants/Http_status';

const DashboardChart: FunctionComponent = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
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
    const response = await getProductForChart(token);
    if(response?.status === HttpStatus.OK) {
      const newchartData = {
        options: {
          xaxis: {
            categories: response.data.map((item: any) => item.libelle), 
          },
        },
        series: [
          {
            name: 'Stock',
            data: response.data.map((item: any) => item.stock),
          }
        ],
      };
      setChartData(newchartData);
    } else {
      console.log("Error")
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