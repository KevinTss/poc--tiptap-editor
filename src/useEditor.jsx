import { useEditor as useTipTapEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import DropCursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';

export const CLASS_NAMES = {
  p: 'editor-paragraph',
  image: 'editor-image',
};

export default function useEditor() {
  const editor = useTipTapEditor({
    extensions: [
      Text,
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: CLASS_NAMES.p,
        },
      }),
      DropCursor,
      ListItem,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: CLASS_NAMES.image,
        },
      }),
      Bold,
    ],
    content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one
        </li>
        <li>
          or two list items.
        </li>
      </ul>
    `,
  });

  return { editor };
}
