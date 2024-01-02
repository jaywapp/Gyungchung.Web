import styled from 'styled-components';
import { GetAttendenceResultsOfUser, GetAttendencesOfUser } from "../google/google.spread.attend";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToDateParameter } from "../common";
import { forEach } from 'lodash';

const Div = styled.div`
    display: grid;
    padding-left: 10px; 
    padding-right: 10px;

    padding-top: 15px;
    padding-bottom: 15px;
`;

const HeaderDiv = styled.div`
    display:flex;
`

const NameDiv = styled.div`
    font-size: xx-large;
    font-weight: bold;
    margin-right: 10px;
    vertical-align: top;
    margin-bottom: 20px;
`

const DescDiv = styled.div`
    font-size: large;
    font-weight: bold;
    padding-top:16px;
`

const TotalScoreDiv = styled.div`
    font-size: xx-large;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
`

const ColumnDiv = styled.div`
    display: grid;
    grid-template-columns:150px 1fr 1fr 1fr;
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
    background-color: beige;
    font-weight: bold;
    font-size: 18px;
`

const AttendanceDiv = styled.div`
    display: grid;
    grid-template-columns:150px 1fr 1fr 1fr;
    padding: 5px;
    text-align: center;
    color: ${props => props.color || 'black'};
    margin-bottom: 10px;
    border-bottom: solid 0.1px lightgray;
    font-size: 20px;
`

const DateDiv = styled.div`
    grid-column: 1;
    text-align: left;
`

const ExpectionDiv = styled.div`
    grid-column: 2;
`

const ResultDiv = styled.div`
    grid-column: 3;
`

const ScoreDiv = styled.div`
    grid-column: 4;
`

export default function Attendances(){
    
    const [results, setResults] = useState(false);
    const [expections, setExpectations] = useState(false);

    const onRendering = async () => {
        var user = sessionStorage.getItem("user");

        await GetAttendenceResultsOfUser(user)
            .then(r => setResults(r));
        await GetAttendencesOfUser(user)
            .then(r => setExpectations(r));
    }

    useEffect(() => {
        onRendering();
    }, [])

    var pairs = Pairing(results, expections);
    var total = 0;

    pairs.forEach(pair => {
        total += pair.Score;
    })

    return (
        <Div>
             <HeaderDiv>
            <NameDiv>{sessionStorage.getItem("user")}</NameDiv>
            <DescDiv>님의 출석 점수는</DescDiv>
            <TotalScoreDiv>{total}</TotalScoreDiv>
            <DescDiv>점 입니다.</DescDiv>
        </HeaderDiv>  

             <ColumnDiv>
                <DateDiv>날짜</DateDiv>
                <ExpectionDiv>참석여부</ExpectionDiv>
                <ResultDiv>실제참석</ResultDiv>
                <ScoreDiv>출석점수</ScoreDiv>
            </ColumnDiv>

            {pairs && pairs.map(p=> Attendance(p))}
        </Div>
    )
}

function Attendance(pair){

    var isOld = false;

    return (
        <AttendanceDiv color={isOld ? 'lightgray' : 'black'}>
            <DateDiv>{pair.Date}</DateDiv>
            <ExpectionDiv>{pair.Expection}</ExpectionDiv>
            <ResultDiv>{pair.Result}</ResultDiv>
            <ScoreDiv>{pair.Score}</ScoreDiv>
        </AttendanceDiv>
    )
}

function Pairing(datas1, datas2){
    
    var pairs = new Array();

    var results = Array.from(datas1);
    var expections = Array.from(datas2);

    results.forEach(result => {

        expections.forEach(expection => {

            if(result.Date == expection.Date){
                var pair = {
                    "User" : result.User,
                    "Date" : result.Date,
                    "Expection" : expection.Attendance,
                    "Result" : result.Result,
                    "Score" : GetScore(result, expection),
                };

                pairs.push(pair);
            }

        })
    })

    return pairs;
}

function GetScore(result, expection){
    if(expection == "참석"){
        if(result == "참석"){
            return 10;
        }
        else if(result == "지각"){
            return 5;
        }
        if(result == "결석"){
            return -5
        }
    }
    
    return 0;
}
