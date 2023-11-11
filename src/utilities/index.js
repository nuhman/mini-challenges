export const debounce = (func, waitTime) => {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, waitTime);
  };
};
