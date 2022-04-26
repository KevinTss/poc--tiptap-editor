import { Container, Content, DragHandle } from './DraggableView.styles';

const DraggableBlockView = () => {
  console.log('ok');
  return (
    <Container>
      <DragHandle />
      <Content className='content' />
    </Container>
  );
};

export default DraggableBlockView;
