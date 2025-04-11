'use server'
// src/services/qualys.ts
/**
 * Represents a vulnerability finding from Qualys.
 */
export interface QualysVulnerability {
  /**
   * The QID of the vulnerability.
   */
  qid: number;
  /**
   * The vulnerability title.
   */
  title: string;
  /**
   * The severity of the vulnerability.
   */
  severity: number;
}

/**
 * Asynchronously retrieves vulnerabilities from Qualys.
 *
 * @param ipAddress The IP address to retrieve vulnerabilities for.
 * @returns A promise that resolves to an array of QualysVulnerability objects.
 */
export async function getQualysVulnerabilities(ipAddress: string): Promise<QualysVulnerability[]> {
  const qualysApiUsername = process.env.QUALYS_API_USERNAME;
  const qualysApiPassword = process.env.QUALYS_API_PASSWORD;
  const qualysApiUrl = `https://qualysapi.qualys.com/api/2.0/fo/asset/host/?action=list_vm_detections&ips=${ipAddress}`;

  if (!qualysApiUsername || !qualysApiPassword) {
    console.error("Qualys API credentials are not set in environment variables.");
    return [];
  }

  try {
    // Use Buffer.from(...).toString('base64') for base64 encoding
    const authString = Buffer.from(`${qualysApiUsername}:${qualysApiPassword}`).toString('base64');

    const response = await fetch(qualysApiUrl, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/xml', // Adjust content type based on Qualys API requirements
      },
    });

    if (!response.ok) {
      console.error(`Qualys API error for IP ${ipAddress}:`, response.status, response.statusText);
      return [];
    }

    const xmlData = await response.text();

    let DOMParser: any;
    if (typeof window === 'undefined') {
      DOMParser = (await import('xmldom')).DOMParser;
    } else {
      DOMParser = window.DOMParser;
    }

    // Parse the XML data and extract vulnerabilities
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    const detectionNodes = xmlDoc.querySelectorAll('DETECTION');
    const vulnerabilities: QualysVulnerability[] = [];

    detectionNodes.forEach(detectionNode => {
      const qid = parseInt(detectionNode.querySelector('QID')?.textContent || '0');
      const title = detectionNode.querySelector('TITLE')?.textContent || 'Unknown';
      const severity = parseInt(detectionNode.querySelector('SEVERITY')?.textContent || '0');

      vulnerabilities.push({
        qid: qid,
        title: title,
        severity: severity,
      });
    });

    return vulnerabilities;
  } catch (error) {
    console.error(`Error fetching Qualys vulnerabilities for IP ${ipAddress}:`, error);
    return [];
  }
}

