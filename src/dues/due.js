
import styled from 'styled-components';
import Complate from './../images/complate.svg'
import Cancel from './../images/cancel.svg'

const Div = styled.div`
    height: 50px;
    text-align: center;
    vertical-align: baseline;
    font-size: large;
    display: flex;
    &:hover {
        background: cornflowerblue;
        color: black;
        transition: 0.5s;
    }
`;

const Image = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    vertical-align: baseline;
`;

const Content = styled.div`
    vertical-align: baseline;
    font-size: 20px;
`

export function Due(due){
    alert(due.Payment)

    return (
        <Div>
            <Image src={(due.Payment == "납부") ? Complate : Cancel}/> 
            <Content>{due.Month}월</Content>
        </Div>
    )
}