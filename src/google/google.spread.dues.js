import axios, * as others from 'axios';
import { GetAPI } from './google.api';

export const SHEET_DUE = "회비";


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
