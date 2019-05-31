import React from 'react'
import { shallow } from 'enzyme'
import Modal from '../../../components/common/Modal'

let wrapper

beforeEach(() => {
  wrapper = shallow(
    <Modal
      isOpen={false}
      onClose={jest.fn()}
      onConfirm={jest.fn()}
      label='Modal'
      body={<div>Something</div>}
      confirmText={'Confirm'}
      cancelText={'Cancel'}
    />
  )
})

test('should render modal properly', () => {
  expect(wrapper).toMatchSnapshot()
})
