import axios, * as others from 'axios';
import { GetAPI } from './google.api';
import { ToDateParameter } from '../common';

export const SHEET_ATTENDANCE = "참석여부";
export const SHEET_ATTENDANCE_RESULT = "출석부";

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