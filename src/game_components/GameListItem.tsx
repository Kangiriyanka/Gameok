
import {Link} from "react-router-dom"
type GameProps = {
    game_id: number;
    game_series: string;
    game_year: string;
    game_title: string;
 

}



export default function GameListItem({game_id,game_series, game_year, game_title}: GameProps) {

    return (
    <li >

        <Link to={`/dashboard/games/${game_id}/${game_title}`}> 
        {game_title} {game_series}  {game_year}
        </Link>

    </li>
);


}