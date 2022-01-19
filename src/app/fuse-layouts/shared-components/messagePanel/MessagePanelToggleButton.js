import Badge from '@mui/material/Badge';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MessagePanelToggleButton(props) {
    return (
        <IconButton
            className="w-40 h-40"
            size="large"
        >
            <Badge badgeContent={4} color="secondary">
                {props.children}
            </Badge>
        </IconButton>
    );
}

MessagePanelToggleButton.defaultProps = {
    children: <Icon>email</Icon>,
};

export default withReducer('notificationPanel', reducer)(MessagePanelToggleButton);
