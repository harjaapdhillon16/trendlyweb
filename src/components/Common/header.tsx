import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/icon.png";

export const Header = () => {
    return (
        <>
            <div className="bg-black">
                <Link className="flex items-center" to="/">
                    <img src={Logo} className="w-20 h-20 p-3" alt="Logo" />
                    <p className="text-white font-bold">App for events</p>
                </Link>
            </div>
        </>
    )
}