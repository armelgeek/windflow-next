import { db } from "@/drizzle/db";
import { pages } from "@/drizzle/schema";
import slugify from "slugify";
import { PagePayload } from "../../config/page.type";

export const createPage = async (payload: PagePayload ) => {
   const slug = slugify(payload.name, { lower: true });
   
     const [page] = await db
        .insert(pages)
        .values({ ...payload, slug })
        .returning();
    return page;
};