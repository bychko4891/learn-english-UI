import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        SERVER_API_URL: z.string().url(),

    },
    client: {},
    runtimeEnv: process.env,
});