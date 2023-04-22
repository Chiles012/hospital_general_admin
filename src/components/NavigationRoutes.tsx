import { useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { routes, login } from "../utils/routes"
import { useEffect } from "react";
import Layout from "./Layout";


const NavigationRoutes = () => {

    const { user } = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    return (
        <>
            {
                !user ? (
                    <Layout>
                        <Routes>
                            {
                                routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={<route.component/>} />
                                ))
                            }
                        </Routes>
                    </Layout>
                ) : (
                    <Layout>
                        <Routes>
                            {
                                routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={<route.component/>} />
                                ))
                            }
                        </Routes>
                    </Layout>
                )
            }
        </>
    )

}

export default NavigationRoutes