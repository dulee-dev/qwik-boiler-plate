export type OneProp<T> = {
  [P in keyof T]-?: Record<P, T[P]>;
}[keyof T];

export type AtLeastOnePropRequire<T> = T & OneProp<T>;

export type Implements<T, U extends T> = U;

export type ConstObjectValue<T> = T[keyof T];

export type BuildArray<
  T,
  Length extends number,
  Arr extends T[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<T, Length, [...Arr, T]>;

export type Nullable<T> = T | null | undefined;
