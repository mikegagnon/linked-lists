# Linked Lists
This document provides a mini course in linked lists in JavaScript.

A "linked list" is a data structure that stores a list of values.

Linked lists are like arrays, except they have different performance characteristics.

## Prerequisites

Familiarity with JS, particularily object-oriented programming in JS. 

## Contents

- [Lecture 1. Recursion](#lec1)
 - Example 1. Factorial
 - Example 2. Fibonacci numbers
- [Lecture 2. The `Node` class](#lec2)
 - Linked Lists
 - Visualization
- [Lecture 3. `prepend(...)`](#lec3)
 - Analyzing the performance of `append(...)`
 - Analyzing the performance of `prepend(...)`
 - Summary
- [Lecture 4. `removeFirst(...)`](#lec4)
- [Lecture 5. Steps for developing a recursive function](#lec5)
    - Step 1. Base case(s)
        - Analyze the corner cases
        - Merge cases
    - Step 2. Recursive case
        - Assume correctness
        - Make one step of progress
- [Lecture 6. `removeLast(...)`] (#lec6)
    - Step 1. Base case(s)
        - Analyze the corner cases
        - Merge cases
    - Step 2. Recursive case
        - Assume correctness
        - Make one step of progress
    - Completed function
- [Lecture 7. `removeValue(...)`](#lec7)
    - Step 1. Base case(s)
        - Analyze the corner cases and Merge cases
    - Step 2. Recursive case
        - Assume correctness
        - Make one step of progress    
    - Completed function
- [Lecture 8. `findSmallest()`](#lec8)
    
<br><br><br><br>

## <a name="lec1">Lecture 1. Recursion</a>

> "In order to understand recursion, one must first understand recursion."

A linked list is a "recursive" data structure, and uses "recursive" algorithms.

Recursive simply means self referential.

Rather than elucidating further in English, we'll just dive into a classic example: the "factorial" function.

### Example 1. Factorial

Examples of factorials:

- `factorial(1)` == 1
- `factorial(2)` == 1 &times; 2 == 2
- `factorial(3)` == 1 &times; 2 &times; 3 == 6
- `factorial(4)` == 1 &times; 2 &times; 3 &times; 4 == 24
- `factorial(5)` == 1 &times; 2 &times; 3 &times; 4 &times; 5 == 120
- ...

The recursive definition for the factorial function is:

- `factorial(n) == n` &times; `factorial(n - 1)`, and
- A special case of `factorial(1) == 1`

Let's analyze the recursive defintion of the factorial function.

- `factorial(1)` == 1
- `factorial(2)` == 2 &times; `factorial(1)` == 2 &times; 1 == 2
- `factorial(3)` == 3 &times; `factorial(2)` == 3 &times; 2 == 6
- `factorial(4)` == 4 &times; `factorial(3)` == 4 &times; 6 == 24
- `factorial(5)` == 5 &times; `factorial(4)` == 5 &times; 24 == 120
- ...

Let's write a `factorial(n)` function in JavaScript.

#### `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Linked Lists</title>
    <script src="linked-lists.js"></script>
  </head>
</html>
```

#### `linked-lists.js`

```js
function factorial(n) {
  if (n <= 0) {
    console.error("The factorial function is not defined when n <= 0");
  } else if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(5));
```

View your JS console to verify that `factorial(...)` computes the first 5 factorial numbers correctly.

Actually, it would be better to *unit test* the `factorial(...)` function, rather than viewing results
on the console.

#### Unit Testing

A *unit test* is a piece of code that tests a single unit of code.

Unit testing is awesome and essential.

Here's a unit test for `factorial(...)`:

```js
function assert(condition) {
    if (!condition) {
        console.error("Test failed");
    }
}

assert(factorial(1) == 1);
assert(factorial(2) == 2);
assert(factorial(3) == 6);
assert(factorial(4) == 24);
assert(factorial(5) == 120);
```

#### Unwinding `factorial(...)`

Let's trace the code and see what happens when we call `factorial(4)`.

- `factorial(4)` calls `factorial(3)`
- `factorial(3)` calls `factorial(2)`
- `factorial(2)` calls `factorial(1)`
- `factorial(1)` returns 1
- `factorial(2)` multiplies 2 &times; the result of factorial(1), then returns the product, which is 2
- `factorial(3)` multiplies 3 &times; the result of factorial(2), then returns the product, which is 6
- `factorial(4)` multiplies 4 &times; the result of factorial(3), then returns the product, which is 24

### Example 2. Fibonacci numbers

Here are the first 9 Fibonacci numbers:
 
1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 
Do you see the pattern?
 
The pattern is this: every Fibonacci number equals the sum of the previous two Fibonacci numbers... except for the first two Fibonacci numbers -- the "base cases." By fiat, the first two Fibonacci numbers are defined to be equal to 1.

Let's write a JS function that computes the *nth* Fibonacci number.

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

assert(fibonacci(1) == 1);
assert(fibonacci(2) == 1);
assert(fibonacci(3) == 2);
assert(fibonacci(4) == 3);
assert(fibonacci(5) == 5);
assert(fibonacci(6) == 8);
```

#### Unwinding `fibonacci(...)`

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

#### Proof that `fibonacci(n)` terminates for all values of *n*, where *n* >= 1

This section is optional. I present it just in case you enjoy proofs using mathematical induction.

Recall, a proof via [strong induction](https://en.wikipedia.org/wiki/Mathematical_induction)
works as follows:

- Base case: Prove that the theorem holds when *n* == 1
- Inductive step: Prove that if the theorem holds for all *n* (where 1 <= n), then the theorem also holds for *n + 1*

##### Theorem

`fibonacci(n)` terminates for all values of *n*, where *n* >= 1
 
##### Proof

###### Base case

Clearly, the `fibonacci(n)` function terminates when *n* == 1.

###### Inductive step

Assumption 1: Assume `fibonacci(n)` terminates for all 1 <= *n*.

`fibonacci(n + 1)` invokes `fibonacci(n)` and `fibonacci(n - 1)`.

Therefore if `fibonacci(n)` and `fibonacci(n - 1)` terminate, then `fibonacci(n + 1)` terminates.

Case analysis:

- Case A: If *n == 1*, then `fibonacci(n + 1)` clearly terminates
- Case B: If *n > 1*, then `fibonacci(n + 1)` invokes `fibonacci(n)` and `fibonacci(n - 1)`. Since *n > 1*, we know *1 <= n - 1 < n*, and because we are assuming Assumption 1, we know both of those invocations terminate.

Therefore, `fibonacci(n + 1)` clearly terminates in all cases.

QED.

<br><br><br><br>

## <a name="lec2">Lecture 2. The `Node` class</a>

Study the `Node` class, and type it in to `linked-lists.js`:

```js
class Node {
    constructor(value) {
        this.value = value;
        this.next = undefined;
    }

    // Creates a new node to hold value, and appends the new node to the end
    // of this list.
    //
    // Doesn't return anything.
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

### Linked Lists

Node objects link together via the `next` field.

A chain of nodes is called a linked list.

### Visualization

To help make sense of linked lists, we visualize them like so:

<img src="linked-list-01.png">

<br><br><br><br>


## <a name="lec3">Lecture 3. `prepend(...)`</a>

Study the `prepend` method and its tests. Type in `prepend` and its tests into `linked-lists.js`.

```js
class Node {

   ...

   // Creates a new node to hold value, and prepends the new node to this list,
   // making the new node the head of the list.
   //
   // Returns a reference to the new head of the list (which is the newly
   // created node).
   prepend(value) {
     var newNode = new Node(value);

     newNode.next = this;

     return newNode;
   }
}

// Test prepend(...)
var head = new Node("A");
head = head.prepend("B");
head = head.prepend("C");

var cNode = head;
var bNode = cNode.next;
var aNode = bNode.next;

assert(aNode.value == "A");
assert(bNode.value == "B");
assert(cNode.value == "C");
assert(aNode.next == undefined);
```

Which is more efficient: `append(...)` or `prepend(...)`?

### Analyzing the performance of `append(...)`

It should be clear that the amount of time it takes 
to execute `append(...)` is proportional to the size of the linked list.

For example, if a linked list has 1 billion nodes, then it will
take a long time to execute `append(...)`.

In computer science terminology and notation, we
say the time performance of `append(...)` is *O(N)*, where *N* is the size of the list.

This is called "Big Oh" notation. In a college-level algorithms course, you would
learn the formal mathematical definition of Big O and Big O analysis. In this
mini course, however, we satisfy ourselves with an informal, rough understanding of Big O.

### Analyzing the performance of `prepend(...)`

If should be clear that the amount of time it takes to 
execute `prepend(...)` is independent of the size of the linked list.

To be more precise, `prepend(...)` takes a constant (i.e. non-variable relative to N)
amount of time to execute.

Therefore we say the time performance of `prepend(...)` is *O(1)*  (since 1 is a constant).

### Summary

- `append(...)` is *O(N)* -- slow
- `prepend(...)` is *O(1)* -- fast

<br><br><br><br>

## <a name="lec4">Lecture 4. `removeFirst(...)`</a>

Study the `removeFirst` method and its tests. Type in `removeFirst` and its tests into `linked-lists.js`.

```js
class Node {
 
    ...

    // Deletes the first node in this list.
    //
    // Returns [v, head] where v is the value that was removed, and head
    // is a reference to the new head (possibly undefined).
    removeFirst() {
        return [this.value, this.next];
    }
}

// Test removeFirst(...)
var head = new Node("A");
head.append("B");
head.append("C");

var [aValue, bNode] = head.removeFirst();
var [bValue, cNode] = bNode.removeFirst();
var [cValue, undef] = cNode.removeFirst();

assert(aValue == "A");
assert(bValue == "B");
assert(cValue == "C");

assert(bNode.value == "B");
assert(cNode.value == "C");
assert(undef == undefined);

```

`removeFirst(...)` is *O(1)*

<br><br><br><br>

## <a name="lec5">Lecture 5. Steps for developing a recursive function</a>

This lecture may sound like gibberish now.

That's fine because we will concretely explore these steps throughout this mini course, over and over again.

There are primarily two steps when implementing a recursive function:

- Step 1. Base case(s)
    - Analyze the corner cases
    - Merge cases
- Step 2. Recursive case
    - Assume correctness
    - Make one step of progress

### Step 1. Base case(s)

Every recursive function has at least one "base case" and at least one
"recursive case." Consider the `append(...)` function:

```js
append(value) {

    // Base case
    if (this.next == undefined) {
        this.next = new Node(value);
    }

    // Recursive case
    else {
        this.next.append(value);
    }
}
```

A *base case* is a case that does not invoke recursion (because there is no longer a need for recursion).

For example, if your recursive function is searching for the last element in the list (as in `append(...)`),
the base case would be the case where the last element has been reached.

#### Analyze the corner cases

In a linked-list method (for the base case(s)) these corner cases tend to arise are:

- (A) `this` != first node AND `this` != last node
- (B) `this` != first node AND `this` == last node
- (C) `this` == first node AND `this` != last node
- (D) `this` == first node AND `this` == last node

Make sure your recursive function works for all corner cases.

The way to cover corner cases is to:

1. Implement the code for one corner case
2. Implement the code for another corner case
3. Merge the cases if possible
4. Repeat until you have covered every corner case

#### Merge cases

When you're covering cases you may end up with code that looks something like this:

```js
if (this.head != this && this.next != undefined) {
    // perform Operation A
} else if (this.head != this && this.next == undefined) {
    // perform Operation A
}
```

These two cases can be merged into the following:

```js
if (this.head != this) {
    // perform Operation A
}
```

The merge is possible since Operation A is performed regardless of whether `this.next` is defined.

Whenever you're covering a new corner case, check to see if it can be merged
with an existing case.

Merging cases is desirable because it leads to simplified, concise code.

### Step 2. Recursive case

Every recursive function has at least one "base case" and at least one
"recursive case."

Consider the `append(...)` function:

```js
append(value) {

    // Base case
    if (this.next == undefined) {
        this.next = new Node(value);
    }

    // Recursive case
    else {
        this.next.append(value);
    }
}
```

For a function `f(...)`, the recursive case is the case that invokes `f(...)` recursively.

#### Assume correctness

When developing the recursive case you must assume your function invocation always works exactly as advertised
(according to the documentation).

It's kind of like the inductive step in an inductive proof.

For example in the recursive case of the `append(...)` function,
we assume that if we invoke `node.append(value)`, then the function invocation will correctly append
`value` to the list beginning at `node`.

#### Make one step of progress

In every recursive case, you make exactly one step forward towards the goal.

For example, in `factorial(n)` the recursive case is `return n * factorial(n - 1);`.
It makes one step forward by computing the `factorial(n - 1)`, which is one step down
from `factorial(n)`.

As an other example, in `fibonacci(n)` the recursive case is `return fibonacci(n - 1) + fibonacci(n - 2);`.
It makes one step forward by computing `fibonacci(n - 1)` and `fibonacci(n - 2);`, which
is one step down from `fibonacci(n)`.

As our last example, in `append(value)`, the recursive case is `this.next.append(value);`.
It makes one step forward by computing `this.next.append(value)`, which is
one node away from `this`.
















<br><br><br><br>

## <a name="lec6">Lecture 6. `removeLast(...)`</a>

Let's implement `removeLast(...)`.

```js
class Node {

    // Deletes the last node in this list.
    //
    // Returns [v, newHead] where v is the value that was removed, and
    // newHead is the new head of the list (possibly undefined).
    removeLast() {
        // ?
    }
}
```

Recall the two steps for developing a recursive function:

- Step 1. Base case(s)
    - Analyze the corner cases
    - Merge cases
- Step 2. Recursive case
    - Assume correctness
    - Make one step of progress

### Step 1. Base Case(s)

There is one base case for `removeLast(...)`: when we have reached the end of the list.

Therefore the framework for our function is as follows:

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
removeLast() {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        // ?
    }
    
    // Recursive case
    else {
        // ?
    }
}
```

For the base case, we analyze the corner cases and seek opportunies to merge cases.

#### Analyze the corner cases

Recall the four corner cases:

- (A) `this` != first node AND `this` != last node
- (B) `this` != first node AND `this` == last node
- (C) `this` == first node AND `this` != last node
- (D) `this` == first node AND `this` == last node

We can outright ignore cases (A) and (C), since we know `this` == last node.

Now we only have two cases:

- (B) `this` != first node
- (D) `this` == first node

##### Corner Case (B): `this` != first node AND `this` == last node

Since `this` != first node, we know there is a previous node.

We want to find the previous node, say `prev`, and set `prev.next` to `undefined`, thereby
modifying the list so that `prev` becomes the last node in the list.

Then we want to return `[v, head]` where `v` is the value of the last node, and
`head` is a reference to the first node of the list.

For this to work, we must have a reference for the previous node and a reference for the first node.

###### Finding the `prev` and `head` nodes

Our `removeLast(...)` base case requires a `head` node reference (the first node in the list),
and a `prev` node reference (the previous node in the list, relative to `this`).

There is a very simple solution to our problem: take `prev` and `head` as arguments to `removeLast(...)`:

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeLast(prev, head) { //<-----------------------------------------------------------
    ...
}
```

Client code must now invoke `removeLast` as follows:

```js
var [value, newHead] = head.removeLast(undefined, head);
```

Since we don't want to impose unnecessary burden upon our clients, we use default parameters for our `removeLast(...)` arguments:

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeLast(prev = undefined, head = this) { //<--------------------------------------
    ...
}
```

Now, client code can invoke `removeLast(...)` as before:

```js
var [value, newHead] = head.removeLast();
```

###### Implementing code for Corner Case (B)

Recall, we want to set `prev.next` to `undefined`, thereby
modifying the list so that `prev` becomes the last node in the list.

Then we want to return `[v, head]` where `v` is the value of the last node, and
`head` is a reference to the first node of the list.

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeLast(prev = undefined, head = this) {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        if (this != head) {
            prev.next = undefined;
            return [this.value, head];
        }
    }
    
    // Recursive case
    else {
        // ?
    }
}
```

##### Corner Case (D): `this` == first node AND `this` == last node

Since this node is both the first and the last node, we
know it is the only node in the list.

Therefore, all we need to do is return `[this.value, undefined]` so that
returning `head == undefined` signifies the list is now empty.

Our complete implementation of the base case is therefore:

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeLast(prev = undefined, head = this) {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        if (this != head) {
            prev.next = undefined;
            return [this.value, head];
        } else {
            return [this.value, undefined];
        }
    }
    
    // Recursive case
    else {
        // ?
    }
}
```

#### Merge cases

We cannot merge Corner Case (B) with Corner Case (D) because their operations are not the same.

### Step 2. Recursive Case

Recall, the two tips for the recursive case are:

1. Assume correctness
2. Make one step of progress

#### Assume correctness

We assume that when we invoke `removeLast(prev, head)` it performs the operation correctly and returns the new `[v, head]` where `v` is the value that was removed, and `head` is the new head of the list.

#### Make one step of progress

We want to make one step of progress, so we simply call `this.next.removeLast(prev, head)` and return its value.

We need to ensure we invoke `removeLast(...)` with the correct arguments for `prev`, and `head`.

`head` is simply `head`.

For `prev` though, went to set it to `this`. The reason being is that `this` is the previous node for `this.next`.

Therefore our recurisve case is implemented as follows:

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeLast(prev = undefined, head = this) {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        ...
    }
    
    // Recursive case
    else {
        return this.next.removeLast(this, head); // <------------------------------
    }
}
```

### Completed function

```js
// Deletes the last node in this list.
//
// Returns [v, newHead] where v is the value that was removed, and
// newHead is the new head of the list (possibly undefined).
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeLast(prev = undefined, head = this) {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        if (this != head) {
            prev.next = undefined;
            return [this.value, head];
        } else {
            return [this.value, undefined];
        }
    }
    
    // Recursive case
    else {
        return this.next.removeLast(this, head);
    }
}
```








<br><br><br><br>

## <a name="lec7">Lecture 7. `removeValue(...)`</a>

Let's implement `removeValue(...)`.

```js
class Node {
 
    ...

    // Deletes the first node with the specified value.
    // It is an error if value is not found in the list.
    //
    // Returns the head of the new list, possibly undefined
    removeValue(value) {
        // ?
    }
} 
```

Recall the two steps for developing a recursive function:

- Step 1. Base case(s)
 - Analyze the corner cases
 - Merge cases
- Step 2. Recursive case
 - Assume correctness
 - Make one step of progress

### Step 1. Base Case(s)

There are two base cases for `removeValue(...)`:

1. When we have found the sought-after value
2. When we have reached the end of the list

Therefore the framework for our function is as follows:

```js
// Deletes the first node with the specified value.
// It is an error if value is not found in the list.
//
// Returns the head of the new list, possibly undefined
removeValue(value) {

    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        // ?
    }
    
    // Base Case 2: When we have reached the end of the list
    else if (this.next == undefined) {
        // ?
    }
    
    // Recursive case
    else {
        // ?
    }

}
```

For the second base case, we simply want to report an error message:

```js
// Deletes the node with the specified value.
// It is an error if value is not found in the list.
//
// Returns the head of the new list, possibly undefined
removeValue(value) {

    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        // ?
    }
    
    // Base Case 2: When we have reached the end of the list
    else if (this.next == undefined) {
        console.error("The list did not contain the value we're looking for"); // <---------------
    }
    
    // Recursive case
    else {
        // ?
    }

}
```

The first base case requires more care. It is here we analyze the corner cases and seek opportunies to merge cases.

#### Analyze the corner cases and Merge cases

Recall the four corner cases:

- (A) `this` != first node AND `this` != last node
- (B) `this` != first node AND `this` == last node
- (C) `this` == first node AND `this` != last node
- (D) `this` == first node AND `this` == last node

##### Corner Case (A): `this` != first node AND `this` != last node

In this case, we know that the `this` node is sandwiched between two other nodes.

We want to find the previous node, say `prev`, and set `prev.next` to `this.next`, thereby
modifying the list so that `this` is skipped over.

Then we want to return the head of the list.

For this to work, we must have a reference to the previous node and the first node. We use the same approach from [Lecture 6](#lec6), which is to add `prev` and `head` to the argument list:

```js
// Deletes the first node with the specified value.
// It is an error if value is not found in the list.
//
// Returns the head of the new list, possibly undefined
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeValue(value, prev = undefined, head = this) { // <----------------------------------------

    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        // ?
    }
    
    // Base Case 2: When we have reached the end of the list
    else if (this.next == undefined) {
        console.error("The list did not contain the value we're looking for");
    }
    
    // Recursive case
    else {
        // ?
    }

}
```

Then we can implement Corner Case (A):

```js
// Deletes the node with the specified value.
// It is an error if value is not found in the list.
//
// Returns the head of the new list, possibly undefined
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeValue(value, prev = undefined, head = this) {

    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
    
        // Corner Case (A)
        if (this != head && this.next != undefined) { // <-------------------------------
            prev.next = this.next;
            return head;
        }
        
        ...
    }
    
    // Base Case 2: When we have reached the end of the list
    else if (this.next == undefined) {
        console.error("The list did not contain the value we're looking for");
    }
    
    // Recursive case
    else {
        // ?
    }

}
```

##### Corner Case (B): `this` != first node AND `this` == last node

Here, we want to set `prev.next` equal to `undefined`.

Let's see if we can Merge Corner Case (A) with Corner Case (B), rather than implementing Corner Case (B) as a separate case.

Observe, `this.next == undefined`, since `this` is the last node.

Therefore, we can set `prev.next` equal to `this.next`, which is what we do in Corner Case (A).

Therefore, Corner Case (A) and (B) are equivalent cases, so we can Merge them.

We modify the conditional for Corner Case (A) to include Corner Case (B) as well:

```js
    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        
        // Corner Case (A) and (B)
        if (this != head) { // <----------------------------------------------------
            prev.next = this.next;
            return head;
        }
        
        ...
    }
```

##### Corner Case (C): `this` == first node AND `this` != last node

Here, we simply want to change the head of the list to `this.next`.

Let's see if we can Merge Corner Case (C) with (A) or (B), rather than implementing Corner Case (C) as a separate case.

Clearly, we can't make this Merge because (A) and (B) return `head` and it is impossible for `head` to be equal to `this.next`.

So, we implement (C) by defining an `else if` statement that returns `this.next`:

```js
    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        
        // Corner Case (A) and (B)
        if (this != head) {
            prev.next = this.next;
            return head;
        }
        
        // Corner Case (C)
        else if (this.next != undefined) // <----------------------------------------------------
            return this.next
        }

        ...
    }
