export function formatAddress(address: string) {
  const addressArray = address.split("");
  const firstPart = addressArray.slice(0, 4);
  const midPart = ['.', '.', '.']
  const lastPart = addressArray.slice(-4);

  const shortAddress = [...firstPart, ...midPart, ...lastPart].join("");

  return shortAddress;
}

export const isActive = (linkPath: string, currentUrl: string, exact?: boolean): boolean => {
  const isExact = currentUrl === linkPath;
  const startsWith = (currentUrl.startsWith(linkPath) && linkPath.length > 1);

  return exact ? isExact : startsWith;
}