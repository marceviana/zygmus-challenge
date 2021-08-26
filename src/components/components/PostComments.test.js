import { render, screen, fireEvent } from '@testing-library/react';
import PostComments from './PostComments';

let open = true;
const setOpen = () => open=!open;

const post = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

const comments = [{
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
}];

const newComment = {
    postId: 1,
    name: "Marcelo Viana",
    email: "marceloviana00@gmail.com",
    body: "test comment"
}

const props = {
    errorFetchingComments: false,
    post,
    comments,
    onAddComment: c=>{
        comments.push(newComment)
    },
}

test('Expect comments to render in component', async () => {

    render(<PostComments {...props} post={post} open={open} setOpen={setOpen} />);

    const itemWrapper = screen.getByText('laudantium enim quasi est quidem magnam voluptate ipsam eos')
    expect(itemWrapper).toBeInTheDocument();

});

test('Add a new comment', async () => {

    render(<PostComments {...props} post={post} open={open} setOpen={setOpen} />);

    const input = screen.getByLabelText('write a comment')
    fireEvent.change(input, { target: {value: newComment.body }})
    expect(input.value).toBe(newComment.body)

    const button = screen.getByLabelText('post your comment')
    fireEvent.click(button)

    const newItemWrapper = screen.getByText(newComment.body)
    expect(newItemWrapper).toBeInTheDocument();

});

