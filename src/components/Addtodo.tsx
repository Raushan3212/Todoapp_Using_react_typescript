import { FormEvent, useState } from "react"
import {useTodo} from "../store/Todos"

const addtodo = () => {

    const [todo , setTodo] = useState("");

    const {handleAddtodo} = useTodo();

    const handleonSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(todo.trim() !== ""){
          handleAddtodo(todo)
          setTodo("");
        }
       
    }

  return (
    <form onSubmit={handleonSubmit}>
        <input type="text" placeholder="Enter your data" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit">Add</button>
    </form>
  )
}

export default addtodo