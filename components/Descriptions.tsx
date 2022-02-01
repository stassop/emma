import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from 'react-native';

import { User } from './App';

interface DescriptionsProps {
  users: Array<User>,
  offset: number,
  setOffset: (offset: number) => void,
  scroller: string,
  setScroller: (scroller: string) => void,
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
}

const Descriptions: React.FC<DescriptionsProps> = ({
  users,
  offset,
  setOffset,
  scroller,
  setScroller,
  selectedIndex,
  setSelectedIndex,
}: DescriptionsProps) => {
  const self = useRef<string>('Descriptions').current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [itemHeight, setItemHeight] = useState<number>(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setItemHeight(height);
  }, []);

  const offsets = useMemo(() => {
    return [...Array(users.length)].map((item: User, index: number) => index * itemHeight);
  }, [itemHeight]);

  useEffect(() => {
    if (scroller !== self) {
      scrollViewRef.current?.scrollTo({
        x: 0,
        y: offset * offsets[offsets.length-1],
        animated: false,
      });
    }
  }, [offset, scroller]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: 0,
      y: offsets[selectedIndex],
      animated: true,
    });
  }, [offsets, selectedIndex]);

  const onScroll = useCallback(({ nativeEvent: { contentOffset }}) => {
    if (scroller === self) {
      setOffset(contentOffset.y / offsets[offsets.length-1]);
    }
  }, [offsets, scroller]);

  const onScrollStart = useCallback(() => {
    setScroller(self);
  }, []);

  const onScrollEnd = useCallback(() => {
    setSelectedIndex(Math.floor(offset * offsets.length));
  }, [offset, offsets]);

  return (
    <View
      style={styles.container}
      onLayout={onLayout}
    >
      <ScrollView
        ref={scrollViewRef}
        testID={self}
        snapToOffsets={offsets}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={onScrollEnd}
        onMomentumScrollEnd={onScrollEnd}
        onScrollBeginDrag={onScrollStart}
        onMomentumScrollBegin={onScrollStart}
      >
        { users.map((item: User) => (
            <View
              key={item.id}
              testID={`${self}_${item.id}`}
              style={[styles.item, {height: itemHeight}]}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  title: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
  },
  description: {
    color: 'gray',
    fontSize: 16,
    marginVertical: 10,
  }
});

export default Descriptions;
