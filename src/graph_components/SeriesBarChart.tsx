
import {Bar, BarChart, CartesianGrid, Cell, Label, Legend, Tooltip, XAxis, YAxis} from "recharts"
import {COLOURS} from "./colours"

type GameGraphData = {
    yearBracket: string;
    count: number;

}

type GraphProps = {
  width: number;
  height: number;
  data: GameGraphData[]
  x_key: string
  y_key: string
};








export default function SeriesBarChart({data, width, height, x_key, y_key}: GraphProps) {
 


    return (

        
        <div className= "shadow-[var(--double-shadow)] rounded-lg border border-[var(--n64-gray-clr)]  relative  " >
           <BarChart 
           width={width} 
           height={height} 
           data={data}  
           
           
  
         
           
           margin={{
            top: 40,
            right: 20,
            left: 10,
            bottom: 30,
          }}>

    <CartesianGrid stroke="var(--n64-gray-clr)"strokeDasharray="1 1 " />
<XAxis
  dataKey={x_key}
  interval={0}
  tick= {{fontSize: "14", dy:1}}
  label={{
    value: x_key,
    position: 'bottom',
                
     style:  { fill: '#aaacb0ff', fontSize: 14} 
  }}
/>
  <YAxis    
        tick={{
    dx: -1, 
  
    fontSize: 14,
  
  }}
    label={{
    value: "# of games",
    position: 'top',
    offset: 20, 
    padding: 10,

                 
    style:  { fill: '#aaacb0ff', fontSize: 14} 
  }} allowDecimals={false} dataKey={y_key}  />
  <Tooltip 


  labelStyle= {{color:"rgba(0,0,0,0.9)", fontWeight: "500"}}
  contentStyle= {{background: "hsla(220, 43%, 99%, 0.88)", border: "none", borderRadius: "0.5rem", }}
  cursor={{ stroke: 'var(--n64-dark-gray-clr)' ,fill: "rgba(0,0,0,0.15"}}
  
  />






  <Bar  dataKey="games"  barSize = {40}  stroke='var(--n64-gray-clr)' fill="var(--n64-a-clr)"  activeBar={{ stroke: 'var(--text-clr)', strokeWidth: 1}}>

              {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
              
            ))}
  </Bar>
  

</BarChart>
            
        </div>
    )






}