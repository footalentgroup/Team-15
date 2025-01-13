import { useDroppable } from '@dnd-kit/core';
import { PLanificationMonth } from "@/interfaces/ICourses.interface";

interface DroppableMonthProps {
  month: PLanificationMonth;
  index: number;
  handleDelete: (monthIndex: number, contentIndex: number) => void;
}

export const DroppableMonth: React.FC<DroppableMonthProps> = ({ month, index, handleDelete }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `month-${index}`,
  });

  return (
    <div ref={setNodeRef} className={`flex flex-col border-2 border-black rounded-lg min-h-[340px] min-w-[300px] max-w-1/4 flex-1 ${isOver ? 'border-red-500' : ''}`}>
      <div className={`${month.color} p-3 border-b-2 border-black rounded-t-md`}>
        <h4 className="font-bold text-2xl">{month.month}</h4>
      </div>
      <ul className="flex flex-col gap-4 h-full px-2 py-4 overflow-y-auto max-h-80">
        {month.content.map((content, idx) => (
          <li key={idx} className="w-full flex justify-between items-center border border-black p-2 rounded-md gap-2">
            <p>{content.subtema?.nombre}</p>
            <button type="button" onClick={() => handleDelete(index, idx)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};