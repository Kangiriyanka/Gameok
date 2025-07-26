
import { useAuthContext } from "../context/AuthContext";
import { useLoaderData, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { pageTransition } from "@/assets/scripts/animations";

export default function Home() {
  const { storedUserInfo } = useAuthContext();
  const stats = useLoaderData();
  const location = useLocation()

  return (

   
    
    <motion.div 
    key = {location.pathname}
    variants= {pageTransition}
    initial="initial"
    animate= "animate"
    exit="exit"
    className="flex flex-col"
    
    
    >
      <div className="page-header">
        <h1>{storedUserInfo}'s Memories</h1>

        <div className=" flex gap-10 stats-container w-[50%]">
         <div className="bg-[var(--n64-dark-gray-clr)] rounded-[0.5rem] border-2 border-[var(--n64-gray-clr)] p-4 relative top-8 game-stats p-10 w-[50%] h-fit">
          <div className="flex flex-col justify-center  text-center">
            <span className="text-2xl text-[var(--n64-b-clr)]  font-medium ">Consoles</span>
            <span className="text-xl ">{stats[1]}</span>
          </div>
        </div>
        <div className="bg-[var(--n64-dark-gray-clr)] rounded-[0.5rem] border-2 border-[var(--n64-gray-clr)] p-4 relative top-8 game-stats p-10 w-[50%]">
          <div className="flex flex-col justify-center text-center">
            <span className="text-2xl text-[var(--n64-a-clr)] font-medium m ">Games</span>
            <span className="text-xl">{stats[0]}</span>
          </div>
        </div>

        </div>
      </div>
    </motion.div>

   
   
  );
}