import styled from "styled-components";
import { GetDuesAtUser } from "../google/google.spread.dues";
import React, { useEffect, useState } from 'react';
import { Due } from "./due";
import { Account } from "../account";

import Good from './../images/good.svg'
import Bad from './../images/bad.svg'

const Div = styled.div`
`;

const Title = styled.div`
   font-size: x-large;
   font-weight: bold;
   margin-top: 5%;
   margin-bottom: 5%;
`;

const WelcomDiv = styled.div`
    margin-top: 5%;
    margin-bottom: 5%;
`

const WelcomeName = styled.div`
    grid-column: 1;
    font-size: xx-large;
    font-weight: bold;
    margin-right: 10px;
    vertical-align: top;
`;

const WelcomeMsg = styled.div`
    grid-column: 2;
    margin-top: 10px;
    font-size: x-large;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-wrap: wrap;
`

const Text = styled.div`
    vertical-align: bottom;
    margin-top: 30px;
    padding: 10px;
    background-color: beige;
`

const EmojiIcon = styled.img`
    width: 50px;
    margin-left: 10px;
`

export default function Dues() {

    var user = sessionStorage.getItem("user");
    var email = sessionStorage.getItem("email");

    const [dues, setDues] = useState(false);

    const onRendering = async () => {
        await GetDuesAtUser(user)
            .then(r=> setDues(r));
    }
    
    useEffect(() => {
        onRendering();
    },
    [])

    var datas = Array.from(dues);
    var payment = CheckPayment(datas);

    return (
        <Div>
            <WelcomMessage payment={payment}/>
            <Title>납부 계좌</Title>
            <Account/>
            <Title>납부 현황</Title>
            <Grid>
                {datas && datas.map(d => Due(d))}
            </Grid>
            <Text>납부 내용이 반영되지 않았다면 총무에게 연락주세요.</Text>
        </Div>
    )
}

function CheckPayment(datas){
    const today = new Date();

    const year = today.getFullYear();
    if(year < 2024){
        return false;
    }

    const month = today.getMonth() + 1;
    var result = false;

    Array.from(datas).forEach(data => {
        result = result || (data.Month < month && !data.Payment);
    });

    return result;
}

function WelcomMessage(payment){

    const today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var msg = month + "월 " + day +"일 기준 "

    if(payment == true)
        msg += "미납 내역이 있어요."
    else
        msg += "제대로 납부하고 있어요."; 

    return (
        <WelcomDiv>
            <WelcomeName>
                {sessionStorage.getItem("user")}님!
                <EmojiIcon src={(payment == true)? Bad : Good}/>
            </WelcomeName>
            
            <WelcomeMsg>
                {msg}
            </WelcomeMsg>
        </WelcomDiv>
    )
}
