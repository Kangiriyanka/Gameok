
import {Link} from "react-router-dom"
import {motion} from "motion/react"
import { buttonVariants } from "../assets/scripts/animations"

type EmptyCollectionProps = {
    message: string
}

export default function EmptyCollection({message}: EmptyCollectionProps) {

    return (

    <div className= "">
     <div className= " flex gap-2 items-center">
    <p className="text-xl">{message}</p>
    <Link to="/dashboard/games/add-games/">
        <motion.button 
        variants = {buttonVariants}
        whileHover = "animate"
        
        className= "bg-[var(--n64-gray-clr)] text-center w-34 h-10 rounded-lg ">Add Games  🎮 </motion.button>
    </Link>
    </div>
    </div>

)





}