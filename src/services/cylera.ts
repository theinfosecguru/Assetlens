'use server'
/**
 * Represents an asset from Cylera.
 */
export interface CyleraAsset {
  /**
   * The device ID from Cylera.
   */
  deviceId: string;
  /**
   * The device type.
   */
  deviceType: string;
  /**
   * The device model.
   */
  deviceModel: string;
}

/**
 * Asynchronously retrieves assets from Cylera.
 *
 * @returns A promise that resolves to an array of CyleraAsset objects.
 */
export async function getCyleraAssets(): Promise<CyleraAsset[]> {
  const cyleraApiUrl = process.env.CYLERA_API_URL;
  const cyleraApiKey = process.env.CYLERA_API_KEY;

  if (!cyleraApiUrl || !cyleraApiKey) {
    console.error("Cylera API URL or API Key not set in environment variables.");
    return [];
  }

  try {
    const response = await fetch(cyleraApiUrl, {
      headers: {
        'X-API-Key': cyleraApiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Cylera API error: ${response.status} - ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    // Adjust the following lines based on the actual structure of the Cylera API response
    const cyleraAssets: CyleraAsset[] = data.map((item: any) => ({
      deviceId: item.id || 'N/A',
      deviceType: item.type || 'N/A',
      deviceModel: item.model || 'N/A',
    }));

    return cyleraAssets;

  } catch (error) {
    console.error("Error fetching Cylera assets:", error);
    return [];
  }
}
