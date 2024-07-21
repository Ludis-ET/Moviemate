import "./rate.css";
import { useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
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

    if (!validateInput(value)) {
      toast.error(
        `Invalid value for ${name}. Please enter a number between 0 and 10.`
      );
      return;
    }

    setRatings({
      ...ratings,
      [name]: value,
    });
  };

  const submitForm = async () => {
    setLoading(true); // Set loading to true when submission starts
    try {
      // Save the ratings to the "leaderboard" collection
      await addDoc(collection(db, "leaderboard"), {
        ...ratings,
        movieId: m.id,
        time: new Date(),
        type: "movie",
        userId: currentUser.uid,
      });

      toast.success("Ratings saved successfully!");

      // Remove the entry from the "about-to" collection
      const q = query(
        collection(db, "about-to"),
        where("movieId", "==", Number(m.id)),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      toast.success('Entry removed from the "about-to" collection!');

      // Call the onClose callback to close the Rate component
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false when submission completes
    }
  };

  return (
    <>
      <div className="subscribe">
        <p>{m.first_air_date ? m.name : m.title}</p>
        <div className="mt-8 mb-4 ml-[-80px] absolute w-[700px] flex flex-wrap gap-20">
          <div className="flex flex-col gap-4">
            {/* Rating input fields */}
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
            {/* Additional rating input fields */}
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
        <div className="mt-[95%] font-bold">
          It has a global rating of {m.vote_average.toFixed(1)} / 10, this may
          affect your rating. <br />
          If you don't want to fill those you can skip it here <br />
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
              class="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
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
