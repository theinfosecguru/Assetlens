import React from 'react';
import AssetRegistryTable from './asset-registry-table';
import {getActiveDirectoryAssets} from '@/services/active-directory';
import {getAWSAssets} from '@/services/aws';
import {getAzureAssets} from '@/services/azure';
import {getCyleraAssets} from '@/services/cylera';
import {getGCPAssets} from '@/services/gcp';
import {getModbusAssets} from '@/services/modbus';
import {getNmapAssets} from '@/services/nmap';
import {getOPCUAAssets} from '@/services/opc-ua';
import {getSCCMAssets} from '@/services/sccm';
import {getServiceNowAssets} from '@/services/servicenow';
import {getSiemensRockwellAssets} from '@/services/siemens-rockwell';

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
