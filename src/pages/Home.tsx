import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  TaskNewTitle:string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleEditTask({taskId, TaskNewTitle}:EditTaskArgs){
    const updatedTasks = tasks.map(oldTask => ({...oldTask}))

    updatedTasks.find(task => {
      if(task.id == taskId)task.title = TaskNewTitle;
    });

    setTasks(updatedTasks);
  }

  function handleAddTask(newTaskTitle: string) {

    let verifyRepetition:boolean = false;

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    tasks.find(task => {
      if(task.title == newTask.title){
        verifyRepetition = true;
        Alert.alert(
          "Task ja cadastrada!",
          "Você não pode cadastrar uma task de mesmo nome"
        )
      } 
    });
    
    if(verifyRepetition == false){
      setTasks(oldState => [...oldState, newTask]);
    }
    console.log(tasks);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(oldTask => ({...oldTask}))

    updatedTasks.find(task => {
      if(task.id == id)task.done = !task.done;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "não",
          onPress: () => console.log('teste'),
          style: 'cancel'
        },
        {
          text: "sim",
          onPress: () => setTasks(oldState => oldState.filter(
            task => task.id != id
          ))
        }
      ]
    )

    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})