import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import styled from 'styled-components';
import Bold from '@tiptap/extension-bold';
import { DOMParser } from 'prosemirror-model';

// const EditorContainer = styled.div`
// margin: 100px 50px;
// min-height: 500px;
// display: flex;
// flex-direction: column;

//   > div,
//   .ProseMirror {
//     width: 100%;
//     min-width: 100%;
//     height: 100%;
//     min-height: 500px;
//   }
//   .ProseMirror {
//     border: 1px solid red;
//   }

//   .ProseMirror-focused {
//     outline: none;
//   }

//   .paragraph {
//     margin: 0;
//     color: blue;
//   }
// `

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions: [
//       Text,
//       Document,
//       Paragraph.configure({
//         HTMLAttributes: {
//           class: 'paragraph',
//         },
//       }),
//       Bold
//     ],
//     content: 'Hello World!',
//   })

//   return (
//     <EditorContainer>
//       <EditorContent editor={editor} />
//       <button onClick={() => {
//         console.log(editor.getJSON())
//       }}>submit</button>
//     </EditorContainer>
//   )
// }

// export default Tiptap

function elementFromString(value) {
  const element = document.createElement('div');
  element.innerHTML = value.trim();

  return element;
}

function insertHTML({ state, view }, value) {
  const { selection } = state;
  const element = elementFromString(value);
  const slice = DOMParser.fromSchema(state.schema).parseSlice(element);
  const transaction = state.tr.insert(selection.anchor, slice.content);

  view.dispatch(transaction);
}

const readImage = (event) =>
  new Promise((resolve, reject) => {
    const fileList = event.dataTransfer.files;
    const file = fileList[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const uploaded_image = event.target.result;
      console.log('ing', uploaded_image);
      //  document.querySelector("#image_drop_area").style.backgroundImage  = `url(${uploaded_image})`;
      resolve(uploaded_image);
    });
    reader.readAsDataURL(file);
  });

const EditorContainer = styled.div`
  border: 1px solid red;
`;

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>redo</button>
    </>
  );
};

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Text, Document, Paragraph],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
  });

  return (
    <div>
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
          // const fileList = event.dataTransfer.files;
          // document.querySelector('#file_name').textContent = fileList[0].name;
          readImage(event).then((resp) => {
            console.log('then', resp);
            const imageTag = `<img alt='new-added-image' src=${resp} width="50px" height="50px"/>`;
            insertHTML(editor, imageTag);
          });
        }}
      >
        <EditorContent editor={editor} />
      </EditorContainer>
    </div>
  );
};

export default Tiptap;
