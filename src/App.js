import Login from './login'
import styled from 'styled-components';
import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from "reactjs-bottom-navigation";

import Dashboard from './dashboard';
import Matchs from './match/matchs';
import Match from './match/match';
import Dues from './dues/dues';

import CalendarImage from './images/calendar.svg'
import MoneyImage from './images/money.svg'
import DashboardImage  from './images/dashboard.svg'

import WhiteCalendarImage from './images/calendar_white.svg'
import WhiteMoneyImage from './images/money_white.svg'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const LoginDiv = styled.div`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;  
`

const ContentDiv = styled.div`
  max-width: 600px;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;  
  margin-bottom: 70px;
`

const Image = styled.img`
  width: 20px;
`;

function App() {

  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  const loginCallback = () => {
    var name = sessionStorage.getItem("user");
    var email = sessionStorage.getItem("email");

    var l = name != null && name != ""
      && email != null && email != "";

    setLogin(l);
  }

  var bottomNavItems = [
    {
      title: "대시보드",
      icon: <Image src={DashboardImage}/>,
      activeIcon: <Image src={WhiteCalendarImage}/>,
      onClick: () => { navigate('/') },
    },
    {
      title: "일정",
      icon: <Image src={CalendarImage}/>,
      activeIcon: <Image src={WhiteCalendarImage}/>,
      onClick: () => { navigate('/matches') },
    },
    {
      title: "회비",
      icon: <Image src={MoneyImage}/>,
      activeIcon: <Image src={WhiteMoneyImage}/>,
      onClick: () => { navigate('/dues') },
    },
  ];

  if (!login) {
    return (
      <LoginDiv>
        <Login callBack={loginCallback} />
      </LoginDiv>
    );
  }
  else {
    return (
      <ContentDiv>

        <Routes>
          <Route path="/" exact element={<Dashboard/>} />
          <Route path="/matches" exact element={<Matchs/>} />
          <Route path="/match/:id" exact element={<Match/>}/>
          <Route path="/dues" exact element={<Dues/>} />
        </Routes>
        <BottomNavigation
          items={bottomNavItems}
          selected={0}
          activeBgColor="#2196F3"
          activeTextColor="white"
        />
      </ContentDiv>
    )
  }
}

export default App;
