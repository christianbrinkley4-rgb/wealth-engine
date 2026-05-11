import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Wealth Growth Dashboard</h1>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}