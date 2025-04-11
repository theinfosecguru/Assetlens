'use server';

import { Compute } from '@google-cloud/compute';

/**
 * Represents an asset in GCP.
 */
export interface GCPAsset {
  /**
   * The instance name of the asset.
   */
  instanceName: string;
  /**
   * The zone of the instance.
   */
  instanceZone: string;
  /**
   * The machine type of the instance.
   */
  machineType: string;
  /**
   * The status of the instance.
   */
  status: string;
}

/**
 * Asynchronously retrieves assets from GCP.
 *
 * @returns A promise that resolves to an array of GCPAsset objects.
 */
export async function getGCPAssets(): Promise<GCPAsset[]> {
  try {
    const compute = new Compute();
    const projectId = process.env.GCP_PROJECT_ID;

    if (!projectId) {
      console.error("GCP Project ID not set in environment variables.");
      return [];
    }

    const [instances] = await compute.getInstances({
      projectId: projectId,
    });

    const gcpAssets: GCPAsset[] = [];

    for (const instance of instances) {
      const zone = instance.zone.split('/').pop() || 'N/A';
      gcpAssets.push({
        instanceName: instance.name,
        instanceZone: zone,
        machineType: instance.machineType.split('/').pop() || 'N/A',
        status: instance.status,
      });
    }

    return gcpAssets;

  } catch (error) {
    console.error("Error fetching GCP assets:", error);
    return [];
  }
}
