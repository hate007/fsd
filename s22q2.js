

const EventEmitter = require('events');

// Create an event emitter instance
const eventEmitter = new EventEmitter();

// Define a callback for 'greet' event
eventEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}! Welcome to the event-driven world!`);
});

// Define a callback for 'exit' event
eventEmitter.on('exit', () => {
  console.log('Exiting application... Goodbye!');
  process.exit(); // ends the program
});

// Simulate main loop with a simple input interface
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Type a command: greet [name] | exit");

rl.on('line', (input) => {
  const parts = input.trim().split(' ');
  const command = parts[0];
  const argument = parts.slice(1).join(' ');

  // Trigger events based on input
  if (command === 'greet' && argument) {
    eventEmitter.emit('greet', argument);
  } else if (command === 'exit') {
    eventEmitter.emit('exit');
  } else {
    console.log('Unknown command. Try: greet [name] or exit');
  }
});

