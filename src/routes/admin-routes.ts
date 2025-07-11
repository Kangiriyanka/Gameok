import AdminEditGame from '../admin_components/AdminEditGame.tsx';
import AdminAddGame from '../admin_components/AdminAddGame.tsx';
import AdminAddConsole from '../admin_components/AdminAddConsole.tsx';
import AdminRoute from '../general/AdminRoute.tsx';


export const adminRoutes = [
  {
    path: "/admin",
    Component: AdminRoute,
    children: [
      {
        path: "add_consoles",
        Component: AdminAddConsole
      },
      {
        path: "add_games",
        Component: AdminAddGame
      },
      {
        path: "game/edit/:game_id/:series/:title/:year",
        Component: AdminEditGame
      }
    ]
  }
];