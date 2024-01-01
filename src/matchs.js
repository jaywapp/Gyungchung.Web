import styled from "styled-components";
import { GetMatches, GetAttendences } from "./google.spread";
import React, { useEffect, useState } from 'react';
import Dance from './images/dance.svg'
import Futsal from './images/futsal.svg'
import Pitch from './images/pitch.svg'
import Beer from './images/beer.svg'
import { MatchDetail } from "./matchdetail";

const { kakao } = window;

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
        InitializeMap(m);
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

        return MatchDetail(select, group1, group2, () => onClick(null));
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

function InitializeMap(match){

    const address = match.Address;
    const name = match.Location;

    window.kakao.maps.load(() => {

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption);

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
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name +'</div>',
                });

                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    });
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
