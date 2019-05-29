import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { PrivateRoute } from '../../routers/PrivateRoute'
import { Header } from '../../components/common/Header'

test(('should render route with component if its authenticated'), () => {
  const Component = () => (<div />)

  const wrapper = mount(
    <MemoryRouter>
      <PrivateRoute isAuthenticated connectedHeader={false} component={Component} />
    </MemoryRouter>
  )
  expect(wrapper.find(Component)).toHaveLength(1)
  expect(wrapper.find(Header)).toHaveLength(1)
})
