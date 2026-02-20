import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            await login(data.username, data.password);
            navigate('/todo');
        } catch (err) {
            setError('Невірний логін або пароль');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Вхід</h2>

            {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ім'я користувача</label>
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Пароль</label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                    Увійти
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Немає акаунту? <Link to="/register" className="text-blue-600 hover:underline">Зареєструватися</Link>
            </p>
        </div>
    );
};

export default Login;