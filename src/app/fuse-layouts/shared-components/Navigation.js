import FuseNavigation from "@fuse/core/FuseNavigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navbarCloseMobile } from "../../store/fuse/navbarSlice";
import navigationConfig from "app/fuse-configs/navigationConfig";

function Navigation(props) {
  const {
    data: { client_type }
  } = useSelector(({ auth }) => auth.user);
  const navigation = navigationConfig.filter((config) =>
    config.access.includes(client_type?.client_type)
  );
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  function handleItemClick(item) {
    if (mdDown) {
      dispatch(navbarCloseMobile());
    }
  }

  return (
    <FuseNavigation
      className={clsx("navigation", props.className)}
      navigation={navigation}
      layout={props.layout}
      dense={props.dense}
      active={props.active}
      onItemClick={handleItemClick}
    />
  );
}

Navigation.defaultProps = {
  layout: "vertical"
};

export default memo(Navigation);
