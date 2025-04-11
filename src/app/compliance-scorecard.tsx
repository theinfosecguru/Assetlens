'use client';

import React from 'react';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
} from 'recharts';

interface ComplianceData {
  name: string;
  score: number;
  fill: string;
}

const data: ComplianceData[] = [
  { name: 'Group A', score: 75, fill: 'hsl(var(--chart-1))' },
  { name: 'Group B', score: 90, fill: 'hsl(var(--chart-2))' },
  { name: 'Group C', score: 60, fill: 'hsl(var(--chart-3))' },
  { name: 'Group D', score: 80, fill: 'hsl(var(--chart-4))' },
];

const ComplianceScorecard = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        innerRadius="20%"
        outerRadius="80%"
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar
          dataKey="score"
          cornerRadius={5}
          background
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default ComplianceScorecard;
