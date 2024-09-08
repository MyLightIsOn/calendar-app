"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar/calendar";
import {
  CalendarCategory,
  CalendarEvent,
  draggableEventTypes,
} from "@/app/api/calendars/data";
import { DraggableEvents } from "@/components/ui/calendar/dragging-events";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./calendar.css";

interface CalendarViewProps {
  events: CalendarEvent[];
  categories: CalendarCategory[];
}

const CalendarView = ({ events, categories }: CalendarViewProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string[] | null>(
    null,
  );
  const [draggableEvents] = useState(draggableEventTypes);

  function handleClassName() {}

  function handleEventClick() {}

  function handleDateClick() {}

  const handleCategorySelection = (category: string) => {
    if (selectedCategory && selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== category));
    } else {
      setSelectedCategory([...(selectedCategory || []), category]);
    }
  };

  useEffect(() => {
    setSelectedCategory(categories?.map((c) => c.value));
  }, [events, categories]);

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

  const filteredEvents = events?.filter((event) =>
    selectedCategory?.includes(event.extendedProps.calendar),
  );

  return (
    <div className="grid grid-cols-12 gap-6 divide-x divide-border min-h-screen p-6 bg-accent">
      <Card className="col-span-12 lg:col-span-4 2xl:col-span-3 pb-5 h-fit">
        <CardContent className="p-0 ">
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
          <div className="py-4 text-default-800  font-semibold text-xs uppercase mt-4 px-4">
            FILTER
          </div>
          <ul className=" space-y-2 px-4">
            <li className=" flex gap-3">
              <Checkbox
                checked={selectedCategory?.length === categories?.length}
                onClick={() => {
                  if (selectedCategory?.length === categories?.length) {
                    setSelectedCategory([]);
                  } else {
                    setSelectedCategory(categories.map((c) => c.value));
                  }
                }}
              />
              <Label>All</Label>
            </li>
            {categories?.map((category) => (
              <li className=" flex gap-3 " key={category.value}>
                <Checkbox
                  className={category.className}
                  id={category.label}
                  checked={selectedCategory?.includes(category.value)}
                  onClick={() => handleCategorySelection(category.value)}
                />
                <Label htmlFor={category.label}>{category.label}</Label>
              </li>
            ))}
          </ul>
        </CardContent>
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
            events={filteredEvents}
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
