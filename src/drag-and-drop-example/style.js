import styled from 'styled-components';

export const EditorWrapper = styled.div`
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

    p {
      margin: 2px 0;
    }
  }

  .ProseMirror-focused {
    outline: none;
  }

  .img {
    width: 100%;
    height: auto;
    position: relative;
    border: 2px solid transparent;
    box-sizing: border-box;

    &.ProseMirror-selectednode {
      border: 2px solid blue !important;
    }
  }
`;

export const EditorContainer = styled.div`
  border: 1px solid red;
`;
