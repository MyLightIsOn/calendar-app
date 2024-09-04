"use client";

import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {CalendarEvent} from '@/app/api/calendars/data';

interface CalendarViewProps {
  events: CalendarEvent[]
}

const CalendarView = ({ events }: CalendarViewProps) => {
  const [date, setDate] = useState<Date>(new Date());

  console.log(events);

  return (
    <div className="grid grid-cols-12 gap-6 divide-x divide-border">
      <Card className="col-span-12 lg:col-span-4 2xl:col-span-3 pb-5">
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

      <Card className="col-span-12 lg:col-span-8 2xl:col-span-9 pt-5"></Card>
    </div>
  );
};

export default CalendarView;
