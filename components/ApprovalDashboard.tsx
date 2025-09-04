
import React, { useState } from 'react';
import { MOCK_REJECTION_LOGS } from '../constants';
import type { RejectionEntry } from '../types';
import Card from './common/Card';

const RejectionHistory: React.FC = () => {
    const [logs] = useState<RejectionEntry[]>(MOCK_REJECTION_LOGS);

    const maskAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
    
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction Rejection History</h1>
            
            <Card>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Namespace: All</option>
                        <option>Retail</option>
                        <option>Pro</option>
                    </select>
                     <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Transaction Type: Crypto</option>
                        <option>Fiat</option>
                    </select>
                     <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Asset: All</option>
                        <option>BTC</option>
                        <option>ETH</option>
                        <option>USDT</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Breach Reason: All</option>
                        <option>Exceeded per transaction limit</option>
                        <option>Exceeded daily total limit</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KYC Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Address</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiat Equivalent (USD)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiat Equivalent (IDR)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breach Reason</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.kycName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.asset}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{maskAddress(log.walletAddress)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.amountNative.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${log.amountUsd.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {log.amountIdr.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        {log.breachReason}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default RejectionHistory;