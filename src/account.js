import styled from "styled-components";

import Copy from './images/copy.svg'
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const account = "1000-8789-6623 토스뱅크";

const Div = styled.div`
   margin-top: 2%;
   font-size: large;
   display: flex;
`;

const Text = styled.div`
    font-style:italic;
`

const ButtonImage = styled.img`
    width: 25px;
    margin-left: 10px;

    &:hover {
        background: cornflowerblue;
        color: black;
        transition: 0.5s;
    }
`;

export function Account(){
    
    const onCopyClick = () => {
    }

    return(
        <Div>
            <Text>{account}</Text>
            <CopyToClipboard text={account} onCopy={() => alert("클립보드에 복사되었습니다.")}>
                <ButtonImage src={Copy} onClick={onCopyClick}/>
            </CopyToClipboard>  
        </Div>
    )
}