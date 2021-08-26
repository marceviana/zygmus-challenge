import React from 'react'
import PropTypes from "prop-types";
import SendIcon from '@material-ui/icons/SendRounded';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    CardContent,
    Avatar,
    IconButton,
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
    textField: {
        margin: '0 10px',
    },
    fieldWrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 15,
        bottom: 0,
        background: 'rgba(255,255,255,.95)',
        paddingTop: 10,
        paddingBottom: '10px !important',
        boxShadow: '0 -1px 10px rgba(0,0,0,.05)'
    },
}));

const ComposeBox = ({ onSubmit }) => {

    const classes = useStyles();
    const [commentText, setCommentText] = React.useState("");
    
    return (
        <CardContent className={classes.fieldWrapper}>
            <Avatar className={`${classes.avatar} ${classes.userAvatar}`} />
            <CustomTextField 
                fullWidth 
                multiline
                variant="filled" 
                label="write a comment..." 
                className={classes.textField}
                rows={commentText.split('\n').length} // add rows as user inserts new lines
                value={commentText}
                onChange={e=>setCommentText(e.target.value)}
                inputProps={{
                    'aria-label': "write a comment"
                }}
            />
            <IconButton 
                className={classes.sendButton} 
                aria-label="post your comment" 
                onClick={e=>{
                    if (!!commentText) {
                        onSubmit(commentText)
                        setCommentText("");
                    }
                }}
            >
                <SendIcon />
            </IconButton>
        </CardContent>
    );
}

ComposeBox.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default ComposeBox