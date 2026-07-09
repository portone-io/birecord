---
"birecord": patch
---

Build with tsdown instead of tsup, and bump TypeScript to 6.x

The emitted ESM and type declarations are semantically unchanged, and type
inference is identical across TypeScript 5.0 through 6.0. The CommonJS bundle
shrinks from 1578 to 683 bytes because rolldown assigns exports directly
instead of emitting esbuild's `__toCommonJS`/`__export` helpers.

Two observable changes exist on the object returned by
`require("birecord")`, neither of which affects normal usage:

- It now carries `Symbol.toStringTag === "Module"`, so
  `Object.prototype.toString.call()` reports `[object Module]` rather than
  `[object Object]`.
- Exports are writable data properties rather than getters, so reassigning
  them no longer throws in strict mode.

Named exports, the `default` export, `__esModule`, and every runtime value
resolve exactly as before.
