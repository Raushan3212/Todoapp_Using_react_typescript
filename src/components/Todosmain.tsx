import { useTodo } from '../store/Todos'
import {useSearchParams } from 'react-router-dom';

const Todosmain = () => {

const {todos, toggletodoAscompleted, handleDeleteTodo} = useTodo();

const [searchParams] = useSearchParams(); //get data using params
let todosData = searchParams.get("todos");

let filterData = todos; // to get active and completed data in todos

if(todosData === "active"){
    filterData = filterData.filter((task) => !task.completed)
}

if(todosData === "completed"){
    filterData = filterData.filter((task) => task.completed)
}


  return (
    <ul className='main-task'>
        {
            filterData.map((todo) =>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggletodoAscompleted(todo.id)}/>
                    <label htmlFor={`todo-${todo.id}`}>{todo.tasks}</label>
                    {
                    todo.completed && (
                        <button type='button' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    )
                }
                </li>
               
            })
        }
    </ul>
  )
}

export default Todosmain