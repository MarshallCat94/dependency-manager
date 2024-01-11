# Dependency Manager
Advanced dependency manager with an inversion-of-control container and decorators written in TypeScript for Node.js projects.

## Contributing
This is an open repository and PRs as well as feedback are welcomed.

## Examples
A couple of examples demonstrating how to use the dependency manager.

### Singleton
An example using the `DependencyManager` class as a _Singleton_.

```typescript
class ConsoleLogger {
  info(data: string);
}

const dependencyManager = DependencyManager.getInstance();
dependencyManager.declare('Logger', new ConsoleLogger());

// Somewhere else in the code
const logger = dependnecyManager.wire('Logger');
logger.info('some message');
```

### Decorators
An approach using the decorator syntax.

```typescript
interface Logger {
  info(data: string);
}

@Injectable('Logger')
class ConsoleLogger implements Logger {
  info(data: string) {
    console.log(data);
  }
}

class Dependant {
  @Inject('Logger')
  protected readonly logger!: Logger;

  someMethod() {
    this.logger.info('Method "someMethod" was called.');
  }
}
```
