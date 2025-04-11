'use server';

export async function normalizeAsset(asset: any): Promise<any> {
  // Define a common schema for assets
  const normalizedAsset: any = {
    assetId: asset.id || null,
    ipAddress: asset.ipAddress || null,
    macAddress: asset.macAddress || null,
    hostName: asset.hostName || null,
    location: asset.location || null,
    owner: asset.owner || null,
    lifecycleStage: asset.lifecycleStage || null,
    assetType: asset.assetType || null,
    vulnerabilities: {
      tenable: asset.tenableVulnerabilities || null,
      qualys: asset.qualysVulnerabilities || null,
      attckTechniques: asset.attckTechniques || null,
    },
    isEOL: asset.isEOL || false,
    source: asset.source || null, // e.g., 'AWS', 'Azure', 'Active Directory'
    // Add more common fields as needed
  };

  // Remove null or undefined fields
  Object.keys(normalizedAsset).forEach(key => {
    if (normalizedAsset[key] === null || normalizedAsset[key] === undefined) {
      delete normalizedAsset[key];
    }
  });

  return normalizedAsset;
}

