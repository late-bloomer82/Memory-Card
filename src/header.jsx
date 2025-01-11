function Header({ score, bestScore }) {
  return (
    <header id="header">
      <div className="header-top">
        <h1 className="title">Pokemon Memory Game!</h1>{" "}
        <div className="scoreboard">
          <p className="current-score">
            Current Score: <span>{score}</span>
          </p>
          <p className="best-score">
            Best Score: <span>{bestScore}</span>
          </p>
        </div>
      </div>
      <p className="header-description">
        Get points by clicking on an image but don't click on any more than
        once! Gotta catch them all!
      </p>
    </header>
  );
}
export default Header;
