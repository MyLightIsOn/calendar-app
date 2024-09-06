"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent } from "@/app/api/calendars/data";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./calendar.css";

interface CalendarViewProps {
  events: CalendarEvent[];
}

const CalendarView = ({ events }: CalendarViewProps) => {
  const [date, setDate] = useState<Date>(new Date());

  function handleClassName() {}

  function handleEventClick() {}

  function handleDateClick() {}

  return (
    <div className="grid grid-cols-12 gap-6 divide-x divide-border h-screen p-6 bg-accent">
      <Card className="col-span-12 lg:col-span-4 2xl:col-span-3 pb-5 h-fit">
        <CardHeader className="border-none mb-2 pt-5">
          <Button>
            <Plus className="w-4 h-4 text-primary-foreground ltr:mr-1 rtl:ml-1" />
            Add Event
          </Button>
        </CardHeader>
        <div className="px-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(s) => {
              console.log(s);
            }}
            className="rounded-md border w-full p-0 border-none"
          />
        </div>
        <div id="external-events" className=" space-y-1.5 mt-6 px-4"></div>
      </Card>

      <Card className="col-span-12 lg:col-span-8 2xl:col-span-9 pt-5 h-fit">
        <CardContent className={"calendar"}>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            events={[]}
            editable={true}
            rerenderDelay={10}
            eventDurationEditable={false}
            selectable={true}
            selectMirror={true}
            droppable={true}
            dayMaxEvents={2}
            weekends={true}
            eventClassNames={handleClassName}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            initialView="dayGridMonth"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
