import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import {
  Box,
} from '@chakra-ui/react'

export default function Simaco() {
    const [datas, setDatas] = useState([])
    const [dates, setDates] = useState([])
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    
     const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Simaco Update',
        },
      },
    };

  const getData = async() => {
    try {
      const response = await axios.get('/simaco');

      setDatas(response.data.datas)
      setDates(response.data.date)
    } catch (error) {
      
    }
  }

  const labels = dates.map(d => d.event_date);

  const datar = {
    labels,
    datasets: [
      {
        label: 'Zscript',
        data: datas.filter(d => d.check === 'zscript').map(e => e.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'CLS',
        data: datas.filter(d => d.check === 'cls').map(e => e.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Bar options={options} data={datar} />
      </Box>
    </div>
  );
}
