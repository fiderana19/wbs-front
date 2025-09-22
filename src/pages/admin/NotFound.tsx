import { Link } from "react-router-dom";
import WbsLogo from "../../assets/image/wbs-logo.png";
import { useDark } from "../../context/DarkThemeContext";

function NotFound() {
  const { isDark } = useDark();

  return (
    <div
      className={`h-screen flex flex-col justify-center ${isDark ? "dark-container" : " "}`}
    >
      <div className="w-80 mx-auto">
        <div className="text-center">
          <img
            src={WbsLogo}
            className="h-36 w-36 object-cover mx-auto"
            alt="Logo du ministere"
          />
          <div className="text-lg font-latobold">WBS: Gestion de caisse</div>
        </div>
        <div className="text-xl font-latobold my-4 text-center">
          Erreur 404 : Page introuvable !
        </div>
        <Link to="/admin/page">
          <div className="text-center text-blue-500 underline">Accueil</div>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
