import React from 'react';
import UserTable from "./UserTable.jsx";
import ProtectedLayout from '../../layouts/ProtectedLayout';

const AdminPanel = () => {
    return (
        <ProtectedLayout>
            <div className="bg-black/60 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6 border border-red-900/50">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-center text-white">Admin Panel</h2>
                    <div className="space-y-8">
                        <UserTable />
                    </div>
                </div>
            </div>
        </ProtectedLayout>
    );
};

export default AdminPanel;