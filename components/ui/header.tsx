"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
            <Link href="/" className="ml-2 text-xl font-bold text-gray-200">
              Youssef Ennaciri
            </Link>
          </div>

          {/* Navigation links */}
          <ul className="flex flex-1 items-center justify-end gap-6">
            <li>
              <Link
                href="/projects"
                className="text-sm text-indigo-200/65 transition hover:text-indigo-500"
              >
                Projects
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/youssef-ennaciri-7897b6170/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-200/65 transition hover:text-indigo-500"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:ennaciri.youssef47@gmail.com"
                className="text-sm text-indigo-200/65 transition hover:text-indigo-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
