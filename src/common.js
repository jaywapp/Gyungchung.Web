import moment from 'moment';

export function ToDateParameter(date){

    var str = moment(date).format('YYYYMMDD');
    return str;
}