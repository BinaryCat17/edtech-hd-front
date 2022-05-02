import {PERSONS} from "./shared/persons";
import {LEADERS} from "./shared/leaders";
import {COMMENTS} from "./shared/comments"

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
};

export const Reducer = (state = initialState, action) => {
    return state;
};