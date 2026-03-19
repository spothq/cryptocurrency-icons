export type CdnIconVariant = 'color' | 'icon' | 'white' | 'black';

/**
 * Returns the CDN URL for a cryptocurrency icon.
 *
 * @param name - Icon filename without extension (e.g. 'btc', 'eth')
 * @param variant - Icon variant (default: 'color')
 * @param baseUrl - CDN base URL override (useful for local/staging testing)
 * @returns Full CDN URL with content hash for cache busting
 *
 * @example
 * getCdnIconUrl('btc')
 * // → 'https://cdn.bitgo.com/cryptocurrency-icons/svg/color/btc.svg?v=a1b2c3d4'
 *
 * getCdnIconUrl('eth', 'white')
 * // → 'https://cdn.bitgo.com/cryptocurrency-icons/svg/white/eth.svg?v=e5f6g7h8'
 *
 * getCdnIconUrl('btc', 'color', 'https://staging.cdn.bitgo.com/cryptocurrency-icons')
 * // → 'https://staging.cdn.bitgo.com/cryptocurrency-icons/svg/color/btc.svg?v=a1b2c3d4'
 */
export function getCdnIconUrl(name: string, variant?: CdnIconVariant, baseUrl?: string): string;
