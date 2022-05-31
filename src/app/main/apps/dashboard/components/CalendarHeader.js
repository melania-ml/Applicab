import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import clsx from "clsx";
import { selectMainThemeDark } from "app/store/fuse/settingsSlice";
import format from "date-fns/format";

//material-ui
import { Icon, IconButton, Tooltip, Typography } from "@mui/material";
import { styled, ThemeProvider, useTheme } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
  color: "#000000",
  backgroundPosition: "0 50%",
  backgroundRepeat: "no-repeat",
  "&:before": {
    content: "''",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1
  }
}));

const viewNamesObj = {
  dayGridMonth: {
    title: "Month",
    icon: "view_module"
  },
  timeGridWeek: {
    title: "Week",
    icon: "view_week"
  },
  timeGridDay: {
    title: "Day",
    icon: "view_agenda"
  }
};

function CalendarHeader(props) {
  const { calendarRef, currentDate } = props;

  const mainThemeDark = useSelector(selectMainThemeDark);
  const calendarApi = () => calendarRef.current?.getApi();
  const theme = useTheme();

  return (
    <ThemeProvider theme={mainThemeDark}>
      <Root
        className={clsx(
          "flex relative",
          format(new Date(currentDate?.start || null), "MMM")
        )}
      >
        <div className="flex flex-1 flex-col justify-between z-10 container">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex items-center sm:mb-0">
              <h1 style={{ padding: 8, color: theme.palette.primary.main }}>
                <b>Calendrier</b>{" "}
              </h1>
            </div>
            <div className="flex items-center">
              <Tooltip title="Today">
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: 0.3 } }}
                  >
                    <IconButton
                      aria-label="today"
                      onClick={() => calendarApi().today()}
                      size="large"
                    >
                      <Icon style={{ color: "#000000" }}>today</Icon>
                    </IconButton>
                  </motion.div>
                </div>
              </Tooltip>
              {Object.entries(viewNamesObj).map(([name, view]) => (
                <Tooltip title={view.title} key={name}>
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, transition: { delay: 0.3 } }}
                    >
                      <IconButton
                        aria-label={name}
                        style={
                          currentDate?.view.type === name
                            ? { color: "black" }
                            : { color: "#BBBBBB" }
                        }
                        onClick={() => calendarApi().changeView(name)}
                        disabled={currentDate?.view.type === name}
                        size="large"
                      >
                        <Icon>{view.icon}</Icon>
                      </IconButton>
                    </motion.div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
          >
            <Tooltip title="Previous">
              <IconButton
                aria-label="Previous"
                onClick={() => calendarApi().prev()}
                size="large"
              >
                <Icon style={{ color: "#000000" }}>
                  {mainThemeDark.direction === "ltr"
                    ? "chevron_left"
                    : "chevron_right"}
                </Icon>
              </IconButton>
            </Tooltip>
            <Typography variant="h6">{currentDate?.view.title}</Typography>
            <Tooltip title="Next">
              <IconButton
                aria-label="Next"
                onClick={() => calendarApi().next()}
                size="large"
              >
                <Icon style={{ color: "#000000" }}>
                  {mainThemeDark.direction === "ltr"
                    ? "chevron_right"
                    : "chevron_left"}
                </Icon>
              </IconButton>
            </Tooltip>
          </motion.div>
        </div>
      </Root>
    </ThemeProvider>
  );
}

export default CalendarHeader;
