
function assert(condition) {
    if (!condition) {
        console.error("Test failed");
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.tail = this;
        this.next = undefined;
    }

    append(value) {
        if (this.next == undefined) {
            this.next = new Node(value);
        } else {
            this.next.append(value);
        }
    }

    append2(value) {

        var current = this;

        while (current.next != undefined) {
            current = current.next;
        }

        current.next = new Node(value);
    }
}

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

    prepend(value) {
        if (this.head == undefined) {
            this.head = new Node(value);
            this.tail = this.head;
        } else {
            var newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    removeFirst() {
        if (this.head == undefined) {
            console.error("Cannot execute removeFirst because the list is empty")
        } else {
            var value = this.head.value;
            this.head = this.head.next;
            if (this.head == undefined) {
                this.tail = undefined;
            }
            return value; 
        }
    }

    removeLast() {
        if (this.head == undefined) {
            console.error("Cannot execute removeLast because the list is empty")
        } else {
            var prev = undefined;
            var current = this.head;

            while (current.next != undefined) {
                prev = current;
                current = current.next;
            }

            var value = current.value;

            // if there is only one element in the list
            if (prev == undefined) {
                this.head = undefined;
                this.tail = undefined;
            } else {
                this.tail = prev;
                this.tail.next = undefined;
            }

            return value;
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

var list = new ListWithTail();
list.prepend("A");
list.prepend("B");
list.prepend("C");

assert(list.head.value == "C");
assert(list.head.next.value == "B");
assert(list.head.next.next.value == "A");
assert(list.head.next.next.next == undefined);
assert(list.tail.value == "A");


var list = new ListWithTail();
list.append("A");
list.append("B");
list.append("C");

assert(list.removeFirst() == "A");
assert(list.removeFirst() == "B");
assert(list.removeFirst() == "C");
assert(list.head == undefined);
assert(list.tail == undefined);


var list = new ListWithTail();
list.append("A");
list.append("B");
list.append("C");

assert(list.removeLast() == "C");
assert(list.removeLast() == "B");
assert(list.removeLast() == "A");
assert(list.head == undefined);
assert(list.tail == undefined);


// remove first value
var list = new ListWithTail();
list.append("A");
list.append("B");
list.append("C");

list.removeValue("A");
assert(list.head.value == "B");
assert(list.head.next.value == "C");
assert(list.tail.value == "C");

// remove second value
var list = new ListWithTail();
list.append("A");
list.append("B");
list.append("C");

list.removeValue("B");
assert(list.head.value == "A");
assert(list.head.next.value == "C");
assert(list.tail.value == "C");

// remove last value
var list = new ListWithTail();
list.append("A");
list.append("B");
list.append("C");

list.removeValue("C");
assert(list.head.value == "A");
assert(list.head.next.value == "B");
assert(list.tail.next = undefined);
assert(list.tail.value == "B");