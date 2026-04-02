import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return <div>Завантаження...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Профіль користувача</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">

                    {user.username && (
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900 w-1/3">Username</td>
                            <td className="px-6 py-4 text-gray-500">{user.username}</td>
                        </tr>
                    )}

                    {user.email && (
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Email</td>
                            <td className="px-6 py-4 text-gray-500">{user.email}</td>
                        </tr>
                    )}

                    {user.first_name && (
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Ім'я</td>
                            <td className="px-6 py-4 text-gray-500">{user.first_name}</td>
                        </tr>
                    )}

                    {user.gender && (
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Стать</td>
                            <td className="px-6 py-4 text-gray-500">
                                {user.gender === 'M' ? 'Чоловіча' : 'Жіноча'}
                            </td>
                        </tr>
                    )}

                    {user.birth_date && (
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Дата народження</td>
                            <td className="px-6 py-4 text-gray-500">{user.birth_date}</td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;