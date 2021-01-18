import React, { useState } from 'react';



const UserContext = React.createContext();
const {Provider, Consumer} = UserContext;

function UserProvider({children}) {

    let [user, setUser] = useState(null);

    return (
        <Provider value={{user,setUser}}>{children}</Provider>
    )
}

export {UserProvider, Consumer, UserContext}






