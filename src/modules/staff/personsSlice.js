import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {
        id: 0,
        name: 'Uthappizza',
        image: '/assets/images/lenin.jpg',
        post: 'Освободитель',
        socialRating: 7,
        description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    },
    {
        id: 1,
        name: 'Zucchipakoda',
        image: '/assets/images/kim.jpg',
        post: 'Термоядерный',
        socialRating: 3,
        description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
    },
    {
        id: 2,
        name: 'Mega Horosh',
        post: 'Единорог',
        image: '/assets/images/megaharosh.jpg',
        socialRating: 8,
        description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
    },
    {
        id: 3,
        name: 'Vadonut',
        post: 'Расстрелять',
        image: '/assets/images/stalin.jpg',
        socialRating: 5,
        description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
    },

    {
        id: 4,
        name: 'ElaiCheese Cake',
        post: 'Кошка жена',
        image: '/assets/images/xi.jpg',
        socialRating: 20,
        
        description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
    },
    {
        id: 5,
        name: 'Che Tut',
        post: 'Происходит',
        image: '/assets/images/che.jpeg',
        socialRating: 10,
        description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
    }
]

const reducers = {
    personAdded(state, action) {
        state.push(action.payload)
    }
}

const personsSlice = createSlice({
    name: "persons",
    initialState,
    reducers
})

export const selectAllPersons = state => (
    state.persons
)

export const selectPerson = personId => state => (
    state.persons.find((person) => person.id == personId)
)

export const { personAdded } = personsSlice.actions;
export default personsSlice.reducer;