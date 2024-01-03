import Login from './login'
import styled from 'styled-components';
import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from "reactjs-bottom-navigation";

import Home from './home';
import Matchs from './match/matchs';
import Match from './match/match';
import Dues from './dues/dues';
import Attendances from './Attendance/Attendances';

import CalendarImage from './images/calendar.svg'
import MoneyImage from './images/money.svg'
import DashboardImage  from './images/dashboard.svg'

import AttendanceImage from './images/user.svg'
import WhiteAttendanceImage from './images/user_whtie.svg'

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
    setLogin(true);
  }

  var bottomNavItems = [
    {
      title: "홈",
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
      title: "출석",
      icon: <Image src={AttendanceImage}/>,
      activeIcon: <Image src={WhiteCalendarImage}/>,
      onClick: () => { navigate('/attendance') },
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
          <Route path="/" exact element={<Home/>} />
          <Route path="/matches" exact element={<Matchs/>} />
          <Route path="/match/:id" exact element={<Match/>}/>
          <Route path="/attendance" export element={<Attendances/>}/>
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
