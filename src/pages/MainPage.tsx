import React, { lazy, Suspense, useState } from "react";
import WbsLogo from "../assets/image/wbs-logo.png";
import { LoadingOutlined } from "@ant-design/icons";
import { useDark } from "../context/DarkThemeContext";
import { Button } from "@/components/ui/button";
const Login = lazy(() => import("../components/homepage/Login"));
const Signup = lazy(() => import("../components/homepage/Signup"));
const ToggleTheme = lazy(() => import("../components/ToggleTheme"));

const MainPage: React.FC = () => {
  const { isDark } = useDark();
  const [isLoginSlide, setIsLoginSlide] = useState<boolean>(true);

  return (
    <div className={`h-screen flex overflow-hidden relative max-w-screen`}>
      <div
        className={`w-1/2 bg-primary-custom h-full absolute top-0  transition-all duration-500 z-10 animate-wrapper ${isLoginSlide ? "z-50" : " translate-x-full z-10"}`}
      >
        <img
          src={WbsLogo}
          alt="Logo"
          className="h-14 object-cover absolute top-5 left-5"
        />
        <div className="flex flex-col justify-center h-full">
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <Login />
          </Suspense>
        </div>
      </div>
      <div
        className={`w-1/2 bg-primary-custom h-full absolute top-0 right-0 transition-all duration-500 animate-wrapper ${isLoginSlide ? "z-10 -translate-x-full" : "z-50"}`}
      >
        <img
          src={WbsLogo}
          alt="Logo"
          className="h-14 object-cover absolute top-5 left-5"
        />
        <div className="flex flex-col justify-center h-full">
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <Signup />
          </Suspense>
        </div>
      </div>
      <div
        className={`w-full absolute h-screen flex justify-between ${isDark ? "dark-container" : ""}`}
      >
        <div className="w-1/2 flex flex-col justify-center relative p-6">
          <div className={isLoginSlide ? "hidden" : "block"}>
            <div className="absolute h-12 object-cover top-5 right-5 flex gap-4 items-center">
              <div>Déjà eu un compte ?</div>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setIsLoginSlide(true)}
                className="transition-all font-latobold my-1 rounded-full"
              >
                Se connecter
              </Button>
            </div>
            <div className="absolute top-5 left-5">
              <Suspense
                fallback={
                  <div className="text-xl">
                    <LoadingOutlined />
                  </div>
                }
              >
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
        <div className="w-1/2 flex flex-col justify-center relative p-5">
          <div className={isLoginSlide ? "block" : "hidden"}>
            <div className="absolute h-12 object-cover top-5 right-5 flex gap-4 items-center">
              <div>Pas encore de compte ?</div>
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setIsLoginSlide(false)}
                className="transition-all font-latobold my-1 rounded-full"
              >
                S'inscrire
              </Button>
            </div>
            <div className="absolute top-5 left-5">
              <Suspense
                fallback={
                  <div className="text-xl">
                    <LoadingOutlined />
                  </div>
                }
              >
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
  );
};

export default MainPage;
