
import {Bar, BarChart, CartesianGrid, Cell, Label, Legend, Pie, PieChart, Sector, Tooltip, XAxis, YAxis} from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import {COLOURS} from "./colours"

type GameGraphData = {
    yearBracket: string;
    count: number;

}

type GraphProps = {
  width: number;
  height: number;
  data: GameGraphData[]
  data_key: string
  name_key: string
};



const renderActiveShape = ({
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
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;

// Midangle in Recharts follows the math convention.
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));

  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
//  + 10 is the offset you add to the point from the sector
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
// For the horizontal line
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;

// SVG System, see the half circle vertically as opposed to horizontally. (Turn paper left 90 degrees)

  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  // Custom Shape for the Pie.

  return (

    
    // A party of SVGs
    // CX and CY are 50% of the width and height in this case. 
    <g>

      <text x={cx} y={cy} dy={8} fontSize={20} textAnchor="middle" fill={fill}>
        {payload.years}  
   
        
        
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

      {/* This is the sector that follows the main one */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 10}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
   
        
        
        
      />


      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fontWeight={"bold"} fill="var(--text-clr)">{`Games: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {` ${((percent ?? 1) * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};




export default function PieChartGraph({data, width, height, name_key, data_key}: GraphProps) {

  


    return (

        
        <div className= "shadow-[var(--double-shadow)] rounded-lg border border-[var(--n64-gray-clr)] w-fit relative " >
           <PieChart width={width} height={height}  data={data} margin={{
            top: 0,
            right: 5,
            left: 0,
            bottom: 0,
          }}>

            <Pie 
              activeShape={renderActiveShape}
              stroke= "var(--n64-gray-clr)"
              strokeWidth= {1}
            data={data} dataKey={data_key} nameKey={name_key} cx="45%" cy="50%" outerRadius={140} innerRadius={100}  paddingAngle={5}  >
            
                  {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
          
        ))}
            
            
            <Legend wrapperStyle= {{top: 50, left: 10, padding: 10}} layout="vertical" verticalAlign="top" align="left"/>
       

            </Pie>
            




          </PieChart>
            
        </div>
    )






}