import { error } from "elysia";
import { ID_ERROR } from "./error-constants";

let arr = [1, 2, 3, 4];

export function getAll(id) {
  if (id == undefined) {
    return arr;
  }
  if (id < arr.length) {
    return arr[id - 1];
  }
  if (id >= arr.length) {
    throw ID_ERROR;
  }
}
export function postPush(value) {
  arr.push(value);
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
