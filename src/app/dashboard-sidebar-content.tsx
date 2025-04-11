'use client';

import React from 'react';
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {Icons} from '@/components/icons';
import {Home} from 'lucide-react';
import {useRouter} from 'next/navigation';

const DashboardSidebarContent = () => {
  const router = useRouter();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuButton onClick={() => router.push('/')}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup label="Assets">
        <SidebarMenu>
          <SidebarMenuButton onClick={() => router.push('/it-assets')}>
            <Icons.itAsset className="mr-2 h-4 w-4" />
            <span>IT Assets</span>
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => router.push('/ot-assets')}>
            <Icons.otAsset className="mr-2 h-4 w-4" />
            <span>OT Assets</span>
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => router.push('/cloud-assets')}>
            <Icons.cloudAsset className="mr-2 h-4 w-4" />
            <span>Cloud Assets</span>
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => router.push('/crown-jewels')}>
            <Icons.crownJewel className="mr-2 h-4 w-4" />
            <span>Crown Jewels</span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarSeparator />
      <SidebarGroup label="Administration">
        <SidebarMenu>
          <SidebarMenuButton onClick={() => router.push('/data-ingestion')}>
            <Icons.plus className="mr-2 h-4 w-4" />
            <span>Data Ingestion</span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default DashboardSidebarContent;
