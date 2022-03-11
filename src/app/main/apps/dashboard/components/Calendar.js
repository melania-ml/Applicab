import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarHeader from "./CalendarHeader";

const Root = styled("div")(({ theme }) => ({
  "& a": {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: "none!important"
  },
  "&  .fc-media-screen": {
    minHeight: "100%"
  },
  "& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th": {
    borderColor: `${theme.palette.divider}!important`
  },
  "&  .fc-scrollgrid-section > td": {
    border: 0
  },
  "& .fc-daygrid-body, & .fc-scrollgrid-sync-table, & .fc-col-header ": {
    width: "100% !important"
  },
  "& .fc-daygrid-day": {
    "&:last-child": {
      borderRight: 0
    }
  },
  "& .fc-col-header-cell": {
    borderWidth: "0 0 1px 0",
    padding: "16px 0",
    "& .fc-col-header-cell-cushion": {
      color: theme.palette.text.secondary,
      fontWeight: 500
    }
  },
  "& .fc-view ": {
    borderRadius: 20,
    overflow: "hidden",
    border: `1px solid ${theme.palette.divider}`,
    "& > .fc-scrollgrid": {
      border: 0
    }
  },
  "& .fc-daygrid-day-number": {
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  "& .fc-event": {
    backgroundColor: `${theme.palette.primary.dark}!important`,
    color: `${theme.palette.primary.contrastText}!important`,
    border: 0,
    padding: "0 6px",
    borderRadius: "16px!important"
  },
  "& .for-width-cal": {
    width: "50%",
    "@media (max-width: 992px)": {
      width: "100%"
    }
  }
}));

export default function Calendar() {
  const dispatch = useDispatch();
  const calendarRef = useRef();
  const events = [];
  const [currentDate, setCurrentDate] = useState();

  const handleDates = (rangeInfo) => {
    setCurrentDate(rangeInfo);
  };

  const handleDateSelect = (selectInfo) => {
    const { start, end } = selectInfo;
    dispatch(
      openNewEventDialog({
        start,
        end
      })
    );
  };

  function renderEventContent(eventInfo) {
    return (
      <div className="flex items-center">
        <Typography className="text-12 px-4 truncate">
          {eventInfo.event.title}
        </Typography>
      </div>
    );
  }
  return (
    <Root
      className="flex flex-col flex-auto relative p-5 my-5 my-lg-0 box-shadow-dash for-width-cal"
      style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
    >
      <CalendarHeader calendarRef={calendarRef} currentDate={currentDate} />

      <div className="flex flex-1 container">
        <motion.div
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            datesSet={handleDates}
            select={handleDateSelect}
            events={events}
            eventContent={renderEventContent}
            // eventClick={handleEventClick}
            //eventAdd={handleEventAdd}
            //eventChange={handleEventChange}
            //eventRemove={handleEventRemove}
            //eventDrop={handleEventDrop}
            initialDate={new Date(2021, 3, 1)}
            ref={calendarRef}
          />
        </motion.div>
      </div>
    </Root>
  );
}
