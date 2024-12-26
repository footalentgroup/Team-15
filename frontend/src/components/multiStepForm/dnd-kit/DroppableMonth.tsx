import { useDroppable, } from '@dnd-kit/core';
import { Month } from "@/interfaces/ICourses.interface";

interface DroppableMonthProps {
  month: Month;
  index: number;
  handleDelete: (monthIndex: number, contentIndex: number) => void
}

export const DroppableMonth: React.FC<DroppableMonthProps> = ({ month, index, handleDelete }) => {
  const { setNodeRef } = useDroppable({
    id: `month-${index}`,
  });

  return (
    <div ref={setNodeRef} className={`flex flex-col border-2 border-black rounded-lg min-h-[340px] max-w-1/4 flex-1`}>
      <div className={`${month.color} p-3 border-b-2 border-black rounded-t-md`}>
        <h4 className="font-bold text-2xl">{month.month}</h4>
      </div>
      <ul className="flex flex-col gap-4 h-full px-2 py-4 overflow-y-auto max-h-80">
        {month.content?.map((content, idx) => (
          <li key={idx} className="w-full flex justify-between items-center border border-black p-2 rounded-md gap-2">
            <p>{content.text}</p>
            <button type="button" onClick={() => handleDelete(index ?? 0, idx)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};