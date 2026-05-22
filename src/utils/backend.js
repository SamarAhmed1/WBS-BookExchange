const API = 'http://localhost:5001/api';
const TOKEN_KEY = 'be:token';
const CART_KEY = 'be:cart';

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

const normalizeBook = (b) => ({ ...b, id: b._id || b.id });

export const backend = {
  // ── Auth ──────────────────────────────────────────────────────────────────

  async register(name, email, password) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    setToken(data.token);
    return data;
  },

  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  logout() {
    clearToken();
    localStorage.removeItem(CART_KEY);
  },

  isLoggedIn() {
    return !!getToken();
  },

  // ── Books ─────────────────────────────────────────────────────────────────

  async getListings() {
    const books = await apiFetch('/books');
    return books.map(normalizeBook);
  },

  async createListing(payload) {
    const book = await apiFetch('/books', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return normalizeBook(book);
  },

  async getMyBooks() {
    const books = await apiFetch('/books/my-books');
    return books.map(normalizeBook);
  },

  async getSwapCount() {
    return 0;
  },

  // ── Cart (client-side localStorage) ──────────────────────────────────────

  async getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  },

  async addToCart(listingId, quantity = 1) {
    const listings = await this.getListings();
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const existing = cart.find(item => item.listingId === listingId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      const book = listings.find(b => b.id === listingId || b._id === listingId);
      if (!book) throw new Error('Book not found');
      cart.push({ listingId, quantity, book });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  },

  async removeFromCart(listingId) {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const updated = cart.filter(item => item.listingId !== listingId);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    return updated;
  },

  async clearCart() {
    localStorage.removeItem(CART_KEY);
    return [];
  },

  // ── Swap ──────────────────────────────────────────────────────────────────

  async getSwapEligibility(listingId) {
    if (!getToken()) {
      return { eligible: false, reason: 'You must be logged in to swap books.' };
    }
    try {
      const myBooks = await this.getMyBooks();
      const validated = myBooks.filter(b => b.validated);
      if (!validated.length) {
        return {
          eligible: false,
          reason: 'You have no admin-validated books available for swap. List a book first and wait for approval.',
        };
      }
      return {
        eligible: true,
        availableBooks: validated.map(b => ({ id: b._id || b.id, title: b.title, author: b.author, condition: b.condition })),
        message: `You have ${validated.length} validated book(s) available for swap`,
      };
    } catch {
      return { eligible: false, reason: 'Could not check swap eligibility.' };
    }
  },

  async initiateSwap(listingId, userBookId) {
    return apiFetch('/orders/swap', {
      method: 'POST',
      body: JSON.stringify({ targetBookId: listingId, offeredBookId: userBookId }),
    });
  },

  // ── Orders ────────────────────────────────────────────────────────────────

  async createOrder(cartItems, billingInfo) {
    for (const item of cartItems) {
      const bookId = item.book._id || item.book.id || item.listingId;
      await apiFetch('/orders/buy', {
        method: 'POST',
        body: JSON.stringify({
          bookId,
          paymentMethod: billingInfo.paymentMethod,
          shippingAddress: billingInfo.address,
        }),
      });
    }
    localStorage.removeItem(CART_KEY);
    const total = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
    return {
      id: `order_${Date.now()}`,
      deliveryAddress: billingInfo.address,
      paymentMethod: billingInfo.paymentMethod,
      total,
    };
  },

  async getOrders() {
    return apiFetch('/orders/my-orders');
  },
};
