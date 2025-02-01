import { IconArrow } from "@/icons";
import { PLanificationMonth } from "@/interfaces/ICourses.interface";
import { useDroppable } from "@dnd-kit/core";
import { DraggablePlanificationItem } from "./DraggablePlanificationItem";

interface DroppableMonthProps {
  month: PLanificationMonth;
  index: number;
  setCurrentMonthIndex: (index: number) => void
}

export const PlanificationDroppableMonth: React.FC<DroppableMonthProps> = ({ month, index, setCurrentMonthIndex }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `month-${index}`,
  });

  return (
    <div ref={setNodeRef} className={`flex flex-col border-2 border-black rounded-lg min-h-[340px] min-w-52 max-w-1/4 flex-1 ${isOver ? 'border-blue-light-500 z-20 filter drop-shadow-[4px_4px_0px_#01caf8]' : 'filter drop-shadow-general'}`}>
      <div className={`${month.color} flex justify-between p-3 border-b-2 border-black rounded-t-md ${isOver && ' z-20'}`}>
        <h4 className="font-bold text-2xl">{month.month}</h4>
        <button className='flex justify-center items-center' type='button' onClick={() => setCurrentMonthIndex(index)}>
          Ver <IconArrow color='black' classNames='size-7' />
        </button>
      </div>
      <ul className={`flex flex-col gap-4 h-full px-2 py-4 overflow-y-auto bg-white rounded-b-md ${isOver && ' z-20'}`}>

        {month.content && month.content.map((content, idx) => {
          return (
            <li key={idx} className={`w-full ${content.theme && content.theme.subtemas.length > 0 ? "" : "hidden"}`}>
              <>
                {content.theme && content.theme!.subtemas.map((item) => (
                  <DraggablePlanificationItem
                    key={item.id}
                    title={content.theme?.unidad + ": " + content.theme?.nombre}
                    item={item}
                    setCurrentItem={() => { }}
                    monthIndex={index}
                  />
                ))
                }
              </>
            </li>
          )
        })}
      </ul>
    </div>
  );
};