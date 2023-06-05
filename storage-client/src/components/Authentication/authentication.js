import React, { useState } from 'react';
import Login from './login';

const Authentication = () => {
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome to Warehouse Storage</h1>
            {!login && (
                <div className="flex flex-col items-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        onClick={() => setLogin(true)}
                    >
                        Log In
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={() => setSignUp(true)}>
                        Sign Up
                    </button>
                </div>
            )}
            {login && (
                <Login />
            )}
        </div>
    );
};

export default Authentication;
