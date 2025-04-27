// ./redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    setPlayers: (state, action) => {
      return action.payload;
    },
    addPlayer: (state, action) => {
      state.push(action.payload);
    },
    updatePlayer: (state, action) => {
      const { name, ...updatedDetails } = action.payload;
      const index = state.findIndex(player => player.name === name);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedDetails };
      }
    },
    deletePlayer: (state, action) => {
      const nameToDelete = action.payload;
      return state.filter(player => player.name !== nameToDelete);
    }
  }
});

export const { setPlayers, addPlayer, updatePlayer, deletePlayer } = playersSlice.actions;

export const store = configureStore({
  reducer: {
    players: playersSlice.reducer
  }
});