import { CheckSquare } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] mt-5 h-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckSquare size={18} className="text-blue-500" />
                        <p>© {currentYear} ToDo App.</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
 <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Nadiia
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;