# @artstesh/collections

### Overview

The basic set of collections for the typescript.


### Queue

```typescript
// interface Student {name: string, age: number}
it("take success", () => {
  const queue = new Queue<string>();
  const item = Forger.create<string>()!;
  //
  queue.put(item);
  const took = queue.take();
  //
  should().string(took).equals(item);
});
```


### Dictionary

```typescript
// interface Student {name: string, age: number}
it("take success", () => {
  const dictionary = new Dictionary<string>();
  const key = Forger.create<string>()!;
  const value = Forger.create<string>()!;
  dictionary.put(key, value);
  //
  const took = queue.key();
  //
  should().string(took).equals(value);
});
```

### License

This project is under the MIT license
