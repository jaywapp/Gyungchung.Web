import styled from "styled-components";
import logo from './logo.png';

const info_page = 'https://jaywapp.notion.site/2024-3612357ceb1140f780e261a6dfb1e9aa';

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

const Link = styled.div`
    margin-top: 10%;
`


export default function Home(){
    return (
        <Div>
            <Image src={logo}/>
            <Text>
                안녕하세요. {sessionStorage.getItem("user")}님
            </Text>

            <Link className="App">
                <a href={info_page} target="_blank" rel="noopener noreferrer">
                    2024 경충 운영 규칙
                </a>
            </Link>
        </Div>
    )
}