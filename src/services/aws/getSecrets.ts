import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";

dotenv.config();

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

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
