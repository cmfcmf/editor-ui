/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import 'react-toastify/dist/ReactToastify.css'
import { EditorPanel, EDITOR_PANEL_FRAGMENT } from '../EditorPanel/EditorPanel'
import RunnerControls from '../../RunButton/RunnerControls'
import { closeFile, setFocussedFileIndex } from '../EditorSlice';
import { CloseIcon } from '../../../Icons';
import Button from '../../Button/Button';
import { gql } from '@apollo/client';

export const EDITOR_INPUT_FRAGMENT = gql`
  fragment EditorInputFragment on Project {
    components {
      nodes {
        id
        ...EditorPanelFragment
      }
      totalCount
    }
  }
  ${EDITOR_PANEL_FRAGMENT}
`


export const Input = (props) => {
  const dispatch = useDispatch()
  const { editorInputData } = props
  const componentsData = editorInputData.components.nodes

  const openFiles = useSelector((state) => state.editor.openFiles)
  const focussedFileIndex = useSelector((state) => state.editor.focussedFileIndex)
  const numberOfComponents = editorInputData.components.totalCount
  let tabRefs = useRef(componentsData.map(createRef))


  useEffect(() => {
    Array(componentsData.length).fill().forEach((_, i) => {
      tabRefs.current[i] = tabRefs.current[i] || React.createRef();
    })
  }, [editorInputData])

  useEffect(() => {
    const fileName = openFiles[focussedFileIndex]
    const componentIndex = componentsData.findIndex(file => `${file.name}.${file.extension}`=== fileName)
    const fileRef = tabRefs.current[componentIndex]
    if (fileRef?.current) {
      fileRef.current.parentElement.scrollIntoView()
    }
  }, [focussedFileIndex, openFiles, numberOfComponents])

  const switchToFileTab = (index) => {
    dispatch(setFocussedFileIndex(index))
  }

  const closeFileTab = (e, fileName) => {
    e.stopPropagation()
    dispatch(closeFile(fileName))
  }

  return (
    <>
      <div className='proj-editor-container'>
        <Tabs selectedIndex={focussedFileIndex} onSelect={index => switchToFileTab(index)}>
          <div className='react-tabs__tab-container'>
            <TabList>
              {openFiles.map((fileName, i) => (
                <Tab key={i}>
                  <span
                    className={`react-tabs__tab-inner${fileName !== 'main.py'? ' react-tabs__tab-inner--split': ''}`}
                    ref={tabRefs.current[componentsData.findIndex(file => `${file.name}.${file.extension}`===fileName)]}>
                      {fileName}
                      {fileName !== 'main.py' ?
                        <Button className='btn--tertiary react-tabs__tab-inner-close-btn' label={`close ${fileName}`} onClickHandler={(e) => closeFileTab(e, fileName)} ButtonIcon={() => <CloseIcon scaleFactor={0.85}/> }/>
                      : null
                      }
                  </span>
                </Tab>
              ))}
            </TabList>
          </div>
          {openFiles.map((fileName, i) => (
            <TabPanel key={i}>
              <EditorPanel componentData={ componentsData.find(file => `${file.name}.${file.extension}`===fileName) } />
            </TabPanel>
          ))}
          <RunnerControls />
        </Tabs>
      </div>
    </>
  )
};

export default Input;