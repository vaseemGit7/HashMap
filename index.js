import HashMap from "./hashMap.js";

//Initialize with capacity of 16 and loadfactor of 0.75
const test = new HashMap(16, 0.75);

//Populate with key value pairs
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.get("dog")); // returns the entry { key: 'dog', value: 'brown' }
test.set("moon", "silver"); // adds new entry, exceeds load factor and triggers rehash
console.log("The number of stored keys", test.length()); // 13

console.log("Removed ", test.remove("dog")); // Removes the entry with key:dog and returns true
console.log("Has Dog ?", test.has("dog")); // Returns false
console.log("The number of stored keys", test.length()); //12

console.log(test.keys());
//['moon', 'carrot', 'frog', 'banana', 'grape', 'ice cream', 'jacket', 'kite', 'elephant', 'apple', 'hat', 'lion']

console.log(test.entries());
// [[ 'moon', 'silver' ],[ 'carrot', 'orange' ],[ 'frog', 'green' ],[ 'banana', 'yellow' ],[ 'grape', 'purple' ],
//[ 'ice cream', 'white' ],[ 'jacket', 'blue' ],[ 'kite', 'pink' ],[ 'elephant', 'gray' ],[ 'apple', 'red' ],[ 'hat', 'black' ],[ 'lion', 'golden' ]]

test.clear(); //Clears every entry
console.log("The number of stored keys", test.length()); //0
