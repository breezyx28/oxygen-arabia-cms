import { randomBytes } from 'crypto';

export function SerialNumberGen(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characterCount = characters.length;

  let serialNumber = '';
  const randomBytesCount = Math.ceil((length * 3) / 4); // Increase randomBytes count to avoid bias
  const randomBytesBuffer = randomBytes(randomBytesCount);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytesBuffer[i % randomBytesCount] % characterCount;
    serialNumber += characters[randomIndex];
  }

  return serialNumber;
}
