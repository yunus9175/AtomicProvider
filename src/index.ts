import React, { ReactNode, ComponentType } from 'react';

// A provider can be passed either as:
// - a React component, or
// - a tuple of [component, props] when that provider needs configuration.
type ProviderEntry = [ComponentType<any>, Record<string, any>] | ComponentType<any>;

interface AtomicProps {
  // Providers are applied from left to right in the array, but rendered
  // from the inside out so each one wraps the next.
  providers: ProviderEntry[];
  // The app or subtree that should be nested inside the provider stack.
  children: ReactNode;
}

export const AtomicProvider = ({ providers, children }: AtomicProps) => {
  // Build the provider tree by walking the list from the end to the start.
  // The last provider in the array becomes the innermost wrapper.
  return providers.reduceRight((acc, item) => {
    // Allow both shorthand providers and [Provider, props] entries.
    const [Comp, props] = Array.isArray(item) ? item : [item, {}];
    // Each provider receives the accumulated tree as its children.
    return React.createElement(Comp, props, acc);
  }, children);
};
