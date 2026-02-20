import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const { registerUser } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const onSubmit = async (data) => {
        try {
            setServerError('');
            await registerUser(data);
            navigate('/');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setServerError(JSON.stringify(error.response.data));
            } else {
                setServerError('Помилка реєстрації. Спробуйте пізніше.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Реєстрація</h2>

            {serverError && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ім'я користувача</label>
                    <input
                        {...register("username", { required: "Це поле обов'язкове" })}
                        className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Введіть email" })}
                        className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Пароль</label>
                    <input
                        type="password"
                        {...register("password", { required: "Введіть пароль", minLength: { value: 6, message: "Мінімум 6 символів" } })}
                        className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Стать</label>
                        <select {...register("gender")} className="w-full border border-gray-300 p-2 rounded mt-1 bg-white">
                            <option value="">Не обрано</option>
                            <option value="M">Чоловіча</option>
                            <option value="F">Жіноча</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Дата народження</label>
                        <input
                            type="date"
                            {...register("birth_date")}
                            className="w-full border border-gray-300 p-2 rounded mt-1"
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                    Зареєструватися
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                Вже є акаунт? <Link to="/login" className="text-blue-600 hover:underline">Увійти</Link>
            </p>
        </div>
    );
};

export default Register;