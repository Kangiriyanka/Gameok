import Root from '../general/Root.tsx';
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
import GameLayout from '../game_components/GameLayout.tsx';
import  ErrorBoundary  from '../general/ErrorBoundary.tsx';


export  const protectedRoutes = [
    
  {
    path: "/dashboard",
    Component: Root,
    loader: consolesLoader,
    ErrorBoundary : {ErrorBoundary},
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
        path: "edit-password",
        Component: EditPassword
      },

   

    
     
      {
        path: "games",
        Component: GameLayout,
        loader: collectionLoader,
        children: [

           {path: "my-games",
            Component: Games,
           },

          
              { path: "add-games",
             Component: UserAddGame, 
             loader: gamesLoader,
            },
          
            
          {
            path: ":game-id/:title",
            Component: GameMemory
          },
          {
            path: "edit-memory/:game-id/:title",
            Component: EditMemories
          }
        ]
      },
    ]
  }
];