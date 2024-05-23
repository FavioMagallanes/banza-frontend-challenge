export const removeHtmlTags = (html: string): string => {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
};

export const formatValue = (value: string | null | undefined, defaultValue: string = '-') => {
  return value || defaultValue;
};
