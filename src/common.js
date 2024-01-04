export function ToDateParameter(date){

    var str = "";

    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();

    str += year;
    if(month < 10)
        str += 0;
    str += month;

    if(day < 10)
        str += 0;
    str += day;

    return str;
}