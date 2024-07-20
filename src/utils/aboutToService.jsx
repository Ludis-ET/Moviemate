import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const addOrRemoveAboutTo = async (
  id,
  db,
  currentUser,
  isInAboutTo,
  setIsInAboutTo,
  setButtonLoading
) => {
  setButtonLoading(true);
  const currentTime = new Date();
  const aboutToData = {
    movieId: Number(id),
    time: currentTime.toISOString(),
    userId: currentUser.uid,
    type: "tv",
  };

  try {
    if (isInAboutTo) {
      const q = query(
        collection(db, "about-to"),
        where("movieId", "==", Number(id)),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      toast.success("Removed from About To successfully.");
    } else {
      await addDoc(collection(db, "about-to"), aboutToData);
      toast.success("Added to About To successfully.");
    }
    setIsInAboutTo(!isInAboutTo);
  } catch (error) {
    toast.error("Failed to update About To.");
    console.error("Error updating About To:", error);
  } finally {
    setButtonLoading(false);
  }
};
