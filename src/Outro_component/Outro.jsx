import React from "react";

function Outro({ copyright, facebook, twitter, instagram }) {
  return (
    // social links
    <footer className="outro">
      <ul className="socials">
        <li>
          <a href={facebook} target="_blank" rel="noreferrer">
            <i class="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href={twitter} target="_blank" rel="noreferrer">
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href={instagram} target="_blank" rel="noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
      <p>&copy; Copyright {copyright}. All rights reserved.</p>
    </footer>
  );
}

export default Outro;
