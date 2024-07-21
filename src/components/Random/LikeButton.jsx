import "./LikeButton.css";

export const LikeButton = ({text}) => {
  return (
    <button className="like">
      <i className="fa fa-star"></i>
      {text}
    </button>
  );
};
