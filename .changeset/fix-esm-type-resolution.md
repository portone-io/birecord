---
"birecord": patch
---

Fix ESM type resolution by splitting the `types` condition per entry point

The `exports` map exposed a single top-level `types` condition pointing at
`dist/mod.d.ts`. Under `moduleResolution: "node16"`/`"nodenext"`, that CJS
declaration file was selected even when the ESM entry (`dist/mod.mjs`) was
loaded, so importing the package from an ESM context resolved to a
CommonJS-flavored module type:

```
error TS2349: This expression is not callable.
  Type 'typeof import(".../dist/mod")' has no call signatures.
```

`dist/mod.d.mts` was already being emitted but was unreachable through
`exports`. Each condition now carries its own `types`, which fixes the
`FalseCJS` ("Masquerading as CJS") diagnostic reported by
`@arethetypeswrong/cli` and the corresponding `publint` warning.

Consumers using `moduleResolution: "bundler"` or `"node"` (node10), or
requiring the package from CommonJS, are unaffected.
