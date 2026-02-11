import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

interface TodoItemProps {
  todo: { id: string; title: string; completed: boolean };
  toggleTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  return (
    <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
      <View>
        <Text style={todo.completed ? styles.completedTask : styles.uncompletedTask}>
          - {todo.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  uncompletedTask: {
    textDecorationLine: 'none',
  },
});

export default TodoItem;