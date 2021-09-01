import React from 'react'
import PropTypes from "prop-types";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem
} from '@material-ui/core';
import SharedContext from '../../context';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: '#254a78',
    }
}));

const CommentCard = ({ comment, deleteComment }) => {
    
    const classes = useStyles();
    const anchorRef = React.useRef();
    const context = React.useContext(SharedContext)

    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setMenuOpen(false);
    };

    const handleDelete = () => {
        deleteComment(comment.id);
    };

    const isAuthor = context.user.email === comment.email;

    return (
        <div>
            <CardHeader
                avatar={
                    !isAuthor ? 
                    <Avatar className={classes.avatar} />
                    :
                    <Avatar className={classes.avatar} >{context.user.name.charAt(0)}</Avatar>
                }
                title={comment.name}
                subheader={comment.email}
                action={
                    !isAuthor ? null :
                    <>
                        <IconButton 
                            ref={anchorRef}
                            aria-label="settings" 
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Popper open={menuOpen} anchorEl={anchorRef.current} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={menuOpen} id="menu-list-grow">
                                        <MenuItem onClick={handleDelete}><DeleteIcon fontSize="small"/> &nbsp; Remove</MenuItem>
                                    </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                                </Grow>
                            )}
                        </Popper>                                        
                    </>
                }
            />
            <CardContent>
                {comment.body.split('\n').map((text,i)=>{
                    return <Typography key={i}>{text}</Typography>
                })}
            </CardContent>
        </div>
    )
}

CommentCard.propTypes = {
    comment: PropTypes.object.isRequired
}

export default CommentCard