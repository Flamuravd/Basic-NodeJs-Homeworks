import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

// Initializing the counter variable
let counter = 0;

// Array Func to increase the counter
const increaseCounter = () => {
  try {
    counter++; // Increases the counter
    eventEmitter.emit("increase", counter);

    // Checks if the counter has become positive
    if (counter === 1) {
      eventEmitter.emit("positive", counter);
    }
  } catch (error) {
    console.error("Error in increaseCounter", error);
  }
};

// Array Func to decrease the counter
const decreaseCounter = () => {
  try {
    counter--; // Decreases the counter
    eventEmitter.emit("decrease", counter);

    // Checks if the counter has become zero
    if (counter === 0) {
      eventEmitter.emit("zero", counter);
    }

    // Checks if the counter has become negative
    if (counter === -1) {
      eventEmitter.emit("negative", counter);
    }
  } catch (error) {
    console.error("Error in decreaseCounter", error);
  }
};

// Event listener to "increase" event
eventEmitter.on("increase", (newCounter) => {
  console.log(`Counter increased to: ${newCounter}`);
});

// Event listener to "decrease" event
eventEmitter.on("decrease", (newCounter) => {
  console.log(`Counter decreased to: ${newCounter}`);
});

// Event listener "zero" event
eventEmitter.on("zero", (newCounter) => {
  console.log(`Counter is now zero: ${newCounter}`);
});

// Event listener "positive" event
eventEmitter.on("positive", (newCounter) => {
  console.log(`Counter is now positive: ${newCounter}`);
});

// Event listener "negative" event
eventEmitter.on("negative", (newCounter) => {
  console.log(`Counter is now negative: ${newCounter}`);
});

increaseCounter(); // Counter increased to one
increaseCounter(); // Counter increased to two

decreaseCounter(); // Counter decreased to one
decreaseCounter(); // Counter decreased to zero
decreaseCounter(); // Counter decreased to minus one