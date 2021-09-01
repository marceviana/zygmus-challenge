import React from 'react'
import PropTypes from "prop-types";
import clsx from 'clsx';
import PostComments from './PostComments';
import FavoritesButton from './FavoritesButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        maxWidth: '98%',
        margin: '1%',
    },
    open: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
    },
    iconOpened: {
        transform: 'scale(1.1)',
    },
    avatar: {
        backgroundColor: '#254a78',
    },
}));

const PostCard = ({ post, ...props }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    let dateStr = new Date().toGMTString();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar className={classes.avatar} />}
                title={post.title}
                subheader={<small>{dateStr.replace(dateStr.substr(-7,7),'')}</small>}
            />
            <CardContent>
                <Typography variant="body2" align="left" color="textSecondary">
                    { post.body }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <FavoritesButton {...props} postId={post.id}/>
                <IconButton
                    className={clsx(classes.open, {
                        [classes.iconOpened]: open,
                    })}
                    onClick={e=>setOpen(true)}
                    aria-expanded={open}
                    aria-label="view comments"
                >
                    <Tooltip title="view comments" enterDelay={800} arrow>
                        <ChatBubbleIcon />
                    </Tooltip>
                </IconButton>
            </CardActions>
            <PostComments {...props} post={post} open={open} onClose={()=>setOpen(false)}/>
        </Card>
    );
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
}

export default PostCard