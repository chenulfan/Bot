const Heap = require("heap");


const heap = new Heap( (a,b) => b - a );
heap.push(17);
heap.push(1);
heap.push(2);
heap.push(9);
heap.push(11);
heap.push(4);

while(!heap.empty()){
    console.log(heap.pop());
}


console.log(heap.nodes)