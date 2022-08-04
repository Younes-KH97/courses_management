import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default function Stats() {
   const [data, setData] = useState([])

  const getStats2 = () => {

    let rows = []

    axios.get('http://localhost:8080/api/v1/course/stats2').then(function (response){
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        rows.push({name: element[0], courses: element[1], hours: element[2]})
      }
      setData(rows)
      
    }).catch(function (error){
      console.log(error)
    })
  }

  useEffect(() => {
    return () => {
      getStats2()
    }
  }, [])
  


  return (
    <LineChart
      width={400}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="courses" stroke="#82ca9d" />
      <Line type="monotone" dataKey="hours" stroke="orange" />
      
    </LineChart>
  );
}