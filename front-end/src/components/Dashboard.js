import { Box, Container } from '@mui/material'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { PieChart, Pie, Sector } from "recharts";
import Stats from './Stats';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Tot: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`Rate ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [dataSet, setDataSet] = useState([])
  const [totTeachers, setTotTeachers] = useState("")
  const [totCourses, setTotCourses] = useState("")


  useEffect(() => {
    let allData = []
    const getStats1 = () => {
      axios.get('http://localhost:8080/api/v1/course/stats1')
      .then(function (response){

        console.log(response.data)
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          allData.push({name: element[0]+" "+element[1], value: element[2]})
        }
        setDataSet(allData)
      })
      .catch(function (error){
        console.log(error)
      })
    }

    const getTotalTeachers = () => {
      axios.get('http://localhost:8080/api/v1/teacher/total_teachers')
      .then(function(response){
        setTotTeachers(response.data)
      })
      .catch(function (error){
          console.log(error)
      })
    }

    const getTotalCourses = () => {
      axios.get('http://localhost:8080/api/v1/course/total_courses')
      .then(function(response){
        setTotCourses(response.data)
      })
      .catch(function (error){
          console.log(error)
      })
    }

    return () => {
      getTotalTeachers()
      getStats1()
      
      getTotalCourses()
    }
  }, [])
  
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <Container>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontWeight: 'bold',
      }}
    >

            <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          mr: 3,
          minWidth: { md: 350 },
        }}
      >

<Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: { xs: 'center', md: 'flex-start' },
           m: 1,
          minWidth: { md: 350 },
        }}
      >
     <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 3,
        mr:1,
        ml:4,
        width: 125,
        height:105
      }}
    >
      <Box sx={{ color: 'text.secondary', fontSize: 20, mb:2 }}>Total teachers</Box>
      <Box sx={{ color: '#8884d8', fontSize: 50, fontWeight: 'medium', ml:6 }}>
        {totTeachers}
      </Box>


    </Box>

    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 3,
        width: 125,
        height:105
      }}
    >
      <Box sx={{ color: 'text.secondary', fontSize: 22, mb:2 }}>Total courses</Box>
      <Box sx={{ color: '#8884d8', fontSize: 50, fontWeight: 'medium', ml:6 }}>
        {totCourses}
      </Box>


    </Box>

    </Box>
    <Box
      sx={{

        p: 2,
        mb:6,
        width: 140,
        height:120
      }}
    >
            
      <Stats/> 
      <Box sx={{ color: 'text.secondary' , fontSize:15}}>Courses/Total_hours</Box>
      </Box>
    </Box>

    {/*       */}
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        ml:6,
        width: 410,
        height:410
      }}
    >
      
      <Box sx={{ color: 'text.secondary', fontSize: 25, ml:4,           display: 'flex',
          justifyContent: 'center' }}>Total courses by teacher</Box>
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dataSet}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    </Box>
    
    
    </Box>
    

    </Container>

    
  )
}

export default Dashboard