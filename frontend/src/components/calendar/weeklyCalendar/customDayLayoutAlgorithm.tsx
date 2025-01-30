import { CalendarEvent } from '@/interfaces/IPlanification.interfaces';
import { DayLayoutFunction } from 'react-big-calendar';

interface CustomEvent extends CalendarEvent {
  top?: number;
  height?: number;
}

const customDayLayoutAlgorithm: DayLayoutFunction<CalendarEvent> = ({ events, minimumStartDifference }) => {
  events.sort((a, b) => a.start!.getTime() - b.start!.getTime());

  const groupedEvents: CustomEvent[][] = [];
  let currentGroup: CustomEvent[] = [];

  events.forEach((event, index) => {
    if (index === 0 || (event.start && events[index - 1].start && event.start.getTime() - events[index - 1].start!.getTime() < minimumStartDifference)) {
      currentGroup.push(event as CustomEvent);
    } else {
      groupedEvents.push(currentGroup);
      currentGroup = [event as CustomEvent];
    }
  });

  if (currentGroup.length > 0) {
    groupedEvents.push(currentGroup);
  }

  const positionedEvents = groupedEvents.flatMap((group) => {
    return group.map((event, index) => ({
      event,
      style: {
        top: `${index * 100}px`,
        height: '100px',
        position: 'relative' as const,
      },
    }));
  });

  return positionedEvents;
};

export default customDayLayoutAlgorithm;