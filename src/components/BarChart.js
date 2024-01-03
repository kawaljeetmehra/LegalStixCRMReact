import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({data, dataLable}) => {
  const chartRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    setScriptLoaded(true);
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      const ctx = chartRef.current;
      if (ctx) {
        
        const completed_task = [];
        const pending_task = [];
        const labels = []
        data?.forEach(element => {
            if(element.pending == 0 && element.completed == 0) return;
            completed_task.push(element.completed)
            pending_task.push(element.pending)
            labels.push(element.month)
        });

        const chartData = {
          labels: labels, // Months
          datasets: [
                {
                    label: dataLable[0],
                    data: completed_task, // Replace with actual completed tasks for each month
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: dataLable[1],
                    data: pending_task, // Replace with actual not completed tasks for each month
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
          ]
        };

        const chartOptions = {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        };

        const chartConfig = {
          type: 'bar',
          data: chartData,
          options: chartOptions
        };

        if (myChart) {
          myChart.destroy();
        }

        const newChart = new Chart(ctx, chartConfig);
        setMyChart(newChart);

        return () => {
          newChart.destroy();
        };
      }
    }
  }, [scriptLoaded, data]);

  return <canvas ref={chartRef} id="myChart" width="400" height="400"></canvas>;
};

export default BarChart;
