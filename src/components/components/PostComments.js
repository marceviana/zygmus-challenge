import React from 'react'
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import ComposeBox from './ComposeBox';

import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: '#254a78',
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
    },
    dialogContent: {
        paddingBottom: 90
    }
}));

const PostComments = ({ post, comments, onAddComment, open, setOpen, ...props }) => {

    const classes = useStyles();
    
    const contentsRef = React.useRef();

    return (
    <Dialog open={open} onClose={e=>setOpen(false)}>
        <DialogTitle>
            Comments
            <IconButton className={classes.closeButton} aria-label="close" onClick={e=>setOpen(false)}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent ref={contentsRef} className={classes.dialogContent} dividers>
            { 
                !!props.errorFetchingComments && 
                <Alert severity="error">
                    Ops, something went wrong — you may try reloading the page =)
                </Alert>
            }
            <div>
            {
                comments.map((comment, k)=>{
                    return (
                        <div key={k}>
                            <CardHeader
                                avatar={<Avatar className={classes.avatar} />}
                                title={comment.name}
                                subheader={comment.email}
                            />
                            <CardContent>
                                {comment.body.split('\n').map((text,i)=>{
                                    return <Typography key={i}>{text}</Typography>
                                })}
                            </CardContent>
                        </div>
                    )
                })
            }
            </div>
            <ComposeBox onSubmit={contents=>{
                onAddComment({
                    postId: post.id,
                    name: "Marcelo Viana",
                    email: "marceloviana00@gmail.com",
                    body: contents
                })
                setTimeout(() => {
                    /* 
                        Scroll down the comments' container for the user to 
                        have visual feedback on the comment recently added
                    */
                    if (contentsRef.current) 
                        contentsRef.current.scrollTop = contentsRef.current.scrollHeight + 100;
                }, 100 )
            }}/>
        </DialogContent>
    </Dialog>
    );
}

PostComments.propTypes = {
    open: PropTypes.bool.isRequired, 
    post: PropTypes.object.isRequired, 
    comments: PropTypes.array.isRequired, 
    setOpen: PropTypes.func.isRequired,
    onAddComment: PropTypes.func.isRequired,
    errorFetchingComments: PropTypes.bool,
}

export default PostComments