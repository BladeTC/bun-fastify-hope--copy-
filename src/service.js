import { read } from "bun:ffi";
import {
  deleteByIdFromFile,
  patchToFile,
  pushToFile,
  readByIdFromFile,
  readFromFile,
  deleteAllFromFile,
} from "./file-manager";
import { db_getList,db_pushValue,db_getId,db_updateValue,db_deleteId} from "./sql-database";

export async function getAll() {
  return await readFromFile();
}
export async function db_getAll() {
  return await db_getList();
}

export async function getById(id) {
  return await readByIdFromFile(id);
}

export async function getById(id) {
  return await readByIdFromFile(id);
}

export async function db_getById(id) {
  return await db_getId(id);
}

export async function postPush(value) {
  return await pushToFile(value);
}
export async function db_push(value) {
  return await db_pushValue(value);
}
export async function patchSplice(id, value) {
  await patchToFile(id, value);
}
export async function db_patchSplice(id, value) {
  await db_updateValue(id, value);
}
export async function deleteSplice(id) {
  await deleteByIdFromFile(id);
}
export async function db_deleteSplice(id) {
  await db_deleteId(id);
}
export async function deleteAll() {
  await deleteAllFromFile();
}
