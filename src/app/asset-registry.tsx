'use client';

import React, {useState, useEffect} from 'react';

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
import {getTenableVulnerabilities} from "@/services/tenable";
import {getQualysVulnerabilities} from "@/services/qualys";
import {Badge} from "@/components/ui/badge";
import {getAttckTechniques, AttckTechnique} from "@/services/attck";
import { normalizeAsset } from "@/lib/normalize-asset";

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
  tenableVulnerabilities?: string;
  qualysVulnerabilities?: string;
  attckTechniques?: string;
  isEOL: boolean;
  normalizedSchema?: string;
}

const AssetRegistry = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const loadAssets = async () => {
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

      //Consolidate Assets

      const consolidatedAssets: Asset[] = [];

      [
        ...activeDirectoryAssets.map(a => ({...a, source: 'Active Directory'})),
        ...awsAssets.map(a => ({...a, source: 'AWS'})),
        ...azureAssets.map(a => ({...a, source: 'Azure'})),
        ...cyleraAssets.map(a => ({...a, source: 'Cylera'})),
        ...gcpAssets.map(a => ({...a, source: 'GCP'})),
        ...modbusAssets.map(a => ({...a, source: 'Modbus'})),
        ...nmapAssets.map(a => ({...a, source: 'Nmap'})),
        ...opcuaAssets.map(a => ({...a, source: 'OPC-UA'})),
        ...sccmAssets.map(a => ({...a, source: 'SCCM'})),
        ...serviceNowAssets.map(a => ({...a, source: 'ServiceNow'})),
        ...siemensRockwellAssets.map(a => ({...a, source: 'Siemens Rockwell'})),
      ].forEach((asset, index) => {
        consolidatedAssets.push({
          id: index.toString(),
          ipAddress: '127.0.0.1', // Dummy IP
          macAddress: '00:00:00:00:00:00', // Dummy MAC
          hostName: `Generic Asset ${index}`,
          location: 'Unknown',
          owner: 'Unknown',
          lifecycleStage: 'Procurement',
          assetType: 'IT',
          tenableVulnerabilities: 'None', // Placeholder
          qualysVulnerabilities: 'None', // Placeholder
          attckTechniques: 'None',
          isEOL: index % 5 === 0, // Mock EOL status
        })
      });

      // Fetch vulnerabilities and ATT&CK techniques for each asset
      const assetsWithVulnerabilities = await Promise.all(
        consolidatedAssets.map(async (asset) => {
          const tenableVulnerabilities = await getTenableVulnerabilities(asset.ipAddress);
          const qualysVulnerabilities = await getQualysVulnerabilities(asset.ipAddress);

          let allVulnerabilities = [...tenableVulnerabilities, ...qualysVulnerabilities];
          let attckTechniques: AttckTechnique[] = [];

          for (const vulnerability of allVulnerabilities) {
            const techniques = await getAttckTechniques(vulnerability.vulnerabilityName);
            attckTechniques = [...attckTechniques, ...techniques];
          }
        const normalizedSchema = normalizeAsset(asset);

          return {
            ...asset,
            tenableVulnerabilities: tenableVulnerabilities.map(v => v.vulnerabilityName).join(', ') || 'None',
            qualysVulnerabilities: qualysVulnerabilities.map(v => v.title).join(', ') || 'None',
            attckTechniques: attckTechniques.map(t => t.name).join(', ') || 'None',
              normalizedSchema: JSON.stringify(normalizedSchema, null, 2),
          };
        })
      );
      setAssets(assetsWithVulnerabilities);
    };
    loadAssets();
  }, []);

  return (
    <AssetRegistryTableComponent assets={assets} />
  );
};

export default AssetRegistry;

interface AssetRegistryTableProps {
  assets: Asset[];
}

const AssetRegistryTableComponent: React.FC<AssetRegistryTableProps> = ({assets}) => {
  const handleGetSummary = async (asset: Asset) => {
    const assetDetails = `
      Host Name: ${asset.hostName},
      IP Address: ${asset.ipAddress},
      MAC Address: ${asset.macAddress},
      Location: ${asset.location},
      Owner: ${asset.owner},
      Lifecycle Stage: ${asset.lifecycleStage},
      Asset Type: ${asset.assetType},
      Tenable Vulnerabilities: ${asset.tenableVulnerabilities},
      Qualys Vulnerabilities: ${asset.qualysVulnerabilities},
      ATT&CK Techniques: ${asset.attckTechniques}
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
          <TableHead>Tenable Vulnerabilities</TableHead>
          <TableHead>Qualys Vulnerabilities</TableHead>
          <TableHead>ATT&CK Techniques</TableHead>
          <TableHead>EOL</TableHead>
          <TableHead>Normalized Schema</TableHead>
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
            <TableCell>{asset.tenableVulnerabilities}</TableCell>
            <TableCell>{asset.qualysVulnerabilities}</TableCell>
            <TableCell>{asset.attckTechniques}</TableCell>
            <TableCell>
              {asset.isEOL ? (
                <Badge variant="destructive">EOL</Badge>
              ) : (
                <Badge variant="outline">Active</Badge>
              )}
            </TableCell>
             <TableCell>{asset.normalizedSchema}</TableCell>
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
