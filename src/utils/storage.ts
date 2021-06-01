export const AUTH_TOKEN_NAME = 'TWITTER-CLONE-TOKEN';

const checkLocalStorage: () => boolean = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
};

class FallbackStorage {
  fallbackStorage: {
    [key: string]: string;
  } = {};

  valid: boolean = checkLocalStorage();

  setItem<T>(key: string, value: T): void {
    const string = JSON.stringify(value);
    if (this.valid) {
      localStorage.setItem(key, string);
      return;
    }
    this.fallbackStorage[key] = string;
  }

  getItem(key: string): string | null {
    const value = this.valid
      ? localStorage.getItem(key)
      : this.fallbackStorage[key];
    try {
      const parsed = JSON.parse(value || '');
      return parsed;
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }
    delete this.fallbackStorage[key];
  }
}

const storage = new FallbackStorage();

export default storage;
