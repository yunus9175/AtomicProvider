import React from 'react';

import type { AtomicProps } from './types';
export type { AtomicProps, ProviderEntry } from './types';

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
