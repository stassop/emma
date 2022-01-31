import { ScrollView, Image, Text } from 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../components/App';
import Avatars from '../components/Avatars';
import Descriptions from '../components/Descriptions';

const usersMock = [
  {
		"name": "Allan Munger",
    "title": "Solutions",
		"image": "Allan Munger.png",
    "description": "In condimentum in tortor sed accumsan.",
		"id": "740cd900-8082-11ec-a8a3-0242ac120002"
  },
  {
		"name": "Amanda Brady",
    "title": "Program",
		"image": "Amanda Brady.png",
    "description": "Nunc eros odio, accumsan eget arcu sit amet, mollis faucibus diam.",
		"id": "740cdb6c-8082-11ec-a8a3-0242ac120002"
	},
]

jest.mock('../data/users.json', () => usersMock);

describe('App', () => {
  it('renders correctly', () => {
    var app = renderer.create(<App />).root;

    expect(app.findAllByType(Avatars)).toHaveLength(1);
    expect(app.findAllByType(Descriptions)).toHaveLength(1);

    const avatar1 = app.findByProps({testID: 'Avatars_740cd900-8082-11ec-a8a3-0242ac120002'});
    expect(avatar1.findAllByType(Image)).toHaveLength(1);

    const avatar2 = app.findByProps({testID: 'Avatars_740cdb6c-8082-11ec-a8a3-0242ac120002'});
    expect(avatar2.findAllByType(Image)).toHaveLength(1);

    const item1 = app.findByProps({testID: 'Descriptions_740cd900-8082-11ec-a8a3-0242ac120002'});
    expect(item1.findAllByType(Text)[0].props.children).toBe('Allan Munger');
    expect(item1.findAllByType(Text)[1].props.children).toBe('Solutions');
    expect(item1.findAllByType(Text)[2].props.children).toBe('In condimentum in tortor sed accumsan.');

    const item2 = app.findByProps({testID: 'Descriptions_740cdb6c-8082-11ec-a8a3-0242ac120002'});
    expect(item2.findAllByType(Text)[0].props.children).toBe('Amanda Brady');
    expect(item2.findAllByType(Text)[1].props.children).toBe('Program');
    expect(item2.findAllByType(Text)[2].props.children).toBe('Nunc eros odio, accumsan eget arcu sit amet, mollis faucibus diam.');
  });
});
