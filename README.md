# birecord

Bi-directional record in type-safe way

## How to use

```sh
npm install birecord
```

```ts
import birecord from "birecord";
// import birecord_for_deno from "https://deno.land/x/birecord/mod.ts";

const x = birecord({ foo: 123, bar: 456, baz: 789 });
const test1 = x.get("foo"); // 123
const test2 = x.get(123); // "foo"
```
