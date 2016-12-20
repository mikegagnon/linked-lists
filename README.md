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

## Lecture 1. Recursion

A linked list is a "recursive" data structure, and uses "recursive" algorithms.

Recursion essentially means self referential.

So, a recursive data structure refers to itself, and a recursive algorithm refers to itself.

The above gibberish will make sense once we start programming recursive data structures and algorithms.

### Fibonacci numbers

The classic introduction to recursion is via "Fibonacci numbers."

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
