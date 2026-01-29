
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
  minDate?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate, minDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const todayStr = new Date().toISOString().split('T')[0];

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);

  // Padding for start of month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`pad-${i}`} className="h-10 md:h-12 w-full"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d);
    const dateStr = date.toISOString().split('T')[0];
    const isSelected = selectedDate === dateStr;
    const isPast = minDate ? dateStr < minDate : dateStr < todayStr;

    days.push(
      <button
        key={d}
        disabled={isPast}
        onClick={() => onDateSelect(dateStr)}
        className={`h-10 md:h-12 w-full flex items-center justify-center rounded-lg transition-all ${
          isSelected
            ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 font-bold scale-105'
            : isPast
            ? 'text-slate-600 cursor-not-allowed'
            : 'text-slate-200 hover:bg-slate-800 hover:text-white'
        }`}
      >
        {d}
      </button>
    );
  }

  const monthName = currentMonth.toLocaleString('es-ES', { month: 'long' });

  return (
    <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100 capitalize">
          {monthName} <span className="text-slate-500 font-normal">{year}</span>
        </h3>
        <div className="flex gap-2">
          <button onClick={handlePrevMonth} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
        <div>Dom</div>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {days}
      </div>
    </div>
  );
};
