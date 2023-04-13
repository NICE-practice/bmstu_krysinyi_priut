import Auth from "./pages/Auth"
import Pets from "./pages/Pets"
import Contact from "./pages/Contact"
import Home from "./pages/Home"



export const publicRoutes = [
    {
        path: '/auth',
        Component: Auth
    },
    {
        path: '/cats',
        Component: Pets
    },
    {
        path: '/contact',
        Component: Contact
    },
    {
        path: '/home',
        Component: Home
    }


]