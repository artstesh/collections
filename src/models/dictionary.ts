/**
 * A generic class representing a dictionary structure with key-value pairs.
 * Provides utilities for adding, updating, removing, and iterating over elements.
 *
 * @template T The type of values in the dictionary.
 */
export class Dictionary<T> {
  public readonly collection: Record<string, T> = {};
  private readonly _keys = new Set<string>();

  /**
   * Retrieves all the keys as an array of strings from the internal data structure.
   *
   * @return {string[]} An array containing the keys.
   */
  public get keys(): string[] {
    return Array.from(this._keys);
  }

  /**
   * Retrieves the number of key-value pairs currently stored.
   *
   * @return {number} The current size of the collection.
   */
  public get size(): number {
    return this._keys.size;
  }

  /**
   * Creates a shallow copy of the given dictionary, optionally applying
   * a transformation function to each element during the cloning process.
   *
   * @param {Dictionary<T>} dic - The dictionary to be cloned.
   * @param {(e: T, k: string) => T} [action] - An optional transformation function
   *        that is called for each element. The function takes the element value and
   *        its key as arguments and returns the modified value.
   * @return {Dictionary<T>} A new dictionary that is a clone of the input dictionary
   *         with transformations applied if the action function is provided.
   */
  public static clone<T>(dic: Dictionary<T>, action?: (e: T, k: string) => T): Dictionary<T> {
    return Dictionary.create(dic.collection, action);
  }

  /**
   * Creates a new Dictionary instance from a given Record, optionally applying an action to each element.
   *
   * @param {Record<string, T>} dic The input dictionary object.
   * @param {(e: T, k: string) => T} [action] An optional callback function to transform each element.
   * The function receives the value and key of each element.
   * @return {Dictionary<T>} A new Dictionary instance populated with the elements from the input dictionary,
   * potentially transformed by the action callback if provided.
   */
  public static create<T>(dic: Record<string, T>, action?: (e: T, k: string) => T): Dictionary<T> {
    const result = new Dictionary<T>();
    Object.entries(dic).forEach(([key, value]) => {
      result.put(key, action ? action(value, key) : value);
    });
    return result;
  }

  /**
   * Finds and returns the first element in the collection that satisfies the provided predicate function.
   *
   * @param {function(T): boolean} predicate - A function used to test each element of the collection. Returns `true` to select the element, `false` otherwise.
   * @return {T | null} The first element in the collection that satisfies the predicate, or `null` if no such element is found.
   */
  public find(predicate: (value: T) => boolean): T | null {
    let result: T | null = null;
    this.forEach((e) => {
      if (result === null && predicate(e)) result = e;
    });
    return result;
  }

  /**
   * Checks if a given key exists within the dictionary.
   *
   * @param {string} key - The key to check for existence in the collection.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  public has = (key: string) => this._keys.has(key);

  /**
   * Retrieves the value associated with the specified key from the collection if it exists.
   *
   * @param {string} key - The key whose associated value is to be retrieved.
   * @return {T | null} The value associated with the specified key, or null if the key does not exist.
   */
  public take(key: string): T | null {
    return this._keys.has(key) ? this.collection[key] : null;
  }

  /**
   * Adds or updates a value associated with the specified key in the collection.
   * If the value is null or undefined, removes the key from the collection.
   *
   * @param {string} key - The key to associate with the value in the collection.
   * @param {T | null} [value] - The value to store in the collection. If null or undefined, the key will be removed.
   * @return {void} Does not return a value.
   */
  public put(key: string, value?: T | null): void {
    if (value == null) return this.rmv(key);
    this.collection[key] = value;
    this._keys.add(key);
  }

  /**
   * Removes a specified key and its associated value from the collection.
   *
   * @param {string} key - The key to be removed from the collection.
   * @return {void} Does not return a value.
   */
  public rmv(key: string): void {
    if (!this._keys.has(key)) return;
    delete this.collection[key];
    this._keys.delete(key);
  }

  /**
   * Adds a new entry or updates an existing entry in the collection based on the provided key.
   * If the key already exists, it fetches the current value, applies the action, and replaces the value.
   * If the key does not exist, it uses the action to create a new value and adds it.
   *
   * @param {string} key - The key associated with the value to add or update.
   * @param {(current: T | null) => T} action - A function that takes the current value (if any) and returns the new value to be stored.
   * @return {void} - Does not return a value.
   */
  public addOrUpdate(key: string, action: (current: T | null) => T): void {
    this.put(key, action(this.take(key)));
  }

  /**
   * Iterates over each element in the collection and executes the provided callback function.
   *
   * @param {function(T, number): void} callback - A function that is called for each element of the collection.
   *                                               It takes two arguments: the current element's value and the index.
   * @return {void} This method does not return a value.
   */
  public forEach(callback: (value: T, index: number) => void): void {
    Array.from(this._keys).forEach((key, index) => {
      callback(this.collection[key], index);
    });
  }
}
