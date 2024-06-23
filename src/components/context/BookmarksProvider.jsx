import { createContext, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
const bookmarksContext = createContext();
const BASE_URL = 'http://localhost:5000';

export default function BookmarksProvider({ children }) {
  const [isLoadCurrentBookmark, setIsLoadCurrentBookmark] = useState(false);

  const [currentBookmark, setCurrentBookmark] = useState(null);
  const { data: bookmarks, isLoading } = useFetch(BASE_URL + '/bookmarks');
  async function getBookmark(id) {
    setIsLoadCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadCurrentBookmark(false);
    }
  }
  return (
    <bookmarksContext.Provider value={{ isLoading, bookmarks, getBookmark, currentBookmark, isLoadCurrentBookmark }}>
      {children}
    </bookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(bookmarksContext);
}
