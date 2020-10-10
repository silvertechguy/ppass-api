import axios from "axios";
import crypto from "crypto";

const requestAPIData = async (queryChar: string): Promise<string> => {
  const url = "https://api.pwnedpasswords.com/range/" + queryChar;

  const res = await axios.get(url);

  return res.data;
};

const getPasswordLeaksCount = (hashes: string, hashToCheck: string): number => {
  let count: number = 0;
  const hashesAsArray: RegExpMatchArray | null = hashes.match(/[^\r\n]+/g);
  hashesAsArray!.forEach((hash: string) => {
    const h: string[] = hash.split(":");
    if (h[0] === hashToCheck) {
      count = parseInt(h[1]);
    }
  });
  return count;
};

export const pwnedAPICheck = async (password: string): Promise<number> => {
  const sha1Password = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  const first5Char = sha1Password.slice(0, 5);
  const tail = sha1Password.slice(5);

  const response = await requestAPIData(first5Char);
  return getPasswordLeaksCount(response, tail);
};
