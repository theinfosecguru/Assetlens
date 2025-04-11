'use client';

import React from 'react';
import {Sidebar} from '@/components/ui/sidebar';
import DashboardSidebarContent from './dashboard-sidebar-content';
import DashboardMain from './dashboard-main';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsible="icon">
        <DashboardSidebarContent />
      </Sidebar>
      <DashboardMain />
    </div>
  );
};

export default Dashboard;
