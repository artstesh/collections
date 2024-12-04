import { Forger } from "@artstesh/forger";
import { should } from "@artstesh/it-should";
import { Stack } from '../../src/models/stack';

describe('Stack', () => {
  let stack: Stack<string>;

  beforeEach(() => {
    stack = new Stack<string>();
  });

  it("put", () => {
    const item = Forger.create<string>()!;
    //
    stack.put(item);
    //
    should().number(stack.size).equals(1);
  });

  it("putMany", () => {
    const items = Forger.create<string[]>()!;
    //
    stack.putMany(items);
    //
    should().number(stack.size).equals(items.length);
  });

  it("take success", () => {
    const item = Forger.create<string>()!;
    //
    stack.put(item);
    const took = stack.take();
    //
    should().string(took).equals(item);
  });

  it("take ordered success", () => {
    const items = Forger.create<string[]>({arrayLength: 2})!;
    const expected = items[1];
    //
    stack.putMany(items);
    const took = stack.take();
    //
    should().string(took).equals(expected);
  });

  it("take undefined if empty", () => {
    const item = Forger.create<string>()!;
    //
    stack.put(item);
    stack.take();
    const took = stack.take();
    //
    should().true(took === undefined);
  });

  it("each success", () => {
    let counter = 0;
    class Test {act():void {counter++}}
    const stack = new Stack<Test>();
    const expected = Forger.create<number>({numberMin: 3, numberMax: 10})!;
    stack.putMany(Array.from({length: expected}, (v, i) => new Test()));
    //
    stack.each(e => e.act());
    //
    should().number(counter).equals(expected);
    should().number(stack.size).equals(0);
  });
})
