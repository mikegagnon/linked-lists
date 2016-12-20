
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




