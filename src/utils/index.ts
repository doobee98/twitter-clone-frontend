type enumType<T> = { [key: string]: T };

export const isEnumType = <E>(
  enumObject: enumType<E>,
  value: unknown,
): value is E => {
  return Object.values(enumObject).includes(value as E);
};
