'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import AssetRegistry from './asset-registry';
import RiskHeatmap from './risk-heatmap';
import AssetUtilizationTrend from './asset-utilization-trend';
import ComplianceScorecard from './compliance-scorecard';

const DashboardMain = async () => {
  return (
    <main className="flex-1 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Asset Registry</CardTitle>
            <CardDescription>A list of all assets in the network</CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
        <AssetRegistry />

        {/* Risk Heatmap Card */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
            <CardDescription>Visualize risk levels across different assets.</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskHeatmap />
          </CardContent>
        </Card>

        {/* Asset Utilization Trend Analysis Card */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Utilization Trend</CardTitle>
            <CardDescription>Analyze the trend of asset utilization over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetUtilizationTrend />
          </CardContent>
        </Card>

        {/* Compliance Scorecard Card */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Scorecard</CardTitle>
            <CardDescription>View compliance scores for different asset groups.</CardDescription>
          </CardHeader>
          <CardContent>
            <ComplianceScorecard />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardMain;
