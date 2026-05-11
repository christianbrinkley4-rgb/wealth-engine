import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-slate-900 p-6 rounded-b-3xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-sky-400">Financial Growth Dashboard</h1>
      <p className="text-slate-400 mt-2">
        Compare your investment returns and optimize your financial future.
      </p>
    </header>
  );
};

export default DashboardHeader;