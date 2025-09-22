import { Link } from "react-router-dom";
import WbsLogo from "../assets/image/wbs-logo.png";

function Unauthorized() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center">
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
            Erreur 403 : Page non autorisé !
          </div>
          <Link to="/admin/page">
            <div className="text-center text-blue-500 underline">Accueil</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Unauthorized;
