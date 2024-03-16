import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        SERVER_API_URL: z.string().url(),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_SECRET: z.string(),
        GOOGLE_CALLBACK_URL: z.string(),
        APP_URL: z.string().url()
    },
    client: {},
    runtimeEnv: process.env,
});