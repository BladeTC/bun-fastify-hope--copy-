import { appendFile } from "node:fs/promises";

const fs = require("fs");
const path = "./todosums.txt";
const file = Bun.file(path);
const writer = file.writer();
const decoder = new TextDecoder();

export async function pushToFile(value) {
  await appendFile(path, "\n" + value);
  return "arr";
}

export async function readFromFile() {
  const text = await file.text();

  return text;
  //return console.log(file.text,3);
}
export async function readByIdFromFile(id) {
  let s = "";
  let i = 0;
  let count = 0;
  const stream = file.stream();
  for await (let j of stream) {
    count++;
    if (count == 1) {
      s = j;
      i++;
    } else if (count == 3) {
      count = 0;
    }
    console.log(s,j,stream, 3);
    if (i == id) {
      return decoder.decode(s);
    }
  }
}
