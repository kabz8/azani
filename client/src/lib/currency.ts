export const EXCHANGE_RATE = 150; // 1 USD = 150 KES (approximate)

export function convertKESToUSD(kesAmount: number): number {
  return Math.round(kesAmount / EXCHANGE_RATE);
}

export function convertUSDToKES(usdAmount: number): number {
  return usdAmount * EXCHANGE_RATE;
}

export function formatPrice(amount: number, currency: 'KES' | 'USD'): string {
  if (currency === 'USD') {
    return `$${amount}`;
  }
  return `KES ${amount.toLocaleString()}`;
}
