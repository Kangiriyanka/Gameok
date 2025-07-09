import ProtectedRoute from '../general/ProtectedRoute.tsx';
import Consoles from '../console_components/Consoles.tsx';
import Home from '../general/Home.tsx';
import EditPassword from '../user_components/EditPassword.tsx';
import Games from '../game_components/Games.tsx';
import UserAddGame from '../game_components/UserAddGame.tsx';
import GameMemory from '../game_components/GameMemory.tsx';
import EditMemories from '../game_components/EditMemories.tsx';
import {consolesLoader} from '../loaders/consolesLoader.ts';
import {gamesLoader} from '../loaders/gamesLoader.ts';
import { collectionLoader } from '../loaders/collectionLoader.ts';



export const protectedRoutes = [
    
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    loader: consolesLoader,
    children: [
      {
        index: true,  
        Component: Home
      },
      {
        path: "consoles",
        Component: Consoles,
      },
      {
        path: "edit_password",
        Component: EditPassword
      },
     
      {
        path: "games",
        Component: Games,
        loader: collectionLoader,
        children: [
            { path: "add_game",
             Component: UserAddGame, 
             loader: gamesLoader,
            },
            
          {
            path: ":game_id/:title",
            Component: GameMemory
          },
          {
            path: "edit_memory/:game_id/:title",
            Component: EditMemories
          }
        ]
      },
    ]
  }
];