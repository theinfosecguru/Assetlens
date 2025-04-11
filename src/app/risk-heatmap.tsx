'use client';

import React from 'react';
import {
  ResponsiveContainer,
  Treemap,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface RiskData {
  name: string;
  category: string;
  value: number;
}

const data: RiskData[] = [
  { name: 'Asset A', category: 'Category 1', value: 20 },
  { name: 'Asset B', category: 'Category 2', value: 50 },
  { name: 'Asset C', category: 'Category 1', value: 80 },
  { name: 'Asset D', category: 'Category 3', value: 30 },
  { name: 'Asset E', category: 'Category 2', value: 60 },
];

const categories = ['Category 1', 'Category 2', 'Category 3'];

const RiskHeatmap = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        data={data}
        margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
        yAxisId="category"
      >
        <XAxis dataKey="name" />
        <YAxis dataKey="category" type="category" ticks={categories} yAxisId="category"/>
        <Tooltip />
        {
          data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${item.value}, 100%, 50%)`} />
          ))
        }
      </Treemap>
    </ResponsiveContainer>
  );
};

export default RiskHeatmap;
