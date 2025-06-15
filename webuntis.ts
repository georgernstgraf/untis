import { WebUntis } from "webuntis";

const school = process.env.school;
const username = process.env.user;
const pwd = process.env.pwd;
const host = process.env.host;
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
