import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import Style from 'style-it';
import internalStyles from '../InternalStyles.scss';
import externalStyles from '../ExternalStyles.scss';

import Input from '../../Editor/Input/Input';
import Output from '../../Editor/Output/Output';
import { defaultMZCriteria } from '../../AstroPiModel/DefaultMZCriteria'
import Sk from 'skulpt';
import store from '../../../app/store';
import { setIsSplitView } from '../../Editor/EditorSlice';

const WebComponentProject = () => {
  const project = useSelector((state) => state.editor.project);
  const codeRunTriggered = useSelector((state) => state.editor.codeRunTriggered)
  const [cookies] = useCookies(['theme', 'fontSize'])
  const defaultTheme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"
  const [timeoutId, setTimeoutId] = React.useState(null);
  const webComponent = document.querySelector('editor-wc')
  const [codeHasRun, setCodeHasRun] = React.useState(false);
  const dispatch = useDispatch()
  dispatch(setIsSplitView(false))

  useEffect(() => {
    setCodeHasRun(false)
    if(timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(
      function() {
        const customEvent = new CustomEvent("codeChanged", {
          bubbles: true,
          cancelable: false,
          composed: true
        });
        webComponent.dispatchEvent(customEvent)
      }, 2000);
    setTimeoutId(id);
  }, [project]);

  useEffect(() => {
    if (codeRunTriggered) {
      const runStartedEvent = new CustomEvent("runStarted", {
        bubbles: true,
        cancelable: false,
        composed: true
      });
      webComponent.dispatchEvent(runStartedEvent)
      setCodeHasRun(true)
    } else if (codeHasRun) {
      const state = store.getState();
      const mz_criteria = Sk.sense_hat ? Sk.sense_hat.mz_criteria : {...defaultMZCriteria}
      const runCompletedEvent = new CustomEvent("runCompleted", {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          isErrorFree: state.editor.error === "",
          ...mz_criteria
        }
      });
      webComponent.dispatchEvent(runCompletedEvent)
    }

  }, [codeRunTriggered] )

  return (
    <>
      <style>{externalStyles.toString()}</style>
      <Style>
        {internalStyles}
        <div id='wc' className = {`--${cookies.theme || defaultTheme} font-size-${cookies.fontSize || 'small'}`}>
          <div className='proj'>
            <div className={`proj-container proj-container--wc`}>
              <Input />
              <Output />
            </div>
          </div>
        </div>
      </Style>
    </>
  );
}

export default WebComponentProject
