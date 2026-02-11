import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer, useState } from 'react';
import { Button,ScrollView,StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, Action } from './types/taskType';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { id: Date.now().toString(), title: action.payload, completed: false }
      ]

    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )

    case 'LOAD':
      return action.payload

    default:
      return state
  }
}


export default function App() {
  const [text, setText] = useState('')
const [todos, dispatch] = useReducer(todoReducer, []);
  const initialState = []

 
  const addTodo = (title: string) => {
  dispatch({ type: 'ADD', payload: title })
}


  useEffect(() => {
  const load = async () => {
    try {
      const todo = await AsyncStorage.getItem("Todo")
      if (todo !== null) {
          dispatch({ type: 'LOAD', payload: JSON.parse(todo) })
      }
    } catch (err) {
    }
  };

  load()
}, [])
  useEffect(()=>{
    const save =async() => {
    try{
      await AsyncStorage.setItem("Todo",JSON.stringify(todos))
    } catch(err){
    }
  }
    save()
  },[todos])

  return (
    <View style={styles.container}>
      <Text>Todos</Text>
      <TodoInput addTodo={addTodo}/>
      <ScrollView>
          <TodoList todos={todos} dispatch={dispatch} />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:50
  },
  addRow:{
    flexDirection:'row'
  },
  uncompletedTask:{
    textDecorationLine: 'line-through'
  }
});
