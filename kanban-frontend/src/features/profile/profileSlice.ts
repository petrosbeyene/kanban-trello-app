// slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchUserDetails, updateUserDetails} from './profileService';
import { User, userUpdateFormValues } from '../../types';

interface UserProfileState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserProfileState = {
  user: null,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async () => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken === null){
            throw new Error('Token not found in local storage');
        }
        return await fetchUserDetails(accessToken);
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async ({ profileData }: { profileData: userUpdateFormValues }) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken === null){
            throw new Error('Token not found in local storage');
        }
        return await updateUserDetails(accessToken, profileData);
    }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch user profile.';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not update user profile.';
      });
  },
});

export default profileSlice.reducer;
