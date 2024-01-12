import { expect } from 'chai';
import { Injectable } from './Injectable';

describe('Injectable', () => {
  it('returns a ClassDecorator', () => {
    const decorator = Injectable();
    expect(decorator).to.be.an.instanceOf(Function);
  });

  context('decorator is placed on an class, whose constructor has parameters', () => {
    class Point {
      constructor(X: number, Y: number) {}
    }

    it('throws an exception', () => {
      const call = () => Injectable()(Point);
      expect(call).to.throw(TypeError);
    });
  });
});
