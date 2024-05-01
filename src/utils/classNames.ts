export const classNames = (
  ...classes: (string | undefined | false | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
