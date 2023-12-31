import axios, * as others from 'axios';

const APP = "gyungchung"
const ID = "1Yc9bKon1yJw1R2KDteb_c_nNLWrECgO0UZsm5UdD7UM";
const GOOGLE_SHEET_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const API_KEY = "AIzaSyAdvJHsM8qXsM9vHohuJVFYp1VcQTzaUpo";

export const SHEET_USERS = "회원목록";
export const SHEET_MATCHES = "일정";
export const SHEET_ATTENDANCE = "참석여부";
export const SHEET_ATTENDANCE_RESULT = "출석부";
export const SHEET_DUE = "회비";

function GetChar(column) {
    var value1 = column / 26;
    var value2 = column % 26;

    var result = "";

    if (value1 != 0)
        result += Alphabets[value1 + 1];

    result += Alphabets[value2 + 1];

    return result;
}

function GetRange(sheet, startColumn, startRow, endColumn, endRow) {
    return `$'${sheet}'!${GetChar(startColumn)}${startRow}:${GetChar(endColumn)}${endRow}`;
}

export function GetAPI(sheet) {
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values/${sheet}?key=${API_KEY}`
}

export function GetAPIRange(range) {
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values//${range}`;
}

export function GetAPISheetRange(sheet, startCol, startRow, endCol, endRow) {
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values//${GetRange(sheet, startCol, startRow, endCol, endRow)}`;
}

const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];


export async function GetUsers() {
    var uri = GetAPI(SHEET_USERS);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    values.forEach(value => {
        if (idx == 0) {
        }

        else {
            var user = {
                "Name": value[0],
                "Email": value[1],
                "Role": value[2],
            };

            arr.push(user);
        }

        idx++;
    });

    return arr;
};

function ParseToDate(data) {
    var splited = data.split();

    var yearStr = splited[0];
    var monthStr = splited[1];
    var dayStr = splited[2];

    return new Date(`${yearStr}-${monthStr}-${dayStr}`);
}

export async function GetAttendences() {
    var uri = GetAPI(SHEET_ATTENDANCE);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    var columns = new Array();

    values.forEach(value => {

        if (idx == 0) {
            columns = Array.from(value);
        }

        else {

            var items = Array.from(value);
            var itemIdx = 0;
            var name = items[0];

            items.forEach(item => {
                if (itemIdx != 0) {
                    var attendence = {
                        "User": name,
                        "Date": columns[itemIdx],
                        "Attendance": item,
                    };

                    arr.push(attendence);
                }

                itemIdx++;
            });

        }

        idx++;
    });

    return arr;
}

export async function GetDues() {
    var uri = GetAPI(SHEET_DUE);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    var columns = new Array();

    values.forEach(value => {

        if (idx == 0) {
            columns = Array.from(value);
        }

        else {

            var items = Array.from(value);
            var itemIdx = 0;

            var name = items[0];

            items.forEach(item => {


                if (itemIdx != 0) {
                    var due = {
                        "User": name,
                        "Month": columns[itemIdx],
                        "Payment": item,
                    };

                    arr.push(due);
                }

                itemIdx++;
            });

        }

        idx++;
    });

    return arr;
}

export async function GetDuesAtUser(user) {

    var uri = GetAPI(SHEET_DUE);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    var columns = new Array();

    values.forEach(value => {

        if (idx == 0) {
            columns = Array.from(value);
        }

        else {

            var items = Array.from(value);
            var itemIdx = 0;

            var name = items[0];

            if (name == user) {
                items.forEach(item => {

                    if (itemIdx != 0) {
                        var due = {
                            "User": name,
                            "Month": columns[itemIdx],
                            "Payment": item,
                        };

                        arr.push(due);
                    }

                    itemIdx++;
                });
            }

        }

        idx++;
    });

    return arr;
}

export async function GetMatches() {
    var uri = GetAPI(SHEET_MATCHES);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    var columns = new Array();

    values.forEach(value => {

        if (idx == 0) {
            columns = Array.from(value);
        }

        else {

            var items = Array.from(value);

            var data = {
                "DateTime": items[0],
                "Time": items[1],
                "Location": items[2],
                "Address": items[3],
                "AddressLink": items[4],
                "Type": items[5],
            };

            arr.push(data);
        }

        idx++;
    });

    return arr;
}