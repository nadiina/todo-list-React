import { CheckCircle2, ListTodo, ShieldCheck, Zap, Server } from 'lucide-react';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">

            <div className="flex justify-center mb-8">
                <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg shadow-blue-200 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <ListTodo size={48} className="text-white absolute" />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md">
                        <CheckCircle2 size={24} className="text-green-500" />
                    </div>
                </div>
            </div>

            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Smart To-Do Client</h1>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">
                    Сучасний веб-додаток для організації вашого часу.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Zap size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Керування завданнями</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Створюйте нові задачі, відстежуйте їх статус виконання та видаляйте неактуальні. Інтерфейс миттєво реагує на ваші дії.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Безпечний доступ</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Повноцінна система реєстрації та авторизації. Кожен користувач має доступ лише до власного списку справ та налаштувань профілю.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;