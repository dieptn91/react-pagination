import React from 'react';
import PropTypes from 'prop-types';
import "./todolist.css";

TodoList.propTypes = {
    //khai báo kiểu dữ liệu khi app truyền vào
    todos:PropTypes.array,
    setTodos:PropTypes.func,
};

TodoList.defaultProps = {
    //vì không có required ban đầu nên phải khai báo giá trị mặc định
    todos :[],
    setTodos :null
};

function TodoList(props) {
    //props khi app truyền vào là 1 obj, có 2 pt, 1 là mảng todos, 2 là hàm settodos
    //phân giải props
    const {todos,setTodos} = props;

    function clickTodoList(todo){
        if(setTodos){
            setTodos(todo);
        }
    }
    
    return (
        <ul class="todo-box">
        {
            todos.map(todo=>(
            <li key={todo.id} onClick={()=>clickTodoList(todo)}>{todo.title}</li>
        ))}   
        </ul>
    );
}

export default TodoList;