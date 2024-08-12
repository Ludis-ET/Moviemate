import "./rate.css";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export const Rate = ({ m, onClose }) => {
  const { db, currentUser } = useAuth();
  const [ratings, setRatings] = useState({
    characters: 0,
    cinematography: 0,
    climax: 0,
    starting: 0,
    ending: 0,
    soundtrack: 0,
    plot: 0,
    story: 0,
    visual: 0,
    characterDevelopment: 0,
    overall: 0,
  });
  const [loading, setLoading] = useState(false);

  const validateInput = (value) => {
    const numberValue = Number(value);
    return numberValue >= 0 && numberValue <= 10;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numberValue = Number(value);

    if (!validateInput(numberValue)) {
      toast.error(
        `Invalid value for ${name}. Please enter a number between 0 and 10.`
      );
      return;
    }

    setRatings({
      ...ratings,
      [name]: numberValue,
    });
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "leaderboard"),
        where("movieId", "==", m.id),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const docRef = doc(db, "leaderboard", docId);
        await updateDoc(docRef, {
          ...ratings,
          other: m.vote_average,
          time: new Date(),
        });
        toast.success("Ratings updated successfully!");
      } else {
        await addDoc(collection(db, "leaderboard"), {
          ...ratings,
          other: m.vote_average,
          movieId: m.id,
          time: new Date(),
          type: m.first_air_date ? "tv" : "movie",
          userId: currentUser.uid,
        });
        toast.success("Ratings saved successfully!");
      }

      const aboutToQuery = query(
        collection(db, "about-to"),
        where("movieId", "==", Number(m.id)),
        where("userId", "==", currentUser.uid)
      );
      const aboutToSnapshot = await getDocs(aboutToQuery);
      aboutToSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      toast.success('Entry removed from the "about-to" collection!');

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchExistingRating = async () => {
      const q = query(
        collection(db, "leaderboard"),
        where("movieId", "==", m.id),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        setRatings({
          characters: docData.characters || 0,
          cinematography: docData.cinematography || 0,
          climax: docData.climax || 0,
          starting: docData.starting || 0,
          ending: docData.ending || 0,
          soundtrack: docData.soundtrack || 0,
          plot: docData.plot || 0,
          story: docData.story || 0,
          visual: docData.visual || 0,
          characterDevelopment: docData.characterDevelopment || 0,
          overall: docData.overall || 0,
        });
      }
    };

    fetchExistingRating();
  }, [m.id, currentUser.uid, db]);

  return (
    <>
      <div className="subscribe xl:left-[40%]">
        <div className="flex justify-between">
          <p>{m.first_air_date ? m.name : m.title}</p>
          <button
            className=" bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={onClose}
            aria-label="Cancel"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="mt-8 mb-4  xl:ml-[-80px] absolute w-[700px] flex flex-wrap gap-20">
          <div className="flex flex-col gap-4">
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="characters"
                value={ratings.characters}
                onChange={handleInputChange}
                required
              />
              <span>Characters :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="cinematography"
                value={ratings.cinematography}
                onChange={handleInputChange}
                required
              />
              <span>Cinematography :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="climax"
                value={ratings.climax}
                onChange={handleInputChange}
                required
              />
              <span>Climax :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="starting"
                value={ratings.starting}
                onChange={handleInputChange}
                required
              />
              <span>Starting :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="ending"
                value={ratings.ending}
                onChange={handleInputChange}
                required
              />
              <span>Ending :</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="soundtrack"
                value={ratings.soundtrack}
                onChange={handleInputChange}
                required
              />
              <span>Soundtrack :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="plot"
                value={ratings.plot}
                onChange={handleInputChange}
                required
              />
              <span>Plot :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="story"
                value={ratings.story}
                onChange={handleInputChange}
                required
              />
              <span>Story :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="visual"
                value={ratings.visual}
                onChange={handleInputChange}
                required
              />
              <span>Visual :</span>
            </div>
            <div className="inputBox">
              <input
                placeholder="rate here..."
                type="number"
                min="0"
                max="10"
                name="characterDevelopment"
                value={ratings.characterDevelopment}
                onChange={handleInputChange}
                required
              />
              <span>Character Development :</span>
            </div>
          </div>
        </div>
        <div className="xl:mt-[95%] mt-[125%] font-bold">
          It has a global rating of {m.vote_average.toFixed(1)} / 10, this may
          affect your rating. <br />
          <div className="inputBox mt-4">
            <input
              placeholder="rate here..."
              type="number"
              min="0"
              max="10"
              name="overall"
              value={ratings.overall}
              onChange={handleInputChange}
              required
            />
            <span>Overall :</span>
          </div>
        </div>
        <br />
        <div
          className={`submit-btn ${loading ? "loading" : ""}`}
          onClick={submitForm}
        >
          {loading ? (
            <div
              className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700"
            ></div>
          ) : (
            "SUBMIT"
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};
