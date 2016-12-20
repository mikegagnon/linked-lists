
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



