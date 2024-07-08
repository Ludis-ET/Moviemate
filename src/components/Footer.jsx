import React from "react";

export const Footer = () => {
  return (
    <footer className="footer footer-center bg-transparent mt-12 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">Whishlist</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">About to</a>
        <a className="link link-hover">Leaderboard</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="" className="fab fa-github fa-2x"></a>
          <a href="" className="fab fa-telegram fa-2x"></a>
          <a href="" className="fab fa-instagram fa-2x"></a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All right reserved by Ludis
        </p>
      </aside>
    </footer>
  );
};
