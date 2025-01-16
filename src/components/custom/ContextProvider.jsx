import auth from "@/src/config/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null)

const ContextProvider = ({children}) => {

 const [loading,setLoading]=useState(true)
 const [user, setUser] = useState([]);
 const [isActive, setIsActive] = useState(() => localStorage.getItem('activePage') || 'home')

 
const createUser=(email,password)=>{
    setLoading(true) 
  return  createUserWithEmailAndPassword(auth, email, password)
}

const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const loginWithGoogle = () => {
    setLoading(true) 
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)

} 

 // signout user 

 const signOutUser = () => {
    return signOut(auth)

}


    //  update password 

    const updatePass = (email) => {

        return sendPasswordResetEmail(auth, email)

    }

    
    // update profile  

    const profileUpdate = (profileInfo) => {
        return updateProfile(user, profileInfo)

    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)   
        })
        return unsubscribe
    }, [])
    
    useEffect(() => {
        localStorage.setItem('activePage', isActive);
    }, [isActive]);

    const info={user,createUser,loginUser,loading, loginWithGoogle,signOutUser, updatePass, profileUpdate ,isActive,setIsActive}
    return (
        <AuthContext.Provider value={info}>
            {children}            
        </AuthContext.Provider>
    );
};

export default ContextProvider;