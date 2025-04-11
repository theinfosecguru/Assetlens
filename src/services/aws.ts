'use server';

import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";

/**
 * Represents an asset in AWS.
 */
export interface AWSAsset {
  /**
   * The instance ID of the asset.
   */
  instanceId: string;
  /**
   * The type of the instance.
   */
  instanceType: string;
  /**
   * The current state of the instance.
   */
  instanceState: string;
  /**
   * The availability zone of the instance.
   */
  availabilityZone: string;
  /**
   * The launch time of the instance.
   */
  launchTime: Date | undefined;
}

/**
 * Asynchronously retrieves assets from AWS.
 *
 * @returns A promise that resolves to an array of AWSAsset objects.
 */
export async function getAWSAssets(): Promise<AWSAsset[]> {
  try {
    const client = new EC2Client({ region: process.env.AWS_REGION });
    const command = new DescribeInstancesCommand({});
    const response = await client.send(command);

    const awsAssets: AWSAsset[] = [];

    response.Reservations?.forEach(reservation => {
      reservation.Instances?.forEach(instance => {
        awsAssets.push({
          instanceId: instance.InstanceId || 'N/A',
          instanceType: instance.InstanceType || 'N/A',
          instanceState: instance.State?.Name || 'N/A',
          availabilityZone: instance.Placement?.AvailabilityZone || 'N/A',
          launchTime: instance.LaunchTime,
        });
      });
    });

    return awsAssets;

  } catch (error) {
    console.error("Error fetching AWS assets:", error);
    return [];
  }
}
