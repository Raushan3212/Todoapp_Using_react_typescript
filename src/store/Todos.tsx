import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderprops = {
    children: ReactNode // its stored all primitive data types and non primitive data types
}

//create Todo property
export type Todo = {
    id:string;
    tasks:string;
    completed:boolean;
    CreatedBy:Date;
}

export type TodoContext = {
    todos:Todo[];
    handleAddtodo:(task:string) => void; // call signature
    toggletodoAscompleted:(id:string) => void; // call signature
    handleDeleteTodo:(id:string) => void; // call signature
}


export const todosContext = createContext<TodoContext | null >(null);

export const AppProvider = ({children}:TodosProviderprops) =>{

    const [todos , setTodos] = useState<Todo[]>(() =>{
        try {
            const newtodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newtodos) as Todo[];
        } catch (error) {
            return []
        }
    })

    const handleAddtodo = (tasks:string) =>{
        setTodos((prev) =>{
            const todosdata:Todo[] = [
                {
                    id:Math.random().toString(),
                    tasks: tasks,
                    completed:false,
                    CreatedBy: new Date()
                },
                ...prev
            ]

            localStorage.setItem("todos",JSON.stringify(todosdata))
            return todosdata
        })
    }

    //mark complete
const toggletodoAscompleted = (id:string) =>{
    setTodos((prev) =>{
        let newTodos = prev.map((todo) => {
            if(todo.id === id){
                return {...todo, completed:!todo.completed} 
            }
            return todo;
        })
        localStorage.setItem("todos",JSON.stringify(newTodos))
        return newTodos;
    })
}

const handleDeleteTodo = (id:string) =>{
    setTodos((prev) =>{
        const newTodos = prev.filter((filterTodo) => filterTodo.id != id)
         localStorage.setItem("todos",JSON.stringify(newTodos))
        return newTodos;
    })
}


    return <todosContext.Provider value={{todos, handleAddtodo,toggletodoAscompleted,handleDeleteTodo}}>
        {children}
        </todosContext.Provider>
}

//consumer

export const useTodo = () =>{
    const todoCustomer = useContext(todosContext);
    if(!todoCustomer){
        throw new Error("Not wrap an app component")
    }
    return todoCustomer;
}