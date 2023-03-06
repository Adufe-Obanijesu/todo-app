import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "../firebase/index";

export const UserContext = React.createContext();

const User = ({children}) => {

    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(false);

    const auth = getAuth();
    useEffect(() => {
        setLoading(true);
        const unsub = onAuthStateChanged(auth, user => {
            setLoading(false);
            setUser(user);
        })
        return () => {
            unsub();
        }
    }, [auth]);


    return (
        <UserContext.Provider value={{user, loadingUser: loading}}>
            {children}
        </UserContext.Provider>
    )
}

export default User;