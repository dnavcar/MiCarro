// Simple in-memory store for demo purposes.
// Keeps an array of product names (strings) added via the UI.

let productNames: string[] = [];

export function addProductName(name: string) {
  productNames.push(name);
  // simple debug output so developer can see additions in Metro logs
  // In production, replace with proper state management or persistency
  // (Context, Redux, or backend API).
  console.log('[cartStore] added product name:', name);
}

export function getProductNames() {
  return [...productNames];
}

export function clearProductNames() {
  productNames = [];
}
