import React from 'react';
import { Text, Button, Card } from '@ui-kitten/components';

const DeleteComponent = ({ onAccept, onCancel }) => {
  const Header = (props) => (
    <Text
      style={{ alignSelf: 'center' }}
      {...props}
      category="s1"
      status="danger">
      Are you sure you want to delete todo ?
    </Text>
  );

  return (
    <Card header={Header} disabled={true} style={{ padding: 5 }}>
      <Button status="success" onPress={onAccept} style={{ marginBottom: 6 }}>
        YES
      </Button>
      <Button status="danger" onPress={onCancel}>
        NO
      </Button>
    </Card>
  );
};

export default DeleteComponent;
