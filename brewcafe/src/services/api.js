const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const api = {
  getMenuItems: async () => {
    await delay(400);
    return [
      { id: 1, name: 'Espresso', price: 3.50, category: 'coffee' },
      { id: 2, name: 'Cappuccino', price: 4.50, category: 'coffee' },
    ];
  },

  createBooking: async (bookingData) => {
    await delay(800);
    const booking = {
      success: true,
      id: 'BC' + Date.now(),
      createdAt: new Date().toISOString(),
      ...bookingData,
    };

    const bookings = readStorage('brewcafe_bookings', []);
    writeStorage('brewcafe_bookings', [booking, ...bookings]);
    return booking;
  },

  submitContact: async (formData) => {
    await delay(700);
    const submission = {
      id: 'MSG' + Date.now(),
      submittedAt: new Date().toISOString(),
      ...formData,
    };

    const messages = readStorage('brewcafe_messages', []);
    writeStorage('brewcafe_messages', [submission, ...messages]);

    return { success: true, message: 'Message sent successfully', submission };
  },

  login: async (email, password) => {
    await delay(600);
    const users = readStorage('brewcafe_users', []);
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
    );

    if (!existingUser) {
      throw new Error('Invalid email or password');
    }

    return {
      success: true,
      user: { email: existingUser.email, name: existingUser.name },
      token: 'mock_jwt_token',
    };
  },

  register: async (name, email, password) => {
    await delay(700);
    const users = readStorage('brewcafe_users', []);
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      throw new Error('Account already exists for this email');
    }

    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    writeStorage('brewcafe_users', [newUser, ...users]);

    return {
      success: true,
      user: { email, name },
      token: 'mock_jwt_token',
    };
  },

  forgotPassword: async (email) => {
    await delay(500);
    const users = readStorage('brewcafe_users', []);
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

    if (!exists) {
      throw new Error('No account found for this email');
    }

    return { success: true, message: 'Reset link sent to your email' };
  },
};
