
class Node {
    constructor(value) {
        this.value = value;
        this.next = undefined;
    }

    append(value) {
        if (this.next == undefined) {
            this.next = new Node(value);
        } else {
            this.next.append(value);
        }
    }
}

var list = new Node(1);
list.append(2);

console.log(list.value);
console.log(list.next.value);
