import { expect } from "chai";
import { DependencyManager } from "./DependencyManager";

describe('DependencyManager', () => {
  describe('getInstance', () => {
    it('returns an instance of DependencyManager', () => {
      const instance = DependencyManager.getInstance();
      expect(instance).to.be.an.instanceOf(DependencyManager);
    });

    context('provided a name', () => {
      it('returns a difference instance of DependencyManager', () => {
        const instanceA = DependencyManager.getInstance('A');
        const instanceB = DependencyManager.getInstance('B');
        expect(instanceA).to.be.an.instanceOf(DependencyManager);
        expect(instanceB).to.be.an.instanceOf(DependencyManager);
        expect(instanceA).to.equal(instanceA);
        expect(instanceA).not.to.equal(instanceB);
      });
    });
  });

  describe('declare', () => {
    it('stores a new dependency', () => {
      const dependency = console;
      const instance = DependencyManager.getInstance();
      instance.declare('Logger', dependency);
    });

    context('provided the same name', () => {
      it('throws an exception', () => {
        const instance = DependencyManager.getInstance();
        const call = () => instance.declare('Logger', 'anything fails');
        expect(call).to.throw();
      });
    });
  });

  describe('wire', () => {
    context('granted dependency "Logger" was declared', () => {
      it('returns that very same instance', () => {
        const instance = DependencyManager.getInstance();
        const dependency = instance.wire('Logger');
        expect(dependency).to.be.equal(console);
      });
    });
  });

  describe('unset', () => {
    context('granted dependency "Logger" was declared', () => {
      it('unlinks the reference', () => {
        const instance = DependencyManager.getInstance();
        instance.unset('Logger');
      });
    });

    context('unsetting same "Logger" dependency again', () => {
      it('throws an exception', () => {
        const instance = DependencyManager.getInstance();
        const call = () => instance.unset('Logger');
        expect(call).to.throw();
      });
    });
  });
});
