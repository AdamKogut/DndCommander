import { useState, useMemo } from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
  DragOverlay
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { UniqueIdentifier } from '@dnd-kit/core/dist/types';

type SortableListProps = {
  idList: UniqueIdentifier[];
  itemList: JSX.Element[];
  setArray: (oldIndex: number, newIndex: number) => void;
}

function SortableList({ idList, itemList, setArray }: SortableListProps) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>();

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id);
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over !== null && active.id !== over.id) {
      const oldIndex = idList.indexOf(active.id);
      const newIndex = idList.indexOf(over.id);
      setArray(oldIndex, newIndex);
    }

    setActiveId(null);
  }

  const handleDragCancel = () => {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }

    const idIndex = idList.indexOf(activeId);
    return itemList[idIndex];
  }, [activeId, idList, itemList]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
    >
      <SortableContext items={idList}>
        {itemList}
      </SortableContext>
      <DragOverlay>
        {activeId && 
          <table className='w-full'>
            <tbody>
              {selectedRow}
            </tbody>
          </table>
        }
      </DragOverlay>
    </DndContext>
  );
}

export default SortableList;