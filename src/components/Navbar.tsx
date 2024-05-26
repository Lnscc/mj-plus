"use client";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-orange-400 rounded-lg shadow-md">
            <div className="flex space-x-4">
                <Link href="/" className="text-white hover:text-gray-100 transition">Home</Link>
                <Link href="/imagine" className="text-white hover:text-gray-100 transition">Imagine</Link>
            </div>
            <div className="flex items-center space-x-4">
                {isLoading && (
                    <div className='animate-spin rounded-full h-7 w-7 border-b-2 border-white/50' />
                )}

                {user?.picture ? (
                    <Image
                        src={user.picture}
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className='rounded-full'
                    />
                ) : (
                    user && (
                        <div className='h-10 w-10 rounded-full bg-orange-600 text-xl flex justify-center items-center'>
                            {user.given_name?.[0]}
                        </div>
                    )
                )}

                {isAuthenticated ? (
                    <LogoutLink className='py-2 px-4 text-center bg-red-600 hover:bg-red-700 rounded-md transition'>
                        Log out
                    </LogoutLink>
                ) : (
                    <>
                        <LoginLink className='py-2 px-4 text-center bg-blue-600 hover:bg-blue-700 rounded-md transition'>
                            Sign in
                        </LoginLink>
                        <RegisterLink className='py-2 px-4 text-center bg-green-600 hover:bg-green-700 rounded-md transition'>
                            Sign up
                        </RegisterLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
