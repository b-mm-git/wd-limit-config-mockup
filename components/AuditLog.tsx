
import React, { useState, useMemo } from 'react';
import { MOCK_AUDIT_LOGS } from '../constants';
import Card from './common/Card';

const AuditLog: React.FC = () => {
    // State for filters
    const [adminUserFilter, setAdminUserFilter] = useState<string>('');
    const [actionTypeFilter, setActionTypeFilter] = useState<string>('');
    const [startDateFilter, setStartDateFilter] = useState<string>('');
    const [endDateFilter, setEndDateFilter] = useState<string>('');

    // Memoize unique users and actions for filter dropdowns
    const uniqueAdminUsers = useMemo(() => {
        const users = new Set(MOCK_AUDIT_LOGS.map(log => log.adminUser));
        return Array.from(users);
    }, []);

    const uniqueActions = useMemo(() => {
        const actions = new Set(MOCK_AUDIT_LOGS.map(log => log.action));
        return Array.from(actions);
    }, []);
    
    // Memoize the filtered logs
    const filteredLogs = useMemo(() => {
        return MOCK_AUDIT_LOGS.filter(log => {
            // Admin User filter
            if (adminUserFilter && log.adminUser !== adminUserFilter) {
                return false;
            }
            // Action Type filter
            if (actionTypeFilter && log.action !== actionTypeFilter) {
                return false;
            }
            // Date Range filter
            const logDate = new Date(log.timestamp);
            if (startDateFilter) {
                const startDate = new Date(startDateFilter);
                startDate.setHours(0, 0, 0, 0); // Start of the day
                if (logDate < startDate) return false;
            }
            if (endDateFilter) {
                const endDate = new Date(endDateFilter);
                endDate.setHours(23, 59, 59, 999); // End of the day
                if (logDate > endDate) return false;
            }
            return true;
        });
    }, [adminUserFilter, actionTypeFilter, startDateFilter, endDateFilter]);

    const handleResetFilters = () => {
        setAdminUserFilter('');
        setActionTypeFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Audit Log</h1>
            
            <Card className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="adminUserFilter" className="block text-sm font-medium text-gray-700">Admin User</label>
                        <select
                            id="adminUserFilter"
                            value={adminUserFilter}
                            onChange={(e) => setAdminUserFilter(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Users</option>
                            {uniqueAdminUsers.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="actionTypeFilter" className="block text-sm font-medium text-gray-700">Action Type</label>
                        <select
                            id="actionTypeFilter"
                            value={actionTypeFilter}
                            onChange={(e) => setActionTypeFilter(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="">All Actions</option>
                             {uniqueActions.map(action => (
                                <option key={action} value={action}>{action}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                         <div>
                            <label htmlFor="startDateFilter" className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                id="startDateFilter"
                                value={startDateFilter}
                                onChange={(e) => setStartDateFilter(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDateFilter" className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                id="endDateFilter"
                                value={endDateFilter}
                                onChange={(e) => setEndDateFilter(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-2 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleResetFilters}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin User</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Old Value</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.adminUser}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            log.action.includes('Change') ? 'bg-blue-100 text-blue-800' : 
                                            log.action.includes('Assignment') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.oldValue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.newValue}</td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-10 text-gray-500">
                                        No logs found matching the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AuditLog;
