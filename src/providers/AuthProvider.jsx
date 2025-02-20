import { createContext, useEffect, useState } from 'react'
import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

import auth from '../firebase/firebase.init';
import useAxiosPublic from '../hooks/useAxiosPublic';
const googleProvider = new GoogleAuthProvider();


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const axiosPublic = useAxiosPublic;



    const logoutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const checkAuth = () => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        return isAuthenticated;
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // setIsAuthenticated(true);
                const userInfo = {
                    email: currentUser.email,
                }
                axiosPublic.post('/jwt', userInfo).then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
                //get token and store token
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        })

        return () => unsubscribe();
    }, [axiosPublic])



    const authInfo = {
        user,
        loading,
        logoutUser,
        googleSignIn,
        checkAuth
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
