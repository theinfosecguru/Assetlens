'use client';

import React from 'react';
import {
  ResponsiveContainer,
  Graph,
  Cell,
  Tooltip,
} from 'recharts';

interface GraphNode {
  name: string;
}

interface GraphLink {
  source: string;
  target: string;
}

const data = {
  nodes: [
    { name: 'Asset A' },
    { name: 'Asset B' },
    { name: 'Asset C' },
    { name: 'Asset D' },
    { name: 'Asset E' },
  ] as GraphNode[],
  links: [
    { source: 'Asset A', target: 'Asset B' },
    { source: 'Asset A', target: 'Asset C' },
    { source: 'Asset B', target: 'Asset D' },
    { source: 'Asset C', target: 'Asset E' },
  ] as GraphLink[],
};

const AssetGraphPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Asset Graph</h1>
      <p className="mb-4">Graphical representation of asset relationships.</p>
      <ResponsiveContainer width="100%" height={600}>
        <Graph data={data} linkCurvature={0.8} linkStroke="#888">
          {
            data.nodes.map((node, index) => (
              <Cell key={`node-${index}`} fill="#82ca9d" />
            ))
          }
          <Tooltip/>
        </Graph>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetGraphPage;
