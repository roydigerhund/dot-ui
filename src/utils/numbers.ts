export const numPad = (num: number, size: number) => {
  return num.toString().padStart(size, '0');
}