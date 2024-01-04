export function ToDateParameter(date){

    var str = "";

    var arr = Array.from(date.toString().split('.'));

    arr.forEach(i => {
        var trimed = i.toString().trim();

        if(trimed.length < 2)
            str += "0";

        str += trimed;
    })

    return str;
}