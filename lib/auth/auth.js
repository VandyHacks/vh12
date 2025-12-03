import { betterAuth } from "better-auth";
import { getSecret } from "../utils";

let authInstance = null;

export const getAuth = async () => {
    if (authInstance) return authInstance;

    authInstance = betterAuth({
        secret: getSecret("BETTER_AUTH_SECRET"),
        baseURL: getSecret("BETTER_AUTH_URL"),
        emailAndPassword: {
            enabled: false
        },
        socialProviders: {
            google: {
                prompt: "select_account",
                clientId: getSecret("OAUTH_GOOGLE_ID"),
                clientSecret: getSecret("OAUTH_GOOGLE_SECRET"),
                scope: ["email"]
            }
        },
        hooks: {
            onError(error, ctx) {
                return ctx.redirect(`/auth/error?error=${error.code}`);
            },
        },
    });

    return authInstance;
}

export const auth = await getAuth();
