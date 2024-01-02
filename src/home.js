import styled from "styled-components";
import logo from './logo.png';

const Div = styled.div`
    padding-top: 30%;
    text-align: center;
`

const Text = styled.div`
    text-align: center;
    font-size: x-large;
    font-weight: bold;
    margin-top: 30px;
`
const Image = styled.img`
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;  
`;


export default function Home(){
    return (
        <Div>
            <Image src={logo}/>
            <Text>
                안녕하세요. {sessionStorage.getItem("user")}님
            </Text>
        </Div>
    )
}