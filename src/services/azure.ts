'use server';

import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * Represents an asset in Azure.
 */
export interface AzureAsset {
  /**
   * The resource ID of the asset.
   */
  resourceId: string;
  /**
   * The type of the resource.
   */
  resourceType: string;
  /**
   * The location of the resource.
   */
  resourceLocation: string;
  /**
   * The name of the resource.
   */
  name: string;
}

/**
 * Asynchronously retrieves assets from Azure.
 *
 * @returns A promise that resolves to an array of AzureAsset objects.
 */
export async function getAzureAssets(): Promise<AzureAsset[]> {
  try {
    const credential = new DefaultAzureCredential();
    const client = new ResourceGraphClient(credential);
    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

    if (!subscriptionId) {
      console.error("Azure Subscription ID not set in environment variables.");
      return [];
    }

    const query = `Resources | project name, id, type, location`;

    const result = await client.resources(subscriptionId, { query });

    const azureAssets: AzureAsset[] = result.data.map((item: any) => ({
      resourceId: item.id || 'N/A',
      resourceType: item.type || 'N/A',
      resourceLocation: item.location || 'N/A',
      name: item.name || 'N/A',
    }));

    return azureAssets;

  } catch (error) {
    console.error("Error fetching Azure assets:", error);
    return [];
  }
}
