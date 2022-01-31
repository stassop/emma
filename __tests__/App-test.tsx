import { ScrollView, Image, Text } from 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../components/App';
import Avatars from '../components/Avatars';
import Descriptions from '../components/Descriptions';

const usersMock = [{
  name: "Tom Cruise",
  title: "Actor",
  image: "Tom Cruise.png",
  description: "Thomas Cruise Mapother IV (born July 3, 1962) is an American actor and producer.",
  id: "123",
}]

jest.mock('../data/users.json', () => usersMock);

describe('App', () => {
  it('renders correctly', () => {
    var app = renderer.create(<App />).root;

    expect(app.findAllByType(Avatars)).toHaveLength(1);
    expect(app.findAllByType(Descriptions)).toHaveLength(1);

    const images = app.findByType(Avatars).findByType(ScrollView).findAllByType(Image);
    expect(images).toHaveLength(1);

    const texts = app.findByType(Descriptions).findByType(ScrollView).findAllByType(Text);
    expect(texts).toHaveLength(3);
    expect(texts[0].props.children).toBe('Tom Cruise');
    expect(texts[1].props.children).toBe('Actor');
    expect(texts[2].props.children).toBe('Thomas Cruise Mapother IV (born July 3, 1962) is an American actor and producer.');
  });
});
