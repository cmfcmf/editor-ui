import React from "react";
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginToSaveModal from "./LoginToSaveModal";

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}))

const middlewares = []
const mockStore = configureStore(middlewares)

describe('When loginToSaveModalShowing is true', () => {
  let store

  beforeEach(() => {
    const initialState = {
      editor: {
        loginToSaveModalShowing: true,
        modals: {}
      }
    }
    store = mockStore(initialState);
    render(<Provider store={store}><div id='app'><LoginToSaveModal /></div></Provider>)
  })

  test('Modal rendered', () => {
    expect(screen.queryByText('loginToSaveModal.heading')).toBeInTheDocument()
  })

  test('Clicking close button dispatches close modal action', () => {
    const closeButton = screen.getAllByRole('button')[0]
    fireEvent.click(closeButton)
    expect(store.getActions()).toEqual([{type: 'editor/closeLoginToSaveModal'}])
  })

  test('Clicking cancel dispatches close modal action', () => {
    const cancelLink = screen.queryByText('loginToSaveModal.cancel')
    fireEvent.click(cancelLink)
    expect(store.getActions()).toEqual([{type: 'editor/closeLoginToSaveModal'}])
  })
})

describe('When loginToSaveModalShowing is false', () => {
  beforeEach(() => {
    const initialState = {
      editor: {
        loginToSaveModalShowing: false
      }
    }
    const store = mockStore(initialState);
    render(<Provider store={store}><div id='app'><LoginToSaveModal /></div></Provider>)
  })

  test('Modal not rendered', () => {
    expect(screen.queryByText('loginToSaveModal.heading')).not.toBeInTheDocument()
  })
})
