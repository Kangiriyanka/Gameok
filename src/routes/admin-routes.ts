import AdminEditGame from '../admin_components/AdminEditGame.tsx';
import AdminAddGame from '../admin_components/AdminAddGame.tsx';
import AdminAddConsole from '../admin_components/AdminAddConsole.tsx';
import AdminRoute from '../general/AdminRoute.tsx';
import { allConsolesLoader } from '../loaders/allConsolesLoader.ts';


export const adminRoutes = [
  
  {
    path: "/admin",
    Component: AdminRoute,
    children: [
      {
        path: "add-consoles",
        Component: AdminAddConsole,
  
      },
      {
        path: "add-games",
        Component: AdminAddGame,
        loader: allConsolesLoader
      },
      {
        path: "game/edit/:game_id/:series/:title/:year",
        Component: AdminEditGame
      }
    ]
  }
];