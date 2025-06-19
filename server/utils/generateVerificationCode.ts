export const generateVerificationCode = (length = 6): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZaabcdefghijklmnopqrstuvwxyz0123456789";
  let verificationCode = "";
  const charLength = characters.length;

  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(
      Math.floor(Math.random() * charLength)
    );
  }
  return verificationCode;
};
