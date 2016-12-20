
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
            this.tail = this.tail.next
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
