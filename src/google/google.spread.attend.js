import axios, * as others from 'axios';
import { GetAPI, GetRange } from './google.api';
import { ToDateParameter } from '../common';

const ID = "1Yc9bKon1yJw1R2KDteb_c_nNLWrECgO0UZsm5UdD7UM";
export const SHEET_ATTENDANCE = "참석여부";
export const SHEET_ATTENDANCE_RESULT = "출석부";
export const SHEET_SCORE = "출석점수";
export const SHEET_TOTAL_SCORE = "통합출석점수";

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

export async function GetAttendencesOfUser(user) {
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

            if (name == user) {

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

        }

        idx++;
    });

    return arr;
}


export async function GetAttendencesAtDate(date) {
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
                if (itemIdx != 0 && ToDateParameter(columns[itemIdx]) == date) {
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

export async function GetAttendenceResults() {
    var uri = GetAPI(SHEET_ATTENDANCE_RESULT);
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
                        "Result": item,
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

export async function GetAttendenceResultsOfUser(user) {
    var uri = GetAPI(SHEET_ATTENDANCE_RESULT);
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
                        var attendence = {
                            "User": name,
                            "Date": columns[itemIdx],
                            "Result": item,
                        };

                        arr.push(attendence);
                    }

                    itemIdx++;
                });
            }
        }

        idx++;
    });

    return arr;
}

export async function GetAttendenceResultsOfDate(date) {
    var uri = GetAPI(SHEET_ATTENDANCE_RESULT);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var rowIdx = 0;

    var columns = new Array();

    values.forEach(value => {

        if (rowIdx == 0) {
            columns = Array.from(value);
        }

        else {

            var items = Array.from(value);
            var colIdx = 0;
            var name = items[0];

            items.forEach(item => {
                if (colIdx != 0 && date == ToDateParameter(columns[colIdx])) {
                    var attendence = {
                        "Row": rowIdx + 1,
                        "Column": colIdx + 1,
                        "User": name,
                        "Date": columns[colIdx],
                        "Result": item,
                    };

                    arr.push(attendence);
                }

                colIdx++;
            });
        }

        rowIdx++;
    });

    return arr;
}

export async function GetScoresOfUser(user) {
    var uri = GetAPI(SHEET_SCORE);
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
                        var attendence = {
                            "User": name,
                            "Date": columns[itemIdx],
                            "Score": item,
                        };

                        arr.push(attendence);
                    }

                    itemIdx++;
                });
            }
        }

        idx++;
    });

    return arr;
}


export async function GetTotalScores() {
    var uri = GetAPI(SHEET_TOTAL_SCORE);
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
            var name = items[0];
            var score = items[1];

            var totalScore = {
                "User": name,
                "TotalScore": score,
            };

            arr.push(totalScore);
        }

        idx++;
    });

    return arr;
}

export async function GetTotalScoreOfUser(user) {
    var uri = GetAPI(SHEET_TOTAL_SCORE);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);

    values.forEach(value => {
        var items = Array.from(value);
        var name = items[0];
        var score = items[1];

        if (name == user) {

            var totalScore = {
                "User": name,
                "TotalScore": score,
            };

            arr.push(totalScore);
        }
    });

    if (arr.length == 1)
        return arr[0];
    else
        return null;
}

export async function SetAttendenceResult(col, row, result) {

    var range = GetRange(SHEET_ATTENDANCE_RESULT, col, row, col, row);
    var url = `$https://sheets.googleapis.com/v4/spreadsheets/${ID}/values:batchUpdate`;

    var request = {
        "valueInputOption": "RAW",
        "includeValuesInResponse": false,
        "responseValueRenderOption": "FORMATTED_VALUE",
        "responseDateTimeRenderOption": "FORMATTED_STRING",
        "data": [
            {
                "range": range,
                "majorDimension": "ROW",
                "values": [
                    [
                        result
                    ]
                ]
            }
        ]
    };

    var config = { "Content-Type": "application/json"};

    await axios.post(url, request, config);
}