import { DependencyManager } from "../DependencyManager";

export const Injectable = (
  identifier?: string,
  instanceName?: string,
): ClassDecorator => {
  return (Target: Function) => {
    if (Target.length > 0) {
      throw new TypeError(`Target "${Target.name}" cannot be instantiated.`);
    }

    const dependencyManager = DependencyManager.getInstance(instanceName);

    dependencyManager.declare(
      identifier ?? Target.name,
      new (Target as new() => any),
    );
  };
};
