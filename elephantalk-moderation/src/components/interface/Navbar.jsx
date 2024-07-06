'use client'

import { useSession, signOut } from "next-auth/react";
import React from "react"
import { RiFileWarningFill } from "react-icons/ri";
import { RiFileHistoryFill } from "react-icons/ri";
import { BeatLoader } from "react-spinners";

export const Navbar = React.memo(({
    activePage,
    setActivePage,
}) => {
    const session = useSession();

    // Default active page


    return (
        <header className="flex items-center justify-between bg-white p-4 shadow-md" >
            <div className="flex items-center">
                <img src="/assets/logo.webp" alt="ElephanTalk Logo" className="h-8 mr-2" />
            </div>
            <nav className="flex space-x-4">
                <button
                    className={`flex items-center p-2 text-gray-700 hover:text-teal-500 ${activePage === 'monitor' ? 'border-b-2 border-teal-500' : ''}`}
                    onClick={() => setActivePage('monitor')}
                >
                    <RiFileWarningFill className="text-2xl mr-2" /> {/* Adjust the font size and margin */}
                    <span className="text-base">monitor</span> {/* Adjust the text size if needed */}
                </button>
                <button
                    className={`flex items-center p-2 text-gray-700 hover:text-teal-500 ${activePage === 'history' ? 'border-b-2 border-teal-500' : ''}`}
                    onClick={() => setActivePage('history')}
                >
                    <RiFileHistoryFill className="text-2xl mr-2" /> {/* Adjust the font size and margin */}
                    <span className="text-base">historial</span> {/* Adjust the text size if needed */}
                </button>
                
                <button className="flex items-center p-2 text-gray-700 hover:text-teal-500"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                >
                    <span className="mr-2">historial</span>
                </button>
            </nav>
            <div className="text-gray-700">
                {(session?.data?.user?.name === undefined) ?
                (<BeatLoader 
                    color='#25a2b5'
                    size={10}
                />) : (`${session?.data?.user?.name} ${session?.data?.user?.lastname}`)}
            </div>
        </header >
    );
});


Navbar.displayName = "Navbar";