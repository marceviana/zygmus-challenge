import React from 'react'
import { Button, TextField } from "@material-ui/core";
import SharedContext from '../context';

const LoginForm = (props) => {

    const [userData, setUserData] = React.useState({ name: '', email: '' })

    const handleChange = e => {
        setUserData({ ...userData, [e.currentTarget.id]: e.currentTarget.value });
    }

    return (
        <SharedContext.Consumer>
            {({ setUser }) => (
                <form className="form" onSubmit={e=>{
                    e.preventDefault()
                    setUser(userData)
                }}>
                    <TextField
                        fullWidth
                        label="name"
                        id="name"
                        onChange={handleChange}
                        type="text"
                    />
                    <TextField
                        fullWidth
                        label="email"
                        id="email"
                        onChange={handleChange}
                        type="email"
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Log in
                    </Button>
                </form>
            )}
        </SharedContext.Consumer>
    )
}

export default LoginForm