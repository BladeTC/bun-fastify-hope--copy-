import { read } from "bun:ffi";
import {
  deleteByIdFromFile,
  patchToFile,
  pushToFile,
  readByIdFromFile,
  readFromFile,
  deleteAllFromFile,
} from "./file-manager";

export async function getAll() {
  return await readFromFile();
}

export async function getById(id) {
  return await readByIdFromFile(id);
}

export async function postPush(value) {
  return await pushToFile(value);
}
export async function patchSplice(id, value) {
  await patchToFile(id, value);
}
export async function deleteSplice(id) {
  await deleteByIdFromFile(id);
}
export async function deleteAll() {
  await deleteAllFromFile();
}
