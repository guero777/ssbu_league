import React from 'react';
import { useAuth } from '../../context/AuthContext';
import EditUsername from './EditUsername';
import EditGamerTag from './EditGamerTag';
import MainCharacters from './MainCharacters';
import ProtectedLayout from '../../layouts/ProtectedLayout';

const Profile = () => {
    const { username } = useAuth();

    return (
        <ProtectedLayout>
            <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 border border-red-900/50">
                <div className="space-y-8">
                    <EditUsername />
                    <EditGamerTag />
                    <MainCharacters />
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default Profile;
