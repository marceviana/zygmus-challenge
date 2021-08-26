import { render, screen } from '@testing-library/react';
import PostList from './PostList';

let posts = [];
let comments = [];

const getPosts = () => {
    setTimeout(() => {
        posts = [
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
              },
              {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
              }
        ]
    }, 3000 );
}

const getComments = () => {
    comments = [
        {
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        },
        {
            "postId": 1,
            "id": 2,
            "name": "quo vero reiciendis velit similique earum",
            "email": "Jayne_Kuhic@sydney.com",
            "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
        }
    ]
}
const addComment = () => {
    comments.push({
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    })
}
const cleanPosts = () => {
    posts = []
}


const props = {
    posts,
    comments: [],
    getPosts,
    getComments,
    addComment,
    cleanPosts,
    fetchingPosts: false,
    errorFetchingPosts: false,
    fetchingComments: false,
    errorFetchingComments: false,
}

test('While fetching posts', async () => {
    
    render(<PostList {...props} fetchingPosts={true} />);

    const placeholder = screen.getByTestId('placeholder')
    expect(placeholder).toBeInTheDocument();

});

test('Error on fetching posts', async () => {
    
    render(<PostList {...props} errorFetchingPosts={true} />);

    const errorAlert = screen.getByText('Ops, something went wrong — you may try reloading the page =)')
    expect(errorAlert).toBeInTheDocument();

});
