import { createContext, useContext } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState(null);
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = ()=>{
    const auth = useContext(AuthContext);
    if(!auth){
        console.log("Auth not found")
        return
    }
    return auth;
}