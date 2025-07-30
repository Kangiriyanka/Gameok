
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








export default function YearsBarChart({data, width, height, x_key, y_key}: GraphProps) {
 
 

    return (

        
        <div className= "shadow-[var(--double-shadow)] rounded-lg border border-[var(--n64-gray-clr)] w-fit  relative  " >
         
        
           <BarChart 
           width={width} 
           height={height} 
           data={data}  
          
  
         
           
           margin={{
            top: 20,
            right: 20,
            left: -30,
            bottom: 5,
          }}>

    <CartesianGrid stroke="var(--n64-gray-clr)"strokeDasharray="1 1 " />
  <XAxis 
  
  dataKey={x_key} />
  <YAxis dataKey={y_key}   allowDecimals={false}>
      <Label value= {x_key}/>
  </YAxis>
  <Tooltip 



  labelStyle= {{color:"rgba(0,0,0,0.9)"}}
  contentStyle= {{background: "hsla(220, 3%, 81%, 0.88)", border: "none", borderRadius: "0.5rem", }}
  cursor={{ stroke: 'var(--n64-dark-gray-clr)' ,fill: "rgba(0,0,0,0.15"}}
  
  />





  <Bar dataKey={y_key}  barSize = {40} fill="var(--n64-a-clr)"  stroke='var(--n64-gray-clr)' activeBar={{ stroke: 'var(--text-clr)', strokeWidth: 1}}>


      {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
            
          ))}
  </Bar>
     
  

</BarChart>
            
        </div>
    )






}