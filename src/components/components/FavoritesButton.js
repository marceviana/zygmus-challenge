import React from 'react'
import PropTypes from "prop-types";
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';

import {
    IconButton,
    Tooltip,
} from '@material-ui/core';

const FavoritesButton = ({ postId, favorites, addToFavorites, removeFromFavorites }) => {

    const handleFavoriteClick = () => {
        if (!favorites.includes(postId)) {
            addToFavorites(postId)
        }else{
            removeFromFavorites(postId)
        }
    };

    const isFavorite = !!favorites.includes(postId);

    return (
        <IconButton 
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
        >
            <Tooltip title={isFavorite ? "remove from favorites" : "add to favorites"} enterDelay={800} arrow>
                <FavoriteIcon color={isFavorite ? "error" : "inherit"} />
            </Tooltip>
        </IconButton>
    )
}

FavoritesButton.propTypes = {
    postId: PropTypes.number.isRequired,
    favorites: PropTypes.array.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
}

export default FavoritesButton