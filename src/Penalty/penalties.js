import styled from "styled-components";
import { GetPenalties } from "../google/google.spread.penalty";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToDateParameter } from "../common";
import { forEach, pick } from "lodash";

import Good from './../images/good.svg'
import Bad from './../images/bad.svg'
import Complate from './../images/complate.svg'
import Cancel from './../images/cancel.svg'

const Div = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    padding: 5px;
    text-align: center;
    color: ${props => props.color || 'black'};
    margin-bottom: 10px;
    border-bottom: solid 0.1px lightgray;
    font-size: 18px;
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

const EmojiIcon = styled.img`
    width: 50px;
    margin-left: 10px;
`

const DateTime = styled.div`
`;

const Name = styled.div`
`;

const Content = styled.div`
`;

const Price = styled.div`
`;

const Status = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: baseline;
`;

const Text = styled.div`
    vertical-align: bottom;
    margin-top: 30px;
    padding: 10px;
    background-color: beige;
`

export default function Penalties() {

    var user = sessionStorage.getItem("user");

    const navigate = useNavigate();
    const [penalties, setPenalties] = useState(false);

    const onRendering = async () => {
        await GetPenalties(user)
            .then(r => setPenalties(r));
    }

    useEffect(() => {
        onRendering();
    }, [])

    var has = false;
    var price = 0;
    var datas = Array.from(penalties);

    datas.forEach(penalty => {

        if(penalty.Status == "미납"){
            has = true;
            price = price + Number(penalty.Price);
        }
    })

    var msg = "";

    if (has == true){
        msg += "납부하지 않은 벌금이 ";
        msg += price;
        msg += "원 있어요.";
    }
    else{
        msg += "내야할 벌금이 없어요";
    }


    return (
        <div>
            <WelcomDiv>
                <WelcomeName>
                    {sessionStorage.getItem("user")}님!
                    <EmojiIcon src={(has == true) ? Bad : Good} />
                </WelcomeName>

                <WelcomeMsg>
                    {msg}
                </WelcomeMsg>
            </WelcomDiv>

            {penalties && penalties.map(p => Penalty(p))}

            <Text>자세한 사항은 총무에게 문의해주세요.</Text>
        </div>
    )


}

function Penalty(penalty) {

    return (
        <Div>
            <DateTime>{penalty.DateTime}</DateTime>
            <Content>{penalty.Content}</Content>
            <Price>{penalty.Price}</Price>
            <Status src={penalty.Status == "미납" ? Cancel : Complate}/>
        </Div>
    )
}