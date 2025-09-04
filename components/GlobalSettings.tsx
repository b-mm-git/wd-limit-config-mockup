
import React, { useState } from 'react';
import Card from './common/Card';

const GlobalSettings: React.FC = () => {
    // Crypto state
    const [cryptoPerTransaction, setCryptoPerTransaction] = useState('1600000000');
    const [cryptoPerDay, setCryptoPerDay] = useState('5000000000');

    // Fiat state
    const [fiatPerTransaction, setFiatPerTransaction] = useState('100000000');
    const [fiatPerDay, setFiatPerDay] = useState('500000000');

    const formatCurrency = (value: string) => {
        const num = parseInt(value.replace(/[,.]/g, ''), 10);
        if (isNaN(num)) return 'IDR 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    }

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
         setter(e.target.value.replace(/\D/g, ''));
    }
    
    const formatForDisplay = (value: string) => {
        const num = parseInt(value, 10);
        return isNaN(num) ? '' : num.toLocaleString('id-ID');
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Global Limit Configuration</h1>
            <p className="text-gray-600 mb-6 max-w-3xl">
                These limits apply to the total IDR value of all fiat and crypto assets withdrawn by a user. If a transaction exceeds these limits, it will be rejected and logged in the Rejection History.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Crypto Limits</h3>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="cryptoPerTransaction" className="block text-sm font-medium text-gray-700">Max per transaction (Crypto)</label>
                            <input 
                                type="text" 
                                id="cryptoPerTransaction" 
                                value={formatForDisplay(cryptoPerTransaction)}
                                onChange={handleInputChange(setCryptoPerTransaction)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(cryptoPerTransaction)}</p>
                        </div>
                         <div>
                            <label htmlFor="cryptoPerDay" className="block text-sm font-medium text-gray-700">Max per day (Crypto)</label>
                            <input 
                                type="text" 
                                id="cryptoPerDay" 
                                value={formatForDisplay(cryptoPerDay)}
                                onChange={handleInputChange(setCryptoPerDay)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(cryptoPerDay)}</p>
                        </div>
                    </div>
                </Card>
                
                <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Fiat Limits</h3>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="fiatPerTransaction" className="block text-sm font-medium text-gray-700">Max per transaction (Fiat)</label>
                            <input 
                                type="text" 
                                id="fiatPerTransaction" 
                                value={formatForDisplay(fiatPerTransaction)}
                                onChange={handleInputChange(setFiatPerTransaction)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(fiatPerTransaction)}</p>
                        </div>
                         <div>
                            <label htmlFor="fiatPerDay" className="block text-sm font-medium text-gray-700">Max per day (Fiat)</label>
                            <input 
                                type="text" 
                                id="fiatPerDay" 
                                value={formatForDisplay(fiatPerDay)}
                                onChange={handleInputChange(setFiatPerDay)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formatCurrency(fiatPerDay)}</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Save Global Limits
                </button>
            </div>
        </div>
    );
};

export default GlobalSettings;
