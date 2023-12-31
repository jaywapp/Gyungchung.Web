import styled from "styled-components";

const Div = styled.div`
`;

export function Attend(datas){

    var targets = Array.from(datas);

    return (
        <Div>
            {targets && targets.map(d =>{
                <div>d.User</div>
            })}
        </Div>
    );
}
