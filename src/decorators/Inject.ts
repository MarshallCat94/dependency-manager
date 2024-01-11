import { DependencyManager } from "../DependencyManager";

export function Inject(
  identifier: InjectionToken,
): PropertyDecorator {
  return (
    target: Object,
    property: string | symbol,
  ) => {
    const dependencyManager = DependencyManager.getInstance();

    Object.defineProperty(target, property, {
      get: () => dependencyManager.wire(identifier),
      enumerable: true,
      configurable: true,
    });
  };
}
