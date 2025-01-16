import { IconTrash } from "@/icons";
import { useDroppable } from "@dnd-kit/core";

export const DroppableDelete: React.FC = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: `trash`,
  });

  return (
    <div ref={setNodeRef} className={`absolute top-[432px] right-1/2 translate-x-1/2 flex items-center gap-1 text-red-600 text-xl ${isOver ? "font-bold z-20" : ""}`}>
      <IconTrash color='red' classNames="size-10" />
      <span className="font-semibold">Elminar del Calendario</span>
    </div>
  );
};