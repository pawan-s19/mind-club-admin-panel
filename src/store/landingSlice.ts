import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  createLandingApi, 
  getLandingApi, 
  getLandingByIdApi,
  updateLandingApi 
} from "../api/landingApi";

// Landing data structure interface matching the API structure
export interface LandingData {
  _id?: string; // MongoDB ID from API response
  hero: {
    backgroundImageOrVideo: {
      url: string;
      fileId: string;
    } | string; // Can be object or base64 string for form uploads
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    badgeImageOrVideo: {
      url: string;
      fileId: string;
    } | string; // Can be object or base64 string for form uploads
  };
  agencySection: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    imageOrVideo: {
      url: string;
      fileId: string;
    } | string; // Can be object or base64 string for form uploads
  };
  footer: {
    logoOrVideo: {
      url: string;
      fileId: string;
    } | string; // Can be object or base64 string for form uploads
    description: string;
    links: Array<{
      label: string;
      url: string;
      _id?: string;
    }>;
    socialLinks: Array<{
      platform: string;
      url: string;
      _id?: string;
    }>;
    copyright: string;
  };
  lastUpdated?: string;
  __v?: number;
}

// Landing state interface
interface LandingState {
  currentLanding: LandingData;
  loading: boolean;
  error: string | null;
  success: string | null;
}

// Initial state
const initialState: LandingState = {
  currentLanding: {
    hero: {
      backgroundImageOrVideo: '',
      headline: '',
      subheadline: '',
      ctaText: '',
      ctaLink: '',
      badgeImageOrVideo: ''
    },
    agencySection: {
      title: '',
      description: '',
      ctaText: '',
      ctaLink: '',
      imageOrVideo: ''
    },
    footer: {
      logoOrVideo: '',
      description: '',
      links: [],
      socialLinks: [],
      copyright: ''
    }
  },
  loading: false,
  error: null,
  success: null
};

// Async thunks
export const createLanding = createAsyncThunk(
  "landing/createLanding",
  async (landingData: LandingData, thunkAPI) => {
    try {
      const data = await createLandingApi(landingData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLanding = createAsyncThunk(
  "landing/fetchLanding",
  async (_, thunkAPI) => {
    try {
      const data = await getLandingApi();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLandingById = createAsyncThunk(
  "landing/fetchLandingById",
  async (id: string, thunkAPI) => {
    try {
      const data = await getLandingByIdApi(id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateLanding = createAsyncThunk(
  "landing/updateLanding",
  async ({ landingData, id }: { landingData: LandingData; id?: string }, thunkAPI) => {
    try {
      const data = await updateLandingApi(landingData, id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Landing slice
const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    // Update hero section
    updateHero: (state, action: PayloadAction<Partial<LandingData['hero']>>) => {
      state.currentLanding.hero = { ...state.currentLanding.hero, ...action.payload };
    },
    
    // Update agency section
    updateAgencySection: (state, action: PayloadAction<Partial<LandingData['agencySection']>>) => {
      state.currentLanding.agencySection = { ...state.currentLanding.agencySection, ...action.payload };
    },
    
    // Update footer
    updateFooter: (state, action: PayloadAction<Partial<LandingData['footer']>>) => {
      state.currentLanding.footer = { ...state.currentLanding.footer, ...action.payload };
    },
    
    // Update footer links
    updateFooterLinks: (state, action: PayloadAction<LandingData['footer']['links']>) => {
      state.currentLanding.footer.links = action.payload;
    },
    
    // Update footer social links
    updateFooterSocialLinks: (state, action: PayloadAction<LandingData['footer']['socialLinks']>) => {
      state.currentLanding.footer.socialLinks = action.payload;
    },
    
    // Reset current landing
    resetCurrentLanding: (state) => {
      state.currentLanding = initialState.currentLanding;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear success
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create landing
      .addCase(createLanding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLanding.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Landing page created successfully!";
        if (action.payload) {
          state.currentLanding = action.payload;
        }
      })
      .addCase(createLanding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch landing
      .addCase(fetchLanding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanding.fulfilled, (state, action) => {
        console.log('fetchLanding.fulfilled - Payload:', action.payload);
        state.loading = false;
        if (action.payload) {
          state.currentLanding = action.payload;
          console.log('fetchLanding.fulfilled - Updated state:', state.currentLanding);
        }
      })
      .addCase(fetchLanding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch landing by ID
      .addCase(fetchLandingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLandingById.fulfilled, (state, action) => {
        console.log('fetchLandingById.fulfilled - Payload:', action.payload);
        state.loading = false;
        if (action.payload) {
          state.currentLanding = action.payload;
          console.log('fetchLandingById.fulfilled - Updated state:', state.currentLanding);
        }
      })
      .addCase(fetchLandingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update landing
      .addCase(updateLanding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLanding.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Landing page updated successfully!";
        if (action.payload) {
          state.currentLanding = action.payload;
        }
      })
      .addCase(updateLanding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  updateHero,
  updateAgencySection,
  updateFooter,
  updateFooterLinks,
  updateFooterSocialLinks,
  resetCurrentLanding,
  clearError,
  clearSuccess,
} = landingSlice.actions;

export default landingSlice.reducer; 