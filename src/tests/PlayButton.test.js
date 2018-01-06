import React from 'react';
import renderer from 'react-test-renderer';
import PlayButton from '../components/pure/WaveForm/PlayButton/PlayButton';
import { playButton } from './fixtures';

describe('<PlayButton />', () => {
  test('renders a spinner when audio is loading', () => {
    const component = renderer.create(<PlayButton {...playButton.loading} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a play button when audio is loaded and it is not playing', () => {
    const component = renderer.create(<PlayButton {...playButton.paused} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a pause button when audio is playing', () => {
    const component = renderer.create(<PlayButton {...playButton.playing} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
