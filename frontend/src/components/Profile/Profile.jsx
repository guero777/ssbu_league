import React from 'react';
import { useAuth } from '../AuthContext';
import EditUsername from './EditUsername';
import EditGamerTag from './EditGamerTag';
import MainCharacters from './MainCharacters';
import ProtectedLayout from '../../layouts/ProtectedLayout';

const Profile = () => {
    const { username } = useAuth();

    return (
        <ProtectedLayout>
            <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 border border-red-900/50">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-white">Welcome, {username}!</h2>
                    <div className="space-y-8">
                        <EditUsername />
                        <EditGamerTag />
                        <MainCharacters />
                    </div>
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default Profile;
