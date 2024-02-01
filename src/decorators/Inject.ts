import { DependencyManager } from "../DependencyManager";
import { InjectionToken } from "../types";

export function Inject(
  token: InjectionToken,
  instanceName?: string,
): PropertyDecorator {
  return (
    target: Object,
    property: string | symbol,
  ) => {
    const dependencyManager = DependencyManager.getInstance(instanceName);

    Object.defineProperty(target, property, {
      get: () => dependencyManager.wire(token),
      enumerable: true,
      configurable: true,
    });
  };
}
