import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import PostList from '../components/PostList'

const PostListContainer = props => {
    return <PostList {...props}/>
}

const mapStateToProps = (store) => {
    return { ...store }
}

const mapDispatchToProps = actions;

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)