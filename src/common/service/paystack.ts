import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

export const initiatePayment = async (
  email: string,
  amount: number,
  reference: string,
) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: config.get('PAYSTACK_PUBLICKEY'),
    },
    body: JSON.stringify({
      email,
      amount: amount * 100,
      reference,
    }),
  };

  const response = await fetch(
    'https://api.paystack.co/transaction/initialize',
    options,
  );
  const responseData = await response.json();

  if (responseData.status !== true) {
    return false;
  }

  return responseData.data.authorization_url;
};
