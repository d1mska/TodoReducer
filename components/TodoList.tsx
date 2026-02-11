import React from 'react';
import { View } from 'react-native';
import TodoItem from './TodoItem';
import { Todo , Action } from '../types/taskType';

interface TodoListProps {
  todos: Todo[]
  dispatch: React.Dispatch<Action>
}

const TodoList: React.FC<TodoListProps> = ({ todos, dispatch }) => {
  return (
    <View>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
        />
      ))}
    </View>
  )
}


export default TodoList