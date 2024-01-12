import { InjectionToken } from "../types";
import { DependencyManager } from "../DependencyManager";

export const Injectable = (
  identifier?: InjectionToken,
): ClassDecorator => {
  return (Target: Function) => {
    if (Target.length > 0) {
      throw new TypeError(`Target "${Target.name}" cannot be instantiated.`);
    }

    const dependencyManager = DependencyManager.getInstance();
    dependencyManager.declare(
      identifier ?? Target,
      new (Target as new() => any),
    );
  };
};
