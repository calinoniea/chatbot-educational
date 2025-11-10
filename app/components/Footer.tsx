// src/app/components/Footer.tsx
'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline'; // Iconiță pentru estetică
import React from 'react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {year} Toate drepturile rezervate. Platformă dezvoltată de{' '}
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                        <ArrowPathIcon className="h-4 w-4 inline-block mr-1 align-text-bottom" />
                        Powered by CMO_EDU
                    </span>
                </p>
            </div>
        </footer>
    );
}