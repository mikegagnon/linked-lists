# Linked Lists
This document provides a mini course in linked lists in JavaScript.

A "linked list" is a data structure that stores a list of values.

Linked lists are like arrays, except they have different performance characteristics.

## Prerequisites

Familiarity with JS, particularily object-oriented programming in JS. 

## Contents

- [Lecture 1. Recursion](#lec1)
- [Lecture 2. Node append](#lec2)
- [Lecture 3. Tips for developing recursive functions](#lec3)

## <a name="lec1">Lecture 1. Recursion</a>

> "In order to understand recursion, one must first understand recursion."

A linked list is a "recursive" data structure, and uses "recursive" algorithms.

Recursive simply means self referential.

Rather than elucidating further in English, we'll just dive into the classic example: Fibonacci numbers.

### Fibonacci numbers

Here are the first 9 Fibonacci numbers:
 
1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 
Do you see the pattern?
 
The pattern is this: every Fibonacci number equals the sum of the previous two Fibonacci numbers.

Except for the first two Fibonacci numbers -- the "base cases." By fiat, they are defined to be equal to 1.

Let's write a JS function that computes the *nth* Fibonacci number.

### `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Linked Lists</title>
    <script src="linked-lists.js"></script>
  </head>
</html>
```

### `linked-lists.js`

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

Study the `Node` class:

```js
class Node {
    constructor(value) {
        this.value = value;
        this.next = undefined;
    }

    // Appends value to the end of the list.
    // Does not return anything.
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

Add the `Node` class and usage example into `linked-lists.js`.

### How the `Node` class operates

A `Node` object is an object that stores a value and may (or may not) link to another `Node` object.

Therefore, you can create a chain of nodes.

A chain of nodes is a linked list!

### Visualization

To help make sense of linked lists, we visualize them like so:

<img src="linked-list-01.png">

## <a name="lec3">Tips for developing recursive functions</a>

This lecture may sound like gibberish now.

That's fine because we will concretely explore
how these tips apply to many examples throughout this mini course.

### Tip 1. Base case and recursive case

Every recursive function has at least one "base case" and at least one
"recursive case."

```js
append(value) {

    // base case
    if (this.next == undefined) {
        this.next = new Node(value);
    }

    // recursive case
    else {
        this.next.append(value);
    }
}
```

#### Base case

The *base case* is the situation when the recursive function is at it's last straw
and can no longer be recursed. Without a base case, a recursive function
would become stuck in an infinite loop.

#### Recursive case

The *recursive case* occurs when it is possible for the function to make
progress on the problem by recursively calling the function with a subproblem.

### Tip 2. Assume correctness

Before you begin coding a recursive function, you should document the function.
Specifically, you should precisely document the input to the function and the
return-value for the function.

Then, as you code your function **you must assume your function is correct**
(according to the documentation)!
It's kind of like the inductive step in an inductive proof.

### Tip 3. Solve the problem by solving sub problems

A very useful technique for developing recursive functions, is to write
the function such that it solves the problem by solving sub problems.

For example, say you have a linked list named `head` with 10 nodes.

You call `head.append("A")`.



### Applying these tips for the `append(...)` function

In the `append(...)` function, the base case occurs when we're at the end
of the list. In this situation, we add a new node to the end of the list.

The recursive case occurs whenever the problem can be reduced to a subproblem,
by recursively invoking the function. In the `append(...)` function,
we simply call `append` on the next node.

Let's look at the `append(...)` function with this in mind:

```js
// Appends value to the end of the list.
// Does not return anything.
append(value) {
  // ?
}
```

So, you must assume that whenever you call `append(value)` the function
invocation correctly appends the value to the end of the list.

```js

// Appends value to the end of the list.
// Does not return anything.
append(value) {

    // base case
    if (this.next == undefined) {
        this.next = new Node(value);
    }

    // recursive case
    else {
        this.next.append(value);
    }
}
```

Since we assume the `append(...)` function works as advertised,
we can invoke `this.next.append(value)` and be confident that
our invocation will succeed.

Of course, we may have all sorts of bugs in our function, so our assumption
may not hold to reality.

Nevertheless, your only hope for implementing the recursive case
correctly is by assuming the function is correct.

When your function is buggy, fix the bugs so that your assumption becomes
correct.
