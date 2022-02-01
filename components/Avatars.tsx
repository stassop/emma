import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { User } from './App';

interface AvatarsProps {
  users: Array<User>,
  offset: number,
  setOffset: (offset: number) => void,
  scroller: string,
  setScroller: (scroller: string) => void,
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
}

const Avatars: React.FC<AvatarsProps> = ({
  users,
  offset,
  setOffset,
  scroller,
  setScroller,
  selectedIndex,
  setSelectedIndex,
}: AvatarsProps) => {
  const self = useRef<string>('Avatars').current;
  const scrollViewRef = useRef<ScrollView>(null);
  const windowWidth = Dimensions.get('window').width;

  const offsets = useMemo(() => {
    return [...Array(users.length)].map((item: User, index: number) => index * 100);
  }, []);

  useEffect(() => {
    if (scroller !== self) {
      scrollViewRef.current?.scrollTo({
        x: offset * offsets[offsets.length - 1],
        y: 0,
        animated: false,
      });
    }
  }, [offsets, offset, scroller]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: offsets[selectedIndex],
      y: 0,
      animated: true,
    });
  }, [offsets, selectedIndex]);

  const padding = useMemo(() => {
    return (windowWidth - 100) / 2;
  }, [windowWidth]);

  const onScroll = useCallback(({ nativeEvent: { contentOffset }}) => {
    if (scroller === self) {
      setOffset(contentOffset.x / offsets[offsets.length - 1]);
    }
  }, [offsets, scroller]);

  const onScrollStart = useCallback(() => {
    setScroller(self);
  }, []);

  const onScrollEnd = useCallback(() => {
    if (scroller === self) {
      setSelectedIndex(Math.floor(offset * (offsets.length - 1)));
    }
  }, [offsets, offset, scroller]);

  const onItemClick = useCallback((index: number) => {
    setScroller(self);
    setSelectedIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        testID={self}
        horizontal={true}
        snapToOffsets={offsets}
        onScroll={onScroll}
        scrollEventThrottle={16}
        // onScrollEndDrag={onScrollEnd}
        onMomentumScrollEnd={onScrollEnd}
        // onScrollBeginDrag={onScrollStart}
        onMomentumScrollBegin={onScrollStart}
        contentContainerStyle={{paddingHorizontal: padding}}
        sendMomentumEvents={true}
      >
        { users.map((item: User, index: number) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => onItemClick(index)}
              testID={`${self}_${item.id}`}
            >
              <Image
                source={require('../assets/user.png')}
                style={[
                  styles.image,
                  index === selectedIndex && styles.selected
                ]}
              />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  item: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  selected: {
    borderWidth: 6,
    borderColor: 'lightblue',
  },
});

export default Avatars;
