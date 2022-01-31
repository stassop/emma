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
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
  offset: number,
  setOffset: (offset: number) => void,
  scroller: string,
  setScroller: (scroller: string) => void,
}

const Avatars: React.FC<AvatarsProps> = ({
  users,
  selectedIndex,
  setSelectedIndex,
  offset,
  setOffset,
  scroller,
  setScroller,
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
        x: offset * offsets[offsets.length-1],
        y: 0,
        animated: false,
      });
    }
  }, [offset, scroller]);

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
      setOffset(contentOffset.x / offsets[offsets.length-1]);
    }
  }, [offsets, scroller]);

  const onItemClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const setScrollerSelf = useCallback(() => {
    setScroller(self);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        snapToOffsets={offsets}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={setScrollerSelf}
        onMomentumScrollBegin={setScrollerSelf}
        contentContainerStyle={{paddingHorizontal: padding}}
      >
        { users.map((item: User, index: number) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => onItemClick(index)}
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

export default React.memo(Avatars);
