import React, { useEffect } from 'react'
import { makeStyles, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import PostCard from './components/PostCard'

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

const SkeletonPlaceholder = ({ count, classes }) => {
    const CardPlaceholder = () => <Card className={classes.card}>
        <CardHeader
            avatar={<Skeleton variant="circle" width={40} height={40} />}
            title={<Skeleton variant="text" />}
            subheader={<Skeleton variant="text" />}
        />
        <CardContent>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </CardContent>
        <CardActions className={classes.actions}>
            <Skeleton variant="rect" width={25} height={20} />
            <Skeleton variant="rect" width={25} height={20} />
        </CardActions>
    </Card>
    return <div className={classes.list}>
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
    </div>
}

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
            !!props.errorFetchingPosts && <Alert severity="error">Ops, something went wrong — you may try reloading the page =)</Alert>
        }
        <div className={`post-list ${classes.list}`}>
            {posts.map((post,k)=>
                k < numberPosts ? 
                <PostCard onAddComment={addComment} comments={filterComments(post.id)} post={post} key={k} /> : 
                null
            )}
        </div>
        { !!props.fetchingPosts && <SkeletonPlaceholder classes={classes} count={6} /> }
    </>

}

export default PostList