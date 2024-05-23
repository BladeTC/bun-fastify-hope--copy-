import { read } from "bun:ffi";
import { ID_ERROR } from "./error-constants";
import { pushToFile, readByIdFromFile, readFromFile } from "./file-manager";

export async function getAll() {
  return await readFromFile();
}

export async function getById(id){
  let i = await readByIdFromFile(id);
  console.log(i,2)
  return i;
}

export async function postPush(value) {
  return await pushToFile(value);
}
export function patchSplice(id, value) {
  if (id >= arr.length) {
    throw ID_ERROR;
  } else {
    arr.splice(id - 1, 1, value);
  }
}
export function deleteSplice(id) {
  if (id >= arr.length) {
    throw ID_ERROR;
  } else {
    arr.splice(id - 1, 1);
  }
}
export function deleteAll() {
  arr = [];
}
