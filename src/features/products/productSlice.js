import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsAPI } from "../../api";

// ─── Async thunk: fetch products from MongoDB ────────────────────────────────
export const fetchProductsFromAPI = createAsyncThunk(
  "products/fetchFromAPI",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getProductsAPI();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load products");
    }
  }
);

// ─── Helper to normalise a DB product to the shape the UI expects ─────────────
// DB uses: _id, images[], category (mens/womens), stock, sizes[]
// UI uses: id, image, category (men/women), inStock, sizes[]
const normalise = (p) => ({
  ...p,
  id: p._id,
  image: p.images?.[0] || "",
  // DB stores "mens"/"womens", UI filters on "men"/"women"
  category: p.category === "mens" ? "men" : p.category === "womens" ? "women" : p.category,
  inStock: p.stock > 0,
  color: p.color || "",
  rating: p.rating || 4.5,
});

// ─── Static products (always shown) ─────────────────────────────────────────
const staticProducts = [
  {
    id: 1, name: "Classic Silk Tuxedo Jacket", price: 14999, category: "men",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80",
    description: "Tailored to perfection, featuring satin lapels and a single-breasted structure. The pinnacle of evening elegance.",
    sizes: ["S", "M", "L", "XL"], color: "Jet Black", inStock: true, rating: 4.9,
  },
  {
    id: 2, name: "Heritage Double-Breasted Trench", price: 18999, category: "men",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80",
    description: "Water-resistant gabardine cotton with a signature check undercollar. A timeless silhouette for the modern gentleman.",
    sizes: ["M", "L", "XL"], color: "Camel", inStock: true, rating: 4.8,
  },
  {
    id: 3, name: "Suede Biker Jacket", price: 12499, category: "men",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80",
    description: "Crafted from ultra-soft goat suede with silver-tone asymmetric zip details. The ultimate casual luxury outer layer.",
    sizes: ["S", "M", "L"], color: "Cognac Brown", inStock: true, rating: 4.7,
  },
  {
    id: 4, name: "Premium Knit Merino Polo", price: 4999, category: "men",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=80",
    description: "Finely knit from extra-fine Australian Merino wool. Breathable, incredibly soft, and naturally thermo-regulating.",
    sizes: ["S", "M", "L", "XL", "XXL"], color: "Midnight Blue", inStock: true, rating: 4.6,
  },
  {
    id: 5, name: "Tailored Linen Casual Shirt", price: 3999, category: "men",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80",
    description: "Woven from organic European linen, pre-washed for vintage softness. Relaxed collar and buttoned cuffs.",
    sizes: ["S", "M", "L", "XL"], color: "Optic White", inStock: true, rating: 4.5,
  },
  {
    id: 6, name: "Luxury Leather Chelsea Boots", price: 8999, category: "men",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop&q=80",
    description: "Italian calfskin leather with elasticated side panels and a stacked leather sole. Crafted by hand.",
    sizes: ["8", "9", "10", "11"], color: "Nero Black", inStock: false, rating: 4.9,
  },
  {
    id: 7, name: "Silk Satin Evening Gown", price: 19999, category: "women",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop&q=80",
    description: "A breathtaking floor-length silhouette with a cowl neckline and an open low back. Flows beautifully.",
    sizes: ["XS", "S", "M", "L"], color: "Burgundy Ruby", inStock: true, rating: 5.0,
  },
  {
    id: 8, name: "Premium Double-Breasted Wool Coat", price: 21999, category: "women",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
    description: "Heavyweight virgin wool blend coat with structured shoulders, waist belt, and signature horn buttons.",
    sizes: ["S", "M", "L"], color: "Cream White", inStock: true, rating: 4.9,
  },
  {
    id: 9, name: "Embroidered Organza Cocktail Dress", price: 15999, category: "women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80",
    description: "Delicate floral embroidery overlaying sheer layers of silk organza. Concealed rear zip and full lining.",
    sizes: ["XS", "S", "M"], color: "Rose Gold Blush", inStock: true, rating: 4.8,
  },
  {
    id: 10, name: "Luxury Leather Handbag", price: 12999, category: "women",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
    description: "Pebbled Italian leather top-handle bag with a detachable shoulder strap and polished gold-tone hardware locks.",
    sizes: ["One Size"], color: "Tan Brown", inStock: true, rating: 4.7,
  },
  {
    id: 11, name: "Velvet Pleated Midi Skirt", price: 6999, category: "women",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80",
    description: "Sunray pleated velvet midi skirt with an elasticated metallic waistband. Stunning shimmering light response.",
    sizes: ["XS", "S", "M", "L", "XL"], color: "Emerald Green", inStock: true, rating: 4.6,
  },
  {
    id: 12, name: "Classic Suede Stiletto Pumps", price: 7999, category: "women",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80",
    description: "Timeless 100mm heel height, padded leather insole for superior comfort, and high-grade goat suede upper.",
    sizes: ["5", "6", "7", "8"], color: "Scarlet Red", inStock: true, rating: 4.8,
  },
];

// ─── Internal filter helper ───────────────────────────────────────────────────
const applyFiltersHelper = (state) => {
  let tempItems = [...state.items];

  if (state.selectedCategory !== "all") {
    tempItems = tempItems.filter((item) => item.category === state.selectedCategory);
  }

  if (state.searchTerm.trim() !== "") {
    const query = state.searchTerm.toLowerCase();
    tempItems = tempItems.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.color?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
    );
  }

  if (state.selectedSort === "price-low-high") {
    tempItems.sort((a, b) => a.price - b.price);
  } else if (state.selectedSort === "price-high-low") {
    tempItems.sort((a, b) => b.price - a.price);
  }

  state.filteredItems = tempItems;
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: staticProducts,
    filteredItems: staticProducts,
    searchTerm: "",
    selectedCategory: "all",
    selectedSort: "default",
    loading: false,
    error: null,
    loadedFromAPI: false,
  },
  reducers: {
    fetchProducts: (state) => {
      applyFiltersHelper(state);
    },
    categoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
      applyFiltersHelper(state);
    },
    searchProducts: (state, action) => {
      state.searchTerm = action.payload;
      applyFiltersHelper(state);
    },
    filterProducts: (state, action) => {
      state.selectedSort = action.payload;
      applyFiltersHelper(state);
    },
    applyFilters: (state) => {
      applyFiltersHelper(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.loadedFromAPI = true;
        // ✅ MERGE: Static 12 products always stay + new DB products appended after
        const dbProducts = action.payload.map(normalise);
        state.items = [...staticProducts, ...dbProducts];
        applyFiltersHelper(state);
      })
      .addCase(fetchProductsFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep static products as fallback — don't wipe them
      });
  },
});

export const { fetchProducts, categoryFilter, searchProducts, filterProducts } =
  productSlice.actions;
export default productSlice.reducer;

