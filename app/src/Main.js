import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Modal,
  Vibration,
  ToastAndroid,
} from 'react-native';
import {
  Layout,
  Text,
  Spinner,
  Modal as KittenModal,
} from '@ui-kitten/components';
import axios from 'axios';

import TopBar from './components/TopBar';
import TodoCard from './components/TodoCard';
import Form from './components/Form';
import DeleteComponent from './components/DeleteComponent';

function Main() {
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletionId, setDeletionId] = useState(null);
  const [newTodoModalVisible, setNewTodoModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const getTodos = () => {
    setLoading(true);
    axios
      .get('https://do-it-api.herokuapp.com/get-todos')
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch(console.error);
  };

  const addTodo = (vals) => {
    const date = new Date();
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    let payload = {
      title: vals.title,
      content: vals.content,
      date: date.toDateString(),
      time: `${hours}:${minutes}`,
    };

    axios
      .post('https://do-it-api.herokuapp.com/add-todo', payload)
      .then((res) => {
        getTodos();
        setNewTodoModalVisible(false);
      })
      .catch(console.log);
  };

  const deleteTodo = () => {
    axios
      .delete(`https://do-it-api.herokuapp.com/delete-todo/${deletionId}`)
      .then((res) => {
        getTodos();
        setDeletionId(null);
        setDeleteModalVisible(false);
        console.log(res);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return (
      <>
        <TopBar disabled={true} />
        <Layout style={styles.center}>
          <Spinner size="large" />
          <Text style={{ marginTop: 10 }}>Loading</Text>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Modal animationType="slide" visible={newTodoModalVisible}>
          <Form
            onCancel={() => setNewTodoModalVisible(false)}
            submitHandler={addTodo}
          />
        </Modal>

        <KittenModal
          backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          visible={deleteModalVisible}
          onBackdropPress={() => setDeleteModalVisible(false)}>
          <DeleteComponent
            onCancel={() => setDeleteModalVisible(false)}
            onAccept={deleteTodo}
          />
        </KittenModal>

        <TopBar
          onAdd={() => setNewTodoModalVisible(true)}
          onRefresh={getTodos}
        />
        <Layout style={styles.container}>
          <FlatList
            data={todos}
            ListEmptyComponent={() => (
              <Text category="label" style={{ alignSelf: 'center' }}>
                There are no todos.
              </Text>
            )}
            renderItem={({ item }) => (
              <Layout>
                <TodoCard
                  title={item.title}
                  date={item.date}
                  content={item.content}
                  time={item.time}
                  onLongPress={() => {
                    Vibration.vibrate(100);
                    setDeletionId(item._id);
                    setDeleteModalVisible(true);
                  }}
                />
              </Layout>
            )}
          />
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
