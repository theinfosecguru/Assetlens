'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface UtilizationData {
  name: string;
  utilization: number;
}

const data: UtilizationData[] = [
  { name: 'Jan', utilization: 40 },
  { name: 'Feb', utilization: 30 },
  { name: 'Mar', utilization: 20 },
  { name: 'Apr', utilization: 27 },
  { name: 'May', utilization: 18 },
  { name: 'Jun', utilization: 23 },
  { name: 'Jul', utilization: 34 },
  { name: 'Aug', utilization: 40 },
  { name: 'Sep', utilization: 30 },
  { name: 'Oct', utilization: 20 },
  { name: 'Nov', utilization: 27 },
  { name: 'Dec', utilization: 18 },
];

const AssetUtilizationTrend = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="utilization" stroke="hsl(var(--primary))" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AssetUtilizationTrend;
