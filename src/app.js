import { Elysia } from "elysia";
import {
  getAll,
  postPush,
  patchSplice,
  deleteSplice,
  deleteAll,
  getById,
  db_getAll,
  db_push,
  db_getById,
  db_patchSplice
} from "./service";
import {
  ID_ERROR,
  ID_IS_NEGATIVE_ERROR,
  ID_NOT_INT_ERROR,
  VALUE_ERROR,
} from "./error-constants";
import { pushToFile } from "./file-manager";
import { db_deleteId, db_updateValue } from "./sql-database";

const app = new Elysia()
  .get("/", async () => {
    let ar = await getAll();
    return ar;
  })
  .get("/db/", async () => {
    let ar = await db_getAll();
    return ar;
  })
  .get("/:id", async ({ params: { id }, set }) => {
    try {
      set.status = 201;
      return await getById(id);
    } catch (e) {
      if (e == ID_NOT_INT_ERROR) {
        set.status = 400;
      }
      if (e == ID_IS_NEGATIVE_ERROR) {
        set.status = 401;
      }
      if (e == ID_ERROR) {
        set.status = 404;
      }
      set.status = 405;
      return e;
    }
  })
  .get("/db/:id", async ({ params: { id }, set }) => {
    try {
      set.status = 200;
      let db = await db_getById(id);
      return db.VALUE;
    } catch (e) {
      if (e == ID_NOT_INT_ERROR) {
        set.status = 400;
      }
      if (e == ID_IS_NEGATIVE_ERROR) {
        set.status = 401;
      }
      if (e == ID_ERROR) {
        set.status = 404;
      }
      set.status = 405;
      return e;
    }
  })
  .post("/", async ({ body: { value }, set }) => {
    try {
      let i = await postPush(value);
      set.status = 201;
      return i;
    } catch (e) {
      if (e == VALUE_ERROR) {
        set.status = 400;
        return e;
      }
    }
  })
  .post("/db/", async ({ body: { value }, set }) => {
    try {
      let i = await db_push(value);
      set.status = 201;
      return i;
    } catch (e) {
      if (e == VALUE_ERROR) {
        set.status = 400;
        return e;
      }
    }
  })
  .patch("/:id", async ({ body: { value }, params: { id }, set }) => {
    try {
      await patchSplice(id, value);
    } catch (e) {
      if (e == VALUE_ERROR) {
        set.status = 400;
        return e;
      } else {
        set.status = 404;
        return e;
      }
    }
  })
  .patch("/db/:id", async ({ body: { value }, params: { id }, set }) => {
    try {
      await db_updateValue(id, value);
    } catch (e) {
      if (e == VALUE_ERROR) {
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
      set.status = 200;
      await deleteSplice(id);
    } catch (e) {
      set.status = 404;
      return e;
    }
  })
  .delete("/db/:id", async ({ params: { id }, set }) => {
    try {
      set.status = 200;
      await db_deleteId(id);
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
