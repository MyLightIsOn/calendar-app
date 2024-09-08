import { faker } from "@faker-js/faker";

const date = new Date();
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const nextMonth =
  date.getMonth() === 11
    ? new Date(date.getFullYear() + 1, 0, 1)
    : new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const calendarEvents = [
  {
    id: faker.string.uuid(),
    title: "All Day Event",
    start: date,
    end: nextDay,
    allDay: false,
    eventType: {
      calendar: "business",
    },
  },
  {
    id: faker.string.uuid(),
    title: "Meeting With Client",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    eventType: {
      calendar: "personal",
    },
  },
  {
    id: faker.string.uuid(),
    title: "Lunch",
    allDay: true,
    start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
    eventType: {
      calendar: "family",
    },
  },
  {
    id: faker.string.uuid(),
    title: "Birthday Party",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    eventType: {
      calendar: "meeting",
    },
  },
  {
    id: faker.string.uuid(),
    title: "Birthday Party",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    eventType: {
      calendar: "holiday",
    },
  },
  {
    id: faker.string.uuid(),
    title: "Monthly Meeting",
    start: nextMonth,
    end: nextMonth,
    allDay: true,
    eventType: {
      calendar: "business",
    },
  },
];
export const draggableEventTypes = [
  { title: "New Event Planning", id: "101", tag: "business" },
  { title: "Meeting", id: "102", tag: "meeting" },
  { title: "Generating Reports", id: "103", tag: "holiday" },
  { title: "Create New theme", id: "104", tag: "etc" },
];

export type CalendarEvent = (typeof calendarEvents)[number];
