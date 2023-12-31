import styled from "styled-components";
import Dance from './images/dance.svg'
import Futsal from './images/futsal.svg'
import Pitch from './images/pitch.svg'
import Beer from './images/beer.svg'

import { GetAPI, GetAttendences, SHEET_DUE } from "./google.spread";
import React, { useEffect, useState } from 'react';

import { Attend } from "./attend";
import {Match} from "./matchs";

const Div = styled.div`
    display: grid;
`;

const AttendDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

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

const Title = styled.div`
   font-size: x-large;
   font-weight: bold;
   margin-top: 5%;
   margin-bottom: 5%;
`;

const AttendentBlock = styled.div`
    display: inline-flex;
    padding: 10px;
    margin: 5px;
    background-color: lightblue;
`

const DisattendentBlock = styled.div`
    display: inline-flex;
    padding: 10px;
    margin: 5px;
    background-color: lightgray;
`

function GetImage(match){
    if(match.Type == "풋살"){
        return Futsal;
    }
    else if(match.Type == "축구"){        
        return Pitch;
    }
    else if(match.Type == "야유회"){
        return Dance;
    }
    else if(match.Type == "회식"){
        return Beer;
    }

    return "";
}

export function MatchDetail(match, attendees, disattendees){

    var datas1 = Array.from(attendees);
    var datas2 = Array.from(disattendees);

    return (
        <Div>
            <MainDiv>
                <Image src={GetImage(match)} />
                <Date>{match.DateTime}</Date>
                <Place>{match.Location}</Place>
                <Logcation>{match.Address}</Logcation>
            </MainDiv>
            <Title>참석 {datas1.length}명</Title>
            <AttendDiv>
                {datas1 && datas1.map(d => Attender(d))}
            </AttendDiv>
            <Title>불참 {datas2.length}명</Title>
            <AttendDiv>
                {datas2 && datas2.map(d => Disattender(d))}
            </AttendDiv>
        </Div>
    )
}

function Attender(data){
    return (
        <AttendentBlock>{data.User}</AttendentBlock>
    )
}

function Disattender(data){
    return (
        <DisattendentBlock>{data.User}</DisattendentBlock>
    )
}

