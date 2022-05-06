import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {
        id: 0,
        personId: 0,
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        date: "2012-10-16T17:57:28.556094Z"
    },
    {
        id: 1,
        personId: 0,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        date: "2014-09-05T17:57:28.556094Z"
    },
    {
        id: 2,
        personId: 0,
        rating: 3,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        date: "2015-02-13T17:57:28.556094Z"
    },
    {
        id: 3,
        personId: 0,
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        date: "2013-12-02T17:57:28.556094Z"
    },
    {
        id: 4,
        personId: 0,
        rating: 2,
        comment: "It's your birthday, we're gonna party!",
        author: "25 Cent",
        date: "2011-12-02T17:57:28.556094Z"
    },
    {
        id: 5,
        personId: 1,
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        date: "2012-10-16T17:57:28.556094Z"
    },
    {
        id: 6,
        personId: 1,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        date: "2014-09-05T17:57:28.556094Z"
    },
    {
        id: 7,
        personId: 1,
        rating: 3,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        date: "2015-02-13T17:57:28.556094Z"
    },
    {
        id: 8,
        personId: 1,
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        date: "2013-12-02T17:57:28.556094Z"
    },
    {
        id: 9,
        personId: 1,
        rating: 2,
        comment: "It's your birthday, we're gonna party!",
        author: "25 Cent",
        date: "2011-12-02T17:57:28.556094Z"
    },
    {
        id: 10,
        personId: 2,
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        date: "2012-10-16T17:57:28.556094Z"
    },
    {
        id: 11,
        personId: 2,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        date: "2014-09-05T17:57:28.556094Z"
    },
    {
        id: 12,
        personId: 2,
        rating: 3,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        date: "2015-02-13T17:57:28.556094Z"
    },
    {
        id: 13,
        personId: 2,
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        date: "2013-12-02T17:57:28.556094Z"
    },
    {
        id: 14,
        personId: 2,
        rating: 2,
        comment: "It's your birthday, we're gonna party!",
        author: "25 Cent",
        date: "2011-12-02T17:57:28.556094Z"
    },
    {
        id: 15,
        personId: 3,
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        date: "2012-10-16T17:57:28.556094Z"
    },
    {
        id: 16,
        personId: 3,
        rating: 4,
        comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        date: "2014-09-05T17:57:28.556094Z"
    },
    {
        id: 17,
        personId: 3,
        rating: 3,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        date: "2015-02-13T17:57:28.556094Z"
    },
    {
        id: 18,
        personId: 3,
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        date: "2013-12-02T17:57:28.556094Z"
    },
    {
        id: 19,
        personId: 3,
        rating: 2,
        comment: "It's your birthday, we're gonna party!",
        author: "25 Cent",
        date: "2011-12-02T17:57:28.556094Z"
    }
]

const reducers = {
    commentAdded(state, action) {
        state.push(action.payload)
    },
}

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers
})

export const fetchComments = from => dispatch => {
    console.log(from)
    return fetch(from,).then(response => response.text()).then(text => {
        const comment = {
            id: 33,
            personId: 0,
            rating: 2,
            comment: text,
            author: "25 Cent",
            date: "2011-12-02T17:57:28.556094Z"
        }
        dispatch(commentAdded(comment));
    });
}

export const selectPersonComments = personId => state => (
    state.comments.filter((comment) => comment.personId == personId)
)

export const { commentAdded } = commentsSlice.actions;
export default commentsSlice.reducer;