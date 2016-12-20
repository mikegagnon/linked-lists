
function assert(condition) {
    if (!condition) {
        console.error("Test failed");
    }
}

class DoubleLinkedNode {
    constructor(value) {
        this.value = value;
        this.next = undefined;
        this.prev = undefined;
    }

    append(value) {
        if (this.next == undefined) {
            var newNode = new DoubleLinkedNode(value);
            this.next = newNode;
            newNode.prev = this;
        } else {
            this.next.append(value)
        }
    }

    // returns the new head pointer
    prepend(value) {
        var newNode = new DoubleLinkedNode(value);

        this.prev = newNode;
        newNode.next = this;

        return newNode;
    }


    // returns [v, head] where v is the value that was removed, and head
    // is the new head pointer (possibly undefined).
    removeFirst() {
        if (this.next == undefined) {
            return [this.value, undefined];
        } else {
            this.next.prev = undefined;
            return [this.value, this.next];
        }
    }


    // returns [v, noMoreNodes] where v is the value that was removed, and
    // noMoreNodes is true iff the there are no more nodes in the list
    removeLast() {
        if (this.next == undefined && this.prev == undefined) {
            return [this.value, true];
        } else if (this.next == undefined) {
            this.prev.next = undefined;
            return [this.value, false];
        } else {
            return this.next.removeLast();
        }
    }

    // returns the head of the new list, possibly undefined
    removeValue(value, head = this) {
        if (this.value == value) {

            if (this.prev == undefined) {
                head = this.next;
            } else {
                this.prev.next = this.next;
            }

            if (this.next != undefined) {
                this.next.prev = this.prev;
            }

            return head;

        } else if (this.next == undefined) {
            console.error("Did not find the value");
        } else {
            return this.next.removeValue(value, head);
        }
    }

    // returns the smallest value in the list;
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

    // Returns a new linked list, containg all the elements in this linked list,
    // but in sorted order
    sort() {
        if (this.next == undefined) {
            this.prev = undefined;
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
var head = new DoubleLinkedNode("A");
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
var head = new DoubleLinkedNode("A");
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
var head = new DoubleLinkedNode("A");
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
var head = new DoubleLinkedNode("A");
head.append("B");
head.append("C");

var [cValue, cNoMoreNodes] = head.removeLast();
var [bValue, bNoMoreNodes] = head.removeLast();
var [aValue, aNoMoreNodes] = head.removeLast();

assert(aValue == "A");
assert(bValue == "B");
assert(cValue == "C");

assert(!cNoMoreNodes);
assert(!bNoMoreNodes);
assert(aNoMoreNodes);

// Test for removeValue(...)
var head = new DoubleLinkedNode("A");
head.append("B");
head.append("C");

bNode = head.removeValue("A");
cNode = bNode.next;
assert(bNode.prev == undefined);
assert(bNode.value == "B");
assert(cNode.prev == bNode);
assert(cNode.next == undefined);
assert(cNode.value == "C");

var head = new DoubleLinkedNode("A");
head.append("B");
head.append("C");

aNode = head.removeValue("B");
cNode = aNode.next;
assert(aNode.prev == undefined);
assert(aNode.value == "A");
assert(cNode.prev == aNode);
assert(cNode.next == undefined);
assert(cNode.value == "C");

// Test findSmallest(...)
var head = new DoubleLinkedNode("1");
head.append("2");
head.append("3");
assert(head.findSmallest() == 1);

var head = new DoubleLinkedNode("2");
head.append("1");
head.append("3");
assert(head.findSmallest() == 1);

var head = new DoubleLinkedNode("2");
head.append("3");
head.append("1");
assert(head.findSmallest() == 1);

// Test sort()
var head = new DoubleLinkedNode(1);
head.append(2);
head.append(3);
var sorted = head.sort();

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(aNode.prev == undefined);
assert(bNode.value == 2);
assert(bNode.prev == aNode);
assert(cNode.value == 3);
assert(cNode.prev == bNode);
assert(cNode.next == undefined);


var head = new DoubleLinkedNode(2);
head.append(1);
head.append(3);
var sorted = head.sort();

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(aNode.prev == undefined);
assert(bNode.value == 2);
assert(bNode.prev == aNode);
assert(cNode.value == 3);
assert(cNode.prev == bNode);
assert(cNode.next == undefined);


var head = new DoubleLinkedNode(2);
head.append(3);
head.append(1);
var sorted = head.sort();

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(aNode.prev == undefined);
assert(bNode.value == 2);
assert(bNode.prev == aNode);
assert(cNode.value == 3);
assert(cNode.prev == bNode);