import logo from './logo.png';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { GetUsers } from './google/google.spread.user';

const Div = styled.div`
    margin-top: 40%;
    display: 'flex';
    text-align: center;
    height: fit-content;
`;

const GridDiv = styled.div`    
    display: grid;
    grid-template-columns: 25% 75%;
`

const LogoDiv = styled.div`
    grid-row:1;
    grid-column: span 2;
`

const Image = styled.img`
    width: 100%;
`

const Seperator1 = styled.div`
    grid-row:2;
    height: 20px;
`

const Label1 = styled.label` 
    font-size: x-large;
    text-align: left;    
    grid-row: 3;
    grid-column:1;
`

const Input1 = styled.input`
    font-size: x-large;
    grid-row: 3;
    grid-column:2;
    margin-left: 10px;
`

const Seperator2 = styled.div`
    grid-row:4;
    height: 30px;
`

const Label2 = styled.label` 
    font-size: x-large;
    text-align: left;
    grid-row: 5;
    grid-column:1;
`

const Input2 = styled.input`
    font-size: x-large;
    grid-row: 5;
    grid-column:2;
    margin-left: 10px;
`

const Seperator3 = styled.div`
    grid-row:6;
    height: 50px;
`;

const Button = styled.button`
    grid-row:7;
    grid-column: span 2;
    width: 100%;
    height: 50px;
    font-size: large;
    background-color: #2196F3;
    color: white;
    border: transparent;

    &:hover {
        background: cornflowerblue;
        color: black;
        transition: 0.5s;
  }
`

async function Authenticate(name, phone){
    
    var users = await GetUsers();
    var array = Array.from(users);

    var result= false;

    array.forEach(user => {
        result = result || (user.Name == name && user.Phone == phone);
    });

    return result;
}

function Login({callBack}) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const afterLogin = (e) => {
       
        if(e){
            alert("로그인에 성공하였습니다.");        

            window.sessionStorage.setItem("user", name);
            window.sessionStorage.setItem("phone", phone);

            callBack();
        }
        else{
            alert("로그인 실패!");
        }
    }

    const onClickLogin = () => {
        Authenticate(name, phone)
            .then((r) => afterLogin(r));
    }

    useEffect(() => {
    },
    [])

    return (
        <Div>
            <GridDiv>
                <LogoDiv>
                    <Image src={logo} />
                </LogoDiv>
                <Seperator1 />
                <Label1 htmlFor='input_name'>이름</Label1>
                <Input1 type='text' name='input_name' value={name} onChange={handleName} />
                <Seperator2 />
                <Label2 htmlFor='input_phone'>번호</Label2>
                <Input2 type='text' name='input_phone' value={phone} onChange={handlePhone} />
                <Seperator3 />
                <Button type='button' onClick={onClickLogin}>Login</Button>
            </GridDiv>
        </Div>
    )
}

export default Login;

