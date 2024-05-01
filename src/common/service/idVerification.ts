import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

export const idVerification = async (userId: string, userFullName: string) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      userid: config.get('SEAMFIX_USERID'),
      publicKey: config.get('SEAMFIX_PUBLICKEY'),
    },
    body: JSON.stringify({
      tokenId: config.get('SEAMFIX_TOKENID'),
      authenticationToken: config.get('SEAMFIX_AUTHTOKEN'),
      linkIdentifier: `${userId} ${new Date().toISOString()}`,
      callbackUrl:
        'https://lisaprop-website-backend.onrender.com/api/webhook/seamfix',
      redirectUrl: 'https://lisaprop-ffee5.web.app/profile',
      personalizationDetail: userFullName,
    }),
  };

  const response = await fetch(
    'https://api.verified.africa/sfx-verify/v3/sdk/generate-api-verification-link',
    options,
  );

  const data = await response.json();

  if (data.status !== 'success') {
    return false;
  }

  return data;
};
