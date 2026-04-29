# AtomicProvider

`AtomicProvider` is a tiny React utility for flattening nested provider trees into a single, readable wrapper.

Instead of writing:

```tsx
<ThemeProvider>
  <ReduxProvider>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </ReduxProvider>
</ThemeProvider>
```

you can compose the same providers in one place and keep your app tree clean.

## Features

- Wraps multiple React providers in a single component
- Accepts providers as plain components or `[Component, props]` tuples
- Reduces provider nesting with a right-to-left composition order
- Lightweight TypeScript package with React peer dependencies

## Installation

```bash
npm install atomicprovider
```

If you are developing locally in this repository:

```bash
npm install
```

## Usage

Import `AtomicProvider` and pass an ordered list of providers.

```tsx
import React from "react";
import { AtomicProvider } from "atomicprovider";

import { ThemeProvider } from "./theme";
import { AuthProvider } from "./auth";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AtomicProvider
      providers={[
        [ThemeProvider, { mode: "dark" }],
        AuthProvider,
        [QueryClientProvider, { client: queryClient }],
      ]}
    >
      {children}
    </AtomicProvider>
  );
}
```

## API

### `AtomicProvider`

```ts
type ProviderEntry = [ComponentType<any>, Record<string, any>] | ComponentType<any>;

interface AtomicProps {
  providers: ProviderEntry[];
  children: ReactNode;
}
```

#### Props

- `providers`: Array of provider components or `[ProviderComponent, props]` tuples
- `children`: The React subtree to wrap

## Composition Order

Providers are applied from right to left.

Given:

```tsx
providers={[
  ProviderA,
  ProviderB,
  ProviderC,
]}
```

the rendered tree becomes:

```tsx
<ProviderA>
  <ProviderB>
    <ProviderC>
      {children}
    </ProviderC>
  </ProviderB>
</ProviderA>
```

This makes the first item in the array the outermost provider.

## Development

```bash
npm run dev
```

Starts `tsup` in watch mode and rebuilds on changes.

```bash
npm run build
```

Builds CommonJS and ESM output plus TypeScript declarations into `dist/`.

```bash
npm run lint
```

Runs the TypeScript compiler for type checking.

## Project Structure

```text
src/
  index.ts
  types.ts
package.json
tsconfig.json
```

## Notes

- The package currently targets React `>=16.8.0`.
- `react` and `react-dom` are peer dependencies.
- Output files are published from `dist/`.

## License

ISC
