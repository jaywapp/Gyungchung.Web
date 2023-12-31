import axios, * as others from 'axios';

const APP = "gyungchung"
const ID = "1Yc9bKon1yJw1R2KDteb_c_nNLWrECgO0UZsm5UdD7UM";
const GOOGLE_SHEET_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const API_KEY = "AIzaSyAdvJHsM8qXsM9vHohuJVFYp1VcQTzaUpo";

const SHEET_USERS = "회원목록";
const SHEET_MATCHES = "일정";
const SHEET_ATTENDANCE= "참석여부";
const SHEET_ATTENDANCE_RESULT = "출석부";
const SHEET_DUE = "회비";

function GetAPI(sheet){
    return `${GOOGLE_SHEET_BASE_URL}/${ID}/values/${sheet}?key=${API_KEY}`
}

export async function GetUsers(){
    var uri = GetAPI(SHEET_USERS);
    const response =await axios.get(uri);
  
    if (response.status !== 200) {
      throw new Error();
    }

    var arr = new Array();

    var values = Array.from(response.data.values);
    var idx = 0;

    var col1 = "";
    var col2 = "";
    var col3 = "";

    values.forEach(value => {
        if(idx == 0){
            col1 = value[0];
            col2 = value[1];
            col3 = value[2];
        }

        else{
            var user = {
                col1 : value[0],
                col2 : value[1],
                col3 : value[2],
            };

            arr.push(user);
        }
        
        idx++;
    });
  
    return arr;
};