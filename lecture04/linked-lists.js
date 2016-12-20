
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
}

class DoubleLinkedList {
    constructor(){
        this.head = undefined;
        this.tail = undefined;
    }

    append(value) {
        if (this.head == undefined) {
            this.head = new DoubleLinkedNode(value);
            this.tail = this.head;
        } else {
            var prevTail = this.tail;
            this.tail.next = new DoubleLinkedNode(value);
            this.tail.next.prev = this.tail;
            this.tail = this.tail.next;
        }
    }

    prepend(value) {
        if (this.head == undefined) {
            this.head = new DoubleLinkedNode(value);
            this.tail = this.head;
        } else {
            var newNode = new DoubleLinkedNode(value);
            newNode.next = this.head;

            this.head.prev = newNode;
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
            } else {
                this.head.prev = undefined;
            }

            return value; 
        }
    }

    removeLast() {
        if (this.head == undefined) {
            console.error("Cannot execute removeFirst because the list is empty")
        } else {

            var value = this.tail.value;

            this.tail = this.tail.prev;

            if (this.tail == undefined) {
                this.head = undefined;
            } else {
                this.tail.next = undefined;
            }

            return value;
        }
    }

}

var list = new DoubleLinkedList();
list.append("A");
list.append("B");
list.append("C");

assert(list.head.value == "A");
assert(list.head.prev == undefined);

assert(list.head.next.value == "B");
assert(list.head.next.prev == list.head);

assert(list.head.next.next.value == "C");
assert(list.head.next.next.next == undefined);
assert(list.head.next.next.prev == list.head.next);
assert(list.tail.value == "C");




var list = new DoubleLinkedList();
list.prepend("A");
list.prepend("B");
list.prepend("C");

var cNode = list.head;
var bNode = cNode.next;
var aNode = bNode.next;

assert(cNode.value == "C");
assert(cNode.prev == undefined);

assert(bNode.value == "B");
assert(bNode.prev == cNode);

assert(aNode.value == "A");
assert(aNode.prev == bNode);
assert(aNode == list.tail);






var list = new DoubleLinkedList();
list.append("A");
list.append("B");
list.append("C");

var aNode = list.head;
var bNode = aNode.next;
var cNode = bNode.next;

assert(list.removeFirst() == "A");
assert(list.head.value == "B");
assert(list.head.prev == undefined);

assert(list.removeFirst() == "B");
assert(list.head.value == "C");
assert(list.head.prev == undefined);

assert(list.removeFirst() == "C");
assert(list.head == undefined);
assert(list.tail == undefined);






var list = new DoubleLinkedList();
list.append("A");
list.append("B");
list.append("C");

var aNode = list.head;
var bNode = aNode.next;
var cNode = bNode.next;

assert(list.removeLast() == "C");
assert(list.tail.value == "B");
assert(list.tail.next == undefined);

assert(list.removeLast() == "B");
assert(list.tail.value == "A");
assert(list.tail.next == undefined);

assert(list.removeFirst() == "A");
assert(list.head == undefined);
assert(list.tail == undefined);


