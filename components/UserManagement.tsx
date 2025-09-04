
import React, { useState } from 'react';
import { MOCK_USERS, MOCK_GROUPS } from '../constants';
import type { User, Group, Timeframe, Limits } from '../types';
import Card from './common/Card';
import Tabs from './common/Tabs';
import ProgressBar from './common/ProgressBar';

const UserDetail: React.FC<{ user: User, totalLimits: Group['limits'] }> = ({ user, totalLimits }) => {
    const [activeTab, setActiveTab] = useState<Timeframe>('Daily');

    const renderUsage = () => {
        const timeframe = activeTab.toLowerCase() as keyof User['usage'];
        const used: Limits = user.usage[timeframe];
        const total: Limits = totalLimits[timeframe];

        return (
            <div className="space-y-4 mt-4">
                <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>Fiat (IDR)</span>
                        <span>{used.fiat.toLocaleString('id-ID')} / {total.fiat.toLocaleString('id-ID')}</span>
                    </div>
                    <ProgressBar value={used.fiat} max={total.fiat} color="bg-blue-500" />
                </div>
                <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>Crypto (IDR Equivalent)</span>
                        <span>{used.crypto.toLocaleString('id-ID')} / {total.crypto.toLocaleString('id-ID')}</span>
                    </div>
                    <ProgressBar value={used.crypto} max={total.crypto} color="bg-purple-500" />
                </div>
            </div>
        );
    };

    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">User ID: {user.id}</p>
                    <div className="mt-4">
                        <label htmlFor="userGroup" className="block text-sm font-medium text-gray-700">Current Group</label>
                        <select id="userGroup" defaultValue={user.group} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            {MOCK_GROUPS.map(g => <option key={g.id}>{g.name}</option>)}
                        </select>
                    </div>
                    <div className="mt-4 flex space-x-2">
                         <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">Save Changes</button>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Usage Tracking</h3>
                    <Tabs<Timeframe> tabs={['Daily', 'Weekly', 'Monthly']} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {renderUsage()}
                </div>
            </div>
        </Card>
    );
};

const UserManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [foundUser, setFoundUser] = useState<User | null>(null);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [targetGroupId, setTargetGroupId] = useState<string>(MOCK_GROUPS[0]?.id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const user = MOCK_USERS[searchTerm];
        if (user) {
            setFoundUser(user);
        } else {
            setFoundUser(null);
            alert('User not found!');
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCsvFile(e.target.files[0]);
        } else {
            setCsvFile(null);
        }
    };

    const handleBulkAssign = (e: React.FormEvent) => {
        e.preventDefault();
        const targetGroup = MOCK_GROUPS.find(g => g.id === targetGroupId);
        if (csvFile && targetGroup) {
            alert(`Successfully initiated assignment of users from "${csvFile.name}" to the "${targetGroup.name}" group.`);
            setCsvFile(null);
            const fileInput = document.getElementById('csvUpload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } else {
            alert('Please select a group and a CSV file.');
        }
    };

    const userGroup = MOCK_GROUPS.find(g => g.name === foundUser?.group);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

            <Card>
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Find Individual User</h3>
                <form onSubmit={handleSearch} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by User ID (e.g., 123, 456, 789)"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Search
                    </button>
                </form>
            </Card>
            
            <Card className="mt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bulk User Assignment via CSV</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Upload a CSV file containing a single `user_id` column to assign multiple users to a group.
                </p>
                <form onSubmit={handleBulkAssign} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-auto flex-grow">
                        <label htmlFor="groupSelect" className="sr-only">Target Group</label>
                        <select
                            id="groupSelect"
                            value={targetGroupId}
                            onChange={(e) => setTargetGroupId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {MOCK_GROUPS.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-auto flex-grow">
                         <label htmlFor="csvUpload" className="sr-only">Upload CSV</label>
                         <input
                            id="csvUpload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap">
                        Assign Users
                    </button>
                </form>
            </Card>

            {foundUser && userGroup && (
                <div className="mt-6">
                    <UserDetail user={foundUser} totalLimits={userGroup.limits} />
                </div>
            )}
        </div>
    );
};

export default UserManagement;
