// Utility for persistent storage (localStorage for now, easy to swap for backend)
export const storage = {
  get: (key: string) => {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  // Placeholder for backend integration
  // async setBackend(key: string, value: any) { ... }
  // async getBackend(key: string) { ... }
};
