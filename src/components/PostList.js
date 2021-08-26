import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import PostCard from './components/PostCard'
import Placeholder from './components/Placeholder';

const useStyles = makeStyles((theme) => ({
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: 540,
        margin: '0 auto',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15
    },
    card: {
        width: '98%',
        maxWidth: '98%',
        margin: '1%'
    }
}));

const PostList = ({ getPosts, getComments, addComment, cleanPosts, posts, comments, ...props }) => {

    useEffect(() => {
        getPosts();
        getComments();
        return () => {
            cleanPosts(); 
        }
    }, [])

    const classes = useStyles();

    const [numberPosts, showMorePosts] = React.useState(6);

    const filterComments = (postId) => {
        return comments.filter(c=>c.postId===postId)
    }

    /* 
        @handleScroll implements infinite scroll on posts list
    */
    const handleScroll = () => {
        if (window.innerHeight + 
            Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop) 
            !== document.documentElement.offsetHeight) return;
        showMorePosts(numberPosts+6)
    }
    
    useEffect(() => {
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [numberPosts])

    return <>
        { 
            !!props.errorFetchingPosts && 
            <Alert severity="error">
                Ops, something went wrong — you may try reloading the page =)
            </Alert>
        }
        <div className={`post-list ${classes.list}`}>
            {posts.map((post,k)=>
                k < numberPosts ? 
                <PostCard 
                    onAddComment={addComment} 
                    comments={filterComments(post.id)} 
                    post={post} 
                    key={k} /> 
                : 
                null
            )}
        </div>
        { 
            !!props.fetchingPosts && 
            <Placeholder count={3} classes={classes} /> 
        }
    </>

}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    fetchingPosts: PropTypes.bool.isRequired,
    errorFetchingPosts: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    fetchingComments: PropTypes.bool.isRequired,
    errorFetchingComments: PropTypes.bool.isRequired,
    addComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    cleanPosts: PropTypes.func.isRequired,
}

export default PostList