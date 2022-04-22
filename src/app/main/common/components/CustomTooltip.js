import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#252E3E"
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252E3E"
  }
}));
