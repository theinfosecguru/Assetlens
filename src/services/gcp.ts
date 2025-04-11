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
}

/**
 * Asynchronously retrieves assets from GCP.
 *
 * @returns A promise that resolves to an array of GCPAsset objects.
 */
export async function getGCPAssets(): Promise<GCPAsset[]> {
  // TODO: Implement this by calling the GCP API.
  return [
    {
      instanceName: 'my-instance',
      instanceZone: 'us-central1-a',
      machineType: 'n1-standard-1',
    },
  ];
}
