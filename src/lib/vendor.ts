// The vendor of a product is the domain of its product_url: the products table
// has no vendor column.
export function vendorFromUrl(url: string): string {
  try {
    return new URL(url.trim()).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

// PostgREST .or() filter matching every product sold by a vendor.
export function vendorFilter(vendor: string): string {
  return `product_url.ilike.%://${vendor}/%,product_url.ilike.%://www.${vendor}/%`;
}
