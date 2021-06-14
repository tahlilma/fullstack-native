import React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
  Layout,
} from '@ui-kitten/components';
import Constants from 'expo-constants';

const TopBar = ({ onAdd, onRefresh, disabled }) => {
  const NewButton = () => (
    <TopNavigationAction
      disabled={disabled ? true : false}
      onPress={onAdd}
      icon={(props) => <Icon {...props} name="edit-2-outline" />}
    />
  );

  const RefreshButton = () => (
    <TopNavigationAction
      disabled={disabled ? true : false}
      onPress={onRefresh}
      icon={(props) => <Icon {...props} name="refresh-outline" />}
    />
  );

  const renderRight = (props) => {
    return (
      <Layout style={{ flexDirection: 'row' }}>
        <RefreshButton />
        <NewButton />
      </Layout>
    );
  };

  return (
    <>
      <TopNavigation
        style={{ marginTop: Constants.statusBarHeight }}
        alignment="center"
        title="Do It"
        accessoryRight={renderRight}
      />
      <Divider />
    </>
  );
};

export default TopBar;
