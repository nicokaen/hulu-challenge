export function getImage(url: string, size: string, format = 'jpeg') {
  return `${url}&size=${size}&format=${format}`;
}
