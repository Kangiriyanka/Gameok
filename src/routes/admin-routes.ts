import EditGame from '../game_components/EditGame.tsx';
import AddGame from '../admin_components/AdminAddGame.tsx';
import AddConsole from '../console_components/AddConsole.tsx';
import AdminRoute from '../general/AdminRoute.tsx';


export const adminRoutes = [
  {
    path: "/admin",
    Component: AdminRoute,
    children: [
      {
        path: "add_consoles",
        Component: AddConsole
      },
      {
        path: "add_games",
        Component: AddGame
      },
      {
        path: "game/edit/:game_id/:series/:title/:year",
        Component: EditGame
      }
    ]
  }
];