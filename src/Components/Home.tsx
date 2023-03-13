import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './Common/NavBar';

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        window.location.reload();
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            setLoggedIn(true);
            setEmail(sessionStorage.getItem('Email') as string)
            setVerified(sessionStorage.getItem("Verified") as string)
        }

        if (!authToken) {
            setLoggedIn(false);
        }
    }, [])
    return (
        <div>
            {loggedIn ? (<NavBar name={"Logout"} action={handleLogout}/>)
        :<NavBar name={"Login"} action={handleLogin}/>    
        }
            Welcome {email}
            
        <p>{verified}</p>
        </div>
    )
}