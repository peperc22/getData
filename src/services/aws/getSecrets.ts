import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient();

export const getSecret = async (secretName: string) => {
  try {
    const response = await client.send(new GetSecretValueCommand({
      SecretId: secretName
    }));

    const secretString = response.SecretString ?? null;
    return secretString ? JSON.parse(secretString) : (() => { throw new Error('Secret not found'); })();
  } catch (error) {
    console.error('Error fetching secrets: ', error);
    throw new Error(`Failed to fetch secret ${secretName}: ${error}`);
  }
}