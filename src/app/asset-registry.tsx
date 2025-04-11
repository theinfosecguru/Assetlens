'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Asset {
  id: string;
  ipAddress: string;
  macAddress: string;
  hostName: string;
  location: string;
  owner: string;
  lifecycleStage: string;
  assetType: 'IT' | 'OT' | 'Cloud';
}

const DUMMY_ASSETS: Asset[] = [
  {
    id: '1',
    ipAddress: '192.168.1.1',
    macAddress: '00:1A:2B:3C:4D:5E',
    hostName: 'Server-01',
    location: 'Data Center',
    owner: 'IT Department',
    lifecycleStage: 'Production',
    assetType: 'IT',
  },
  {
    id: '2',
    ipAddress: '192.168.1.2',
    macAddress: '00:1A:2B:3C:4D:5F',
    hostName: 'PLC-01',
    location: 'Factory Floor',
    owner: 'OT Department',
    lifecycleStage: 'Production',
    assetType: 'OT',
  },
  {
    id: '3',
    ipAddress: '192.168.1.3',
    macAddress: '00:1A:2B:3C:4D:60',
    hostName: 'VM-01',
    location: 'AWS Cloud',
    owner: 'Cloud Team',
    lifecycleStage: 'Production',
    assetType: 'Cloud',
  },
];

const AssetRegistry = () => {
  return (
    <Table>
      <TableCaption>A list of all assets in the network.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Host Name</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>MAC Address</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Lifecycle Stage</TableHead>
          <TableHead>Asset Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DUMMY_ASSETS.map(asset => (
          <TableRow key={asset.id}>
            <TableCell>{asset.hostName}</TableCell>
            <TableCell>{asset.ipAddress}</TableCell>
            <TableCell>{asset.macAddress}</TableCell>
            <TableCell>{asset.location}</TableCell>
            <TableCell>{asset.owner}</TableCell>
            <TableCell>{asset.lifecycleStage}</TableCell>
            <TableCell>{asset.assetType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetRegistry;
