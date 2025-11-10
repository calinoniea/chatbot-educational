// app/about-project/page.tsx
import { UserGroupIcon, LightBulbIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const visionItems = [
    { 
        title: "Obiectivitate Academică", 
        description: "Asigurăm că toate informațiile furnizate sunt verificate, evitând bias-ul și informațiile eronate specifice AI-urilor generale.", 
        icon: AcademicCapIcon 
    },
    { 
        title: "Impact Local", 
        description: "Ne concentrăm exclusiv pe legislația, datele statistice și contextul românesc, oferind o relevanță pe care alte platforme nu o pot egala.", 
        icon: UserGroupIcon 
    },
    { 
        title: "Inovație Continuă", 
        description: "Folosim Groq API pentru viteză și o arhitectură serverless pentru scalabilitate, asigurând că tehnologia rămâne la cel mai înalt nivel.", 
        icon: LightBulbIcon 
    },
];

export default function AboutProjectPage() {
    return (
        <div className="bg-white dark:bg-gray-900 py-16 sm:py-24 px-4 min-h-[calc(100vh-7rem)]">
            <div className="max-w-4xl mx-auto">
                
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-teal-600 dark:text-teal-400 mb-3">
                        Viziunea CMO_EDU: Contribuția noastră la Educație
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Construim un instrument dedicat cercetării și învățării precise.
                    </p>
                </header>

                {/* Secțiunea Misiune */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
                        Misiunea Noastră
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Misiunea CMO_EDU este de a democratiza accesul la informație specializată și validată. Prin EduBot, eliminăm efortul de căutare și validare a datelor locale complexe, oferind studenților, profesorilor și analiștilor un instrument de încredere.
                    </p>
                </div>

                {/* Secțiunea Valori */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visionItems.map((item) => (
                        <div key={item.title} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <item.icon className="h-8 w-8 text-teal-500 mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}