import { createContext,useState } from "react";

const AppContext = createContext();

const FacepalContext = ({children}) => {
    const [ip,setIp] = useState('192.168.1.1');
    const [signedIn,setSignedIn] = useState(false);

    return (
        <AppContext.Provider value={{ip,setIp,signedIn,setSignedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,FacepalContext }