const   mongoose = require ("mongoose");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const vaultName = "jekkit-keyvault";
const secretName = "mongooseURI";

secrets(vaultName, secretName)
  .then((uri) => {
    console.log("URI retrieved from Azure Key Vault:", uri);
  })
  .catch((error) => {
    console.error("Error retrieving URI from Azure Key Vault:", error);
  });



async function secrets(vaultName, secretName) {
  // Create a credential object using DefaultAzureCredential
  const credential = new DefaultAzureCredential();

  // Create a SecretClient to interact with Azure Key Vault
  const vaultUrl = `https://${vaultName}.vault.azure.net/`;
  const client = new SecretClient(vaultUrl, credential);

  try {
    // Get the secret value from Azure Key Vault
    const secret = await client.getSecret(secretName);

    // Return the URI
    return secret.value;
  } catch (error) {
    console.error("Error retrieving secret from Azure Key Vault:", error);
    throw error;
  }
}


module.exports = secrets;


