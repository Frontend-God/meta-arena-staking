/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import * as bootstrap from "bootstrap";

const useNav = (initialNavbarOpen: boolean) => {
  const [navbarOpen, setNavbarOpen] = useState(initialNavbarOpen);

  useEffect(() => {
    const navbarContent = document.getElementById("navbarContent") as HTMLElement;

    navbarContent.addEventListener("show.bs.collapse", () => setNavbarOpen(true));

    navbarContent.addEventListener("hide.bs.collapse", () => setNavbarOpen(false));
  }, []);

  useEffect(() => {
    const header = document.getElementById("header") as HTMLElement;

    [].slice.call(header.querySelectorAll(".nav-animation-link")).forEach((link: HTMLAnchorElement) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        setNavbarOpen(false);
      });
    });

    [].slice.call(header.querySelectorAll(".nav-link")).forEach((link: HTMLAnchorElement) => {
      link.addEventListener("click", (e) => {
        setNavbarOpen(false);
      });
    });
  }, []);

  useEffect(() => {
    const navbarContent = document.getElementById("navbarContent");

    if (navbarContent) {
      const bsNavbarContent = new bootstrap.Collapse(navbarContent, {
        toggle: false,
      });

      if (navbarOpen) {
        bsNavbarContent.show();
      } else {
        bsNavbarContent.hide();
      }
    }
  }, [navbarOpen]);

  return [navbarOpen, setNavbarOpen] as const;
};

export default useNav;
