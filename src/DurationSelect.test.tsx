import React from 'react'
import renderer from 'react-test-renderer'
import DurationSelect from './DurationSelect'

it('renders correctly', () => {
  const tree = renderer.create(<DurationSelect value={0} />).toJSON();
  expect(tree).toMatchSnapshot();
})