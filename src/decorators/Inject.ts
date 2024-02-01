import { DependencyManager } from "../DependencyManager";

export function Inject(
  reference: string,
  instanceName?: string,
): PropertyDecorator {
  return (
    target: Object,
    property: string | symbol,
  ) => {
    const dependencyManager = DependencyManager.getInstance(instanceName);

    Object.defineProperty(target, property, {
      get: () => dependencyManager.wire(reference),
      enumerable: true,
      configurable: true,
    });
  };
}
