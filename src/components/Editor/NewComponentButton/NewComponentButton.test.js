import React from "react";
import { fireEvent, render } from "@testing-library/react"
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import NewComponentButton from "./NewComponentButton";
import {addProjectComponent, openFile, setNameError} from "../EditorSlice"

describe("Testing the new file modal", () => {
    let store;
    let inputBox;
    let saveButton;

    beforeEach(() => {
        const middlewares = []
        const mockStore = configureStore(middlewares)
        const initialState = {
            editor: {
                project: {
                    components: [
                        {
                            name: "main",
                            extension: "py"
                        }
                    ],
                    project_type: "python"
                },
                nameError: "",
            }
        }
        store = mockStore(initialState);
        const {getByText} = render(<Provider store={store}><div id='app'><NewComponentButton /></div></Provider>)
        const button = getByText('filePane.newFileButton');
        fireEvent.click(button);
        inputBox = document.getElementById('name')
        saveButton = getByText('filePane.newFileModal.save');
    })

    test("Pressing save adds new file with the given name", () => {
        fireEvent.change(inputBox, {target: {value: "file1.py"}})
        inputBox.innerHTML = "file1.py";
        fireEvent.click(saveButton)
        const expectedActions = [
          setNameError(""),
          addProjectComponent({extension: "py", name: "file1"}),
          openFile('file1.py')
        ]
        expect(store.getActions()).toEqual(expectedActions);
    })

    test("Duplicate file names throws error", () => {
        fireEvent.change(inputBox, {target: {value: "main.py"}})
        fireEvent.click(saveButton)
        const expectedActions = [setNameError(""), setNameError("filePane.errors.notUnique")]
        expect(store.getActions()).toEqual(expectedActions);
    })

    test("Unsupported extension throws error", () => {
        fireEvent.change(inputBox, {target: {value: "file1.js"}})
        fireEvent.click(saveButton)
        const expectedActions = [setNameError(""), setNameError("filePane.errors.unsupportedExtension")]
        expect(store.getActions()).toEqual(expectedActions);
    })
})
