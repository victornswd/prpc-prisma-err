import { query$ } from "@prpc/solid";
import { z } from "zod";
import { prisma } from "~/server/db";

export const helloQuery = query$({
  queryFn: ({ payload }) => {
    return `server says hello: ${payload.name}`;
  },
  key: "hello",
  schema: z.object({ name: z.string() }),
});

export const noteList = query$(
  async ({ payload }) => {
    return await prisma.notes.findMany({
      where: {
        userId: payload.id,
      },
    });
  },
  "note-list",
  z.object({ id: z.string().min(3) })
);

export const noteListObj = query$({
  queryFn: async ({ payload }) => {
    return await prisma.notes.findMany({
      where: {
        userId: payload.id,
      },
    });
  },
  key: "note-list-keys",
  schema: z.object({ id: z.string().min(3) }),
});
