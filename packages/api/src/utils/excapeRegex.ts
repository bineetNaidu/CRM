export const escapeRegex = (text: string) =>
  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
