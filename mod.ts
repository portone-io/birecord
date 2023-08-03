export default function birecord<const T extends Record<any, any>>(
  original: T,
): BiRecord<T> {
  return new BiRecord(original);
}

export class BiRecord<const T extends Record<any, any>> {
  constructor(public original: T, public reversed = reverse(original)) {}
  get<U extends keyof T | T[keyof T]>(
    key: U,
  ): U extends keyof T ? T[U] : U extends T[keyof T] ? Reverse<T>[U] : unknown {
    return this.original[key] ?? this.reversed[key as T[keyof T]];
  }
  has(key: any): key is keyof T | T[keyof T] {
    return key in this.original || key in this.reversed;
  }
}

export function reverse<T extends Record<any, any>>(record: T): Reverse<T> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [value, key]),
  );
}

export type Reverse<T extends Record<any, any>> = { [U in keyof T as T[U]]: U };
