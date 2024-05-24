import { writeFile } from "node:fs";
import { appendFile } from "node:fs/promises";
import {
  PATCH_ID_ERROR,
  POST_VALUE_ERROR,
  PATCH_VALUE_ERROR,
  DELETE_ID_ERROR,
  GET_ID_ERROR,
} from "./error-constants";

const fs = require("fs");
const path = "./todosums.txt";
const file = Bun.file(path);
const writer = file.writer();
const decoder = new TextDecoder();

export async function pushToFile(value) {
  if (value == undefined) {
    throw POST_VALUE_ERROR;
  }
  await appendFile(path, value + "\n");
  return "arr";
}

export async function readFromFile() {
  const text = await file.text();

  return text;
  //return console.log(file.text,3);
}
export async function readByIdFromFile(id) {
  let i = 0;
  const text = await file.text();
  //console.log(text);
  let arr = text.split(/\r?\n/);
  if (id >= arr.length) {
    throw GET_ID_ERROR;
  }
  for await (let j of arr) {
    i++;
    if (i == id) {
      return j;
    }
  }
}
export async function deleteByIdFromFile(id) {
  let i = 0;
  const text = await file.text();
  let arr = text.split(/\r?\n/);
  if (id >= arr.length) {
    throw DELETE_ID_ERROR;
  }
  arr.splice(id - 1, 1);
  writeFile(path, arr.join("\n"), (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}
export async function deleteAllFromFile() {
  await Bun.write(path, "");
}
export async function patchToFile(id, value) {
  const text = await file.text();
  let arr = text.split(/\r?\n/);
  if (id >= arr.length) {
    throw PATCH_ID_ERROR;
  }
  if (value == undefined) {
    throw PATCH_VALUE_ERROR;
  }
  arr.splice(id - 1, 1, value);
  writeFile(path, arr.join("\n"), (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}
