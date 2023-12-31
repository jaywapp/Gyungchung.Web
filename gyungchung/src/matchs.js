import styled from "styled-components";
import { GetMatches, GetAttendences } from "./google.spread";
import React, { useEffect, useState } from 'react';
import Dance from './images/dance.svg'
import Futsal from './images/futsal.svg'
import Pitch from './images/pitch.svg'
import Beer from './images/beer.svg'
import { MatchDetail } from "./matchdetail";

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

const Date = styled.div`
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

    var user = sessionStorage.getItem("user");
    var email = sessionStorage.getItem("email");

    const [matches, setMatches] = useState(false);
    const [attendences, setAttendences] = useState(false);
    const [select, setSelect] = useState(false);

    const onRendering = async () => {
        await GetMatches()
            .then(r => setMatches(r));
        await GetAttendences()
            .then(atts=> setAttendences(atts));
    }

    useEffect(() => {
        onRendering();
    }, [])

    var datas = Array.from(matches);

    function onClick(m) {
        setSelect(m);
    }

    if (select) {

        var group1 = new Array();
        var group2 = new Array();
    
        var atts = Array.from(attendences);
        atts.forEach(att => {
            if(att.Date == select.DateTime){
    
                
                if(att.Attendance == "참석")
                    group1.push(att);
                else
                    group2.push(att);
            }
        })

        return MatchDetail(select, group1, group2);
    }
    else {
        return (
            <div>
                {datas && datas.map(d => {
                    var image = GetImage(d);

                    return (
                        <Div onClick={() => onClick(d)}>
                            <Image src={image} />
                            <Date>{d.DateTime}</Date>
                            <Place>{d.Location}</Place>
                            <Logcation>{d.Address}</Logcation>
                        </Div>
                    );
                })}
            </div>
        )
    };
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
