// Mock API service for demonstration
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Menu items
  getMenuItems: async () => {
    await delay(500);
    return [
      { id: 1, name: 'Espresso', price: 3.50, category: 'coffee' },
      { id: 2, name: 'Cappuccino', price: 4.50, category: 'coffee' },
    ];
  },

  // Bookings
  createBooking: async (bookingData) => {
    await delay(1000);
    return {
      success: true,
      id: 'BC' + Date.now(),
      ...bookingData,
    };
  },

  // Contact form
  submitContact: async (formData) => {
    await delay(1000);
    return { success: true, message: 'Message sent successfully' };
  },

  // User
  login: async (email, password) => {
    await delay(1000);
    return {
      success: true,
      user: { email, name: 'Coffee Lover' },
      token: 'mock_jwt_token',
    };
  },

  register: async (name, email, password) => {
    await delay(1000);
    return {
      success: true,
      user: { email, name },
      token: 'mock_jwt_token',
    };
  },
};