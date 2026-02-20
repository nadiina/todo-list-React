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
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const registerUser = async (userData) => {
        try {

            const response = await api.post('register/', userData);

            /* const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            */

            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        if (email === 'admin@example.com' && password === '123456') {
            const fakeUser = {
                id: 1,
                username: 'Nadiia',
                email: 'admin@example.com',
                first_name: 'Надія',
                gender: 'Жіноча',
                birth_date: '2000-08-15'
            };
            setUser(fakeUser);
            localStorage.setItem('user', JSON.stringify(fakeUser));
            localStorage.setItem('token', 'fake-token-123');
            return true;
        }

        /*
        try {
            const response = await api.post('login/', { username: email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return true;
        } catch (error) {
            throw new Error('Невірний логін або пароль');
        }
        */

        throw new Error('Невірний email або пароль (Mock check)');
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
            {children}
        </AuthContext.Provider>
    );
};

const login = async (usernameOrEmail, password) => {
    try {

        const response = await api.post('login/', {
            username: usernameOrEmail,
            password: password
        });

        const { token } = response.data;

        localStorage.setItem('token', token);

        setUser({ username: usernameOrEmail });

        return true;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const useAuth = () => useContext(AuthContext);