import { Elysia } from "elysia";
import {
  getAll,
  postPush,
  patchSplice,
  deleteSplice,
  deleteAll,
} from "./service";
import { ID_ERROR } from "./adhd";

const app = new Elysia()
  .get("/", () => getAll())
  .get("/:id", ({ params: { id }, set }) => {
    try {
      set.status = 201;
      return getAll(id);
    } catch (e) {
      if (e == ID_ERROR) {
        set.status = 404;
        return e;
      }
    }
  })
  .post("/", ({ body: { value }, set }) => {
    try {
      return postPush(id, value);
    } catch (e) {
      if (e == ID_ERROR) {
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
