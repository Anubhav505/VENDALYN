import React from 'react';

const Return = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-gray-700">
                <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">PLACE AN EXCHANGE/RETURN REQUEST</h1>
                <p className="text-lg mb-4 text-center">
                    PLEASE USE THE CONTACT SECTION ON OUR WEBSITE OR MESSAGE US ON INSTAGRAM @holyheaden.in
                </p>
                <div className="flex justify-center">
                    <a
                        href="/contactUs"
                        className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Return;