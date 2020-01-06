
class StorageItem<T>{
  readonly key: string;
  private defaultValue: T | undefined;
  constructor(key: string, defaultValue?: T ) {
    this.key = key;
    this.defaultValue = defaultValue;
  }
  get(): T {
    return getLocalStorage(this.key, this.defaultValue);
  }
  set(val: T): void {
    setLocalStorage(this.key, val);
  }
  remove(): void {
    removeLocalStorare(this.key);
  }
  exists(): boolean {
    return isLocalStorageExists(this.key);
  }
}
function setLocalStorage<T>(name: string, val: T): void {
  if (!localStorage) { 
    return
  }
  localStorage.setItem(name, JSON.stringify(val))
}
function getLocalStorage<T>(name: string, defaultValue?: T ): any {
  if (!localStorage) {
    return defaultValue
  }
  const value = localStorage.getItem(name)
  if (typeof (value) === 'string' && value && value != 'undefined') {
    return JSON.parse(value)
  } else {
    return defaultValue
  }
}
function removeLocalStorare(name: string): void {
  localStorage.removeItem(name)
}
function clearLocalStorage(options?: {
  keepItems?: Array<StorageItem<any>>
}): void {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key === null) {
      continue;
    }
    let keep = false;
    if (options && options.keepItems) {
      for (const keepItem of options.keepItems) {
        if (keepItem.key === key) {
          keep = true;
          break;
        }
      }
    }
    if (!keep) {
      localStorage.removeItem(key);
    }
  }
}
function isLocalStorageExists(name: string): boolean {
  if (!localStorage) {
    return false
  }
  const value = localStorage.getItem(name)
  if (typeof (value) === 'string' && value) {
    return true
  } else {
    return false
  }
}


export const storage = {
  /** 清空本地存储 */
  clearAll: clearLocalStorage,
  /** 获取token */
  buildToken: new StorageItem<string>('token')
};