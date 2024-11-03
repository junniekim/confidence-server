export const generateRandomWord = () => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
  const wordLength = 12;
  let randomWord = "";
  for (let i = 0; i < wordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters[randomIndex];
  }
  return randomWord;
};
