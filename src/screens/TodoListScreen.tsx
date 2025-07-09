import React, { useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Delete, Edit } from '../assets/svgs';
import { Checkbox } from '../components/Checkbox';
import FloatingButton from '../components/FloatingButton';
import CustomTextInput from '../components/TextInput';
import { useTodos } from '../hooks/useTodos';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { Todo } from '../types/todo';

export const TodoListScreen: React.FC = () => {
  const { todos, addTodo, editTodo, toggleTodo, deleteTodo } = useTodos();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleAddTask = (taskTitle: string) => {
    addTodo(taskTitle);
    setIsInputVisible(false);
    Keyboard.dismiss();
  };

  const handleToggleInput = (visible: boolean) => {
    setIsInputVisible(visible);
  };

  const handleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingText(title);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleEditSubmit = () => {
    if (editingId && editingText.trim()) {
      editTodo(editingId, editingText.trim());
      setEditingId(null);
      setEditingText('');
    }
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.itemRow}>
      <Checkbox checked={item.completed} onPress={() => toggleTodo(item.id)} />
      {editingId === item.id ? (
        <TextInput
          ref={inputRef}
          value={editingText}
          onChangeText={setEditingText}
          onSubmitEditing={handleEditSubmit}
          onBlur={handleEditSubmit}
          style={[styles.editInput]}
          returnKeyType="done"
        />
      ) : (
        <Text
          style={item.completed ? typography.strikethrough : typography.body}
        >
          {item.title}
        </Text>
      )}
      {editingId !== item.id && (
        <>
          <TouchableOpacity
            onPress={() => handleEdit(item.id, item.title)}
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          >
            <Edit width={15} height={15} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteTodo(item.id)}
            style={[styles.actionBtn, styles.deleteBtn]}
          >
            <Delete width={15} height={15} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <>
          <Text
            style={[
              typography.heading,
              { marginBottom: isInputVisible ? 15 : 35 },
            ]}
          >
            tasked
          </Text>
          {isInputVisible && (
            <CustomTextInput
              onSaveTask={handleAddTask}
              placeholder="Add a new task..."
            />
          )}
          <View style={styles.container}>
            <FlatList
              data={todos}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={typography.emptyText}>No tasks yet!</Text>
                </View>
              )}
            />
          </View>
        </>
        <FloatingButton
          onToggle={handleToggleInput}
          isInputVisible={isInputVisible}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: { flex: 1 },
  mainContainer: {
    flex: 1,
    paddingHorizontal: '7%',
    paddingTop: 24,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  editInput: {
    marginLeft: 8,
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 18,
    color: colors.textPrimary,
  },
  list: {
    paddingBottom: 32,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  actionBtn: {
    backgroundColor: colors.primary,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  deleteBtn: {
    marginLeft: 12,
    backgroundColor: colors.error,
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
