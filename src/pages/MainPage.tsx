import React, { lazy, Suspense, useState } from "react";
import WbsLogo from '../assets/image/wbs-logo.png';
import { LoadingOutlined } from "@ant-design/icons";
import { useDark } from "../context/DarkThemeContext";
const Login = lazy(() => import("../components/homepage/Login"));
const Signup = lazy(() => import('../components/homepage/Signup'));
const ToggleTheme = lazy(() => import('../components/ToggleTheme'))

const MainPage: React.FC = () => {
    const { isDark } = useDark();
    const [isLoginSlide, setIsLoginSlide] = useState<boolean>(true);

    return (
        <div className={isLoginSlide ? 'h-screen flex overflow-hidden relative max-w-screen' : 'h-screen flex overflow-hidden relative max-w-screen' }>
            <div className={isLoginSlide ? "w-1/2 bg-primary h-full absolute top-0 z-50 transition-all duration-500" : "w-1/2 bg-primary h-full absolute top-0 animate-wrapper translate-x-full transition-all duration-500 z-10" }>
               <img src={WbsLogo} alt="Logo" className="h-14 object-cover absolute top-5 left-5" />
               <div className="flex flex-col justify-center h-full">
                    <Suspense fallback={<div className='text-center my-10'>
                        <LoadingOutlined className='text-5xl' />
                    </div>}
                    >
                        <Login />                    
                    </Suspense>
               </div>
            </div>
            <div className={isLoginSlide ? "w-1/2 bg-primary absolute h-full top-0 right-0 z-10 -translate-x-full transition-all duration-500 animate-wrapper" : "w-1/2 bg-primary h-full absolute top-0 right-0 z-50 transition-all duration-500 animate-wrapper" }>
                <img src={WbsLogo} alt="Logo" className="h-14 object-cover absolute top-5 left-5" />
                <div className="flex flex-col justify-center h-full">
                    <Suspense fallback={<div className='text-center my-10'>
                        <LoadingOutlined className='text-5xl' />
                    </div>}
                    >
                        <Signup />
                    </Suspense>
                </div>
            </div>
            <div className={isDark ? "w-full absolute h-screen flex justify-between dark-container" : "w-full absolute h-screen flex justify-between"}>
                <div className='w-1/2 flex flex-col justify-center relative p-5'>
                    <div className={isLoginSlide ? "hidden" : "block" }>
                            <div className="absolute h-12 object-cover top-5 right-5 flex gap-4 items-center">
                                <div>Déjà eu un compte ?</div>
                                <button  onClick={() => setIsLoginSlide(true)} className="border hover:shadow-lg transition-all font-latobold py-1.5 px-2.5 my-1 rounded-full">Se connecter</button>
                            </div>
                            <div className="absolute top-5 left-5">
                                <Suspense fallback={
                                    <div className="text-xl"><LoadingOutlined /></div>
                                }>
                                    <ToggleTheme />
                                </Suspense>
                            </div>
                            <div className="text-5xl">
                                Bienvenue sur <span className="font-latobold">WBS-Caisse</span>
                            </div>
                            <div className="mt-4 text-xl">
                                Application pour la gestion de caisse
                            </div>                   
                    </div>
                </div>
                <div className='w-1/2 flex flex-col justify-center relative p-5'>
                    <div className={isLoginSlide ? "block" : "hidden" }>
                            <div className="absolute h-12 object-cover top-5 right-5 flex gap-4 items-center">
                                <div>Pas encore de compte ?</div>
                                <button  onClick={() => setIsLoginSlide(false)} className="border hover:shadow-lg transition-all font-latobold py-1.5 px-2.5 my-1 rounded-full">S'inscrire</button>
                            </div>
                            <div className="absolute top-5 left-5">
                                <Suspense fallback={
                                    <div className="text-xl"><LoadingOutlined /></div>
                                }>
                                    <ToggleTheme />
                                </Suspense>
                            </div>
                            <div className="text-5xl">
                                Bienvenue sur <span className="font-latobold">WBS-Caisse</span>
                            </div>
                            <div className="mt-4 text-xl">
                                Application pour la gestion de caisse
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;