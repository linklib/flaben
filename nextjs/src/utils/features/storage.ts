import { storageEventName } from "@/utils/constants/constants";

export const storage = {
  get(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (value) return JSON.parse(value);
    } catch (error) {}
  },
  set(key: string, value: {}) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event(storageEventName));
    } catch (error) {}
  },
};
