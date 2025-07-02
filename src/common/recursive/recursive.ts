export const recursive = <T>(condition: (value: T) => boolean) => {
  return async (callback: () => T): Promise<T> => {
    const value = await callback();
    if (condition(value)) {
      return value;
    } else {
      return recursive(condition)(callback);
    }
  };
};
