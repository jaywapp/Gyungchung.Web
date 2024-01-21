

import styled from 'styled-components';
import {datas} from './positions'

const Div = styled.div`
    text-align: center;
    vertical-align: middle;
    padding-left: 10px; 
    padding-right: 10px;

    padding-top: 15px;
    padding-bottom: 15px;
`

const PositionsDiv = styled.th`
    margin-top: 10%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

const PositionDiv = styled.div`
    grid-row: ${props => props.row};
    grid-column: ${props => props.column};  
    margin: 5px;

    grid-template-columns: 1fr;
    grid-template-rows : 1fr;
`

const Badge = styled.div`
    min-width: 50px;
    grid-row: 1;
    padding: 5px;
    margin: 5px;
    font-size: large;
    color: white;
    background-color: ${props => props.color};
    border-radius: 30px;
    z-index: 1;
`

const KoreaName = styled.div`
    grid-row: 2;
    z-index: 1;
    font-size: medium;
    text-align: center;
    vertical-align:text-top;
    color: ${props => props.textcolor};
`


const HeaderDiv = styled.div`
    display:flex;
`

const NameDiv = styled.div`
    font-size: xx-large;
    font-weight: bold;
    margin-right: 10px;
    vertical-align: top;
`

const DescDiv = styled.div`
    font-size: large;
    font-weight: bold;
    padding-top:16px;
`

const Text = styled.div`
    text-align: left;
    vertical-align: bottom;
    margin-top: 30px;
    padding: 10px;
    background-color: beige;
`

export default function Position(){
    var positions = GetDatas(sessionStorage.getItem("position"));

    return (
        <Div>
            <HeaderDiv>
                <NameDiv>{sessionStorage.getItem("user")}</NameDiv>
                <DescDiv>님의 선호 포지션입니다.</DescDiv>
            </HeaderDiv>
            <Text>내용 변경이 필요할 경우 회장에게 연락주세요.</Text>
            <PositionsDiv> 
              {
                datas.map(d=> PositionUnit(d, positions))
              }
            </PositionsDiv>
        </Div>
    )
}

function PositionUnit(data, positions){

    var eng = data.Eng; 
    var kor = data.Kor;
    var has = false;
    
    positions.forEach(position => {
        has = has || data.Eng == position;
    });

    var color = has ? data.Color : '#d4d4d4';  
    var textcolor = has ? 'black' : '#d4d4d4';  

    return(
        <PositionDiv row={data.Row} column={data.Column}
                    rowspan={data.RowSpan} colspan={data.ColumnSpan}>
            <Badge has={has} color={color}>{eng}</Badge>
            <KoreaName has={has} textcolor={textcolor}>{kor}</KoreaName>
        </PositionDiv>
    )
}

function GetDatas(buffer){

    var tmp = buffer.split(',');
    var result = new Array();

    tmp.forEach(element => {
        result.push(element.trim());
    });

    return result;
}
