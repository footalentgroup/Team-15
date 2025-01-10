import { useDraggable } from '@dnd-kit/core';
import { ISubtheme } from '@/interfaces/IPlanification.interfaces';
import { IconHand, IconMenuDotsHorizontal } from '@/icons';

interface Props {
  item: ISubtheme;
  setCurrentItem: (item: ISubtheme) => void;
}

export const DraggableItem: React.FC<Props> = ({ item, setCurrentItem }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${item.id_tema}-${item.id}`,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setCurrentItem(item)}
      className="w-3/4 h-8 p-1.5 flex justify-between items-center border border-black px-2 rounded-md gap-2 cursor-pointer touch-none"
    >
      <span className='w-[90%] whitespace-nowrap overflow-hidden overflow-ellipsis' title={item.nombre}>
        {item.nombre}
      </span>
      <div className='flex justify-center items-center gap-2'>
        <IconHand />
        <IconMenuDotsHorizontal />
      </div>
    </div>
  )
};