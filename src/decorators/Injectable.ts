import { DependencyManager } from "../DependencyManager";

export const Injectable = (
  name?: string,
  instanceName?: string,
): ClassDecorator => {
  return (Target: Function) => {
    if (Target.length > 0) {
      throw new TypeError(`Target "${Target.name}" cannot be instantiated. Constructor has parameters.`);
    }

    const dependencyManager = DependencyManager.getInstance(instanceName);

    dependencyManager.declare(
      name ?? Target,
      new (Target as new() => any),
    );
  };
};
