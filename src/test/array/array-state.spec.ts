import { ArrayState } from '../../lib/array';

export class NumberArrayState extends ArrayState<number> {}

let numberArrayState = new NumberArrayState([27, 37, 47]);

describe(`ArrayState<number>`, () => {
  beforeEach(() => {
    numberArrayState = new NumberArrayState([27, 37, 47]);
  });
  it(`append()`, () => {
    numberArrayState.append(34);
    expect(numberArrayState.state[3]).toEqual(34);
  });

  it(`at()`, () => {
    expect(numberArrayState.at(2)).toEqual(47);
  });

  it(`clear()`, () => {
    expect(numberArrayState.clear().state).toEqual([]);
  });

  it(`find()`, () => {
    expect(numberArrayState.find(value => value === 37)).toEqual(37);
  });

  it(`filter()`, () => {
    expect(numberArrayState.filter(value => value === 37)).toEqual([37]);
  });

  it(`first()`, () => {
    expect(numberArrayState.first()).toEqual(27);
  });

  it(`insert()`, () => {
    expect(numberArrayState.insert(1, 34).state[1]).toEqual(34);
  });

  it(`last()`, () => {
    expect(numberArrayState.last()).toEqual(47);
  });

  it(`merge()`, () => {
    expect(numberArrayState.merge([34, 0], 1).state).toEqual([27, 34, 0, 37, 47]);
  });

  it(`prepend()`, () => {
    expect(numberArrayState.prepend(34, 0).state).toEqual([34, 0, 27, 37, 47]);
  });

  it(`pick()`, () => {
    expect(numberArrayState.pick(1, 2)).toEqual([37, 47]);
  });

  it(`remove()`, () => {
    expect(numberArrayState.remove(1, 2).at(0)).toEqual(27);
  });

  it(`removeRange()`, () => {
    numberArrayState.merge([34, 35, 36, 37, 38, 39, 40, 41, 42]);
    expect(numberArrayState.removeRange(4, 7).state).toEqual([27, 37, 47, 34, 39, 40, 41, 42]);
  });

  it(`reset()`, () => {
    expect(numberArrayState.reset().state).toEqual([27, 37, 47]);
  });

  it(`swap()`, () => {
    expect(numberArrayState.swap(1, 2).state).toEqual([27, 47, 37]);
    console.log(numberArrayState.state);
  });

  it(`update()`, () => {
    expect(numberArrayState.update(1, 344).state[1]).toEqual(344);
  });
});
console.group(`ArrayState<number>`);
console.info(`numberArrayState.state`, numberArrayState.state);


// Extend the ArrayState class for a specific type
export class Numbers extends ArrayState<number> {
  // Additional custom methods specific to Numbers can be added if needed
}

// Initialize `Numbers`.
const numbers = new Numbers([27, 28, 29]);

// Append a number to the array state
numbers.append(30);
console.log(numbers.state); // Output: [27, 28, 29, 30]

// Insert a number at a specific index
numbers.insert(2, 99);
console.log(numbers.state); // Output: [27, 28, 99, 29, 30]

// Remove a number by index
numbers.remove(1);
console.log(numbers.state); // Output: [27, 99, 29, 30]

// Pick specific indexes
const picked = numbers.pick(0, 2);
console.log(picked); // Output: [27, 29]

// Swap two elements
numbers.swap(1, 3);
console.log(numbers.state); // Output: [27, 30, 29, 99]

// Reset the state to its initial state
numbers.reset();
console.log(numbers.state); // Output: [27, 28, 29]

export class Queue extends ArrayState<number> {
  /**
   * Adds an item to the end of the queue (enqueue operation).
   * @param {number} value - The number to add to the queue.
   * @returns {this}
   */
  public enqueue(value: number): this {
    return this.append(value);
  }

  /**
   * Removes and returns the item at the front of the queue (dequeue operation).
   * @returns {number | undefined} - The dequeued number or undefined if the queue is empty.
   */
  public dequeue(): number | undefined {
    const front = this.first();
    this.remove(0); // Remove the first element
    return front;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   * @returns {number | undefined} - The number at the front of the queue.
   */
  public peek(): number | undefined {
    return this.first();
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} - True if the queue is empty, false otherwise.
   */
  public isEmpty(): boolean {
    return this.length === 0;
  }
}

// Initialize `Queue`.
const queue = new Queue([27, 28, 29]);

// Enqueue a number
queue.enqueue(30);
console.log(`queue.state`, queue.state); // Output: [27, 28, 29, 30]

// Dequeue a number
const dequeued = queue.dequeue();
console.log(dequeued); // Output: 27
console.log(queue.state); // Output: [28, 29, 30]

// Peek at the front of the queue
const front = queue.peek();
console.log(front); // Output: 28

// Check if the queue is empty
console.log(queue.isEmpty()); // Output: false

// Dequeue all items
queue.dequeue();
queue.dequeue();
queue.dequeue();
console.log(queue.isEmpty()); // Output: true

console.groupEnd();
