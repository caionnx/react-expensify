import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { PublicRoute } from '../../routers/PublicRoute'

test(('should render route with component if its not authenticated'), () => {
  const Component = () => (<div />)

  const wrapper = mount(
    <MemoryRouter>
      <PublicRoute isAuthenticated={false} component={Component} />
    </MemoryRouter>
  )
  expect(wrapper.find(Component)).toHaveLength(1)
})
