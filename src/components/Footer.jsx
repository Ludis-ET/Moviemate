import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer footer-center bg-transparent mt-12 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to='/about-to' className="link link-hover">About To</Link>
        <Link to='/leaderboard' className="link link-hover">Leaderboard</Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a target="_blank" href="https://github.com/ludis-et/" className="fab fa-github fa-2x"></a>
          <a target="_blank" href="https://t.me/lulsgd_tc" className="fab fa-telegram fa-2x"></a>
          <a target="_blank" href="https://instagram.com/lulsgd" className="fab fa-instagram fa-2x"></a>
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
