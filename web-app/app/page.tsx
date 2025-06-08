import Link from 'next/link';

export default function Home() {
  const projects = [
    { 
      name: 'Parking Lot', 
      file: 'PakingLot.py',
      description: 'A system design for managing parking lots with multiple levels, slots, and vehicle types.'
    },
    { 
      name: 'Amazon Package Delivery', 
      file: 'AmazonPackageDelivery.py',
      description: 'Implementation of a package delivery system with order tracking and delivery status updates.'
    },
    { 
      name: 'Amazon Music', 
      file: 'AmazonMusic.py',
      description: 'A music streaming service design with playlists, artists, and songs management.'
    },
    { 
      name: 'Blackjack Game', 
      file: 'Blackjack_Game.py',
      description: 'Object-oriented implementation of the classic Blackjack card game with players and dealer.'
    },
    { 
      name: 'Course Schedule', 
      file: 'Course_Schedule.py',
      description: 'A course scheduling system with prerequisites and conflict resolution.'
    },
    { 
      name: 'Linux File System', 
      file: 'LinuxFileSystem.py',
      description: 'Simulation of a Linux file system with directories, files, and permissions.'
    },
    { 
      name: 'UI', 
      file: 'UI.py',
      description: 'A simple UI component system with buttons, forms, and layouts.'
    },
    { 
      name: 'Pizza', 
      file: 'Pizza.py',
      description: 'Pizza ordering system demonstrating the builder pattern and customization options.'
    },
    { 
      name: 'Rate Limiter', 
      file: 'Rate Limiter.py',
      description: 'Implementation of different rate limiting algorithms for API request throttling.'
    },
    { 
      name: 'Tic Tac Toe', 
      file: 'TicTacToe.py',
      description: 'A classic Tic Tac Toe game with player turns and win condition checks.'
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-4">Low-Level Design Examples</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        A collection of object-oriented design implementations in Python demonstrating various system design patterns and concepts.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {projects.map((project) => (
          <div 
            key={project.file}
            className="group p-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex flex-col h-full"
          >
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
            <div className="flex justify-between mt-auto">
              <Link 
                href={`/projects/${encodeURIComponent(project.file)}`}
                className="text-blue-600 hover:underline"
              >
                View implementation →
              </Link>
              <a 
                href={`/code/${project.file}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 hover:underline"
              >
                Raw File
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
