// components/Layout.tsx
import React, { FC } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div>
    <header>
      <h1>React Spurningasíða</h1>
      <nav>
        <Link href="/">Home</Link> | <Link href="/admin">Admin</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <p>&copy; 2025 Ólafur Marel Árnason</p>
    </footer>
  </div>
);

export default Layout;
