const LoginPage: React.FC = () => {
    return <div className="h-screen">
        <div className="flex h-full">
            <div className="w-2/3 bg-red-400">
                niujnv
            </div>
            <div className="w-1/3 bg-primary">
                <div>CONNEXION</div>
                <div className="w-full">
                    <div className="mx-auto">
                        <div className="text-xs">Identifiant</div>
                        <input type="text" name="usrid" className="w-60 py-0.5 px-2 rounded bg-transparent border border-gray-500" />
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default LoginPage;