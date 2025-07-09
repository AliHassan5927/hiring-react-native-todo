import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/todo';
import { Alert } from 'react-native';

const STORAGE_KEY = 'TASKED_TODOS';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setTodos(JSON.parse(data));
      } catch (e) {
        Alert.alert('Error', 'Failed to load todos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, loading]);

  const addTodo = useCallback((title: string) => {
    setTodos(prev => [
      { id: Date.now().toString(), title, completed: false },
      ...prev,
    ]);
  }, []);

  const editTodo = useCallback((id: string, title: string) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, title } : todo));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    loading,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
  };
} 