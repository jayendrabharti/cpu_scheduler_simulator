import React from 'react';
import { BookOpen, ChevronRight, Info, Terminal, PenTool as Tool, Upload, Users } from 'lucide-react';

const instructions = [
  {
    icon: Upload,
    title: "Input Format",
    content: [
      "Enter process details in the following format:",
      "Process ID: Unique identifier for each process",
      "Arrival Time: When the process arrives (0 or positive integer)",
      "Burst Time: CPU time required (positive integer)",
      "Priority: Process priority (lower number = higher priority)"
    ]
  },
  {
    icon: Tool,
    title: "Using the Scheduler",
    content: [
      "Select your desired scheduling algorithm",
      "Input process details in the provided form",
      "Click 'Calculate' to view the results",
      "View the Gantt chart and process metrics"
    ]
  },
  {
    icon: Terminal,
    title: "Sample Input",
    content: [
      "Process ID: P1",
      "Arrival Time: 0",
      "Burst Time: 5",
      "Priority: 2",
      "---",
      "Process ID: P2",
      "Arrival Time: 1",
      "Burst Time: 3",
      "Priority: 1"
    ]
  },
  {
    icon: Info,
    title: "Understanding Results",
    content: [
      "Gantt Chart: Visual representation of process execution",
      "Waiting Time: Time spent waiting in ready queue",
      "Turnaround Time: Total time from arrival to completion",
      "Response Time: Time from arrival to first CPU burst"
    ]
  }
];

export default function Instructions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-y-scroll">
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" /> */}
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <div className="absolute -inset-8 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
            <BookOpen size={80} className="text-blue-400 relative animate-bounce" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 animate-gradient">
            Instructions
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            {instructions.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border-2 border-gray-700 hover:border-blue-400/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon className="w-8 h-8 text-blue-400 relative" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-400">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {section.content.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 group/item">
                        <ChevronRight className="w-5 h-5 text-blue-400/50 group-hover/item:text-blue-400 transition-colors mt-0.5" />
                        <p className="text-gray-300 group-hover/item:text-white transition-colors">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border-2 border-gray-700 w-full max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-blue-400">Additional Tips</h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>For Round Robin (RR), you'll need to specify a time quantum</li>
              <li>Priority scheduling works with lower numbers indicating higher priority</li>
              <li>All times should be entered as positive integers</li>
              <li>The scheduler supports up to 10 processes simultaneously</li>
              <li>You can save and load process configurations for future use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
