// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig"; // Ensure this points to your Firebase config file
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Import necessary auth functions

const AuthContext = createContext();

// List of predefined admin emails
const ADMIN_EMAILS = [
    "admin@example.com",
    // Add other authorized admin emails here
];

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check user login state and set admin role if email is in ADMIN_EMAILS
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            // Assign admin status if user's email is in ADMIN_EMAILS
            setIsAdmin(user ? ADMIN_EMAILS.includes(user.email) : false);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setCurrentUser(user);
            setIsAdmin(ADMIN_EMAILS.includes(user.email)); // Set admin status on login
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const value = {
        currentUser,
        isAdmin,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : null}
        </AuthContext.Provider>
    );
};
