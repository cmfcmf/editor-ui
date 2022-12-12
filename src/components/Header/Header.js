import './Header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import Autosave from './Autosave';
import Button from '../Button/Button';
import { DownloadIcon, HomeIcon, SettingsIcon } from '../../Icons';
import { syncProject, showLoginToSaveModal } from '../Editor/EditorSlice';
import Dropdown from '../Menus/Dropdown/Dropdown';
import SettingsMenu from '../Menus/SettingsMenu/SettingsMenu';
import ProjectName from './ProjectName';
import editor_logo from '../../assets/editor_logo.svg'
import DownloadButton from './DownloadButton';
import { isOwner } from '../../utils/projectHelpers'

const Header = () => {
  const user = useSelector((state) => state.auth.user)
  const project = useSelector((state) => state.editor.project)
  const loading = useSelector((state) => state.editor.loading)
  const saving = useSelector((state) => state.editor.saving)
  const lastSavedTime = useSelector((state) => state.editor.lastSavedTime)

  const dispatch = useDispatch();
  const { t } = useTranslation()

  const onClickSave = async () => {
    if (isOwner(user, project)) {
      dispatch(syncProject('save')({project, accessToken: user.access_token, autosave: false}))
    } else if (user && project.identifier) {
      dispatch(syncProject('remix')({project, accessToken: user.access_token}))
    } else {
      dispatch(showLoginToSaveModal())
    }
  }

  return (
    <div className='editor-header-wrapper'>
      <header className='editor-header'>
        <img className='editor-logo' src={editor_logo} alt={t('header.editorLogoAltText')}/>
        { user !== null ? (
          <a href='/projects' className='project-gallery-link'>
            {<><HomeIcon />
            <span className='editor-header__text'>{t('header.projects')}</span></>}</a>
        ) : null }
        { loading === 'success' ? <ProjectName /> : null }
        <div className='editor-header__right'>
          { lastSavedTime && user ? <Autosave saving={saving} lastSavedTime={lastSavedTime} /> : null }
          { loading === 'success' ?
          <DownloadButton buttonText={t('header.download')} className='btn--tertiary' Icon={DownloadIcon}/>
          : null }
          <Dropdown
            ButtonIcon={SettingsIcon}
            buttonText={t('header.settings')}
            MenuContent={SettingsMenu} />
          {loading === 'success' ?
            <Button className='btn--primary btn--save' onClickHandler = {onClickSave} buttonText = {t('header.save')} />
          : null }
        </div>
      </header>
    </div>
  )
};

export default Header;
