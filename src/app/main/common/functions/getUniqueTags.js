export const getUniqueTags = (array) => {
  let uniqueTags = [];
  array.forEach((tagValue) => {
    if (!uniqueTags.includes(tagValue)) {
      uniqueTags.push(tagValue);
    }
  });
  return uniqueTags;
};
