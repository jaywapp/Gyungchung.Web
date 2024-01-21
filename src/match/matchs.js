import styled from "styled-components";
import { GetMatches } from "../google/google.spread.match";
import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToDateParameter } from "../common";

import Dance from './../images/dance.svg'
import Futsal from './../images/futsal.svg'
import Pitch from './../images/pitch.svg'
import Beer from './../images/beer.svg'
import Question from './../images/question.svg'

const Div = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows:auto auto auto;
    padding-left: 10px; 
    padding-right: 10px;

    padding-top: 15px;
    padding-bottom: 15px;

    &:hover {
        background: cornflowerblue;
        color: black;
        transition: 0.5s;
    }
`;

const Image = styled.img`
    width: 70px;
    margin-right: 10px;
    grid-column: 1;
    grid-row: span 3;
`;

const DateTime = styled.div`
    grid-column: 2;
    grid-row: 1;
    color:navy;
    font-size: medium;
    font-weight: bold;
`;

const Place = styled.div`
    grid-column: 2;
    grid-row: 2;
    font-size: large;
    font-weight: bold;
`;

const Logcation = styled.div`
    grid-column: 2;
    grid-row: 3;
    color: gray;
`
 
export default function Matches() {

    const navigate = useNavigate();

    const [matches, setMatches] = useState(false);

    const onRendering = async () => {
        await GetMatches()
            .then(r => setMatches(r));
    }

    useEffect(() => {
        onRendering();
    }, [])

    var datas = GetDatas(matches);

    function onClick(m) {
        var id = ToDateParameter(m.DateTime);
        navigate('/match/'+ id)
    }

    return (
        <div>
            {datas && datas.map(d => {
                var image = GetImage(d);

                return (
                    <Div onClick={() => onClick(d)}>
                        <Image src={image} />
                        <DateTime>{d.DateTime}</DateTime>
                        <Place>{d.Location}</Place>
                        <Logcation>{d.Address}</Logcation>
                    </Div>
                );
            })}
        </div>
    )
}

function GetDatas(matches){

    const now = new Date();

    var datas = new Array();
    var befores = new Array();

    var arr = Array.from(matches);

    arr.forEach(item => {
        var d = GetDateTime(item.DateTime);

        if(IsBefore(d, now)){
            befores.push(item);
        }
        else{
            datas.push(item);
        }
    });

    befores.forEach(before => {
        datas.push(before);
    });

    return datas;
}

function GetDateTime(date){
    var splited = date.split('.');

    return {
        "year" : Number(splited[0]),
        "month" : Number(splited[1]),
        "day" : Number(splited[2]),
    };
}

function IsBefore(date1, date2){
    var year1 = date1.year;
    var month1 = date1.month;
    var day1 = date1.day;

    var year2 = date2.getFullYear();
    var month2 = date2.getMonth()  + 1;
    var day2 = date2.getDate();

    if(year1 > year2)
        return false;
    if(year1 < year2)
        return true;

    if(month1 > month2)
        return false;
    if(month1 < month2)
        return true;

    return day1 < day2;
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
    else if (match.Type == "미정") {
        return Question;
    }

    return "";
}
