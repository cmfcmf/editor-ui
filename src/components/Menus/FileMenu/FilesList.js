import React from "react";
import { ChevronDown, FileIcon } from '../../../Icons';

import { useSelector } from "react-redux";
import NewComponentButton from "../../Editor/NewComponentButton/NewComponentButton";

const FilesList = () => {
  const project = useSelector((state) => state.editor.project)

  return (
    <details className = "file-menu-section file-menu-section__files" open>
      <summary>
        <h2 className="menu-pop-out-subheading" >Project Files</h2>
        <div className="accordion-icon">
          <ChevronDown />
        </div>
      </summary>
      <NewComponentButton />
      <div className='files-list'>
      { project.components.map((file, i) => (
      <div className='files-list-item' key={i}>
        <FileIcon />
        <p className='file-list-item-name'>{file.name}.{file.extension}</p>
      </div>
      ))}
      </div>
    </details>
  )
}

export default FilesList
