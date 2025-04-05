"use client";
import React, { useEffect, useState } from 'react';
import { Cpu, ArrowRight, Clock, List, Activity, BarChart } from 'lucide-react';

const algorithms = {
  fcfs: {
    name: "First Come First Serve (FCFS)",
    icon: List,
    description: "Processes are executed in the order they arrive"
  },
  sjf: {
    name: "Shortest Job First (SJF)",
    icon: BarChart,
    description: "Executes the process with shortest burst time first"
  },
  srtf: {
    name: "Shortest Remaining Time First (SRTF)",
    icon: Activity,
    description: "Preemptive version of SJF"
  },
  npp: {
    name: "Priority (Non Preemptive)",
    icon: ArrowRight,
    description: "Executes based on priority without preemption"
  },
  pp: {
    name: "Priority (Preemptive)",
    icon: Clock,
    description: "Executes based on priority with preemption"
  },
  rr: {
    name: "Round Robin (RR)",
    icon: Cpu,
    description: "Each process gets a fixed time quantum"
  }
};

export default function Home() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState(0);
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);
  const algorithmEntries = Object.entries(algorithms);

  useEffect(() => {
    if (hoveredAlgorithm === null) {
      const interval = setInterval(() => {
        setCurrentAlgorithm((prev) => (prev + 1) % algorithmEntries.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hoveredAlgorithm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-y-scroll">
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" /> */}
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <div className="absolute -inset-8 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
            <Cpu size={80} className="text-blue-400 relative animate-bounce" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 animate-gradient">
            CPU Scheduler
          </h1>
          
          <div className="h-48 flex items-center justify-center w-full max-w-3xl mx-auto">
            {algorithmEntries.map(([key, algo], index) => {
              const Icon = algo.icon;
              return (
                <div
                  key={key}
                  className={`absolute transition-all duration-700 transform ${
                    (index === currentAlgorithm && hoveredAlgorithm === null) || key === hoveredAlgorithm
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-center flex items-center gap-4">
                    <Icon className="text-blue-400" />
                    <span>{algo.name}</span>
                  </div>
                  <div className="mt-4 text-blue-400/80 text-center text-lg">
                    {algo.description}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
            {algorithmEntries.map(([key, algo]) => {
              const Icon = algo.icon;
              return (
                <div
                  key={key}
                  className={`group relative bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${hoveredAlgorithm === key ? 'border-blue-400 scale-105' : 'border-gray-700 hover:border-blue-400/50'}
                  `}
                  onMouseEnter={() => setHoveredAlgorithm(key)}
                  onMouseLeave={() => setHoveredAlgorithm(null)}
                >
                  <div className="absolute inset-0 bg-blue-400/5 rounded-xl transition-opacity group-hover:opacity-100 opacity-0" />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <Icon className="text-blue-400 w-6 h-6" />
                      <h3 className="text-xl font-semibold text-blue-400">{key.toUpperCase()}</h3>
                    </div>
                    <p className="text-gray-300 mt-2">{algo.name}</p>
                    <p className="text-sm text-gray-400 mt-2">{algo.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
