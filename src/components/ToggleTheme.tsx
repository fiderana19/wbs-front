import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { FunctionComponent } from "react";
import { useDark } from "../context/DarkThemeContext";

const ToggleTheme: FunctionComponent = () => {
    const { isDark, toggleTheme } = useDark();

    function handleToggle () {
        toggleTheme();
    }

    return (
        <div onClick={handleToggle} className="border cursor-pointer rounded-full w-14 p-1.5 flex justify-around relative">
            <SunOutlined />
            <MoonOutlined />
            <div className={isDark ? "duration-500 transition-all h-7 w-7 bg-gray-500 absolute top-0 right-0 rounded-full" : "duration-500 h-7 w-7 bg-gray-500 absolute top-0 left-0 rounded-full"} ></div>
        </div>
    )
}

export default ToggleTheme;