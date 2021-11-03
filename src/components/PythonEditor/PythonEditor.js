// import './editor.css'
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../Editor/EditorSlice'

import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';

function PythonEditor() {
  const editor = useRef();
  // const [code, setCode] = useState('');
  const code = useSelector((state) => state.editor.code)
  const dispatch = useDispatch()

  const onUpdate = EditorView.updateListener.of((v) => {
    dispatch(update(v.state.doc.toString()));
    // console.log(v.state.doc.toString());
  });

  useEffect(() => {
    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        python(),
        onUpdate,
      ],
    });

    const view = new EditorView({ state: startState, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div>
      <div>
        <h1>Python Editor</h1>
      </div>
      <div ref={editor}></div>
    </div>
  );
}

export default PythonEditor;
