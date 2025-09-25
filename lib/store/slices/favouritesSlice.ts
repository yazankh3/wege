import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavouriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface FavouritesState {
  items: FavouriteItem[];
}

const initialState: FavouritesState = {
  items: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<FavouriteItem>) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavourite: (state, action: PayloadAction<FavouriteItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToFavourites, removeFromFavourites, toggleFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
