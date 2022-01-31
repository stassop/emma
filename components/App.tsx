import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import users from '../data/users.json';

import Avatars from './Avatars';
import Descriptions from './Descriptions';

export interface User {
  id: string,
  name: string,
  title: string,
  image: string,
  description: string,
}

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // selected item
  const [offset, setOffset] = useState<number>(0); // relative offset 0-1
  const [scroller, setScroller] = useState<string>(''); // scroll initiator

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Avatars
        users={users as Array<User>}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        offset={offset}
        setOffset={setOffset}
        scroller={scroller}
        setScroller={setScroller}
      />
      <Descriptions
        users={users as Array<User>}
        selectedIndex={selectedIndex}
        offset={offset}
        setOffset={setOffset}
        scroller={scroller}
        setScroller={setScroller}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
