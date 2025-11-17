import React from 'react';

export interface MiniAppMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
  bundleFile: string;
}

/**
 * Loads mini-app metadata from the local metadata.json file
 * In production, this would be an API call
 */
export async function loadMiniAppMetadata(): Promise<MiniAppMetadata[]> {
  try {
    // Simulate API call - in real app: await fetch(`${API_URL}/mini-apps`)
    const metadata = require('@/miniApps/metadata.json');
    return metadata as MiniAppMetadata[];
  } catch (error) {
    console.error('Failed to load mini-app metadata:', error);
    return [];
  }
}

/**
 * Loads a mini-app component directly from the bundle module
 * Simulates fetching from an API by loading from local TypeScript modules
 * In production, this would fetch from API and dynamically import the component
 */
export async function loadMiniAppBundle(bundleFile: string): Promise<React.ComponentType> {
  try {
    // Simulate network delay (optional, for demo purposes)
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Map bundle file names to their TypeScript module exports
    // Using require() for synchronous loading of local modules
    let Component: React.ComponentType;
    
    switch (bundleFile) {
      case 'infinity-scroller.bundle.js':
        Component = require('@/miniApps/infinity-scroller.bundle').default;
        break;
      case 'contacts.bundle.js':
        Component = require('@/miniApps/contacts.bundle').default;
        break;
      case 'calculator.bundle.js':
        Component = require('@/miniApps/calculator.bundle').default;
        break;
      case 'todo-list.bundle.js':
        Component = require('@/miniApps/todo-list.bundle').default;
        break;
      case 'timer.bundle.js':
        Component = require('@/miniApps/timer.bundle').default;
        break;
      case 'notes.bundle.js':
        Component = require('@/miniApps/notes.bundle').default;
        break;
      case 'unit-converter.bundle.js':
        Component = require('@/miniApps/unit-converter.bundle').default;
        break;
      default:
        throw new Error(`Bundle file not found: ${bundleFile}`);
    }

    if (!Component || typeof Component !== 'function') {
      throw new Error(`Invalid component for ${bundleFile}`);
    }

    return Component;
  } catch (error) {
    console.error(`Failed to load bundle ${bundleFile}:`, error);
    throw error;
  }
}

