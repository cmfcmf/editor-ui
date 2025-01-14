import React from "react";
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AccessDeniedNoAuthModal from "./AccessDeniedNoAuthModal";

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}))

const middlewares = []
const mockStore = configureStore(middlewares)

describe('When accessDeniedNoAuthModalShowing is true', () => {
  let store

  beforeEach(() => {
    const initialState = {
      editor: {
        accessDeniedNoAuthModalShowing: true,
        modals: {
          accessDenied: {
            identifer: 'my-amazing-project',
            projectType: 'python'
          }
        }
      }
    }
    store = mockStore(initialState);
    render(<Provider store={store}><div id='app'><AccessDeniedNoAuthModal /></div></Provider>)
  })

  test('Modal rendered', () => {
    expect(screen.queryByText('project.accessDeniedNoAuthModal.heading')).toBeInTheDocument()
  })

  test('Clicking close button dispatches close modal action', () => {
    const closeButton = screen.getAllByRole('button')[0]
    fireEvent.click(closeButton)
    expect(store.getActions()).toEqual([{type: 'editor/closeAccessDeniedNoAuthModal'}])
  })

  test('Clicking new project dispatches close modal action', () => {
    const newProjectLink = screen.queryByText('project.accessDeniedNoAuthModal.newProject')
    fireEvent.click(newProjectLink)
    expect(store.getActions()).toEqual([{type: 'editor/closeAccessDeniedNoAuthModal'}])
  })
})

describe('When accessDeniedNoAuthModalShowing is false', () => {
  beforeEach(() => {
    const initialState = {
      editor: {
        accessDeniedNoAuthModalShowing: false
      }
    }
    const store = mockStore(initialState);
    render(<Provider store={store}><div id='app'><AccessDeniedNoAuthModal /></div></Provider>)
  })

  test('Modal not rendered', () => {
    expect(screen.queryByText('project.accessDeniedNoAuthModal.heading')).not.toBeInTheDocument()
  })
})