```

##### Corner Case (D): `this` == first node AND `this` == last node

In this case, `this` is the only node. Therefore, we want to return `undefined` which signifies an empty list.

Let's see if we can Merge Corner Case (C) and (D), rather than implementing Corner Case (D) as a separate case.

Observe, `this.next == undefined`, since `this` is the last node.

Therefore, we can Merge (C) and (D) by returning `this.next` to achieve the desired effect.

We modify the conditional for Corner Case (C) to include Corner Case (D). We simplify change the `else if` to an `else`:

```js
    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        
        // Corner Case (A) and (B)
        if (this != head) {
            prev.next = this.next;
            return head;
        }
        
        // Corner Case (C) and (D)
        else { // <----------------------------------------------------
            return this.next
        }

        ...
    }
```

### Step 2. Recursive case

Recall, the two tips for the recursive case are:

1. Assume correctness
2. Make one step of progress

#### Assume correctness

So, we assume that when we invoke `removeValue(value, prev, head)` it performs the operation correctly and returns the new head of the list.

#### Make one step of progress

We want to make one step of progress, so we simply call `this.next.removeValue(value, prev, head)` and return its value.

We need to ensure we invoke `removeValue(...)` with the correct arguments for `value`, `prev`, and `head`.

`value` is simply `value`, and `head` is simply `head`.

For `prev` though, went to set it to `this`. The reason being is that `this` is the previous node for `this.next`.

Therefore our recurisve case is implemented as follows:

```js
// Deletes the node with the specified value.
// It is an error if value is not found in the list.
//
// Returns the head of the new list, possibly undefined
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeValue(value, prev = undefined, head = this) {

    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
        ...
    }
    
    // Base Case 2: When we have reached the end of the list
    else if (this.next == undefined) {
        ...
    }
    
    // Recursive case
    else {
        return this.next.removeValue(value, this, head); // <-----------------------------------
    }

}
```

### Completed function

```js
// Deletes the node with the specified value.
// It is an error if value is not found in the list.
//
// Returns the head of the new list, possibly undefined
//
// Arguments:
//   prev is a reference to the previous node. If there is no previous node,
//   then set prev to undefined.
//   head is a reference to the first node in the list.
removeValue(value, prev = undefined, head = this) {

    // Base Case 1: When we have found the sought-after value
    if (this.value == value) {
    
        // Corner Case (A) and (B)
        if (this != head) {
            prev.next = this.next;
            return head;
        }
        
        // Corner Case (C) and (D)
        else {
            return this.next;
        }
    }
    
    // Base Case 2: When we have reached the end of the list
    else if (this.next == undefined) {
        console.error("The list did not contain the value we're looking for");
    }
    
    // Recursive case
    else {
        return this.next.removeValue(value, this, head);
    }

}
```








<br><br><br><br>

## <a name="lec8">Lecture 8. `findSmallest(...)`</a>

Let's implement `removeValue(...)`.

```js
class Node {
 
