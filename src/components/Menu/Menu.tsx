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
      {/* Botão para telas menores */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu Lateral */}
      <nav data-testid="menu-container" className={`${styles.menuContainer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>Golden Raspberry</div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/">Dashboard</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="/movies">Lista de Filmes</Link>
          </li>
        </ul>
      </nav>

      {/* Overlay para fechar o menu em telas menores */}
      {isOpen && <div data-testid="overlay" className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default Menu;
