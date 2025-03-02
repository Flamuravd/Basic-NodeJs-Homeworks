import fsPromises from "fs/promises";

await fsPromises.writeFile("homework.txt", "Homework 02 in Basic Node");

await fsPromises.appendFile("homework.txt", "\nFINISHED!");

const homeworkPath = "homework.txt";

const homeworkFileContent = await fsPromises.readFile(homeworkPath, "utf8");

console.log(homeworkFileContent);
