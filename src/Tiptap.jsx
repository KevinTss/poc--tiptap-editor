import { EditorContent } from '@tiptap/react';
import styled from 'styled-components';

import { readImage } from './utils';
import useEditor from './useEditor';
import MenuBar from './MenuBar';

const EditorWrapper = styled.div`
  margin: 100px 50px;
  min-height: 500px;
  display: flex;
  flex-direction: column;

  > div,
  .ProseMirror {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 500px;
  }
  .ProseMirror {
    border: 1px solid red;
  }

  .ProseMirror-focused {
    outline: none;
  }

  .ProseMirror-hideselection {
    img {
      border: 2px solid blue;
    }
  }

  .paragraph {
    margin: 0;
    color: blue;
  }

  .editor-image {
    width: 100%;
    height: auto;
  }
`;

const EditorContainer = styled.div`
  border: 1px solid red;
`;

const Tiptap = () => {
  const { editor } = useEditor();

  return (
    <EditorWrapper>
      <MenuBar editor={editor} />
      <EditorContainer
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
          console.group();
          // console.log('datatr', e.dataTransfer);
          console.log('enter', event);
          console.groupEnd();
        }}
        onDrop={(event) => {
          event.stopPropagation();
          event.preventDefault();
          readImage(event).then((imageUrl) => {
            editor
              .chain()
              .focus()
              .setImage({ src: imageUrl })
              .insertContent('')
              .run();
          });
        }}
      >
        <EditorContent editor={editor} />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Tiptap;
