import { Elysia } from "elysia";
import {
  getAll,
  postPush,
  patchSplice,
  deleteSplice,
  deleteAll,
  getById,
} from "./service";
import {
  GET_ID_ERROR,
  GET_ID_IS_NEGATIVE_ERROR,
  GET_ID_NOT_INT_ERROR,
  PATCH_ID_ERROR,
  PATCH_ID_IS_NEGATIVE_ERROR,
  PATCH_ID_NOT_INT_ERROR,
  PATCH_VALUE_ERROR,
  POST_VALUE_ERROR,
  DELETE_ID_ERROR,
  DELETE_ID_IS_NEGATIVE_ERROR,
  DELETE_ID_NOT_INT_ERROR,
} from "./error-constants";
import { pushToFile } from "./file-manager";

const app = new Elysia()
  .get("/", async () => {
    let ar = await getAll();
    return ar;
  })
  .get("/:id", async ({ params: { id }, set }) => {
    try {
      if (typeof id != "number") {
        throw GET_ID_NOT_INT_ERROR;
      }
      if (id < 0) {
        throw GET_ID_IS_NEGATIVE_ERROR;
      }
      if (id == undefined) {
        throw GET_ID_ERROR;
      }
      set.status = 201;
      return await getById(id);
    } catch (e) {
      set.status = 404;
      return e;
    }
  })
  .post("/", async ({ body: { value }, set }) => {
    try {
      let i = await postPush(value);
      set.status = 201;
      return i;
    } catch (e) {
      if (e == POST_VALUE_ERROR) {
        set.status = 400;
        return e;
      }
    }
  })
  .patch("/:id", async ({ body: { value }, params: { id }, set }) => {
    try {
      if (typeof id != "number") {
        throw PATCH_ID_NOT_INT_ERROR;
      }
      if (id < 0) {
        throw PATCH_ID_IS_NEGATIVE_ERROR;
      }
      if (id == undefined) {
        throw PATCH_ID_ERROR;
      }
      await patchSplice(id, value);
    } catch (e) {
      if (e == PATCH_VALUE_ERROR) {
        set.status = 400;
        return e;
      } else {
        set.status = 404;
        return e;
      }
    }
  })
  .delete("/:id", async ({ params: { id }, set }) => {
    try {
      if (typeof id != "number") {
        throw DELETE_ID_NOT_INT_ERROR;
      }
      if (id < 0) {
        throw DELETE_ID_IS_NEGATIVE_ERROR;
      }
      if (id == undefined) {
        throw DELETE_ID_ERROR;
      }
      set.status = 200;
      await deleteSplice(id);
    } catch (e) {
      set.status = 404;
      return e;
    }
  })
  .delete("/", async () => await deleteAll())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
//https://bun.sh/guides/ecosystem/discordjs new idea
