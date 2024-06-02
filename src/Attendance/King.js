import styled from 'styled-components';
import { GetAttendenceResultsOfUser, GetAttendencesOfUser, GetScoresOfUser, GetTotalScoreOfUser, GetTotalScores } from "../google/google.spread.attend";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToDateParameter } from "../common";
import { forEach } from 'lodash';
import Crown from '../images/crown.svg';

import Gold from '../images/gold.svg';
import Silver from '../images/silver.svg';
import Bronze from '../images/bronze.svg';

const Div = styled.div`
    display: grid;
    padding-left: 10px; 
    padding-right: 10px;

    padding-top: 15px;
    padding-bottom: 15px;
`;

const GoldRowDiv = styled.div`
  display: grid;
  grid-template-columns:50px auto auto;
  height: 40px;
  border-bottom: solid 0.1px lightgray;
  align-items: center;
  background-color: rgb(173,255,47,0.8);
`;

const GoldLogo = styled.img`
    grid-column: 1;    
    width: 30px;
    margin-right: 10px;
    vertical-align: baseline;
`

const GoldUserDiv = styled.div`
  grid-column: 2;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
`;

const GoldScoreDiv = styled.div`
  grid-column: 3;
  font-size: 20px;
  vertical-align: middle;
  text-align: center;
`;

const SilverRowDiv = styled.div`
  display: grid;
  grid-template-columns:50px auto auto;
  height: 40px;
  border-bottom: solid 0.1px lightgray;
  align-items: center;
  background-color: rgb(173,255,47,0.4);
`;

const SilverLogo = styled.img`
    grid-column: 1;    
    width: 30px;
    margin-right: 10px;
    vertical-align: baseline;
`

const SilverUserDiv = styled.div`
  grid-column: 2;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
`;

const SilverScoreDiv = styled.div`
  grid-column: 3;
  font-size: 20px;
  vertical-align: middle;
  text-align: center;
`;

const BronzeRowDiv = styled.div`
  display: grid;
  grid-template-columns:50px auto auto;
  height: 40px;
  border-bottom: solid 0.1px lightgray;
  align-items: center;
  background-color: rgb(173,255,47,0.1);
`;

const BronzeLogo = styled.img`
    grid-column: 1;    
    width: 30px;
    margin-right: 10px;
    vertical-align: baseline;
`

const BronzeUserDiv = styled.div`
  grid-column: 2;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
`;

const BronzeScoreDiv = styled.div`
  grid-column: 3;
  font-size: 20px;
  vertical-align: middle;
  text-align: center;
`;


const RowDiv = styled.div`
  display: grid;  
  grid-template-columns:50px auto auto;
  height: 40px;
  border-bottom: solid 0.1px lightgray;
  align-items: center;
`;

const UserDiv = styled.div`
  grid-column: 2;
  text-align: center;  
  font-size: 20px;
`;

const ScoreDiv = styled.div`
  grid-column: 3;
  text-align: center;
  font-size: 20px;
`;


export default function King() {

    const [scores, setScores] = useState(false);

    const onRendering = async () => {
        await GetTotalScores()
            .then(r=> setScores(r));
    }

    useEffect(() => {
        onRendering();
    }, [])

    var arr = Array.from(scores);
    arr.sort((a, b) => b.TotalScore - a.TotalScore);

    var values = new Array();
    arr.forEach(item => values.push(parseInt(item.TotalScore)));

    var distinct = [...new Set(values)];

    return (
        <Div>
            {arr && arr.map(p => Score(p, GetLevel( p.TotalScore, distinct)))}
        </Div>
    )
}

function GetLevel(totalScore, values){
    var arr = Array.from(values);

    if(arr[0] == totalScore)
        return 1;
    else if(arr[1] == totalScore)        
        return 2;
    else if(arr[2] == totalScore)
        return 3;

    return 0;
}

function Score(score, level) {

    if (level == 1) {
        return (
            <GoldRowDiv>
                <GoldLogo src={Gold}/>
                <GoldUserDiv>{score.User}</GoldUserDiv>
                <GoldScoreDiv>{score.TotalScore}</GoldScoreDiv>
            </GoldRowDiv>
        )
    }
    else if (level == 2) {
        return (
            <SilverRowDiv>
                <SilverLogo src={Silver}/>
                <SilverUserDiv>{score.User}</SilverUserDiv>
                <SilverScoreDiv>{score.TotalScore}</SilverScoreDiv>
            </SilverRowDiv>
        )
    }
    else if (level == 3) {
        return (
            <BronzeRowDiv>
                <BronzeLogo src={Bronze}/>
                <BronzeUserDiv>{score.User}</BronzeUserDiv>
                <BronzeScoreDiv>{score.TotalScore}</BronzeScoreDiv>
            </BronzeRowDiv>
        )
    }
    else {
        return (
            <RowDiv>
                <UserDiv>{score.User}</UserDiv>
                <ScoreDiv>{score.TotalScore}</ScoreDiv>
            </RowDiv>
        )
    };
}