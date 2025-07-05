import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { onlineWorkshopApi } from '../api/onlineWorkshopApi';

// Online Workshop data structure interface matching the schema
export interface OnlineWorkshopData {
  _id?: string; // MongoDB ID from API response
  workshopHeader: {
    thumbnail: {
      url: string;
    };
    title: string;
    subtitle?: string;
    coverImage: {
      url: string;
    };
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  price: {
    amount: number;
    currency: string;
  };
  workshopHighlights: {
    mode: 'online';
    certificateProvided: boolean;
    duration: string;
    spots: 'Limited' | 'Unlimited' | '10-20' | '20-30' | '30-50';
  };
  aboutWorkshop: {
    title?: string;
    description: string;
  };
  projects: {
    title?: string;
    description: string;
    items: Array<{
      title: string;
      subtitle?: string;
      image: {
        url: string;
      };
      link?: string;
      _id?: string;
    }>;
  };
  topics: {
    title: string;
    subtitle?: string;
    description?: string;
    learnings: string[];
  };
  aboutMentors: {
    title: string;
    subtitle: string;
    mentors: Array<{
      name?: string;
      description?: string;
      about?: string;
      photo: {
        url: string;
      };
      socialLinks?: Array<{
        platform: string;
        url: string;
        _id?: string;
      }>;
      _id?: string;
    }>;
  };
  meetingLink: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Online Workshop state interface
interface OnlineWorkshopState {
  currentOnlineWorkshop: OnlineWorkshopData | null;
  onlineWorkshops: OnlineWorkshopData[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

// Initial state
const initialState: OnlineWorkshopState = {
  currentOnlineWorkshop: {
    workshopHeader: {
      thumbnail: {
        url: ''
      },
      title: '',
      subtitle: '',
      coverImage: {
        url: ''
      },
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    },
    price: {
      amount: 0,
      currency: 'INR'
    },
    workshopHighlights: {
      mode: 'online',
      certificateProvided: true,
      duration: '',
      spots: 'Limited'
    },
    aboutWorkshop: {
      title: '',
      description: ''
    },
    projects: {
      title: '',
      description: '',
      items: []
    },
    topics: {
      title: '',
      subtitle: '',
      description: '',
      learnings: []
    },
    aboutMentors: {
      title: '',
      subtitle: '',
      mentors: []
    },
    meetingLink: ''
  },
  onlineWorkshops: [],
  loading: false,
  error: null,
  success: null
};

// Async thunks
export const createOnlineWorkshop = createAsyncThunk(
  "onlineWorkshop/createOnlineWorkshop",
  async (workshopData: OnlineWorkshopData, thunkAPI) => {
    try {
      const data = await onlineWorkshopApi.createOnlineWorkshop(workshopData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOnlineWorkshops = createAsyncThunk(
  "onlineWorkshop/fetchOnlineWorkshops",
  async (_, thunkAPI) => {
    try {
      const data = await onlineWorkshopApi.getOnlineWorkshops();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOnlineWorkshopById = createAsyncThunk(
  "onlineWorkshop/fetchOnlineWorkshopById",
  async (id: string, thunkAPI) => {
    try {
      const data = await onlineWorkshopApi.getOnlineWorkshopById(id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateOnlineWorkshop = createAsyncThunk(
  "onlineWorkshop/updateOnlineWorkshop",
  async ({ id, workshopData }: { id: string; workshopData: any }, thunkAPI) => {
    try {
      const data = await onlineWorkshopApi.updateOnlineWorkshop(id, workshopData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteOnlineWorkshop = createAsyncThunk(
  "onlineWorkshop/deleteOnlineWorkshop",
  async (id: string, thunkAPI) => {
    try {
      const data = await onlineWorkshopApi.deleteOnlineWorkshop(id);
      return { id, data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Online Workshop slice
const onlineWorkshopSlice = createSlice({
  name: "onlineWorkshop",
  initialState,
  reducers: {
    // Update specific sections of the current online workshop
    updateWorkshopHeader: (state, action: PayloadAction<Partial<OnlineWorkshopData['workshopHeader']>>) => {
      if (state.currentOnlineWorkshop) {
        state.currentOnlineWorkshop.workshopHeader = { 
          ...state.currentOnlineWorkshop.workshopHeader, 
          ...action.payload 
        };
      }
    },
    updatePrice: (state, action: PayloadAction<Partial<OnlineWorkshopData['price']>>) => {
      if (state.currentOnlineWorkshop) {
        state.currentOnlineWorkshop.price = { 
          ...state.currentOnlineWorkshop.price, 
          ...action.payload 
        };
      }
    },
    updateWorkshopHighlights: (state, action: PayloadAction<Partial<OnlineWorkshopData['workshopHighlights']>>) => {
      if (state.currentOnlineWorkshop) {
        state.currentOnlineWorkshop.workshopHighlights = { 
          ...state.currentOnlineWorkshop.workshopHighlights, 
          ...action.payload 
        };
      }
    },
    updateAboutWorkshop: (state, action: PayloadAction<Partial<OnlineWorkshopData['aboutWorkshop']>>) => {
      if (state.currentOnlineWorkshop) {
        if (!state.currentOnlineWorkshop.aboutWorkshop) {
          state.currentOnlineWorkshop.aboutWorkshop = { title: '', description: '' };
        }
        state.currentOnlineWorkshop.aboutWorkshop = { 
          ...state.currentOnlineWorkshop.aboutWorkshop, 
          ...action.payload 
        };
      }
    },
    updateProjects: (state, action: PayloadAction<Partial<OnlineWorkshopData['projects']>>) => {
      if (state.currentOnlineWorkshop) {
        if (!state.currentOnlineWorkshop.projects || Array.isArray(state.currentOnlineWorkshop.projects)) {
          state.currentOnlineWorkshop.projects = { title: '', description: '', items: [] };
        }
        if (!Array.isArray(state.currentOnlineWorkshop.projects)) {
          state.currentOnlineWorkshop.projects = { 
            ...state.currentOnlineWorkshop.projects, 
            ...action.payload 
          };
        }
      }
    },
    updateTopics: (state, action: PayloadAction<Partial<OnlineWorkshopData['topics']>>) => {
      if (state.currentOnlineWorkshop) {
        if (!state.currentOnlineWorkshop.topics) {
          state.currentOnlineWorkshop.topics = { title: '', subtitle: '', description: '', learnings: [] };
        }
        state.currentOnlineWorkshop.topics = { 
          ...state.currentOnlineWorkshop.topics, 
          ...action.payload 
        };
      }
    },
    updateAboutMentors: (state, action: PayloadAction<Partial<OnlineWorkshopData['aboutMentors']>>) => {
      if (state.currentOnlineWorkshop) {
        if (!state.currentOnlineWorkshop.aboutMentors) {
          state.currentOnlineWorkshop.aboutMentors = { title: '', subtitle: '', mentors: [] };
        }
        state.currentOnlineWorkshop.aboutMentors = { 
          ...state.currentOnlineWorkshop.aboutMentors, 
          ...action.payload 
        };
      }
    },
    updateMeetingLink: (state, action: PayloadAction<string>) => {
      if (state.currentOnlineWorkshop) {
        state.currentOnlineWorkshop.meetingLink = action.payload;
      }
    },
    // Reset current online workshop to initial state
    resetCurrentOnlineWorkshop: (state) => {
      state.currentOnlineWorkshop = initialState.currentOnlineWorkshop;
    },
    // Clear messages
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    // Set current online workshop (for editing)
    setCurrentOnlineWorkshop: (state, action: PayloadAction<OnlineWorkshopData>) => {
      state.currentOnlineWorkshop = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create online workshop
      .addCase(createOnlineWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createOnlineWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Online Workshop created successfully!";
        state.onlineWorkshops.push(action.payload);
        // Reset current online workshop after successful creation
        state.currentOnlineWorkshop = initialState.currentOnlineWorkshop;
      })
      .addCase(createOnlineWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch online workshops
      .addCase(fetchOnlineWorkshops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnlineWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.onlineWorkshops = action.payload;
      })
      .addCase(fetchOnlineWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch online workshop by ID
      .addCase(fetchOnlineWorkshopById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnlineWorkshopById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both direct data and wrapped response
        const payload = action.payload as any;
        state.currentOnlineWorkshop = payload.data || payload;
      })
      .addCase(fetchOnlineWorkshopById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update online workshop
      .addCase(updateOnlineWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateOnlineWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Online Workshop updated successfully!";
        // Handle both direct data and wrapped response
        const payload = action.payload as any;
        state.currentOnlineWorkshop = payload.data || payload;
      })
      .addCase(updateOnlineWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete online workshop
      .addCase(deleteOnlineWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOnlineWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Online Workshop deleted successfully!";
        // Remove the online workshop from the list
        state.onlineWorkshops = state.onlineWorkshops.filter(w => w._id !== action.payload.id);
      })
      .addCase(deleteOnlineWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  updateWorkshopHeader,
  updatePrice,
  updateWorkshopHighlights,
  updateAboutWorkshop,
  updateProjects,
  updateTopics,
  updateAboutMentors,
  updateMeetingLink,
  resetCurrentOnlineWorkshop,
  clearError,
  clearSuccess,
  setCurrentOnlineWorkshop
} = onlineWorkshopSlice.actions;

export default onlineWorkshopSlice.reducer; 