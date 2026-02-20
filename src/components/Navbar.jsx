import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    <div className="flex items-center">
                        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:opacity-80 transition-opacity">
                            <CheckSquare size={28} />
                            <span className="tracking-tight">ToDo App</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Про додаток</Link>
                        {user ? (
                            <>
                                <Link to="/todo" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Завдання</Link>
                                <Link to="/profile" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Профіль</Link>
                                <button onClick={logout} className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors ml-2 bg-red-50 px-3 py-1.5 rounded-lg">
                                    <LogOut size={16} /> Вихід
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 ml-2">
                                <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Вхід</Link>
                                <Link to="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all">
                                    Реєстрація
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 -mr-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                        <Link to="/about" onClick={closeMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                            Про додаток
                        </Link>

                        {user ? (
                            <>
                                <Link to="/todo" onClick={closeMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                    Завдання
                                </Link>
                                <Link to="/profile" onClick={closeMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                                    Профіль
                                </Link>
                                <div className="pt-2 mt-2 border-t border-gray-100">
                                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 transition-colors">
                                        <LogOut size={20} /> Вихід
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
                                <Link to="/login" onClick={closeMenu} className="block text-center px-3 py-3 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                                    Вхід
                                </Link>
                                <Link to="/register" onClick={closeMenu} className="block text-center px-3 py-3 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors">
                                    Реєстрація
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;