import { appendFile, writeFile } from "node:fs/promises";
import {
  ID_ERROR,
  ID_IS_NEGATIVE_ERROR,
  ID_NOT_INT_ERROR,
  VALUE_ERROR,
} from "./error-constants";
const path = "./todosums.txt";
const file = Bun.file(path);

export async function pushToFile(value) {
  if (value == undefined) {
    throw VALUE_ERROR;
  }
  await appendFile(path, value + "\n");
  return;
}

export async function readFromFile() {

  return  openTxt();
  //return console.log(file.text,3);
}
export async function readByIdFromFile(id) {
  let arr = await openTxt().split(/\r?\n/);
  if (isNaN(parseInt(id))) {
    throw ID_NOT_INT_ERROR;
  }
  if (parseInt(id) < 0) {
    throw ID_IS_NEGATIVE_ERROR;
  }
  if (parseInt(id) == undefined || parseInt(id) > arr.length) {
    throw ID_ERROR;
  }
  return arr[id - 1];
}
export async function deleteByIdFromFile(id) {
  let arr = await openTxt().split(/\r?\n/);
  if (isNaN(parseInt(id))) {
    throw ID_NOT_INT_ERROR;
  }
  if (parseInt(id) < 0) {
    throw ID_IS_NEGATIVE_ERROR;
  }
  if (parseInt(id) == undefined || parseInt(id) > arr.length) {
    throw ID_ERROR;
  }
  const text = await file.text();
  arr.splice(id - 1, 1);
  await writeFile(path, arr.join("\n"));
}

export async function deleteAllFromFile() {
  await Bun.write(path, "");
}

export async function patchToFile(id, value) {
  let arr = await openTxt().split(/\r?\n/);
  if (isNaN(parseInt(id)) == NaN) {
    throw ID_NOT_INT_ERROR;
  }
  if (parseInt(id) < 0) {
    throw ID_IS_NEGATIVE_ERROR;
  }
  if (parseInt(id) == undefined || parseInt(id) > arr.length) {
    throw ID_ERROR;
  }
  if (value == undefined) {
    throw VALUE_ERROR;
  }
  arr.splice(id - 1, 1, value);
  await writeFile(path, arr.join("\n"));
}

async function openTxt(){
  const text = await file.text();
  return text;
}