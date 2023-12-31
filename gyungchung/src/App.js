import Login from './login'
import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { BottomNavigation } from "reactjs-bottom-navigation";

import Dashboard from './dashboard';
import Matches from './matchs';
import Dues from './dues';

import CalendarImage from './images/calendar.svg'
import MoneyImage from './images/money.svg'
import DashboardImage  from './images/dashboard.svg'

import WhiteCalendarImage from './images/calendar_white.svg'
import WhiteMoneyImage from './images/money_white.svg'
import WhiteDashboardImage  from './images/dashboard_white.svg'

const DASHBOARD = "dashboard";
const MATCHES = "matches";
const DUES = "dues";

const LoginDiv = styled.div`
  max-width: 400px;
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

  const [login, setLogin] = useState(false);
  const [content, setContent] = useState('');

  const loginCallback = () => {
    var name = sessionStorage.getItem("user");
    var email = sessionStorage.getItem("email");

    var l = name != null && name != ""
      && email != null && email != "";

    setLogin(l);
  }


  const bottomNavItems = [
    {
      title: "대시보드",
      icon: <Image src={DashboardImage}/>,
      activeIcon: <Image src={WhiteCalendarImage}/>,
      onClick: () => { setContent(DASHBOARD) },
    },
    {
      title: "일정",
      icon: <Image src={CalendarImage}/>,
      activeIcon: <Image src={WhiteCalendarImage}/>,
      onClick: () => { setContent(MATCHES) },
    },
    {
      title: "회비",
      icon: <Image src={MoneyImage}/>,
      activeIcon: <Image src={WhiteMoneyImage}/>,
      onClick: () => { setContent(DUES) },
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
        {GetContent(content)}
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

function GetContent(content) {
  if (content == DASHBOARD) {
    return (<Dashboard />);
  }
  else if (content == MATCHES) {
    return (<Matches />);
  }
  else if (content == DUES) {
    return (<Dues />);
  }

  return null;
}

export default App;
