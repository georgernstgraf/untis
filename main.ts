import * as ccs from "chrome-cookies-secure";
import {
    Err,
    err,
    errAsync,
    fromAsyncThrowable,
    fromPromise,
    fromSafePromise,
    fromThrowable,
    Ok,
    ok,
    okAsync,
    Result,
    ResultAsync,
    safeTry,
} from "neverthrow";

// Define Cookie interface since it's not exported from chrome-cookies-secure
interface Cookie {
    domain: string;
    name: string;
    value: string;
    [key: string]: any;
}

export async function getCookies(
    domain: string,
): Promise<Result<Cookie[], Error>> {
    // Validate the domain input
    if (typeof domain !== "string" || !domain) {
        return err(new Error("Invalid domain provided"));
    }
    // never throw from this function
    let cookies: Cookie[] | void = [];
    try {
        cookies = await ccs.getCookiesPromised(
            `https://${domain}/WebUntis/api/token`,
            "header",
            "/home/georg/.config/BraveSoftware/Brave-Browser/Default/Cookies",
        );
    } catch (error) {
        return err(
            error instanceof Error ? error : new Error(JSON.stringify(error)),
        );
    }
    return ok(cookies);
}
//console.log("sers");
console.log(
    await getCookies("neilo.webuntis.com").then((result) => {
        if (result.isOk()) {
            return result.value;
        }
        return `Error: ${result.error.message}`;
    }),
);
