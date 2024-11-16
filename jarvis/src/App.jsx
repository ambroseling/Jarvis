import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './components/SideBar';
import CubeGrid from './components/CubeGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap';
function App() {
  return (
    <div className="App">
      <div>
        <Container>
          <SideBar/>
          <div style={{ flex: 1 }}>
            <div id="app"></div>
          <div className="zoom-buttons">
            <button id="zoomIn">Zoom In</button>
            <div style={{ width: '10px', display: 'inline-block' }}></div>
            <button id="zoomOut">Zoom Out</button>
          </div>
          <CubeGrid />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default App
