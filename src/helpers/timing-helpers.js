export const debounce = (
    callback,
    delayAmount
  ) => {
    let timeoutId = null;
    return {
      debounced: (...args) => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          callback(...args);
        }, delayAmount);
      },

      immediate: (...args) => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        callback(...args);
      },
    };
};
