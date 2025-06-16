import { WebUntis } from "webuntis";

const school = Deno.env.get("school");
const username = Deno.env.get("user");
const pwd = Deno.env.get("pwd");
const host = Deno.env.get("host");
if (!school || !username || !pwd || !host) {
    throw new Error(
        "Please set the environment variables: school, user, pwd, host",
    );
}
const untis = new WebUntis(
    school,
    username,
    pwd,
    host,
);

await untis.login();

const timetable = await untis.getCurrentSchoolyear();
console.log(timetable);
// profit
