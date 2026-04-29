import React, { ReactNode, ComponentType } from 'react';

type ProviderEntry = [ComponentType<any>, Record<string, any>] | ComponentType<any>;

interface AtomicProps {
  providers: ProviderEntry[];
  children: ReactNode;
}

export const AtomicProvider = ({ providers, children }: AtomicProps) => {
    console.log("AtomicProvider is active!"); // Add this line to confirm that the component is being rendered
  return providers.reduceRight((acc, item) => {
    const [Comp, props] = Array.isArray(item) ? item : [item, {}];
    return React.createElement(Comp, props, acc);
  }, children);
};