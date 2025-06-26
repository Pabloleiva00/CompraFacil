// components/PriceChart.tsx
import React from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PriceChartProps {
  dates: string[];
  unimarcPrices: number[];
  santaIsabelPrices: number[];
}

const PriceChart: React.FC<PriceChartProps> = ({ dates, unimarcPrices, santaIsabelPrices }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Unimarc',
        data: unimarcPrices,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0,
      },
      {
        label: 'Santa Isabel',
        data: santaIsabelPrices,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Precios en los últimos 10 días',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PriceChart;
