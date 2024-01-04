import styled from "styled-components";
import { GetMatchAtDate } from "../google/google.spread.match"
import { GetAttendencesAtDate } from "../google/google.spread.attend";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Map } from '../map'
import React, { useEffect, useState } from 'react';
import { ToDateParameter } from "../common";

import Dance from './../images/dance.svg'
import Futsal from './../images/futsal.svg'
import Pitch from './../images/pitch.svg'
import Beer from './../images/beer.svg'
import Back from './../images/back.svg'
import Edit from './../images/edit.svg'

const { kakao } = window;

let map;

const HeaderDiv = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
`;

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
    padding: 9px;
    margin: 5px;
    background-color: lightblue;
`

const DisattendentBlock = styled.div`
    display: inline-flex;
    padding: 9px;
    margin: 5px;
    background-color: lightgray;
`

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

const EditButton = styled.img`    
    grid-column: 3;
    margin-top: 5px;
    width: 40px;
    height: 40px;
    visibility: ${(props) => props.role == "admin" ? 'visible' : 'collapse'};

    &:hover {
        background: cornflowerblue;
        color: black;
        transition: 0.5s;
    }
`

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


export default function Match(props) {

    const { id } = useParams();
    var date = id;

    const [match, setMatch] = useState(false);
    const [attendences, setAttendences] = useState(false);

    const navigate = useNavigate();

    const onRendering = async () => {

        await GetMatchAtDate(date)
            .then(match => {
                setMatch(match);
                InitializeMap(match);
            });
        await GetAttendencesAtDate(date)
            .then(atts => setAttendences(atts));
    }

    const onBackClick = () => {
        navigate('/matches');
    }

    const onEditClick = () => {
        navigate('/match/edit/' + id);
    }

    useEffect(() => {
        onRendering();
    },
        [date])

    var datas1 = new Array();
    var datas2 = new Array();

    var atts = Array.from(attendences);
    atts.forEach(att => {
        if (att.Date == match.DateTime) {

            if (att.Attendance == "참석")
                datas1.push(att);
            else
                datas2.push(att);
        }
    })

    return (
        <div>
            <HeaderDiv>
                <BackButton src={Back} onClick={onBackClick} />
                <EditButton src={Edit} onClick={onEditClick}
                    role={window.sessionStorage.getItem("role")} />
            </HeaderDiv>
            <Div>
                <MainDiv>
                    <Image src={GetImage(match)} />
                    {/* <Date>{match.DateTime}</Date> */}
                    {/* <Place>{match.Location}</Place> */}
                    <Logcation>{match.Address}</Logcation>
                </MainDiv>
                <Map match={match} />
                <Title>참석 {datas1.length}명</Title>
                <AttendDiv>
                    {datas1 && datas1.map(d => Attender(d))}
                </AttendDiv>
                <Title>불참 {datas2.length}명</Title>
                <AttendDiv>
                    {datas2 && datas2.map(d => Disattender(d))}
                </AttendDiv>
            </Div>
        </div>
    )
}

function Attender(data) {
    return (
        <AttendentBlock>{data.User}</AttendentBlock>
    )
}

function Disattender(data) {
    return (
        <DisattendentBlock>{data.User}</DisattendentBlock>
    )
}

function InitializeMap(match) {

    const address = match.Address;
    const name = match.Location;

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 생성합니다    
    map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>',
            });

            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
}
