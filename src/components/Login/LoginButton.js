import React from 'react';
import userManager from '../../utils/userManager'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';

const LoginButton = (props) => {
  const { buttonText, className, triggerSave } = props;
  const location = useLocation()
  const project = useSelector((state) => state.editor.project)
  const accessDeniedData = useSelector((state) => state.editor.modals.accessDenied)

  const onLoginButtonClick = (event) => {
    event.preventDefault();
    window.plausible('Login button')
    if (accessDeniedData) {
      localStorage.setItem('location', `/projects/${accessDeniedData.identifier}`)
    } else {
      localStorage.setItem('location', location.pathname)
      localStorage.setItem(project.identifier || 'project', JSON.stringify(project))
    }
    if (triggerSave) {
      localStorage.setItem('awaitingSave', 'true')
    }
    userManager.signinRedirect();
  }

  return (
    <Button buttonText={buttonText} className={className} onClickHandler={onLoginButtonClick} />
  )
}

export default LoginButton;
