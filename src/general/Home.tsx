
// import GameGraph from "@/graph_components/GameGraph";
import YearsBarChart from "@/graph_components/YearsBarChart";

import { useAuthContext } from "../context/AuthContext";
import { Link, useLoaderData } from "react-router";
import PieChartGraph from "@/graph_components/PieChartGraph";
import "../assets/styles/home.css"
import SeriesBarChart from "@/graph_components/SeriesBarChart";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { containerVariants, pageTransition } from "@/assets/scripts/animations";
import SeriesPieChart from "@/graph_components/SeriesPieChart";
import ConsolesPieChart from "@/graph_components/ConsolesPieChart";
import EmptyCollection from "./EmptyCollection";

export default function Home() {
  const { storedUserInfo } = useAuthContext();
  const stats = useLoaderData();


  const [toggleYear, setToggleYear] = useState(true)
  const [toggleSeries, setToggleSeries] = useState(false)
  const [toggleConsoles, setToggleConsoles] = useState(false)
  
  const WIDTH = 720
  const HEIGHT= 400

  function toggleData(type: string) {

    if (type === "year") {
       setToggleSeries(false)
       setToggleYear(true)
       setToggleConsoles(false)
    }

     if (type === "series") {
       setToggleSeries(true)
       setToggleYear(false)
       setToggleConsoles(false)
    }

    if (type === "consoles") {
       setToggleSeries(false)
       setToggleYear(false)
       setToggleConsoles(true)
    }

    
  }

  return (



   
   <div className="home-container">
    
    

        <h1>{storedUserInfo}'s Collection</h1>

        <h2> Consoles and Games </h2>
        <div className=" flex gap-4 stats-container   ">
        
        <Link to="/dashboard/consoles" >
         <motion.button  
         whileHover={{ scale: 1.10}}
         whileTap={{ scale: 0.95 }}
         className=" shadow-[var(--double-shadow)]  rounded-[0.5rem] border-1 border-[var(--n64-gray-clr)]  stats ">
          <div className="flex  gap-1 ">
            <span className="text-xl text-[var(--n64-b-clr)]  font-medium ">Consoles: </span>
            <span className="text-xl ">{stats[4]}</span>
          </div>
        </motion.button>
        </Link>

          <Link to="/dashboard/games/my-games" >
        <motion.button  

               whileHover={{ scale: 1.10}}
         whileTap={{ scale: 0.95 }}
        
        className=" shadow-[var(--double-shadow)] rounded-[0.5rem] border-1 border-[var(--n64-gray-clr)]  stats ">
          <div className="flex gap-1">
            <span className="text-xl text-[var(--n64-a-clr)] font-medium m ">Games: </span>
            <span className="text-xl  ">{stats[0]}</span>
          </div>
        </motion.button>
        </Link>

        </div>

       
        <div className="graph-options flex-col  w-[100%]   ">
      
        <h2 className=""> Graph Options </h2>

      
        
        <div className="btn-container">
        <motion.button 
        onClick ={() => toggleData("year")} 
        className={`toggle-button ${toggleYear ? "active-button" : ""}`}
        whileHover={{ scale: 1.10}}
        whileTap={{ scale: 0.95 }}
        > Year Data
  
       
        </motion.button>
         <motion.button 
          whileHover={{ scale: 1.10}}
         whileTap={{ scale: 0.95 }}
         onClick ={() => toggleData("series")} 
         className={`toggle-button ${toggleSeries? "active-button" : ""}`}
         > Series Data

         </motion.button>

            <motion.button 
          whileHover={{ scale: 1.10}}
         whileTap={{ scale: 0.95 }}
         onClick ={() => toggleData("consoles")} 
         className={`toggle-button ${toggleConsoles ? "active-button" : ""}`}> Consoles Data

         </motion.button>
         </div>

         

        </div>
   

          {stats[1] && stats[1].length > 0 ? (
          <AnimatePresence mode="wait">
            
          {toggleYear &&
          <motion.div key="year-charts" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <h2> Game count per year bracket </h2>
                 <div className="recharts-container   ">
                  
          <YearsBarChart width={WIDTH} height= {HEIGHT} data = {stats[2]} x_key="years" y_key= "games" />
          <PieChartGraph width={WIDTH} height= {HEIGHT} data = {stats[2]} name_key="years" data_key="games"/>

          </div>
          </motion.div>
          } 

            {toggleSeries &&
                <motion.div key="series-charts" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <h2> Top 5 Series </h2>
                      <div className="recharts-container   ">
                <SeriesBarChart width={WIDTH} height= {HEIGHT} data = {stats[3]} x_key="series" y_key= "games" />
                <SeriesPieChart width={WIDTH} height= {HEIGHT} data = {stats[3]} name_key="series" data_key="games"/>

                </div>
                </motion.div>
          
          } 

              {toggleConsoles &&
                <motion.div key="consoles-charts" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                    <h2> Top 5 Consoles </h2>
                      <div className="recharts-container   ">
                <SeriesBarChart width={WIDTH} height= {HEIGHT} data = {stats[1]} x_key="console" y_key= "games" />
                <ConsolesPieChart width={WIDTH} height= {HEIGHT} data = {stats[1]} name_key="console" data_key="games"/>

                </div>
                </motion.div>
          
          } 
          </AnimatePresence>
          ) : <EmptyCollection message="Graph data will appear once you"  />}
        </div>



 
      




   


   
   
  );
}