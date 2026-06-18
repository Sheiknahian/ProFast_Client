import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import { auth } from './Firebase/firebase.config';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const registerWithEmail = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const registerWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
                    .then(res=>{
                        const user = {
                            email: res.user.email,
                            name: res.user.displayName,
                            imgURL: res.user.photoURL
                        }
                        axios.post('https://profast-server-36l8.onrender.com/users', user)
                    })
    }
    const logout = () =>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser)
                setLoading(false)
            })
        return ()=> unsubscribe()
    }, [])

    const updatedProfile = (updated) => {
        return updateProfile(auth.currentUser, updated)
    }

    const handleLoginVerify = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const forgetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    const authInfo = {
        registerWithEmail,
        registerWithGoogle,
        logout,
        updatedProfile,
        handleLoginVerify,
        forgetPass,
        user,
        loading,
    }
    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;