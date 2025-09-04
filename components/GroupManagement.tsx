import React, { useState, useEffect } from 'react';
import { MOCK_GROUPS } from '../constants';
import type { Group, Timeframe } from '../types';
import Card from './common/Card';
import Tabs from './common/Tabs';
import Modal from './common/Modal';

const newGroupTemplate: Omit<Group, 'id' | 'userCount'> = {
    name: '',
    limits: {
        daily: { fiat: 0, crypto: 0 },
        weekly: { fiat: 0, crypto: 0 },
        monthly: { fiat: 0, crypto: 0 },
    },
    isActive: true,
};

const EditGroupModal: React.FC<{
    group: Group | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (group: Group) => void;
}> = ({ group, isOpen, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState<Timeframe>('Daily');
    const [formData, setFormData] = useState<Omit<Group, 'id' | 'userCount'>>({ ...newGroupTemplate });

    const isNew = group === null;

    useEffect(() => {
        if (isOpen) {
            setActiveTab('Daily');
            if (group) {
                setFormData({ ...group });
            } else {
                setFormData({ ...newGroupTemplate });
            }
        }
    }, [group, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const finalGroupData: Group = {
            ...(group || { id: `g${Date.now()}`, userCount: 0 }),
            ...formData,
        };
        onSave(finalGroupData);
    };

    const handleLimitChange = (limitType: 'fiat' | 'crypto', value: string) => {
        const timeframe = activeTab.toLowerCase() as keyof Group['limits'];
        const numValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
        
        setFormData(prev => ({
            ...prev,
            limits: {
                ...prev.limits,
                [timeframe]: {
                    ...prev.limits[timeframe],
                    [limitType]: numValue,
                },
            },
        }));
    };
    
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    const formatForDisplay = (value: number) => value.toLocaleString('id-ID');

    const renderLimitInputs = () => {
        const timeframe = activeTab.toLowerCase() as keyof Group['limits'];
        const limits = formData.limits[timeframe];
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fiat Limit (IDR)</label>
                    <input 
                        type="text" 
                        value={formatForDisplay(limits.fiat)} 
                        onChange={(e) => handleLimitChange('fiat', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formatCurrency(limits.fiat)}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Crypto Limit (IDR Equivalent)</label>
                    <input 
                        type="text"
                        value={formatForDisplay(limits.crypto)}
                        onChange={(e) => handleLimitChange('crypto', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formatCurrency(limits.crypto)}</p>
                </div>
            </div>
        );
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isNew ? 'Create New Group' : `Edit Group: ${group?.name}`}>
            <div className="space-y-6">
                <div>
                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
                    <input 
                        type="text" 
                        id="groupName" 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} 
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>

                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="flex-grow flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Activate Limits</span>
                        <span className="text-sm text-gray-500">
                            When disabled, this group will have no withdrawal limits.
                        </span>
                    </span>
                    <button
                        type="button"
                        className={`${
                            formData.isActive ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        role="switch"
                        aria-checked={formData.isActive}
                        onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                    >
                        <span
                            aria-hidden="true"
                            className={`${
                                formData.isActive ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        />
                    </button>
                </div>
                
                <Card>
                    <Tabs<Timeframe> tabs={['Daily', 'Weekly', 'Monthly']} activeTab={activeTab} setActiveTab={setActiveTab} />
                    {renderLimitInputs()}
                </Card>

                {!isNew && (
                    <Card>
                       <h3 className="text-lg font-medium text-gray-900">Bulk User Assignment</h3>
                       <p className="text-sm text-gray-500 mt-1">Upload a CSV file with a `user_id` column to add users to this group.</p>
                       <div className="mt-4">
                           <input type="file" accept=".csv" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                       </div>
                    </Card>
                )}
            </div>
            <div className="mt-8 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="button" onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
        </Modal>
    );
};


const GroupManagement: React.FC = () => {
    const [groups, setGroups] = useState(MOCK_GROUPS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const handleEdit = (group: Group) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedGroup(null);
        setIsModalOpen(true);
    };
    
    const handleSave = (updatedGroup: Group) => {
        setGroups(prevGroups => {
            const existing = prevGroups.find(g => g.id === updatedGroup.id);
            if (existing) {
                return prevGroups.map(g => g.id === updatedGroup.id ? updatedGroup : g);
            } else {
                return [...prevGroups, updatedGroup];
            }
        });
        setIsModalOpen(false);
    };

    const handleDelete = (groupId: string) => {
        if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
            setGroups(prev => prev.filter(g => g.id !== groupId));
        }
    }

    const formatCurrency = (value: number) => {
        if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
        if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
        return value;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Group Management</h1>
                 <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create New Group
                </button>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Limit (Fiat/Crypto)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Limit (Fiat/Crypto)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Limit (Fiat/Crypto)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {groups.map((group) => (
                                <tr key={group.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{group.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.userCount.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        group.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                      }`}>
                                        {group.isActive ? 'Active' : 'Inactive'}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(group.limits.daily.fiat)} / {formatCurrency(group.limits.daily.crypto)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(group.limits.weekly.fiat)} / {formatCurrency(group.limits.weekly.crypto)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(group.limits.monthly.fiat)} / {formatCurrency(group.limits.monthly.crypto)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button onClick={() => handleEdit(group)} className="text-blue-600 hover:text-blue-900">Edit</button>
                                        <button onClick={() => handleDelete(group.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            
            <EditGroupModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                group={selectedGroup}
                onSave={handleSave}
            />
        </div>
    );
};

export default GroupManagement;