export const recursive = <T>(callback: () => Promise<T>) => ({
  for: async (condition: (value: T) => boolean): Promise<T> => {
    const value = await callback();
    if (condition(value)) {
      return value;
    } else {
      return recursive(callback).for(condition);
    }
  },
});
