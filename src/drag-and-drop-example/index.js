import { EditorContent } from '@tiptap/react';

import useEditor from './useEditor';
import { EditorWrapper, EditorContainer } from './style';

export default function Tiptap() {
  const { editor } = useEditor();

  return (
    <EditorWrapper>
      <EditorContainer>
        <EditorContent editor={editor} />
      </EditorContainer>
      <button
        onClick={() => {
          console.log('result', editor.getJSON());
        }}
      >
        Submit
      </button>
    </EditorWrapper>
  );
}
