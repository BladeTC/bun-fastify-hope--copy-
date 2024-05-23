import { Elysia } from "elysia";
import {
  getAll,
  postPush,
  patchSplice,
  deleteSplice,
  deleteAll,
  getById,
} from "./service";
import { ID_ERROR } from "./error-constants";
import { pushToFile } from "./file-manager";

const app = new Elysia()
  .get("/", async () => {
    let ar = await getAll();
    return ar;
  })
  .get("/:id", async ({ params: { id }, set }) => {
    try {
      set.status = 200;
      let i = await getById(id);
      console.log(i)
      return i;
    } catch (e) {
      if (e == ID_ERROR) {
        set.status = 404;
        return e;
      }
    }
  })
  .post("/", async ({ body: { value }, set }) => {
    try {
      let i = await postPush(value);
      set.status = 202;
      return i;
    } catch (e) {
      if (e == "error") {
        set.status = 404;
        return e;
      }
    }
  })
  .patch("/:id", ({ body: { value }, params: { id }, set }) => {
    try {
      patchSplice(id, value);
    } catch (e) {
      if (e == ID_ERROR) {
        set.status = 404;
        return e;
      }
    }
  })
  .delete("/:id", ({ params: { id }, set }) => {
    try {
      deleteSplice(id);
    } catch (e) {
      if (e == ID_ERROR) {
        set.status = 404;
        return e;
      }
    }
  })
  .delete("/", () => deleteAll())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
//https://bun.sh/guides/ecosystem/discordjs new idea
