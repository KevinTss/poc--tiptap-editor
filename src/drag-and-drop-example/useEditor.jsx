import { useEditor as useTipTapEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';

import DraggableExtension from './DraggableExtension';

export default function useEditor() {
  const editor = useTipTapEditor({
    extensions: [
      Text,
      Document,
      Paragraph,
      ListItem,
      Image.configure({
        allowBase64: true,
      }),
      Bold,
      DraggableExtension,
    ],
    content: `
    <p>This is a boring paragraph.</p>
    <div data-type="draggable">
      <p>Followed by a fancy draggable item.</p>
    </div>
    <div data-type="draggable">
      <p>And another draggable item.</p>
      <div data-type="draggable">
        <p>And a nested one.</p>
        <div data-type="draggable">
          <p>But can we go deeper?</p>
        </div>
      </div>
    </div>
    <p>Let’s finish with a boring paragraph.</p>
    `,
  });

  return { editor };
}
