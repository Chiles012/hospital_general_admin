import { Route, Routes, useNavigate } from "react-router-dom"
import { routes, login } from "../utils/routes"
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const NavigationRoutes = () => {

    const { user } = useSelector((state: any) => state.user);
    const navigation = useNavigate()

    useEffect(() => {
        console.log(user)
        if(user === null) {
            navigation('/login')
        }
    }, [user])

    return (
        <>
            {
                user !== null ?
                <Layout>
                    <Routes>
                        {
                            routes.map((route, index) => (
                                <Route key={index} path={route.path} element={<route.component/>} />
                            ))
                        }
                    </Routes>
                </Layout>
                : 
                <Routes>
                    {
                        <Route path={login.path} element={<login.component/>} />
                    }
                </Routes>
            }
        </>
    )

}

export default NavigationRoutes