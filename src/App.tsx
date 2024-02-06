import Addtodo from "./components/Addtodo";
import Navbar from "./components/Navbar";
import Todosmain from "./components/Todosmain";
import "./App.css"

const App = () => {
  return (
    <main>
      <h2>Todo React + Typescript app</h2>
      <Navbar/>
      <Addtodo/>
      <Todosmain/>
    </main>
  )
}

export default App