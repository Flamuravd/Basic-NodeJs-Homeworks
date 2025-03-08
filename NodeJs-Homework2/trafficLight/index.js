import { EventEmitter } from "events";
import chalk from "chalk";

const eventEmitter = new EventEmitter();

eventEmitter.on("redLight", () => {
  console.log(chalk.red("RED"));
});

eventEmitter.on("yellowLight", () => {
  console.log(chalk.yellow("YELLOW"));
});

eventEmitter.on("greenLight", () => {
  console.log(chalk.green("GREEN"));
});

setTimeout(() => {
  eventEmitter.emit("redLight");
}, 3000);

setTimeout(() => {
  eventEmitter.emit("yellowLight");
}, 6000);

setTimeout(() => {
  eventEmitter.emit("greenLight");
}, 9000);