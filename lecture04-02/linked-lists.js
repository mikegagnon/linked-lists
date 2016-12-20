
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
}

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


