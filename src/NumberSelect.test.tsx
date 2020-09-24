import React from 'react'
import renderer from 'react-test-renderer'
import NumberSelect from './NumberSelect'

it('renders correctly', () => {
  const tree = renderer
    .create(<NumberSelect value={0} max="10" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})

it('renders correctly with padded values', () => {
  const tree = renderer
    .create(<NumberSelect value={0} max="99" pad="2" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
})