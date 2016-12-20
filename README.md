# Linked Lists
This document provides a mini course in linked lists in JavaScript.

A "linked list" is a data structure that stores a list of values.

It's kind of like an array, except list operations have different performance characteristics compared to arrays.

For example:

- In an array, it is quick to retrieve the *n*th element
- In a linked list, it is relatively slow to retrive the *n*th element 

## Prerequisites

Familiarity with JS, particularily object-oriented programming in JS. 

## Contents

- [Lecture 1. Recursion](#lec1)
- [Lecture 2. Node append](#lec2)
- [Lecture 3. ListWithTail](#lec3)

## <a name="lec1">Lecture 1. Recursion</a>

> "In order to understand recursion, one must first understand recursion."

A linked list is a "recursive" data structure, and uses "recursive" algorithms.

Recursion essentially means self referential.

So, a recursive data structure refers to itself, and a recursive algorithm refers to itself.

The above gibberish will make sense once we start programming recursive data structures and algorithms.

### Fibonacci numbers

The classic introduction to recursive algorithms is via "Fibonacci numbers."

A Fibonacci number is defined as follows:

- The first Fibonacci number is 1
- The second Fibonacci number is 1
- The *n*th Fibonacci number is the sum of
  - the (*n*th - 1) Fibonacci number and
  - the (*n*th - 2) Fibonacci number
  
Therefore the third Fibonacci number (where *n* == 3) equals the second Fibonacci number (*n* == 2) plus the first Fibonacci number (*n* == 1), which equals 1 + 1 = 2.
 
To clarify futher, here is the series of Fibonacci numbers:
 
 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 
See the pattern? Get it?
 
I assume you get it.

Fibonacci numbers are recurisve because the *n*th Fibonacci number is defined in terms of other Fibonacci numbers.

Let's write a JS function that computes the *nth* Fibonacci number.

### `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Linked Lists</title>
    <script src="recursion.js"></script>
  </head>
</html>
```

### `recursion.js`

```js
function fibonacci(n) {
  if (n <= 0) {
    console.error("Fiboncci numbers are not defined when n <= 0");
  } else if (n == 1 || n == 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

console.log(fibonacci(1));
console.log(fibonacci(2));
console.log(fibonacci(3));
console.log(fibonacci(4));
console.log(fibonacci(5));
console.log(fibonacci(6));
```

View your JS console to verify that `fibonacci(...)` computes the first 6 Fibonacci numbers correctly.

Actually, it would be better to *unit test* the `fibonacci(...)` function, rather than viewing results
on the console.

### Unit Testing

A *unit test* is a piece of code that tests a single unit of code.

Unit testing is awesome and essential.

Here's a unit test for `fibonacci(...)`:

```js
function assert(condition) {
    if (!condition) {
        console.error("Test failed");
    }
}

assert(fibonacci(1) == 1);
assert(fibonacci(2) == 1);
assert(fibonacci(3) == 2);
assert(fibonacci(4) == 3);
assert(fibonacci(5) == 5);
assert(fibonacci(6) == 8);
```

### Unwinding `fibonacci(...)`

Let's trace the code and see what happens when we call `fibonacci(3)`.

- `fibonacci(3)` calls `fibonacci(2)` (*n* - 1)
  - `fibonacci(2)` returns `1`
- `fibonacci(3)` calls `fibonacci(1)` (*n* - 2)
  - `fibonacci(1)` returns `1`
- `fibonacci(3)` sums the result of `fibonacci(2)` and `fibonacci(1)`, and returns 2 (which is 1 + 1)

Ok.  Now let's trace a call to `fibonacci(4)`

- `fibonacci(4)` calls `fibonacci(3)` (*n* - 1)
  - The entire call sequence for `fibonacci(3)` executes (see above) and yields 2
- `fibonacci(4)` calls `fibonacci(2)` (*n* - 2)
  - `fibonacci(2)` returns `1`
- `fibonacci(4)` sums the result of `fibonacci(3)` and `fibonacci(2)`, and returns 3 (which is 2 + 1)

Get it?

### Proof that `fibonacci(n)` terminates for all values of *n*, where *n* >= 1

This section is optional and silly. I present it just in case you enjoy elementary proofs using mathematical induction.

Recall, a proof via [strong induction](https://en.wikipedia.org/wiki/Mathematical_induction)
works as follows:

- Base case: Prove that the theorem holds when *n* == 1
- Inductive step: Prove that if the theorem holds for all *n* (where 1 <= n), then the theorem also holds for *n + 1*

#### Theorem

`fibonacci(n)` terminates for all values of *n*, where *n* >= 1
 
#### Proof

##### Base case

Clearly, the `fibonacci(n)` function terminates when *n* == 1.

##### Inductive step

Assumption 1: Assume `fibonacci(n)` terminates for all 1 <= *n*.

`fibonacci(n + 1)` invokes `fibonacci(n)` and `fibonacci(n - 1)`.

Therefore if `fibonacci(n)` and `fibonacci(n - 1)` terminate, then `fibonacci(n + 1)` terminates.

Case analysis:

- Case A: If *n == 1*, then `fibonacci(n + 1)` clearly terminates
- Case B: If *n > 1*, then `fibonacci(n + 1)` invokes `fibonacci(n)` and `fibonacci(n - 1)`. Since *n > 1*, we know *1 <= n - 1 < n*, and because we are assuming Assumption 1, we know both of those invocations terminate.

Therefore, `fibonacci(n + 1)` clearly terminates in all cases.

QED.

## <a name="lec2">Lecture 2. Node append</a>

Now that you know recursive algorithms, it's time to learn recursive data structures.

Study the data structure:

```js
class Node {
    constructor(value) {
        this.value = value;
        this.next = undefined;
    }

    append(value) {
        if (this.next == undefined) {
            this.next = new Node(value);
        } else {
            this.next.append(value);
        }
    }
}
```

You use it like this:

```js
var head = new Node("A");
head.append("B");
head.append("C");

assert(head.value == "A");
assert(head.next.value == "B");
assert(head.next.next.value == "C");
assert(head.next.next.next == undefined);
```

Study the `Node` class and the above usage example until it starts to makes sense.
Also, add the `Node` class and usage example into `linked-lists.js`.

A `Node` object is an object that stores a value and may (or may not) link to another `Node` object.

Therefore, you can create a chain of nodes.

A chain of nodes is a linked list!

### Visualization

To help students understand linked lists, we typically visualize them like so:

<img src="linked-list-01.png">

### Non-recursive `append(...)`

Here's a new method on `Node` that does the exact same thing as `append(...)`, except
this new method is non-recursive.

```js
class Node {

  ...

  append2(value) {

      var current = this;

      while (current.next != undefined) {
          current = current.next;
      }

      current.next = new Node(value);
  }
}
```

Do you see how it works?

Here's a graphical representation of what happens:

<img src="append2.png">

Essentially, the `current` variable iterates over each node, until it finds a node 
with `current.next == undefined`, which is the last node.

Having found the last node, it sets last-node.next to a `new Node(value)`, thereby
appending the `value` to the end of the list.

## <a name="lec3">Lecture 3. ListWithTail</a>

Notice, each call to `append(...)` and `append2(...)` requires
execution time that is proportional to the number of nodes in the list.

I.e.: if there are *N* nodes in the list, then `append(...)` and `append2(...)`
each require execution time that is proportional to *N*.

If *N* is large, say *N* is one billion, then the append functions will
take a long time.

This slow performance is undesirable.

Here we define a new data structure (and a new append algorithm)
that requires a *constant* amount of execution time (i.e. a short
execution time), regardless of how large *N* is.

```js
class ListWithTail {
    constructor(){
        this.head = undefined;
        this.tail = undefined;
    }

    append(value) {
        if (this.head == undefined) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(value);
            this.tail = this.tail.next;
        }
    }
}

var list = new ListWithTail();
list.append("A");
list.append("B");
list.append("C");

assert(list.head.value == "A");
assert(list.head.next.value == "B");
assert(list.head.next.next.value == "C");
assert(list.head.next.next.next == undefined);
assert(list.tail.value == "C");
```
