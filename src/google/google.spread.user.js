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
                "Email": value[1],
                "Role": value[2],
            };

            arr.push(user);
        }

        idx++;
    });

    return arr;
};

