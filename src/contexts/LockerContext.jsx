import React, { useState } from 'react';



const LockerContext = React.createContext();
const {Provider, Consumer} = LockerContext;

function LockerProvider({children}) {

    let [locker, setLocker] = useState(null);

    return (
        <Provider value={{locker, setLocker}}>{children}</Provider>
    )
}

export {LockerProvider, Consumer, LockerContext}