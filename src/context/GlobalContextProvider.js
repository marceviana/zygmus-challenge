import React from 'react'
import SharedContext, { defaultContext } from './index';

const GlobalContextProvider = ({ children }) => {

    const [context, setContext] = React.useState(defaultContext)

    const setUser = (user) =>{
        localStorage.setItem("userData",JSON.stringify(user))
        setContext({ ...context, user })
    }
    
    React.useEffect(()=>{
        setContext({ ...context, setUser })
    }, [])
    
    return (
        <SharedContext.Provider value={context}>
            {children}
        </SharedContext.Provider>
    )
}

export default GlobalContextProvider