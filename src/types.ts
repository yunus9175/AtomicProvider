import type { ComponentType, ReactNode } from 'react';

// A provider can be passed either as:
// - a React component, or
// - a tuple of [component, props] when that provider needs configuration.
export type ProviderEntry = [ComponentType<any>, Record<string, any>] | ComponentType<any>;

export interface AtomicProps {
  // Providers are applied from left to right in the array, but rendered
  // from the inside out so each one wraps the next.
  providers: ProviderEntry[];
  // The app or subtree that should be nested inside the provider stack.
  children: ReactNode;
}
