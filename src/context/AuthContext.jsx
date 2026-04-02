import { createContext, useState, useEffect, useContext } from 'react';
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (savedUser && token) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("User data parsing error:", error);
            }
        }
        setLoading(false);
    }, []);

    const registerUser = async (userData) => {
        try {
            const response = await api.post('register/', userData);

            if (userData.username && userData.password) {
                await login(userData.username, userData.password);
            }

            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const login = async (username, password) => {
        try {
            const response = await api.post('login/', { username, password });
            const { token } = response.data;

            localStorage.setItem('token', token);

            let userDataObj = { username };

            try {
                const profileResponse = await api.get('profile/');

                const profileData = Array.isArray(profileResponse.data)
                    ? profileResponse.data[0]
                    : profileResponse.data;

                userDataObj = { ...userDataObj, ...profileData };
            } catch (profileError) {
                console.warn("Failed to load profile details, using only username", profileError);
            }

            localStorage.setItem('user', JSON.stringify(userDataObj));
            setUser(userDataObj);

            return true;
        } catch (error) {
            console.error("Login error:", error);
            throw new Error('Invalid username or password');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            registerUser,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);