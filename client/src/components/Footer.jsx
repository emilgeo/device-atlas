import React from "react";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4 z-80">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - DeviceAtlas Limited. All
          Rights Reserved
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
