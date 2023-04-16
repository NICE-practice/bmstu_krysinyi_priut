import Auth from "./pages/Auth";
import Pets from "./pages/Pets";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Operator from "./pages/Operator";
import ContentManager from "./pages/ContentManager";

export const authRoutes = [
  {
    path: "/operator",
    Component: Operator,
  },
  {
    path: "/contentmanager",
    Component: ContentManager,
  },
];

export const publicRoutes = [
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/pets",
    Component: Pets,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/home",
    Component: Home,
  },
];
