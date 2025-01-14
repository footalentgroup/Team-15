import { useDraggable } from '@dnd-kit/core';
import { ISubtheme } from '@/interfaces/IPlanification.interfaces';

interface DraggableContentProps {
  content: ISubtheme;
  index: number;
  setCurrentContent: (content: ISubtheme) => void;
}

export const DraggableContent: React.FC<DraggableContentProps> = ({ content, index, setCurrentContent }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `content-${index}`,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-3/4 h-10 flex justify-between items-center border border-black px-2 rounded-md gap-2 cursor-pointer touch-none"
      onClick={() => setCurrentContent(content)}
    >
      <p className='flex w-[90%] whitespace-nowrap overflow-hidden overflow-ellipsis' title={content.nombre}>{content.nombre}</p>
    </li>
  );
};