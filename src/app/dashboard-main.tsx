'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import AssetRegistry from './asset-registry';
import RiskHeatmap from './risk-heatmap';
import AssetUtilizationTrend from './asset-utilization-trend';
import ComplianceScorecard from './compliance-scorecard';
import AiQuery from "@/app/ai-query";

const DashboardMain = () => {
  const dummyData = `
  [
    {"assetId": "1", "ipAddress": "192.168.1.1", "hostName": "Server A", "os": "Linux"},
    {"assetId": "2", "ipAddress": "192.168.1.2", "hostName": "Workstation B", "os": "Windows"},
    {"assetId": "3", "ipAddress": "192.168.1.3", "hostName": "Printer C", "os": "Embedded"}
  ]
  `;

  return (
    <main className="flex-1 p-6 rounded-md shadow-md transition-colors duration-300 ease-in-out">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Asset Registry</CardTitle>
            <CardDescription>A list of all assets in the network</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetRegistry />
          </CardContent>
        </Card>
        {/* Risk Heatmap Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
            <CardDescription>Visualize risk levels across different assets.</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskHeatmap />
          </CardContent>
        </Card>

        {/* Asset Utilization Trend Analysis Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Asset Utilization Trend</CardTitle>
            <CardDescription>Analyze the trend of asset utilization over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetUtilizationTrend />
          </CardContent>
        </Card>

        {/* Compliance Scorecard Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Compliance Scorecard</CardTitle>
            <CardDescription>View compliance scores for different asset groups.</CardDescription>
          </CardHeader>
          <CardContent>
            <ComplianceScorecard />
          </CardContent>
        </Card>        
      </div>
      <div className='mt-4'>
        <AiQuery data={dummyData} />
      </div>
    </main>
  );
};

export default DashboardMain;
