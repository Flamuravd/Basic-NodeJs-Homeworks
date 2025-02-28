import fs from "fs";

fs.writeFileSync("homework.txt", "Homework 02 in Basic Node");

fs.appendFileSync("homework.txt", "\nFINISHED!");

const homeworkPath = "homework.txt";

const homeworkFileContent = fs.readFileSync(homeworkPath, "utf8");

console.log(homeworkFileContent);