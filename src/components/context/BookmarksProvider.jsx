import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
const bookmarksContext = createContext();
const BASE_URL = 'http://localhost:5000';
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'bookmarks/loaded':
      return { ...state, isLoading: false, bookmarks: action.payload };
    case 'bookmark/loaded':
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case 'bookmark/created':
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case 'bookmark/deleted':
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case 'rejected':
      return { ...state, isLoading: true, error: action.payload };
    default:
      throw new Error('Invalid action: ' + action.type);
  }
}
export default function BookmarksProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(bookmarkReducer, initialState);
  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: 'loading' });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: 'bookmarks/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
      }
    }
    fetchBookmarkList();
  }, []);

  async function createBookmark(newBookmark) {
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: 'bookmark/created', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }
  async function getBookmark(id) {
    dispatch({ type: 'loading' });

    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: 'bookmark/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }
  async function deleteBookmark(id) {
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: 'bookmark/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }
  return (
    <bookmarksContext.Provider
      value={{ deleteBookmark, isLoading, bookmarks, getBookmark, currentBookmark, createBookmark }}
    >
      {children}
    </bookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(bookmarksContext);
}
