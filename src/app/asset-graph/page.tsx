'use client';

import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface GraphNode {
  id: string;
}

interface GraphLink {
  source: string;
  target: string;
}

const data = {
  nodes: [    
    { id: 'Asset A' },
    { id: 'Asset B' },
    { id: 'Asset C' },
    { id: 'Asset D' },
    { id: 'Asset E' }
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
      <ForceGraph2D        
        graphData={data}
        width={800}
        height={600}
        nodeLabel="id"
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={(node, ctx, globalScale) => { const label = node.id; ctx.font = `12px Sans-Serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "black"; ctx.fillText(label, node.x!, node.y!);}}
      />
    </div>
  );
};

export default AssetGraphPage;
