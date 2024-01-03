const APP = "gyungchung"
const ID = "1Yc9bKon1yJw1R2KDteb_c_nNLWrECgO0UZsm5UdD7UM";
const GOOGLE_SHEET_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const API_KEY = "AIzaSyAdvJHsM8qXsM9vHohuJVFYp1VcQTzaUpo";

const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',];

export function GetAPI(sheet) {
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values/${sheet}?key=${API_KEY}`
}

export function GetAPIRange(range) {
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values//${range}`;
} 

export function GetAPISheetRange(sheet, startCol, startRow, endCol, endRow) {
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values//${GetRange(sheet, startCol, startRow, endCol, endRow)}`;
}
 
export function GetRange(sheet, startColumn, startRow, endColumn, endRow) {
    return `$'${sheet}'!${GetChar(startColumn)}${startRow}:${GetChar(endColumn)}${endRow}`;
}

function GetChar(column) {
    var value1 = column / 26;
    var value2 = column % 26;

    var result = "";

    if (value1 != 0)
        result += Alphabets[value1 + 1];

    result += Alphabets[value2 + 1]; 

    return result;
}


function ParseToDate(data) {
    var splited = data.split();

    var yearStr = splited[0];
    var monthStr = splited[1];
    var dayStr = splited[2];

    return new Date(`${yearStr}-${monthStr}-${dayStr}`);
}