/**
 * Offline Store Manager
 * Provides zero-dependency IndexedDB / LocalStorage hybrid caching for engineering session data
 * Ensures 100% offline calculations, history buffering, and session persistence without auth/server.
 */

const DB_NAME = 'LiftingAdvisorDB';
const DB_VERSION = 1;
const STORE_NAME = 'session_cache';

class OfflineStore {
  private dbPromise: Promise<IDBDatabase> | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      this.initDB();
    }
  }

  private initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  public async setItem<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const db = await this.initDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(value, key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Fallback to localStorage if IndexedDB is blocked
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('[OfflineStore] Failed to write item:', e);
      }
    }
  }

  public async getItem<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;

    try {
      const db = await this.initDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
        req.onerror = () => resolve(null);
      });
    } catch {
      try {
        const local = localStorage.getItem(key);
        return local ? JSON.parse(local) : null;
      } catch {
        return null;
      }
    }
  }

  public async removeItem(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const db = await this.initDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      });
    } catch {
      localStorage.removeItem(key);
    }
  }

  public async clearSession(): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const db = await this.initDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    } catch {
      localStorage.clear();
    }
  }
}

export const offlineStore = new OfflineStore();
