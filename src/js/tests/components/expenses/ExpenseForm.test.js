import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../../components/expenses/ExpenseForm'
import expenses from '../../fixtures/expenses'

const DATE_TO_USE = new Date('2018')
const originalDate = Date
global.Date = jest.fn(() => DATE_TO_USE)
global.Date.now = jest.fn()

jest.mock('date-fns/format', () => () => '01/01/2018')

let onSubmitProp
let dateNowSpy
beforeAll(() => {
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 0)
  onSubmitProp = () => ({})
})

afterAll(() => {
  dateNowSpy.mockReset()
  dateNowSpy.mockRestore()
  global.Date = originalDate
})

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with expense data', () => {
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} expense={expenses[1]} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
  const value = 'New note value'
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
  const value = '23.50'
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid input', () => {
  const value = '12.122'
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    category: expenses[0].category,
    createdAt: expect.any(Number)
  })
})

test('should set new date on date change', () => {
  const now = new Date()
  const wrapper = shallow(<ExpenseForm onSubmit={onSubmitProp} />)
  wrapper.find('DayPickerInput').prop('onDayChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})
