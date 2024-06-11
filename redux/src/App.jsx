/*

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import store from './store'
import Tulos from './Tulos'
import DecrementButton from './components/buttons/DecrementButton'
import IncrementButton from './components/buttons/IncrementButton'



function App() {
  console.log("redux store", store.getState())

  return (
    <>
      <div>
        <Tulos />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <DecrementButton />
      <div className="card">
        {store.getState()}
        <IncrementButton />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>


      <button
        onClick={e => store.dispatch({ type: 'INCREMENT', arvo: 123, nimi: "Juha" })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
        <Tulos />
    </>
  )
}

export default App
*/

import store from "./store"

const App = () => (
  <div>
    <button type="button"
      onClick={() =>
        store.dispatch({
          type: 'NEW_NOTE',
          payload: {
            content: "napin takaa tullut sisältö redux storeen",
            id: Math.random()
          }
        })
      }
    >lisää uusi note</button>
    <ul>
      {store.getState().map(note =>
        <li key={note.id}>
          {note.content}
          <strong>
            {note.important ? 'important' : ''}
          </strong>
          <button type="button" onClick={() =>
            store.dispatch({
              type: "TOGGLE_IMPORTANCE",
              payload: { id: note.id }
            })
          }>toggle</button>
        </li>
      )}
    </ul>
  </div>
)

export default App