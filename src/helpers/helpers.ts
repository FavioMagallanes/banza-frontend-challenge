export const removeHtmlTags = (html: string): string => {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
};

export const formatValue = (value: string | null | undefined, defaultValue: string = '-') => {
  return value || defaultValue;
};
export const truncateTitle = (title: string, maxLength: number) =>
  title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
