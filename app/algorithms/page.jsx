"use client";
import { useState } from 'react';
import { BookOpen, ArrowRight, Clock, List, Activity, BarChart, Cpu, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const algorithmDetails = {
  fcfs: {
    name: "First Come First Serve (FCFS)",
    icon: List,
    description: "Processes are executed in the order they arrive",
    characteristics: [
      "Non-preemptive scheduling algorithm",
      "Simple and easy to implement",
      "Poor in performance as waiting time can be high",
      "No starvation as every process gets chance to execute"
    ],
    advantages: [
      "Simple to understand and implement",
      "No overhead of context switching",
      "Fair for processes with same burst time"
    ],
    disadvantages: [
      "High average waiting time",
      "Not suitable for interactive systems",
      "Convoy effect - short processes stuck behind long ones"
    ],
    example: "If processes P1, P2, P3 arrive at time 0 with burst times 24, 3, 3\nThe average waiting time will be (0 + 24 + 27)/3 = 17ms"
  },
  sjf: {
    name: "Shortest Job First (SJF)",
    icon: BarChart,
    description: "Executes the process with shortest burst time first",
    characteristics: [
      "Non-preemptive scheduling algorithm",
      "Optimal in terms of average waiting time",
      "Requires prediction of burst time",
      "May cause starvation of longer processes"
    ],
    advantages: [
      "Minimum average waiting time",
      "Good for batch systems",
      "Optimal when all jobs arrive at same time"
    ],
    disadvantages: [
      "Starvation of longer processes possible",
      "Requires prediction of CPU burst time",
      "Not practical in interactive systems"
    ],
    example: "If processes P1(6ms), P2(3ms), P3(8ms) arrive at time 0\nExecution order: P2 → P1 → P3\nAverage waiting time: (3 + 0 + 9)/3 = 4ms"
  },
  srtf: {
    name: "Shortest Remaining Time First (SRTF)",
    icon: Activity,
    description: "Preemptive version of SJF",
    characteristics: [
      "Preemptive scheduling algorithm",
      "Optimal in terms of average waiting time",
      "Process can be interrupted by shorter process",
      "High context switching overhead"
    ],
    advantages: [
      "Optimal average waiting time",
      "Responsive to short processes",
      "Good for interactive systems"
    ],
    disadvantages: [
      "High context switching overhead",
      "Starvation of longer processes",
      "Requires continuous monitoring"
    ],
    example: "If P1(8ms) arrives at t=0 and P2(4ms) arrives at t=1\nP1 runs for 1ms, then P2 runs for 4ms, then P1 completes"
  },
  npp: {
    name: "Priority (Non Preemptive)",
    icon: ArrowRight,
    description: "Executes based on priority without preemption",
    characteristics: [
      "Non-preemptive scheduling algorithm",
      "Priority assigned to each process",
      "Lower number typically means higher priority",
      "Can lead to priority inversion"
    ],
    advantages: [
      "Simple to implement",
      "No context switching overhead",
      "Good for mixed-priority workloads"
    ],
    disadvantages: [
      "Possible starvation of low priority processes",
      "Priority inversion problem",
      "Not suitable for equal priority tasks"
    ],
    example: "If P1(Priority 3), P2(Priority 1), P3(Priority 2) arrive at time 0\nExecution order: P2 → P3 → P1"
  },
  pp: {
    name: "Priority (Preemptive)",
    icon: Clock,
    description: "Executes based on priority with preemption",
    characteristics: [
      "Preemptive scheduling algorithm",
      "Higher priority process can interrupt lower priority",
      "Dynamic priority possible",
      "Aging can prevent starvation"
    ],
    advantages: [
      "Responsive to high priority processes",
      "Good for real-time systems",
      "Flexible with dynamic priorities"
    ],
    disadvantages: [
      "Complex implementation",
      "High context switching overhead",
      "Possible starvation without aging"
    ],
    example: "If P1(Priority 2) is running and P2(Priority 1) arrives\nP2 preempts P1 and starts executing immediately"
  },
  rr: {
    name: "Round Robin (RR)",
    icon: Cpu,
    description: "Each process gets a fixed time quantum",
    characteristics: [
      "Preemptive scheduling algorithm",
      "Time quantum based execution",
      "Fair distribution of CPU time",
      "Good for time-sharing systems"
    ],
    advantages: [
      "Fair allocation of CPU",
      "No starvation",
      "Good response time for short processes"
    ],
    disadvantages: [
      "High context switching overhead",
      "Performance depends on time quantum",
      "Higher average waiting time than SJF"
    ],
    example: "With time quantum 4ms and processes P1(10ms), P2(6ms)\nExecution: P1(4ms) → P2(4ms) → P1(4ms) → P2(2ms) → P1(2ms)"
  }
};

function AlgorithmInfo() {
  const [expandedAlgorithms, setExpandedAlgorithms] = useState({});

  const toggleAlgorithm = (key) => {
    setExpandedAlgorithms(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="overflow-y-scroll min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" /> */}
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="relative">
            <div className="absolute -inset-8 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
            <BookOpen size={80} className="text-blue-400 relative animate-bounce" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 animate-gradient">
            CPU Scheduling Algorithms
          </h1>

          <div className="w-full max-w-6xl space-y-8">
            {Object.entries(algorithmDetails).map(([key, algo]) => {
              const Icon = algo.icon;
              const isExpanded = expandedAlgorithms[key];

              return (
                <div
                  key={key}
                  className="group bg-gray-800/40 backdrop-blur-sm rounded-xl border-2 border-gray-700 hover:border-blue-400/50 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAlgorithm(key)}
                    className="w-full p-8 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Icon className="w-8 h-8 text-blue-400 relative" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-blue-400">{algo.name}</h2>
                        <p className="text-gray-400 mt-1">{algo.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-blue-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-blue-400" />
                    )}
                  </button>

                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 px-8 overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'pb-8 max-h-[2000px]' : 'max-h-0'
                    }`}
                  >
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Key Characteristics</h3>
                        <div className="space-y-2">
                          {algo.characteristics.map((char, i) => (
                            <div key={i} className="flex items-start gap-2 group/item">
                              <ChevronRight className="w-5 h-5 text-blue-400/50 group-hover/item:text-blue-400 transition-colors mt-0.5" />
                              <p className="text-gray-300 group-hover/item:text-white transition-colors">{char}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Advantages</h3>
                        <div className="space-y-2">
                          {algo.advantages.map((adv, i) => (
                            <div key={i} className="flex items-start gap-2 group/item">
                              <ChevronRight className="w-5 h-5 text-blue-400/50 group-hover/item:text-blue-400 transition-colors mt-0.5" />
                              <p className="text-gray-300 group-hover/item:text-white transition-colors">{adv}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Disadvantages</h3>
                        <div className="space-y-2">
                          {algo.disadvantages.map((dis, i) => (
                            <div key={i} className="flex items-start gap-2 group/item">
                              <ChevronRight className="w-5 h-5 text-blue-400/50 group-hover/item:text-blue-400 transition-colors mt-0.5" />
                              <p className="text-gray-300 group-hover/item:text-white transition-colors">{dis}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-blue-400 mb-2">Example</h3>
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                          {algo.example}
                        </pre>
                      </div>
                    </div>
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

export default AlgorithmInfo;