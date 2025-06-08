import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CodeViewer from '../../components/CodeViewer';
import fs from 'fs/promises';
import path from 'path';

// Define interface for code files
interface CodeFiles {
  [key: string]: string;
}

// Function to get code files data
async function getCodeFiles(): Promise<CodeFiles> {
  try {
    // In development, read from JSON file if it exists
    const filePath = path.join(process.cwd(), 'app', 'data', 'code-files.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading code files:', error);
    return {};
  }
}

// Enable static export for better performance
export const dynamicParams = false;

interface PageProps {
  params: {
    filename: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedFilename = decodeURIComponent(params.filename);
  return {
    title: `LLD - ${decodedFilename}`,
    description: `Low Level Design implementation of ${decodedFilename}`,
  };
}

// Generate static paths for all projects
export async function generateStaticParams() {
  try {
    const codeFiles = await getCodeFiles();
    return Object.keys(codeFiles).map(filename => ({
      filename: encodeURIComponent(filename)
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Project descriptions to be displayed on the detail page
const projectDescriptions: Record<string, { description: string, concepts: string[] }> = {
  'PakingLot.py': {
    description: 'A comprehensive implementation of a parking lot system that handles multiple levels, different vehicle types, and parking allocation strategies.',
    concepts: ['Object-Oriented Design', 'Factory Pattern', 'Space Allocation']
  },
  'AmazonPackageDelivery.py': {
    description: 'A simulation of Amazon\'s package delivery system that tracks orders, manages delivery personnel, and updates delivery statuses.',
    concepts: ['State Pattern', 'Observer Pattern', 'Logistics Management']
  },
  'AmazonMusic.py': {
    description: 'A music streaming service design that allows users to search, play, and create playlists from a library of songs and albums.',
    concepts: ['Composite Pattern', 'Strategy Pattern', 'Content Management']
  },
  'Blackjack_Game.py': {
    description: 'An implementation of the classic Blackjack card game with dealer logic, player actions, and game rules.',
    concepts: ['Game Design', 'State Machine', 'Randomization']
  },
  'Course_Schedule.py': {
    description: 'A course scheduling system that handles prerequisites, conflicts, and optimal scheduling based on various constraints.',
    concepts: ['Graph Algorithms', 'Topological Sort', 'Constraint Satisfaction']
  },
  'LinuxFileSystem.py': {
    description: 'A simplified implementation of a Linux-like file system with directories, files, permissions, and basic file operations.',
    concepts: ['Composite Pattern', 'Visitor Pattern', 'Access Control']
  },
  'UI.py': {
    description: 'A basic UI component library with buttons, forms, and layouts that can be composed to create user interfaces.',
    concepts: ['Composite Pattern', 'Observer Pattern', 'Event Handling']
  },
  'Pizza.py': {
    description: 'A pizza ordering system that demonstrates the builder pattern and allows for customization of pizzas with various toppings and crusts.',
    concepts: ['Builder Pattern', 'Factory Pattern', 'Customization']
  },
  'Rate Limiter.py': {
    description: 'Implementation of different rate limiting algorithms such as Token Bucket, Leaky Bucket, and Fixed Window for API throttling.',
    concepts: ['Algorithm Design', 'System Design', 'Resource Management']
  },
  'TicTacToe.py': {
    description: 'A classic Tic Tac Toe game implementation with player turns, win condition checks, and game state management.',
    concepts: ['Game Logic', 'State Management', 'Victory Conditions']
  }
};

export default async function ProjectPage({ params }: PageProps) {
  const decodedFilename = decodeURIComponent(params.filename);
  
  // Get the file content from the pre-generated JSON
  const codeFiles = await getCodeFiles();
  const content = codeFiles[decodedFilename];
  
  // If file not found, return 404
  if (!content) {
    notFound();
  }

  // Get project description if available
  const projectInfo = projectDescriptions[decodedFilename] || {
    description: 'A low-level design implementation in Python.',
    concepts: ['Object-Oriented Programming']
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Link 
        href="/"
        className="inline-flex items-center mb-6 text-blue-600 hover:underline"
      >
        ← Back to All Projects
      </Link>
      
      <h1 className="text-3xl font-bold mb-4">{decodedFilename}</h1>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">About this Implementation</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{projectInfo.description}</p>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
          <div className="flex flex-wrap gap-2">
            {projectInfo.concepts.map((concept, index) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <CodeViewer code={content} language="python" />
    </div>
  );
} 