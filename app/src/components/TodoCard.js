import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Layout } from '@ui-kitten/components';

const TodoCard = ({ title, time, date, content, onLongPress }) => {
  const Header = (props) => (
    <Layout {...props}>
      <Text category="h3">{title}</Text>
      <Text category="s2">{date}</Text>
    </Layout>
  );

  const Footer = (props) => (
    <Layout {...props}>
      <Text category="label">{time} HRS</Text>
    </Layout>
  );

  return (
    <Card
      header={Header}
      footer={Footer}
      onLongPress={onLongPress}
      style={styles.container}>
      <Text>{content}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    // padding: 6,
  },
});

export default TodoCard;
