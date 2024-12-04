export class Stack<T> {
  private storage: Record<number, T> = {};
  private head: number = -1;

  put(item: T): this {
    this.storage[++this.head] = item;
    return this;
  }

  putMany(items: T[]): this {
    items.forEach((i) => this.put(i));
    return this;
  }

  take(): T | undefined {
    const item = this.storage[this.head];
    if (item) delete this.storage[this.head--];
    return item;
  }

  get size(): number {
    return this.head + 1;
  }

  each(action: (e: T) => void) {
    while (this.size) action(this.take()!);
  }
}
