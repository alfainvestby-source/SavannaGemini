import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  Timestamp,
  getDoc,
  setDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';

// Example: User Profile management
export const getGuestId = () => {
  let guestId = localStorage.getItem('guest_id');
  if (!guestId) {
    guestId = 'guest_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('guest_id', guestId);
  }
  return guestId;
};

export const createUserProfile = async (userId: string, data: any) => {
  if (!db) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  if (!db) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Example: Safari Bookmarks
export const addBookmark = async (userId: string, safariId: string, safariData: any) => {
  if (!db) return;
  try {
    const bookmarkRef = doc(db, 'users', userId, 'bookmarks', safariId);
    await setDoc(bookmarkRef, {
      ...safariData,
      bookmarkedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

export const removeBookmark = async (userId: string, safariId: string) => {
  if (!db) return;
  try {
    const bookmarkRef = doc(db, 'users', userId, 'bookmarks', safariId);
    await deleteDoc(bookmarkRef);
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

export const getBookmarks = async (userId: string) => {
  if (!db) return [];
  try {
    const bookmarksRef = collection(db, 'users', userId, 'bookmarks');
    const querySnapshot = await getDocs(bookmarksRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    throw error;
  }
};

// Example: Save Generated Itinerary
export const saveItinerary = async (userId: string, itineraryData: any) => {
  if (!db) return;
  try {
    const itinerariesRef = collection(db, 'users', userId, 'itineraries');
    const docRef = await addDoc(itinerariesRef, {
      ...itineraryData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving itinerary:", error);
    throw error;
  }
};

// Admin: Bulk Add Tours
export const bulkAddTours = async (tours: any[]) => {
  if (!db) throw new Error("Database not initialized");
  
  try {
    // Firestore batches have a limit of 500 operations
    const CHUNK_SIZE = 500;
    
    for (let i = 0; i < tours.length; i += CHUNK_SIZE) {
      const chunk = tours.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      
      chunk.forEach(tour => {
        // Use a generated ID or a specific ID if provided
        const tourRef = tour.id ? doc(db, 'tours', tour.id) : doc(collection(db, 'tours'));
        
        // Ensure we don't save the id inside the document if it was just used for the ref
        const { id, ...tourData } = tour;
        
        batch.set(tourRef, {
          ...tourData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      });
      
      await batch.commit();
      console.log(`Committed batch of ${chunk.length} tours`);
    }
    
    return { success: true, count: tours.length };
  } catch (error) {
    console.error("Error in bulkAddTours:", error);
    throw error;
  }
};
