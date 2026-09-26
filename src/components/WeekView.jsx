import React from 'react';
import { blockDuration } from '../schedule';

export default function WeekView({ events }) {
  const days = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div className="week">
      {days.map((d) => (
        <DayColumn key={d} day={d} blocks={events.filter((e) => e.start.getDay() === d)} />
      ))}
    </div>
  );
}

function DayColumn({ day, blocks }) {
  const total = blocks.reduce((sum, b) => sum + blockDuration(b), 0);
  return <div className="day">{day}: {total} min</div>;
}
