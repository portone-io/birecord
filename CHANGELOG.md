# birecord

## 0.1.2

### Patch Changes

- 3bebda0: Fix ESM type resolution by splitting the `types` condition per entry point

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

- 650f206: Build with tsdown instead of tsup, and bump TypeScript to 6.x

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

- 93763a0: Set up automated npm releases with Changesets and npm trusted publishing
