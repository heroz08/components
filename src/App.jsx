import reactLogo from './assets/react.svg'
import './App.css'
import './assets/fonts/iconfont.css'
import Demo from './pages/Demo/index.jsx';

function App() {
  return (
    <div className="App">
      <div className={'top'}>
        <div>
          <img src="/vite.svg" className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <h1>React Component</h1>
      </div>
      <div className={"com-wrap"}>
        <Demo />
      </div>
    </div>
  )
}

export default App
