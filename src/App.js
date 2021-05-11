
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import AddTodo from './AddTodo';
import './App.css';
import PostList from './PostList';
import TodoList from './Todolist';
import Pagination from './Pagination';


function App() {
  const [todoList,setTodoList] = useState(
    [
      {id:'1',title:'Create'},
      {id:'2',title:'Update'},
      {id:'3',title:'Delete'}
    ]
  );

  const [postlist,setPostlist] = useState([]);
  const [pagination,setPage] = useState({
    _page:1,
    _limit:10,
    _totalRows:1,
  });
  const [filter,setFilter] = useState({
    _limit:10,
    _page:1,
  });

  useEffect(()=>{
    async function fetchPostList(){
      try {
        const pagramStrings = queryString.stringify(filter);
      const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${pagramStrings}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      console.log(responseJSON);

      const {data, pagination} = responseJSON;
      setPostlist(data);
      setPage(pagination);
      } catch (error) {
        
      }
      
    } 
    fetchPostList();
  },[filter]);

  function handlePageChange(newPage){
    console.log(newPage);
    setFilter({
      ...filter,
      _page:newPage,
    });
  }

  function handleTodoList(todo){
    console.log(todo);
    let newTodoList = todoList.filter(item => item.id !== todo.id);
    setTodoList(newTodoList);
  }

  function handleFormInput(newFormValue){
    const newFormTodo = [...todoList];

    const newValues = {
      id:newFormTodo.length+1,
      ...newFormValue
    }
    console.log('input',newFormValue);
    
    newFormTodo.push(newValues);
    setTodoList(newFormTodo);
  }

  return (
    <div className="App">
      <h1>React-hooks Todo List</h1>
      <PostList posts={postlist}/>
      <Pagination pagination={pagination} onPageChange={handlePageChange}/>
      {/* <AddTodo onSubmit={handleFormInput} />
      <TodoList todos={todoList} setTodos={handleTodoList}/> */}
    </div>
  );
}

export default App;
