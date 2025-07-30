
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
import { statsLoader } from '@/loaders/statsLoader.ts';
import ProtectedRoute from '@/general/ProtectedRoute.tsx';
import RootLayout from '../general/RootLayout.tsx';
import { adminLoader } from '@/loaders/adminloader.ts';

export  const protectedRoutes = [
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        
        Component: RootLayout,
        loader: adminLoader,
        children: [
          {
            path: "home",  
            Component: Home,
            loader: statsLoader,
            ErrorBoundary: ErrorBoundary,
          },
          {
            path: "consoles",
            Component: Consoles,
            loader: consolesLoader,
            ErrorBoundary : ErrorBoundary,
          },
          {
            path: "edit-password",
            Component: EditPassword
          },
          {
            path: "games",
            Component: GameLayout,
            children: [
              {
                path: "my-games",
                Component: Games,
                loader: collectionLoader,
                ErrorBoundary : ErrorBoundary,
              },
              {
                path: "add-games",
                Component: UserAddGame, 
                loader: gamesLoader,
                ErrorBoundary : ErrorBoundary,
              },
              {
                path: ":id/:title",
                Component: GameMemory
                
              },
              {
                path: "edit-memory/:id/:title",
                Component: EditMemories
              }
            ]
          },
        ]
      },
    ]
  }
];