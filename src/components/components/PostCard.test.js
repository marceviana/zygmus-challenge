import { render, screen, fireEvent } from '@testing-library/react';
import PostCard from './PostCard';

const post = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

const props = {
    post,
    comments: [],
    favorites: [],
    addComment: ()=>{},
    addToFavorites: (postId)=>{
        props.favorites.push(postId)
    },
    removeFromFavorites: (postId)=>{
        props.favorites = props.favorites.filter(pId=>postId!==pId)
    },
}

test('Open comments dialog', async () => {
    
    render(<PostCard {...props} />);

    const commentsBtn = screen.getByLabelText('view comments')
    fireEvent.click(commentsBtn)

    const dialogElement = screen.getByRole('presentation')
    expect(dialogElement).toBeInTheDocument();

});

test('Toggle favorite in a post', async () => {
    
    render(<PostCard {...props} />);

    const addToFavoritesBtn = screen.getByLabelText('add to favorites')
    fireEvent.click(addToFavoritesBtn)

    render(<PostCard {...props} />);

    const removeFromfavoritesBtn = screen.getByLabelText('remove from favorites')
    expect(removeFromfavoritesBtn).toBeInTheDocument();

});