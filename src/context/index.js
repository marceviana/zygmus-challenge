import React from 'react'

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {
    name: '',
    email: ''
}

export const defaultContext = {
    title: "AutoFi Challenge",
    version: "1.0.0",
    released: new Date().toISOString(),
    copyright: "Marcelo Viana",
    user: userData,
    setUser: ()=>{}
}

const SharedContext = React.createContext(defaultContext)

export default SharedContext