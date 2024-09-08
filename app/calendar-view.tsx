"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar/calendar";
import { CalendarEvent, draggableEventTypes } from "@/app/api/calendars/data";
import { DraggableEvents } from "@/components/ui/calendar/dragging-events";
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
  const [draggableEvents] = useState(draggableEventTypes);

  function handleClassName() {}

  function handleEventClick() {}

  function handleDateClick() {}

  useEffect(() => {
    const draggableEl = document.getElementById("external-events");

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            let event = draggableEvents.find((e) => e.id === id);
            let tag = event ? event.tag : "";
            return {
              title: title,
              id: id,
              extendedProps: {
                calendar: tag,
              },
            };
          },
        });
      }
    };

    if (draggableEvents.length > 0) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener("mousedown", initDraggable);
    };
  }, [draggableEvents]);

  return (
    <div className="grid grid-cols-12 gap-6 divide-x divide-border min-h-screen p-6 bg-accent">
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
        <div id="external-events" className=" space-y-1.5 mt-6 px-4">
          <p className=" text-sm font-medium text-default-700 pb-2">
            Drag and drop your event or click in the calendar
          </p>
          {draggableEvents.map((event) => (
            <DraggableEvents key={event.id} event={event} />
          ))}
        </div>
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
            // TODO Fix type error for eventClassName
            // @ts-ignore
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
