import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Layout, Button, Input, Icon, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import * as yup from 'yup';

const Form = ({ submitHandler, onCancel }) => {
  let schema = yup.object().shape({
    title: yup.string().required().min(2),
    content: yup.string().required().min(2)
  });

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={{ marginBottom: 10 }}>
        New Todo
      </Text>
      <Formik
        validationSchema={schema}
        initialValues={{ title: '', content: '' }}
        onSubmit={submitHandler}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
          return (
            <Layout>
              <Input
                style={{ marginBottom: 10 }}
                size="large"
                placeholder="Enter Title"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
              />
              <Input
                style={{ marginBottom: 10 }}
                size="large"
                placeholder="Enter Description"
                value={values.content}
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
              />
              <Button
                status="success"
                onPress={handleSubmit}
                style={{ marginBottom: 5 }}>
                ADD
              </Button>
              <Button status="danger" onPress={onCancel}>
                CANCEL
              </Button>
              <Text status='danger' style={{ alignSelf: 'center', marginTop: 10 }}>{errors.title}</Text>
            </Layout>
          );
        }}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? Constants.statusBarHeight : null,
    flex: 1,
    padding: 10,
  },
});

export default Form;
