import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import DraggableView from './DraggableView';

const extensionsName = 'draggable';

export default Node.create({
  name: extensionsName,

  group: 'block',

  content: 'block+',

  draggable: true,

  parseHTML() {
    return [
      {
        tag: `div[data-type="${extensionsName}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': extensionsName }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DraggableView);
  },

  addCommands() {
    return {
      setDraggableBlock:
        () =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: this.name,
            },
          ]),
    };
  },
});
