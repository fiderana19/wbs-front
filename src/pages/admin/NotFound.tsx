import { Link } from 'react-router-dom';
import WbsLogo from '../../assets/image/wbs-logo.png'
import { useState } from 'react';

function NotFound() {
    const [isLoginSlide, setIsLoginSlide] = useState<boolean>(true);
    
    return(
        <div className={isLoginSlide ? 'h-screen flex overflow-hidden relative max-w-screen' : 'h-screen flex overflow-hidden relative max-w-screen' }>
            {/* <div className=' h-screen flex flex-col justify-center'>
                <div className='w-80 mx-auto'>
                    <div className='text-center'>
                        <img src={WbsLogo} className='h-36 w-36 object-cover mx-auto' alt="Logo du ministere" />
                        <div className='text-lg font-latobold'>WBS: Gestion de caisse</div>
                    </div>
                    <div className='text-xl font-latobold my-4 text-center'>Erreur 404 : Page introuvable !</div>
                    <Link to="/admin/page">
                        <div className='text-center text-blue-500 underline'>Accueil</div>
                    </Link>
                </div>
            </div> */}
             <div className={isLoginSlide ? "w-1/2 bg-primary flex flex-col justify-center h-full absolute top-0 z-50 transition-all duration-500" : "w-1/2 bg-primary flex flex-col justify-center h-full absolute top-0 animate-wrapper translate-x-full transition-all duration-500 z-10" }>
                login
            </div>
            <div className={isLoginSlide ? "w-1/2 bg-gray-500 flex flex-col justify-center absolute top-0 right-0 h-full z-10 -translate-x-full transition-all duration-500 animate-wrapper" : "w-1/2 bg-gray-500 flex flex-col justify-center absolute top-0 h-full right-0 z-50 transition-all duration-500 animate-wrapper" }>
                signup
            </div>
            <div className="w-full absolute bg-red-500 h-full flex justify-between">
                <div className='w-1/2'>
                    <div className={isLoginSlide ? "hidden" : "block" }>
                        <button onClick={() => setIsLoginSlide(true)}>teto</button>
                        left                        
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className={isLoginSlide ? "block" : "hidden" }>
                        <button onClick={() => setIsLoginSlide(false)}>eto</button>
                        right
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;