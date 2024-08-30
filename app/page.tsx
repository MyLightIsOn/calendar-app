import CalendarView from "@/app/calendar-view";
import { getEvents } from "@/config/calendar.config";

const Home = async () => {
  const events = await getEvents();

  return (
    <>
      <CalendarView events={events} />
    </>
  );
};

export default Home;
