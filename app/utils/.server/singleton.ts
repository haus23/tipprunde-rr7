/**
 * Provide a singleton instance (fighting HMR in development)
 *
 * @param name Key to use in the singleton record store
 * @param factory Function to provide/create the singleton
 * @returns Singleton instance
 */
export function singleton<Value>(name: string, factory: () => Value) {
  const g = (global as typeof globalThis) && {
    __singletons: {} as Record<typeof name, Value>,
  };
  g.__singletons ??= {};

  let instance = g.__singletons[name];
  if (!instance) {
    instance = g.__singletons[name] = factory();
  }
  return instance;
}
