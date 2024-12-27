import { useDraggable } from '@dnd-kit/core';
import { Content } from "@/interfaces/ICourses.interface";

interface DraggableContentProps {
  content: Content;
  index: number;
}

export const DraggableContent: React.FC<DraggableContentProps> = ({ content, index }) => {
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
      className="w-[310px] h-10 flex justify-between items-center border border-black px-2 rounded-md gap-2 cursor-pointer touch-none"
    >
      <p>{content.text} <span className='text-red-800'>{content.quantity ? `(${content.quantity})` : ''}</span></p>
    </li>
  );
};