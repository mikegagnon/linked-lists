
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


