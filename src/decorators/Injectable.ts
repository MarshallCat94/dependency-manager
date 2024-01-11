import { DependencyManager } from "../DependencyManager";

export const Injectable = (
  identifier?: InjectionToken,
): ClassDecorator => {
  return (Target: any) => {
    const dependencyManager = DependencyManager.getInstance();
    dependencyManager.declare(identifier ?? Target.name, new Target());
  };
};
