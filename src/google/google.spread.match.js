import axios, * as others from 'axios';
import { GetAPI } from './google.api';
import { ToDateParameter } from '../common';

export const SHEET_MATCHES = "일정";

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

export async function GetMatchAtDate(date){

    var matches = await GetMatches();
    var result = new Array();

    matches.forEach(match => {
        if(ToDateParameter(match.DateTime) == date)
            result.push(match);
    });

    if(result.length == 1)
        return result[0];
    else    
        return null;
}