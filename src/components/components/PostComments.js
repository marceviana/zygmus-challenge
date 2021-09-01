import React from 'react'
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import ComposeBox from './ComposeBox';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import SharedContext from '../../context'
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import CommentCard from './CommentCard';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
    },
    dialogContent: {
        paddingBottom: 90
    }
}))

const PostComments = ({ post, comments, addComment, deleteComment, open, onClose, ...props }) => {

    const classes = useStyles()
    const contentsRef = React.useRef()
    const context = React.useContext(SharedContext)
    
    const handleNewComment = contents=>{
        addComment({
            id: new Date().getTime(),
            postId: post.id,
            name: context.user.name,
            email: context.user.email,
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
    }
    
    return (
    <Dialog open={open} onClose={e=>onClose(false)}>
        <DialogTitle>
            Comments
            <IconButton className={classes.closeButton} aria-label="close" onClick={e=>onClose(false)}>
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
                    return <CommentCard comment={comment} deleteComment={deleteComment} key={k} />
                })
            }
            </div>
            <ComposeBox onSubmit={handleNewComment}/>
        </DialogContent>
    </Dialog>
    );
}

PostComments.propTypes = {
    open: PropTypes.bool.isRequired, 
    post: PropTypes.object.isRequired, 
    comments: PropTypes.array.isRequired, 
    onClose: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    errorFetchingComments: PropTypes.bool,
}

export default PostComments