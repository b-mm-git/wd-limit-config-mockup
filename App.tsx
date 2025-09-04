
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GroupManagement from './components/GroupManagement';
import UserManagement from './components/UserManagement';
import RejectionHistory from './components/ApprovalDashboard';
import AuditLog from './components/AuditLog';
import GlobalSettings from './components/GlobalSettings';
import type { View } from './types';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('Group Management');

    const renderView = () => {
        switch (currentView) {
            case 'Group Management':
                return <GroupManagement />;
            case 'User Management':
                return <UserManagement />;
            case 'Rejection History':
                return <RejectionHistory />;
            case 'Audit Log':
                return <AuditLog />;
            case 'Global Settings':
                return <GlobalSettings />;
            default:
                return <GroupManagement />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;