'use server'
// src/services/tenable.ts
/**
 * Represents a vulnerability finding from Tenable.
 */
export interface TenableVulnerability {
  /**
   * The plugin ID of the vulnerability.
   */
  pluginId: number;
  /**
   * The vulnerability name.
   */
  vulnerabilityName: string;
  /**
   * The severity of the vulnerability.
   */
  severity: string;
}

/**
 * Asynchronously retrieves vulnerabilities from Tenable.
 *
 * @param ipAddress The IP address to retrieve vulnerabilities for.
 * @returns A promise that resolves to an array of TenableVulnerability objects.
 */
export async function getTenableVulnerabilities(ipAddress: string): Promise<TenableVulnerability[]> {
  const tenableApiKey = process.env.TENABLE_API_ACCESS_KEY;
  const tenableSecretKey = process.env.TENABLE_API_SECRET_KEY;
  const tenableApiUrl = `https://cloud.tenable.com/api/v2/vulnerabilities?ip=${ipAddress}`;

  if (!tenableApiKey || !tenableSecretKey) {
    console.error("Tenable API keys are not set in environment variables.");
    return [];
  }

  try {
    const response = await fetch(tenableApiUrl, {
      headers: {
        'X-ApiKeys': `accessKey=${tenableApiKey};secretKey=${tenableSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Tenable API error for IP ${ipAddress}:`, response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    // Process the Tenable API response to extract vulnerabilities
    const vulnerabilities: TenableVulnerability[] = data.vulnerabilities.map((v: any) => ({
      pluginId: v.plugin_id,
      vulnerabilityName: v.plugin_name,
      severity: v.severity,
    }));

    return vulnerabilities;
  } catch (error) {
    console.error(`Error fetching Tenable vulnerabilities for IP ${ipAddress}:`, error);
    return [];
  }
}

