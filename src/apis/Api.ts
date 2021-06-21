type Arguments<T> = T extends (...args: infer A) => any ? A : never;

abstract class Api {
  abstract apiEndPoints: Record<
    string,
    string | ((...args: Arguments<string | number>) => string)
  >;
}

export default Api;
