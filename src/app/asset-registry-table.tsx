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
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {assetSummary} from '@/ai/flows/asset-summary';

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

interface AssetRegistryTableProps {
  assets: Asset[];
}

const AssetRegistryTable: React.FC<AssetRegistryTableProps> = ({assets}) => {
  const handleGetSummary = async (asset: Asset) => {
    const assetDetails = `
      Host Name: ${asset.hostName},
      IP Address: ${asset.ipAddress},
      MAC Address: ${asset.macAddress},
      Location: ${asset.location},
      Owner: ${asset.owner},
      Lifecycle Stage: ${asset.lifecycleStage},
      Asset Type: ${asset.assetType}
    `;

    try {
      const summary = await assetSummary({assetDetails: assetDetails});
      alert(summary.summary); // Display the summary in an alert
    } catch (error) {
      console.error('Failed to get asset summary:', error);
      alert('Failed to get asset summary. Please try again.');
    }
  };

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
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map(asset => (
          <TableRow key={asset.id}>
            <TableCell>{asset.hostName}</TableCell>
            <TableCell>{asset.ipAddress}</TableCell>
            <TableCell>{asset.macAddress}</TableCell>
            <TableCell>{asset.location}</TableCell>
            <TableCell>{asset.owner}</TableCell>
            <TableCell>{asset.lifecycleStage}</TableCell>
            <TableCell>{asset.assetType}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleGetSummary(asset)}>
                    Get Summary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetRegistryTable;
