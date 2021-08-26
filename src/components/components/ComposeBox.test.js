import { render, screen, fireEvent } from '@testing-library/react';
import ComposeBox from './ComposeBox';

const newComment = {
    postId: 1,
    name: "Marcelo Viana",
    email: "marceloviana00@gmail.com",
    body: "test comment"
}

test('Add a new comment', async () => {

    render(<ComposeBox onSubmit={contents=>{}} />);

    const input = screen.getByLabelText('write a comment')
    fireEvent.change(input, { target: {value: newComment.body }})
    expect(input.value).toBe(newComment.body)

    const button = screen.getByLabelText('post your comment')
    fireEvent.click(button)

    expect(input.value).toBe("")

});

