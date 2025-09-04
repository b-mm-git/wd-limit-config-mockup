
import React from 'react';

interface TabsProps<T extends string> {
    tabs: T[];
    activeTab: T;
    setActiveTab: (tab: T) => void;
}

const Tabs = <T extends string,>({ tabs, activeTab, setActiveTab }: TabsProps<T>) => {
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as T)}
                >
                    {tabs.map((tab) => (
                        <option key={tab}>{tab}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab}
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActiveTab(tab); }}
                                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
