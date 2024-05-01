export const onlyNum = (length: number) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;

  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Test

export const expiration = (): Date => {
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 2);
  return expirationTime;
};
