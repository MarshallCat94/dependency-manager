import { Package } from "../utilities/Package";
import { DependencyManager } from "../DependencyManager";

export const Injectable = (
  identifier?: string,
): ClassDecorator => {
  return (Target: Function) => {
    if (Target.length > 0) {
      throw new TypeError(`Target "${Target.name}" cannot be instantiated.`);
    }

    const pkg = Package.getNearest();
    const dependencyManager = DependencyManager.getInstance(pkg.name);

    dependencyManager.declare(
      identifier ?? Target.name,
      new (Target as new() => any),
    );
  };
};
