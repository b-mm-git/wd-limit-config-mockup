import React from 'react';
import type { View } from '../types';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
}

const SidebarIcon: React.FC<{ icon: string; solid?: boolean }> = ({ icon }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
    </svg>
);

const ICONS: { [key in View]: string } = {
    'Group Management': "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    'User Management': "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    'Rejection History': "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    'Audit Log': "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    'Global Settings': "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    const navItems: View[] = [
        'Group Management',
        'User Management',
        'Rejection History',
        'Audit Log',
        'Global Settings',
    ];

    return (
        <div className="flex flex-col w-64 bg-white border-r">
            <div className="flex items-center justify-center h-20 border-b">
                <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Pintu.co.id Logo">
                  <path d="M12 2L20.66 7v10L12 22 3.34 17V7L12 2z"/>
                </svg>
                <h1 className="text-xl font-bold text-gray-800 ml-2">Withdrawal Limits</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
                <nav className="flex-1 px-4 py-4">
                    {navItems.map((view) => (
                        <a
                            key={view}
                            className={`flex items-center px-4 py-2 mt-2 text-gray-600 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200 ${
                                currentView === view ? 'bg-blue-100 text-blue-700' : ''
                            }`}
                            onClick={() => setCurrentView(view)}
                        >
                            <SidebarIcon icon={ICONS[view]} />
                            <span className="ml-3">{view}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;