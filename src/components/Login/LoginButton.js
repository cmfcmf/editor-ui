import React from 'react';
import userManager from '../../utils/userManager'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';

const LoginButton = (props) => {
  const { buttonText, className } = props;
  const location = useLocation()
  const project = useSelector((state) => state.editor.project)

  const onLoginButtonClick = (event) => {
    event.preventDefault();
    localStorage.setItem('location', location.pathname)
    localStorage.setItem(project.identifier || 'project', JSON.stringify(project))
    userManager.signinRedirect();
  }

  return (
    <Button buttonText={buttonText} className={className} onClickHandler={onLoginButtonClick} />
  )
}

export default LoginButton;