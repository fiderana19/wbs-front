import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { FunctionComponent } from "react";

const ToggleTheme: FunctionComponent = () => {
    return (
        <div className="border rounded-full w-14 p-1.5 flex justify-around relative">
            <MoonOutlined />
            <SunOutlined />
            <div className="h-7 w-7 bg-gray-500 absolute top-0 left-0 rounded-full"></div>
        </div>
    )
}

export default ToggleTheme;




