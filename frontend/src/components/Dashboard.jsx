import React from 'react';
import ProtectedLayout from '../layouts/ProtectedLayout';
import AddFight from './AddFight';
import FightTable from './FightTable';
import Scoreboard from './Scoreboard';

const Dashboard = () => {
  return (
    <ProtectedLayout>
      <div className="container mx-auto px-4 space-y-6 max-w-full overflow-x-hidden">
        <AddFight />
        <Scoreboard />
        <FightTable />
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;