
function assert(condition) {
    if (!condition) {
        console.error("Test failed");
    }
}

function factorial(n) {
  if (n <= 0) {
    console.error("The factorial function is not defined when n <= 0");
  } else if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

assert(factorial(1) == 1);
assert(factorial(2) == 2);
assert(factorial(3) == 6);
assert(factorial(4) == 24);
assert(factorial(5) == 120);

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
            var newNode = new Node(value);
            this.next = newNode;
        } else {
            this.next.append(value)
        }
    }

    // Creates a new node to hold value, and prepends the new node to this list
    // making the new node the head of the list.
    //
    // Returns a reference to the new head of the list (which is the newly
    // created node).
    prepend(value) {
        var newNode = new Node(value);

        newNode.next = this;

        return newNode;
    }

    // Deletes the first node in this list.
    //
    // Returns [v, head] where v is the value that was removed, and head
    // is a reference to the new head (possibly undefined).
    removeFirst() {
        return [this.value, this.next];
    }

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
        
        if (this.next == undefined) {
            if (head == this) {
                return [this.value, undefined];
            } else {
                prev.next = undefined;
                return [this.value, head];
            }
        } else {
            return this.next.removeLast(this, head);
        }
    }

    // Deletes the first node with the specified value.
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

    removeValue2(value, prev = undefined, head = this) {

        if (this.value == value) {
            
            // Case (A) `this` == first node AND `this` == last node
            if (this == head && this.next == undefined) {
                return undefined;
            }

            // Case (B) `this` == first node AND `this` != last node
            else if (this == head && this.next != undefined) {
                return this.next;
            }

            // Case (C) `this` != first node AND `this` == last node
            else if (this != head && this.next == undefined) {
                prev.next = undefined;
                return head;
            }

            // Case (D) `this` != first node AND `this` != last node
            else {
                assert(this != head && this.next != undefined);
                prev.next = this.next;
                return head;
            }

        } else if (this.next == undefined) {
            console.error("The list did not contain the value we're looking for");
        } else {
            this.next.removeValue(value, this, head);
            return this;
        }
    }

    // returns the smallest value in the list
    findSmallest() {
        if (this.next == undefined) {
            return this.value;
        } else {
            var smallest = this.next.findSmallest();

            if (this.value < smallest) {
                return this.value;
            } else {
                return smallest;
            }
        }
    }

    // Sorts the list in ascending order.
    // 
    // Returns the head of the new list.
    sort() {
        if (this.next == undefined) {
            return this;
        } else {

            var smallest = this.findSmallest();
            var sublist = this.removeValue(smallest);

            assert(sublist != undefined);

            var sortedSublist = sublist.sort();
            return sortedSublist.prepend(smallest);
        }
    }
}


// Test append(...)
var head = new Node("A");
head.append("B");
head.append("C");

var aNode = head;
var bNode = aNode.next;
var cNode = bNode.next;

assert(aNode.value == "A");
assert(bNode.value == "B");
assert(cNode.value == "C");
assert(cNode.next == undefined);


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



// Test removeLast(...)
var head = new Node("A");
head.append("B");
head.append("C");

var [cValue, cHead] = head.removeLast();
var [bValue, bHead] = cHead.removeLast();
var [aValue, aHead] = bHead.removeLast();

assert(aValue == "A");
assert(bValue == "B");
assert(cValue == "C");

assert(cHead.value == "A");
assert(bHead.value == "A");
assert(aHead == undefined);


// Test for removeValue(...)
var head = new Node("A");
head.append("B");
head.append("C");

bNode = head.removeValue("A");
cNode = bNode.next;
assert(bNode.value == "B");
assert(cNode.next == undefined);
assert(cNode.value == "C");

var head = new Node("A");
head.append("B");
head.append("C");

aNode = head.removeValue("B");
cNode = aNode.next;
assert(aNode.value == "A");
assert(cNode.next == undefined);
assert(cNode.value == "C");

var head = new Node(2);
head.append(3);
head.append(1);

var newHead = head.removeValue(1);
assert(newHead == head);
assert(head.value == 2);
assert(head.next.value == 3);
assert(head.next.next == undefined);

// Test findSmallest(...)
var head = new Node("1");
head.append("2");
head.append("3");
assert(head.findSmallest() == 1);

var head = new Node("2");
head.append("1");
head.append("3");
assert(head.findSmallest() == 1);

var head = new Node("2");
head.append("3");
head.append("1");
assert(head.findSmallest() == 1);


// Test sort()
var head = new Node(1);
head.append(2);
head.append(3);
var sorted = head.sort();

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(bNode.value == 2);
assert(cNode.value == 3);
assert(cNode.next == undefined);


var head = new Node(2);
head.append(1);
head.append(3);
var sorted = head.sort();

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(bNode.value == 2);
assert(cNode.value == 3);
assert(cNode.next == undefined);


var head = new Node(2);
head.append(3);
head.append(1);
var sorted = head.sort();

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(bNode.value == 2);
assert(cNode.value == 3);

