const WISHLIST_KEY = 'car_wishlist';

export function getWishlist(): number[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToWishlist(id: number) {
  const current = getWishlist();
  if (!current.includes(id)) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([...current, id]));
  }
}

export function removeFromWishlist(id: number) {
  const updated = getWishlist().filter((item) => item !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
}

export function isInWishlist(id: number): boolean {
  return getWishlist().includes(id);
}
