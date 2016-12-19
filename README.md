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

- The first Fibonacci number (where *n* == 1) is 1
- The second Fibonacci number (where *n* == 2) is 1
- The *n*th Fibonacci number is the sum of
  - the (*n*th - 1) Fibonacci number and
  - the (*n*th - 2) Fibonacci number
  
Therefore the third Fibonacci number (where *n* == 3) equals the second Fibonacci number (*n* == 2) plus the first Fibonacci number (*n* == 1), which equals 1 + 1 = 2.
 
To clarify futher, here is the series of Fibonacci numbers:
 
 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
 
See the pattern? Get it?
 
I assume you get it.

