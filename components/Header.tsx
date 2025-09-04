
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-end h-20 px-6 bg-white border-b">
            <div className="flex items-center">
                <div className="relative">
                    <button className="flex items-center focus:outline-none">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src="https://picsum.photos/100"
                            alt="Admin Avatar"
                        />
                        <span className="ml-4 font-semibold text-gray-700">Admin User</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
