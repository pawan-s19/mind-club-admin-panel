import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  createWorkshopApi, 
  getWorkshopsApi, 
  getWorkshopByIdApi, 
  updateWorkshopApi, 
  deleteWorkshopApi 
} from "../api/workshopApi";

// Workshop data structure interface matching your API
export interface WorkshopData {
  _id: string;
  header: {
    title: string;
    description: string;
    image: {
      url: string;
    };
    watchTrailer: {
      url: string;
    };
  };
  brochure: {
    url: string;
  };
  workshopType: 'online' | 'on field';
  about: {
    title: string;
    description: string;
    workshopVisual: Array<{
      name: string;
      imageOrVideo: {
        url: string;
      };
      _id: string;
    }>;
  };
  location: {
    name: string;
    description: string;
    locationBlog: Array<{
      name: string;
      description: string;
      imageOrVideo: {
        url: string;
      };
      _id: string;
    }>;
  };
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  itinerary: Array<{
    day: number;
    itineraryBanner: {
      url: string;
    };
    title: string;
    description: string;
    activities: Array<{
      time: string;
      activity: string;
      image: {
        imageOrVideo: {
          url: string;
        };
        description: string;
      };
      color: string;
      _id: string;
    }>;
    _id: string;
  }>;
  elegablePersonSkills?: string[];
  mainHeading?: string;
  inclusions?: string[];
  exclusions?: string[];
  priceBreakdown?: string;
  referenceMember?: string;
  previousWorkshopGlimpses?: Array<{
    imageUrl: string;
    description: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Workshop state interface
interface WorkshopState {
  currentWorkshop: WorkshopData | null;
  workshops: WorkshopData[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

// Initial state
const initialState: WorkshopState = {
  currentWorkshop: {
    _id: '',
    header: {
      title: '',
      description: '',
      image: {
        url: ''
      },
      watchTrailer: {
        url: ''
      }
    },
    brochure: {
      url: ''
    },
    workshopType: 'online',
    about: {
      title: '',
      description: '',
      workshopVisual: []
    },
    location: {
      name: '',
      description: '',
      locationBlog: []
    },
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    itinerary: [],
    elegablePersonSkills: [],
    mainHeading: '',
    inclusions: [],
    exclusions: [],
    priceBreakdown: '',
    referenceMember: '',
    previousWorkshopGlimpses: [],
    createdAt: '',
    updatedAt: '',
    __v: 0
  },
  workshops: [],
  loading: false,
  error: null,
  success: null
};

// Async thunks
export const createWorkshop = createAsyncThunk(
  "workshop/createWorkshop",
  async (workshopData: WorkshopData, thunkAPI) => {
    try {
      const data = await createWorkshopApi(workshopData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWorkshops = createAsyncThunk(
  "workshop/fetchWorkshops",
  async (_, thunkAPI) => {
    try {
      const data = await getWorkshopsApi();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWorkshopById = createAsyncThunk(
  "workshop/fetchWorkshopById",
  async (id: string, thunkAPI) => {
    try {
      const data = await getWorkshopByIdApi(id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWorkshop = createAsyncThunk(
  "workshop/updateWorkshop",
  async ({ id, workshopData }: { id: string; workshopData: WorkshopData }, thunkAPI) => {
    try {
      const data = await updateWorkshopApi(id, workshopData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWorkshop = createAsyncThunk(
  "workshop/deleteWorkshop",
  async (id: string, thunkAPI) => {
    try {
      const data = await deleteWorkshopApi(id);
      return { id, data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Workshop slice
const workshopSlice = createSlice({
  name: "workshop",
  initialState,
  reducers: {
    // Update specific sections of the current workshop
    updateHeader: (state, action: PayloadAction<Partial<WorkshopData['header']>>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.header = { ...state.currentWorkshop.header, ...action.payload };
      }
    },
    updateBrochure: (state, action: PayloadAction<string>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.brochure = { ...state.currentWorkshop.brochure, url: action.payload };
      }
    },
    updateWorkshopType: (state, action: PayloadAction<'online' | 'on field'>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.workshopType = action.payload;
      }
    },
    updateAbout: (state, action: PayloadAction<Partial<WorkshopData['about']>>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.about = { ...state.currentWorkshop.about, ...action.payload };
      }
    },
    updateLocation: (state, action: PayloadAction<Partial<WorkshopData['location']>>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.location = { ...state.currentWorkshop.location, ...action.payload };
      }
    },
    updateItinerary: (state, action: PayloadAction<WorkshopData['itinerary']>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.itinerary = action.payload;
      }
    },
    updateDates: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.startDate = action.payload.startDate;
        state.currentWorkshop.endDate = action.payload.endDate;
      }
    },
    // Additional fields
    updateElegablePersonSkills: (state, action: PayloadAction<string[]>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.elegablePersonSkills = action.payload;
      }
    },
    updateMainHeading: (state, action: PayloadAction<string>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.mainHeading = action.payload;
      }
    },
    updateInclusions: (state, action: PayloadAction<string[]>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.inclusions = action.payload;
      }
    },
    updateExclusions: (state, action: PayloadAction<string[]>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.exclusions = action.payload;
      }
    },
    updatePriceBreakdown: (state, action: PayloadAction<string>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.priceBreakdown = action.payload;
      }
    },
    updateReferenceMember: (state, action: PayloadAction<string>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.referenceMember = action.payload;
      }
    },
    updatePreviousWorkshopGlimpses: (state, action: PayloadAction<Array<{ imageUrl: string; description: string }>>) => {
      if (state.currentWorkshop) {
        state.currentWorkshop.previousWorkshopGlimpses = action.payload.map(glimpse => ({
          ...glimpse,
          _id: ''
        }));
      }
    },
    // Reset current workshop to initial state
    resetCurrentWorkshop: (state) => {
      state.currentWorkshop = initialState.currentWorkshop;
    },
    // Clear messages
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    // Set current workshop (for editing)
    setCurrentWorkshop: (state, action: PayloadAction<WorkshopData>) => {
      state.currentWorkshop = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create workshop
      .addCase(createWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Workshop created successfully!";
        state.workshops.push(action.payload);
        // Reset current workshop after successful creation
        state.currentWorkshop = initialState.currentWorkshop;
      })
      .addCase(createWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch workshops
      .addCase(fetchWorkshops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.loading = false;
        state.workshops = action.payload;
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch workshop by ID
      .addCase(fetchWorkshopById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkshopById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkshop = action.payload;
      })
      .addCase(fetchWorkshopById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update workshop
      .addCase(updateWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Workshop updated successfully!";
        // Update the workshop in the list
        const index = state.workshops.findIndex(w => w._id === action.payload._id);
        if (index !== -1) {
          state.workshops[index] = action.payload;
        }
      })
      .addCase(updateWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete workshop
      .addCase(deleteWorkshop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkshop.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Workshop deleted successfully!";
        // Remove the workshop from the list
        state.workshops = state.workshops.filter(w => w._id !== action.payload.id);
      })
      .addCase(deleteWorkshop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  updateHeader,
  updateBrochure,
  updateWorkshopType,
  updateAbout,
  updateLocation,
  updateItinerary,
  updateDates,
  updateElegablePersonSkills,
  updateMainHeading,
  updateInclusions,
  updateExclusions,
  updatePriceBreakdown,
  updateReferenceMember,
  updatePreviousWorkshopGlimpses,
  resetCurrentWorkshop,
  clearError,
  clearSuccess,
  setCurrentWorkshop
} = workshopSlice.actions;

export default workshopSlice.reducer; 