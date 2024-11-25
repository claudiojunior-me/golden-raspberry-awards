'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      <nav data-testid="menu-container" className={`${styles.menuContainer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>Golden Raspberry</div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/">Dashboard</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/movies">List</Link>
          </li>
        </ul>
      </nav>

      {isOpen && <div data-testid="overlay" className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default Menu;
