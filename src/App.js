import Login from './login'
import styled from 'styled-components';
import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from "reactjs-bottom-navigation";

import Home from './home';
import Matchs from './match/matchs';
import Match from './match/match';
import EditMatch from './match/editmatch';
import Dues from './dues/dues';
import Attendances from './Attendance/Attendances';
import Position from './position';

import CalendarImage from './images/calendar.svg'
import WhiteCalendarImage from './images/calendar_white.svg'
import MoneyImage from './images/money.svg'
import WhiteMoneyImage from './images/money_white.svg'
import DashboardImage  from './images/dashboard.svg'

import AttendanceImage from './images/user.svg'
import WhiteAttendanceImage from './images/user_whtie.svg'

import PenaltyImage from './images/penalty.svg'
import WhitePenaltyImage from './images/penalty_white.svg'

import FormationImage from './images/formation.svg'
import WhiteFormationImage from './images/formation_white.svg'

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Penalties from './Penalty/penalties';

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
    navigate('/');
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

    {
      title: "벌금",
      icon: <Image src={PenaltyImage}/>,
      activeIcon: <Image src={WhitePenaltyImage}/>,
      onClick: () => { navigate('/penalties') },
    },

    {
      title: "포지션",
      icon: <Image src={FormationImage}/>,
      activeIcon: <Image src={WhiteFormationImage}/>,
      onClick: () => { navigate('/position') },
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
          <Route path="/match/edit/:id" exact element={<EditMatch/>}/>
          <Route path="/attendance" export element={<Attendances/>}/>
          <Route path="/dues" exact element={<Dues/>} />
          <Route path="/penalties" exact element={<Penalties/>} />
          <Route path="/position" exact element={<Position/>} />
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
