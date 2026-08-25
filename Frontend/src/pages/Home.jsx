import React from 'react';
import TasksPage from './TasksPage';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <TasksPage />
    </div>
  );
};