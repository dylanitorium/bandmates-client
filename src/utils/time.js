export const clearAllTimeouts = () => {
  let id = setTimeout(null,0);
  while (id--) {
    clearTimeout(id);
  }
}

export const getTimestamp = () => {
  const date = new Date();
  return date.getTime();
}
