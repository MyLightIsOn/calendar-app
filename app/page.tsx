import CalendarView from "@/app/calendar-view";
import { getEvents, getCategories } from "@/config/calendar.config";

const Home = async () => {
  const events = await getEvents();
  const categories = await getCategories();

  return (
    <>
      <CalendarView events={events?.data} categories={categories?.data} />
    </>
  );
};

export default Home;
