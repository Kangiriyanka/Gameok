
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
            top: 30,
            right: 20,
            left: -30,
            bottom: 5,
          }}>

    <CartesianGrid stroke="var(--n64-gray-clr)"strokeDasharray="1 1 " />
  <XAxis interval={2} dataKey={x_key}  padding= {{left: 20, right: 20}} />
  <YAxis allowDecimals={false} dataKey={y_key}  />
  <Tooltip 



  labelStyle= {{color:"rgba(0,0,0,0.9)"}}
  contentStyle= {{background: "hsla(220, 3%, 81%, 0.88)", border: "none", borderRadius: "0.5rem", }}
  cursor={{ stroke: 'var(--n64-dark-gray-clr)' ,fill: "rgba(0,0,0,0.15"}}
  
  />
  <Legend wrapperStyle={{padding: 5}}/>





  <Bar  dataKey="games"  barSize = {40}  stroke='var(--n64-gray-clr)' fill="var(--n64-a-clr)"  activeBar={{ stroke: 'var(--text-clr)', strokeWidth: 1}}>

              {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
              
            ))}
  </Bar>
  

</BarChart>
            
        </div>
    )






}