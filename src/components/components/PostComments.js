import React from 'react'
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/SendRounded';

import { Alert } from '@material-ui/lab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,  
} from '@material-ui/core';

const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#48afa1',
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#48afa1',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#48afa1',
        },
      },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: '#254a78',
    },
    userAvatar: {
        backgroundColor: '#48afa1',
    },
    sendButton: {
        color: '#48afa1',
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
    },
    textField: {
        margin: '0 10px',
    },
    fieldWrapper: {
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 15,
        bottom: 0,
        background: 'rgba(255,255,255,.95)',
        paddingTop: 10,
        boxShadow: '0 -1px 10px rgba(0,0,0,.05)'
    },
    dialogContent: {
        paddingBottom: 90
    }
}));

const PostComments = ({ post, comments, onAddComment, open, setOpen, ...props }) => {

    const classes = useStyles();
    const [commentContent, setCommentContent] = React.useState("");
    
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
            <CardContent className={classes.fieldWrapper}>
                <Avatar className={`${classes.avatar} ${classes.userAvatar}`} />
                <CustomTextField 
                    fullWidth 
                    multiline
                    variant="filled" 
                    label="write a comment..." 
                    className={classes.textField}
                    rows={commentContent.split('\n').length} // add rows as user inserts new lines
                    value={commentContent}
                    onChange={e=>setCommentContent(e.target.value)}
                    inputProps={{
                        'aria-label': "write a comment"
                    }}
                />
                <IconButton 
                    className={classes.sendButton} 
                    aria-label="post your comment" 
                    onClick={e=>{
                        !!commentContent && onAddComment({
                            postId: post.id,
                            name: "Marcelo Viana",
                            email: "marceloviana00@gmail.com",
                            body: commentContent
                        })
                        setCommentContent("");
                        
                        setTimeout(() => {
                            /* 
                                Scroll down the comments' container for 
                                the user to have visual feedback 
                                on the comment recently added
                            */
                            if (contentsRef.current) 
                                contentsRef.current.scrollTop = contentsRef.current.scrollHeight + 100;
                        }, 100 )
                    }}
                >
                    <SendIcon />
                </IconButton>
            </CardContent>
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