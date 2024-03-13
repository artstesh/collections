export class Queue<T> {
  private storage: Record<number, T> = {};
  private head: number = 0;
  private tail: number = 0;

  constructor(private capacity: number = 1000) {}

  put(item: T): this {
    if (this.size === this.capacity) return this;
    this.storage[this.tail] = item;
    this.tail++;
    return this;
  }

  putMany(items: T[]): this {
    items.forEach(i => this.put(i));
    return this;
  }

  take(): T | undefined {
    const item = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;
    return item;
  }

  get size(): number {
    return this.tail - this.head;
  }

  each(action: (e:T) => void) {
    while (this.size) action(this.take()!);
  }
}
