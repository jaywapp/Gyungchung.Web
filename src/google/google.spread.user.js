import axios, * as others from 'axios';
import { GetAPI } from './google.api';

export const SHEET_USERS = "회원목록";

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
                "Phone": value[1],
                "Role": value[2],
            };

            arr.push(user);
        }

        idx++;
    });

    return arr;
};

export async function GetUsersByInput(name, phone) {
    var uri = GetAPI(SHEET_USERS);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var arr = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    values.forEach(value => {
        if (idx != 0 && value[0] == name && value[1] == phone) {
            var user = {
                "Name": value[0],
                "Phone": value[1],
                "Role": value[2],
                "Position" : value[3],
            };

            arr.push(user);
        }
        idx++;
    });

    if(arr.length == 1)
        return arr[0];
    else
        return null;
};

