import { Package } from "../utilities/Package";
import { DependencyManager } from "../DependencyManager";

export function Inject(
  reference: string,
): PropertyDecorator {
  return (
    target: Object,
    property: string | symbol,
  ) => {
    const pkg = Package.getNearest();
    const dependencyManager = DependencyManager.getInstance(pkg.name);

    Object.defineProperty(target, property, {
      get: () => dependencyManager.wire(reference),
      enumerable: true,
      configurable: true,
    });
  };
}
