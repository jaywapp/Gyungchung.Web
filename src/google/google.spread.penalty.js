import axios, * as others from 'axios';
import { GetAPI } from './google.api';

export const SHEET_PENALTY = "벌금";

export async function GetPenalties(user) {
    var uri = GetAPI(SHEET_PENALTY);
    const response = await axios.get(uri);

    if (response.status !== 200) {
        throw new Error();
    }

    var penalties = new Array();
    var values = Array.from(response.data.values);
    var idx = 0;

    values.forEach(value => {

        if (idx != 0) {
            var items = Array.from(value);

            if (items[1] == user) {

                var penalty = {
                    "DateTime": items[0],
                    "Name": items[1],
                    "Content": items[2],
                    "Price": items[3],
                    "Status": items[4],
                };

                penalties.push(penalty);
            }
        }

        idx++;
    });

    return penalties;
}
