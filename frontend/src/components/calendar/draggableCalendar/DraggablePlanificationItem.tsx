import { useDraggable } from '@dnd-kit/core';
import { ISubtheme } from '@/interfaces/IPlanification.interfaces';
import { IconHand } from '@/icons';

interface Props {
  title: string;
  item: ISubtheme;
  setCurrentItem: (item: ISubtheme) => void;
}

export const DraggablePlanificationItem: React.FC<Props> = ({ item, title, setCurrentItem }) => {
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
      className="relative w-full h-16 bg-yellow-100 flex items-center border border-black px-4 rounded-md gap-2 cursor-pointer touch-none"
    >
      <div className='flex flex-col w-full'>
        <span title={"Unidad " + title} className='w-5/6 whitespace-nowrap overflow-hidden overflow-ellipsis font-medium'>Unidad {title}</span>
        <span className='w-full whitespace-nowrap overflow-hidden overflow-ellipsis font-normal' title={item.nombre}>
          • {item.nombre}
        </span>
      </div>
      <div className='absolute top-3 right-2'>
        <IconHand classNames='size-5' />
      </div>
    </div>
  )
};