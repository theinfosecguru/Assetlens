import React from 'react';

import {getActiveDirectoryAssets, ActiveDirectoryAsset} from '@/services/active-directory';
import {getAWSAssets, AWSAsset} from '@/services/aws';
import {getAzureAssets, AzureAsset} from '@/services/azure';
import {getCyleraAssets, CyleraAsset} from '@/services/cylera';
import {getGCPAssets, GCPAsset} from '@/services/gcp';
import {getModbusAssets, ModbusAsset} from '@/services/modbus';
import {getNmapAssets, NmapAsset} from '@/services/nmap';
import {getOPCUAAssets, OPCUAAsset} from '@/services/opc-ua';
import {getSCCMAssets, SCCMAsset} from '@/services/sccm';
import {getServiceNowAssets, ServiceNowAsset} from '@/services/servicenow';
import {getSiemensRockwellAssets, SiemensRockwellAsset} from '@/services/siemens-rockwell';
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

export type { ActiveDirectoryAsset, AWSAsset, AzureAsset, CyleraAsset, GCPAsset, ModbusAsset, NmapAsset, OPCUAAsset, SCCMAsset, ServiceNowAsset, SiemensRockwellAsset };

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

const generateDummyAssets = (): Asset[] => {
  const assets: Asset[] = [];
  for (let i = 1; i <= 20; i++) {
    assets.push({
      id: i.toString(),
      ipAddress: `192.168.1.${i}`,
      macAddress: `00:1A:2B:3C:4D:${(50 + i).toString(16).toUpperCase()}`,
      hostName: `Asset-${i}`,
      location: `Location ${i}`,
      owner: `Owner ${i}`,
      lifecycleStage: 'Production',
      assetType: i % 3 === 0 ? 'IT' : i % 3 === 1 ? 'OT' : 'Cloud',
    });
  }
  return assets;
};

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

const AssetRegistry = async () => {
  const dummyAssets = generateDummyAssets();

  // Fetch assets from various sources
  const activeDirectoryAssets = await getActiveDirectoryAssets();
  const awsAssets = await getAWSAssets();
  const azureAssets = await getAzureAssets();
  const cyleraAssets = await getCyleraAssets();
  const gcpAssets = await getGCPAssets();
  const modbusAssets = await getModbusAssets();
  const nmapAssets = await getNmapAssets();
  const opcuaAssets = await getOPCUAAssets();
  const sccmAssets = await getSCCMAssets();
  const serviceNowAssets = await getServiceNowAssets();
  const siemensRockwellAssets = await getSiemensRockwellAssets();

  // Log the fetched assets (for debugging purposes)
  console.log('Active Directory Assets:', activeDirectoryAssets);
  console.log('AWS Assets:', awsAssets);
  console.log('Azure Assets:', azureAssets);
  console.log('Cylera Assets:', cyleraAssets);
  console.log('GCP Assets:', gcpAssets);
  console.log('Modbus Assets:', modbusAssets);
  console.log('Nmap Assets:', nmapAssets);
  console.log('OPC-UA Assets:', opcuaAssets);
  console.log('SCCM Assets:', sccmAssets);
  console.log('ServiceNow Assets:', serviceNowAssets);
  console.log('Siemens Rockwell Assets:', siemensRockwellAssets);

  return (
    <div>
      <AssetRegistryTable assets={dummyAssets} />
    </div>
  );
};

export default AssetRegistry;