    ...

    // Finds and returns the smallest value in this list
    findSmallest(value) {
        // ?
    }
} 
```

Recall the two steps for developing a recursive function:

- Step 1. Base case(s)
 - Analyze the corner cases
 - Merge cases
- Step 2. Recursive case
 - Assume correctness
 - Make one step of progress

### Step 1. Base Case(s)

There is one base casee for `findSmallest(...)`: when we have reached the end of the list.

Therefore the framework for our function is as follows:

```js
// Finds and returns the smallest value in this list
findSmallest() {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        // ?
    }
    
    // Recursive case
    else {
        // ?
    }

}
```

#### Analyze the corner cases
analyze the corner cases and seek opportunies to merge cases.

#### Analyze the corner cases and Merge cases

Recall the four corner cases:

- (A) `this` != first node AND `this` != last node
- (B) `this` != first node AND `this` == last node
- (C) `this` == first node AND `this` != last node
- (D) `this` == first node AND `this` == last node

We can outright ignore cases (A) and (C), since we know `this` == last node.

Now we only have two cases:

- (B) `this` != first node
- (D) `this` == first node

##### Corner Cases (B) and (D)

In this case *this* list has only one node (the last node), therefore
`this.value` is the smallest value in *this* list, therefore
we simply want to return `this.value`.

You may be confused because we know there is a first node that is not *this*.
However, this first node is not a part of *this* list. Rather, it
is a part of the outermost parent list.

According to the documentation for `findSmallest`, the `findSmallest`
function "*Finds and returns the smallest value in this list*."
So even if the first node's value is smaller
than `this.value`, we still want to return `this.value` because
`this` is the *one and only* node in `this` list --
the first node is not a part of *this* list.

We also observe that in Case (D) we want to return `this.value`.

Since Cases (B) and (D) perform the same operation (returning `this.value`),
we can merge them.

Our final base case code is therefore as follows:

```js
// Finds and returns the smallest value in this list
findSmallest() {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        return this.value;
    }
    
    // Recursive case
    else {
        // ?
    }

}
```

### Step 2. Recursive case

Recall, the two tips for the recursive case are:

1. Assume correctness
2. Make one step of progress

#### Assume correctness

We assume that when we invoke `node.findSmallest()` it performs the operation correctly and returns the new `smallest`, where `smallest` is the smallest value in the list beginning at `node`.

#### Make one step of progress

We want to make one step of progress, so we call `var smallest = this.next.findSmallest()`.

This gives us the smallest value in the `this.next` list.
But it is not necessarily the smallest value in `this` list because `this.value` might be smaller than `smallest`.

Therefore, we must check if `this.value < smallest`.

Our recurisve case (and the completed function) is then implemented as follows:

```js
// Finds and returns the smallest value in this list
findSmallest() {

    // Base Case: When we have reached the end of the list
    if (this.next == undefined) {
        return this.value;
    }
    
    // Recursive case
    else {
        var smallest = this.next.findSmallest();

        if (this.value < smallest) {
            return this.value;
        } else {
            return smallest;
        }
    }

}
```

### Completed function
