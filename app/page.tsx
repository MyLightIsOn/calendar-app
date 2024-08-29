"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <main className="flex min-h-screen">
      <div className=" grid grid-cols-12 gap-6 divide-x divide-border">
        <Card className="col-span-12 lg:col-span-4 2xl:col-span-3  pb-5">
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
        </Card>

        <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5"></Card>
      </div>
    </main>
  );
}
