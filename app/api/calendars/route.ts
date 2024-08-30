import { NextRequest, NextResponse } from "next/server";
import { calendarEvents } from "@/app/api/calendars/data";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    return NextResponse.json({
      status: "success",
      message: "Event created successfully",
      data: calendarEvents,
    });
  } catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "Something went wrong",
      data: error,
    });
  }
}
