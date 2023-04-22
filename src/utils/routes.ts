import { Login, Home } from "../pages";
import { route } from "../types/route";

export const login: route = {
    path: "/login",
    component: Login,
    exact: true
}

export const routes: route[] = [
    {
        path: "/especialidades",
        component: Home,
        exact: true
    },
    {
        path: "/",
        component: Home,
        exact: true
    }
]

export const navigation: route[] = [
    {
        path: "/especialidades",
        component: Home,
        icon: "fa fa-user-md"
    }
]