import "react-widgets/styles.css";
import styled from "styled-components";
import { GetMatchAtDate } from "../google/google.spread.match"
import { GetAttendenceResultsOfDate, SetAttendenceResult } from "../google/google.spread.attend";
import { useNavigate } from 'react-router-dom';
import { Map } from '../map'
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import DropdownList from "react-widgets/DropdownList";

import Dance from './../images/dance.svg'
import Futsal from './../images/futsal.svg'
import Pitch from './../images/pitch.svg'
import Beer from './../images/beer.svg'
import Back from './../images/back.svg'
import Edit from './../images/edit.svg'

const Div = styled.div`
    display: grid;
`;

const HeaderDiv = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
`;


const BackButton = styled.img`    
    grid-column: 1;
    margin-top: 5px;
    width: 40px;
    height: 40px;

    &:hover {
        background: cornflowerblue;
        color: black;
        transition: 0.5s;
    }
`

const UserDiv = styled.div`
    display: grid;
    flex-wrap: wrap;
`;

const UserBlock = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    text-align: center;
    padding: 9px;
    margin: 5px;
    border: solid 0.1px lightgray;
`

const UserName = styled.div`
    grid-column: 1;
    text-align: center;
    padding: 9px;
`

const UserAttDropbox = styled.div`
    grid-column: 2;
    margin-left: 10px;
`

const MainDiv = styled.div`
    grid-row: 1;
    grid-column: 1 span 3;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows:auto auto auto;

    padding: 10px;
`;

const Image = styled.img`
    width: 100px;
    margin-right: 10px;
    grid-column: 1;
    grid-row: span 3;
`;

const Date = styled.div`
    grid-column: 2;
    grid-row: 1;
    color:navy;
    font-size: x-large;
    font-weight: bold;
`;

const Place = styled.div`
    grid-column: 2;
    grid-row: 2;
    font-size: xx-large;
    font-weight: bold;
`;

const Logcation = styled.div`
    grid-column: 2;
    grid-row: 3;
    font-size: large;
    color: gray;
`

const GetColor = (result) => {
    if (result == "불참")
        return 'lightgray';
    else if(result == '참석')    
        return 'lightgreen';
    else if(result == '지각')
        return 'orange';
    else if(result == '결석')
        return 'pink';
}

export default function EditMatch(props) {

    const { id } = useParams();
    var date = id;

    const [match, setMatch] = useState(false);
    const [attendences, setAttendences] = useState(false);

    const navigate = useNavigate();

    const onRendering = async () => {
        await GetMatchAtDate(date)
            .then(match => setMatch(match));
        await GetAttendenceResultsOfDate(date)
            .then(atts => setAttendences(atts));
    }

    const onBackClick = () => {
        navigate('/match/' + id);
    }


    useEffect(() => {
        onRendering();
    },
    [date])

    var datas = Array.from(attendences);
    return (
        <div>
            <HeaderDiv>
                <BackButton src={Back} onClick={onBackClick} />
            </HeaderDiv>
            <Div>
                <MainDiv>
                    <Image src={GetImage(match)} />
                    <Date>{match.DateTime}</Date>
                    <Place>{match.Location}</Place>
                    <Logcation>{match.Address}</Logcation>
                </MainDiv>
                <UserDiv>
                    {datas && datas.map(d => User(d))}
                </UserDiv>
            </Div>
        </div>
    )
}

function User(data) {

    const OnSelect = (s) => {
        SetAttendenceResult(data.Column, data.Row, s);
    }

    return (
        <UserBlock>
            <UserName>{data.User}</UserName>

            <UserAttDropbox>
                <DropdownList
                    onSelect={OnSelect}
                    defaultValue={data.Result}
                    data={["불참", "참석", "지각", "결석"]}
                />
            </UserAttDropbox>
        </UserBlock>
    )
}

function GetImage(match) {
    if (match.Type == "풋살") {
        return Futsal;
    }
    else if (match.Type == "축구") {
        return Pitch;
    }
    else if (match.Type == "야유회") {
        return Dance;
    }
    else if (match.Type == "회식") {
        return Beer;
    }

    return "";
}
