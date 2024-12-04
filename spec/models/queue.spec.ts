import { Forger } from "@artstesh/forger";
import { should } from "@artstesh/it-should";
import { Queue } from '../../src/models/queue';

describe('Queue', () => {
  let queue: Queue<string>;

  beforeEach(() => {
    queue = new Queue<string>();
  });

  it("put", () => {
    const item = Forger.create<string>()!;
    //
    queue.put(item);
    //
    should().number(queue.size).equals(1);
  });

  it("putMany", () => {
    const items = Forger.create<string[]>()!;
    //
    queue.putMany(items);
    //
    should().number(queue.size).equals(items.length);
  });

  it("take success", () => {
    const item = Forger.create<string>()!;
    //
    queue.put(item);
    const took = queue.take();
    //
    should().string(took).equals(item);
  });

  it("take ordered success", () => {
    const items = Forger.create<string[]>({arrayLength: 2})!;
    const expected = items[0];
    //
    queue.putMany(items);
    const took = queue.take();
    //
    should().string(took).equals(expected);
  });

  it("take undefined if empty", () => {
    const item = Forger.create<string>()!;
    //
    queue.put(item);
    queue.take();
    const took = queue.take();
    //
    should().true(took === undefined);
  });

  it("each success", () => {
    let counter = 0;
    class Test {act():void {counter++}}
    const queue = new Queue<Test>();
    const expected = Forger.create<number>({numberMin: 3, numberMax: 10})!;
    queue.putMany(Array.from({length: expected}, (v, i) => new Test()));
    //
    queue.each(e => e.act());
    //
    should().number(counter).equals(expected);
    should().number(queue.size).equals(0);
  });
})
