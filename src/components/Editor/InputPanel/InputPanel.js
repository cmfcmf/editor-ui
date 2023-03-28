/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import 'react-toastify/dist/ReactToastify.css'
import EditorPanel from '../EditorPanel/EditorPanel'
import RunnerControls from '../../RunButton/RunnerControls'
import { closeFile, setFocussedFileIndex } from '../EditorSlice';
import { CloseIcon } from '../../../Icons';
import Button from '../../Button/Button';

const InputPanel = (props) => {
  const dispatch = useDispatch()
  const project = useSelector((state) => state.editor.project)
  const openFiles = useSelector((state) => state.editor.openFiles)
  const focussedFileIndex = useSelector((state) => state.editor.focussedFileIndex)
  const [numberOfComponents, setNumberOfComponents] = useState(project.components.length)
  let tabRefs = useRef(project.components.map(createRef))

  useEffect(() => {
    setNumberOfComponents(project.components.length)
    Array(project.components.length).fill().forEach((_, i) => {
      tabRefs.current[i] = tabRefs.current[i] || React.createRef();
    })
  }, [project])

  useEffect(() => {
    const fileName = openFiles[focussedFileIndex]
    const componentIndex = project.components.findIndex(file => `${file.name}.${file.extension}`=== fileName)
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
                    ref={tabRefs.current[project.components.findIndex(file => `${file.name}.${file.extension}`===fileName)]}>
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
              <EditorPanel fileName={fileName.split('.')[0]} extension={fileName.split('.').slice(1).join('.')} />
            </TabPanel>
          ))}
          <RunnerControls />
        </Tabs>
      </div>
    </>
  )
};

export default InputPanel;
