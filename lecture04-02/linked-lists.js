
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


