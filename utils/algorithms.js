// NON-PREEMPTIVE
// ____________________________________________________

// First-Come, First-Served (FCFS) Algorithm
export function fcfs(processes) {
  // Sort processes by arrival time (FCFS principle)
  const sortedProcesses = [...processes].map(proc => ({
    ...proc,
    arrivalTime: Number(proc.arrivalTime),
    burstTime: Number(proc.burstTime),
    priority: Number(proc.priority || 0) // Ensure priority is numeric if present
  })).sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  let currentTime = 0;
  let ganttData = [];
  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let totalIdleTime = 0;
  
  // Process each job in arrival order
  for (let i = 0; i < sortedProcesses.length; i++) {
    const process = sortedProcesses[i];
    
    // If there's a gap between current time and next process arrival, add idle time
    if (process.arrivalTime > currentTime) {
      ganttData.push({
        id: 'idle-' + currentTime,
        name: 'Idle',
        arrivalTime: currentTime,
        burstTime: process.arrivalTime - currentTime,
        priority: 0,
        color: '#f0f0f0', // Light gray for idle time
        idle: true,
        startTime: currentTime,
        endTime: process.arrivalTime,
        exitTime: process.arrivalTime,
        waitingTime: 0,
        turnAroundTime: 0
      });
      
      totalIdleTime += (process.arrivalTime - currentTime);
      currentTime = process.arrivalTime;
    }
    
    // Calculate metrics for this process
    const startTime = currentTime;
    const endTime = currentTime + process.burstTime;
    const exitTime = endTime;
    const waitingTime = startTime - process.arrivalTime;
    const turnAroundTime = exitTime - process.arrivalTime;
    
    // Add to totals
    totalWaitingTime += waitingTime;
    totalTurnAroundTime += turnAroundTime;
    
    // Add process to Gantt chart data
    ganttData.push({
      ...process,
      idle: false,
      startTime,
      endTime,
      exitTime,
      waitingTime,
      turnAroundTime
    });
    
    // Update current time
    currentTime = endTime;
  }
  
  // Calculate averages
  const avgWaitingTime = totalWaitingTime / sortedProcesses.length;
  const avgTurnAroundTime = totalTurnAroundTime / sortedProcesses.length;
  const totalRunningTime = currentTime;
  
  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

// Shortest Job First (SJF) Algorithm
export function sjf(processes) {
  // Create a deep copy of processes to avoid modifying original input
  const processesCopy = processes.map(proc => ({
    ...proc,
    arrivalTime: Number(proc.arrivalTime),
    burstTime: Number(proc.burstTime),
    priority: Number(proc.priority || 0) // Ensure priority is numeric if present
  }));
  
  // Sort initially by arrival time to determine starting point
  processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  let currentTime = 0;
  let ganttData = [];
  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let totalIdleTime = 0;
  let completedProcesses = 0;
  const totalProcesses = processesCopy.length;
  
  // Keep track of which processes have been executed
  const completed = new Array(totalProcesses).fill(false);
  
  // Continue until all processes are completed
  while (completedProcesses < totalProcesses) {
    // Find the process with minimum burst time among available processes
    let minBurstIndex = -1;
    let minBurstTime = Number.MAX_VALUE;
    
    for (let i = 0; i < totalProcesses; i++) {
      // Process must have arrived and not be completed yet
      if (!completed[i] && processesCopy[i].arrivalTime <= currentTime) {
        if (processesCopy[i].burstTime < minBurstTime) {
          minBurstIndex = i;
          minBurstTime = processesCopy[i].burstTime;
        }
      }
    }
    
    // If no process is available, add idle time
    if (minBurstIndex === -1) {
      // Find the next process to arrive
      let nextArrival = Number.MAX_VALUE;
      let nextIndex = -1;
      
      for (let i = 0; i < totalProcesses; i++) {
        if (!completed[i] && processesCopy[i].arrivalTime < nextArrival) {
          nextArrival = processesCopy[i].arrivalTime;
          nextIndex = i;
        }
      }
      
      // Add idle time to Gantt chart
      ganttData.push({
        id: 'idle-' + currentTime,
        name: 'Idle',
        arrivalTime: currentTime,
        burstTime: Number(nextArrival - currentTime),
        priority: 0,
        color: '#f0f0f0', // Light gray for idle time
        idle: true,
        startTime: currentTime,
        endTime: nextArrival,
        exitTime: nextArrival,
        waitingTime: 0,
        turnAroundTime: 0
      });
      
      totalIdleTime += Number(nextArrival - currentTime);
      currentTime = nextArrival;
    } 
    else {
      // Execute the selected process
      const process = processesCopy[minBurstIndex];
      
      // Calculate metrics for this process
      const startTime = currentTime;
      const endTime = currentTime + process.burstTime;
      const exitTime = endTime;
      const waitingTime = startTime - process.arrivalTime;
      const turnAroundTime = exitTime - process.arrivalTime;
      
      // Add to totals
      totalWaitingTime += Number(waitingTime);
      totalTurnAroundTime += Number(turnAroundTime);
      
      // Add process to Gantt chart data
      ganttData.push({
        ...process,
        idle: false,
        startTime,
        endTime,
        exitTime,
        waitingTime,
        turnAroundTime
      });
      
      // Mark process as completed
      completed[minBurstIndex] = true;
      completedProcesses++;
      
      // Update current time
      currentTime = endTime;
    }
  }
  
  // Calculate averages
  const avgWaitingTime = totalWaitingTime / totalProcesses;
  const avgTurnAroundTime = totalTurnAroundTime / totalProcesses;
  const totalRunningTime = currentTime;
  
  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

//Non preemptive Priority Scheduling Algorithm
export function npp(processes) {
  // Create a deep copy of processes to avoid modifying original input
  const processesCopy = processes.map(proc => ({
    ...proc,
    arrivalTime: Number(proc.arrivalTime),
    burstTime: Number(proc.burstTime),
    priority: Number(proc.priority || 0) // Ensure priority is numeric if present
  }));
  
  // Sort initially by arrival time to determine starting point
  processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  let currentTime = 0;
  let ganttData = [];
  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let totalIdleTime = 0;
  let completedProcesses = 0;
  const totalProcesses = processesCopy.length;
  
  // Keep track of which processes have been executed
  const completed = new Array(totalProcesses).fill(false);
  
  // Continue until all processes are completed
  while (completedProcesses < totalProcesses) {
    // Find the process with highest priority (lowest priority number) among available processes
    let highestPriorityIndex = -1;
    let highestPriority = Number.MAX_VALUE;
    
    for (let i = 0; i < totalProcesses; i++) {
      // Process must have arrived and not be completed yet
      if (!completed[i] && processesCopy[i].arrivalTime <= currentTime) {
        // Lower priority number means higher priority
        if (processesCopy[i].priority < highestPriority) {
          highestPriorityIndex = i;
          highestPriority = processesCopy[i].priority;
        }
      }
    }
    
    // If no process is available, add idle time
    if (highestPriorityIndex === -1) {
      // Find the next process to arrive
      let nextArrival = Number.MAX_VALUE;
      let nextIndex = -1;
      
      for (let i = 0; i < totalProcesses; i++) {
        if (!completed[i] && processesCopy[i].arrivalTime < nextArrival) {
          nextArrival = processesCopy[i].arrivalTime;
          nextIndex = i;
        }
      }
      
      // Add idle time to Gantt chart
      ganttData.push({
        id: 'idle-' + currentTime,
        name: 'Idle',
        arrivalTime: currentTime,
        burstTime: Number(nextArrival - currentTime),
        priority: 0,
        color: '#f0f0f0', // Light gray for idle time
        idle: true,
        startTime: currentTime,
        endTime: nextArrival,
        exitTime: nextArrival,
        waitingTime: 0,
        turnAroundTime: 0
      });
      
      totalIdleTime += Number(nextArrival - currentTime);
      currentTime = nextArrival;
    } 
    else {
      // Execute the selected process
      const process = processesCopy[highestPriorityIndex];
      
      // Calculate metrics for this process
      const startTime = currentTime;
      const endTime = currentTime + process.burstTime;
      const exitTime = endTime;
      const waitingTime = startTime - process.arrivalTime;
      const turnAroundTime = exitTime - process.arrivalTime;
      
      // Add to totals
      totalWaitingTime += Number(waitingTime);
      totalTurnAroundTime += Number(turnAroundTime);
      
      // Add process to Gantt chart data
      ganttData.push({
        ...process,
        idle: false,
        startTime,
        endTime,
        exitTime,
        waitingTime,
        turnAroundTime
      });
      
      // Mark process as completed
      completed[highestPriorityIndex] = true;
      completedProcesses++;
      
      // Update current time
      currentTime = endTime;
    }
  }
  
  // Calculate averages
  const avgWaitingTime = totalWaitingTime / totalProcesses;
  const avgTurnAroundTime = totalTurnAroundTime / totalProcesses;
  const totalRunningTime = currentTime;
  
  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

// PREEMPTIVE
// ____________________________________________________

//shortest remaining time first (SRTF) Algorithm
export function srtf(processes) {
  let time = 0;
  let completed = 0;
  const n = processes.length;
  const ganttData = [];

  // Ensure all input numbers are treated as numbers
  const processMap = processes.map(p => ({
    ...p,
    arrivalTime: Number(p.arrivalTime),
    burstTime: Number(p.burstTime),
    priority: Number(p.priority),
    remainingTime: Number(p.burstTime),
    isCompleted: false,
    startTime: null,
    endTime: null,
    exitTime: null,
    waitingTime: 0,
    turnAroundTime: 0,
  }));

  let totalIdleTime = 0;
  let currentProcess = null;

  while (completed < n) {
    const readyQueue = processMap
      .filter(p => p.arrivalTime <= time && !p.isCompleted && p.remainingTime > 0)
      .sort((a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime);

    if (readyQueue.length === 0) {
      time++;
      totalIdleTime++;

      // Add idle block to gantt chart
      if (
        ganttData.length === 0 ||
        ganttData[ganttData.length - 1].id !== "idle"
      ) {
        ganttData.push({
          id: "idle",
          name: "Idle",
          arrivalTime: time - 1,
          burstTime: 1,
          priority: null,
          color: "#ccc",
          idle: true,
          startTime: time - 1,
          endTime: time,
        });
      } else {
        ganttData[ganttData.length - 1].endTime = time;
        ganttData[ganttData.length - 1].burstTime = Number(ganttData[ganttData.length - 1].burstTime) + 1;
      }

      continue;
    }

    const current = readyQueue[0];

    if (!currentProcess || currentProcess.id !== current.id) {
      if (currentProcess && currentProcess.remainingTime > 0) {
        currentProcess.endTime = time;
      }

      ganttData.push({
        id: current.id,
        name: current.name,
        arrivalTime: current.arrivalTime,
        burstTime: 1,
        priority: current.priority,
        color: current.color,
        idle: false,
        startTime: time,
        endTime: time + 1,
      });
    } else {
      ganttData[ganttData.length - 1].endTime = time + 1;
      ganttData[ganttData.length - 1].burstTime = Number(ganttData[ganttData.length - 1].burstTime) + 1;
    }

    currentProcess = current;

    if (current.startTime === null) {
      current.startTime = time;
    }

    current.remainingTime = Number(current.remainingTime) - 1;
    time++;

    if (current.remainingTime === 0) {
      current.isCompleted = true;
      current.exitTime = time;
      current.turnAroundTime = Number(current.exitTime) - Number(current.arrivalTime);
      current.waitingTime = Number(current.turnAroundTime) - Number(current.burstTime);
      completed++;
    }
  }

  const ganttWithFinals = ganttData.map(block => {
    if (block.id === "idle") return block;
    const p = processMap.find(pr => pr.id === block.id);
    return {
      ...block,
      exitTime: p.exitTime,
      waitingTime: p.waitingTime,
      turnAroundTime: p.turnAroundTime,
    };
  });

  const totalWaitingTime = processMap.reduce((sum, p) => sum + Number(p.waitingTime), 0);
  const totalTurnAroundTime = processMap.reduce((sum, p) => sum + Number(p.turnAroundTime), 0);
  const totalRunningTime = time;

  return {
    avgTurnAroundTime: totalTurnAroundTime / n,
    avgWaitingTime: totalWaitingTime / n,
    ganttData: ganttWithFinals,
    totalRunningTime,
    totalIdleTime,
  };
}

// Round Robin Algorithm
export function rr(processes, timeQuantum) {
  // Create a deep copy of processes and ensure numeric values
  const processesCopy = processes.map(proc => ({
    ...proc, 
    burstTime: Number(proc.burstTime),
    remainingTime: Number(proc.burstTime),  // Add remaining time for tracking
    arrivalTime: Number(proc.arrivalTime),
    priority: Number(proc.priority || 0) // Ensure priority is numeric if present
  }));
  
  // Sort by arrival time initially
  processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  let currentTime = 0;
  let ganttData = [];
  let queue = [];
  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let totalIdleTime = 0;
  
  // Track completion and metrics for each process
  const completionData = processesCopy.map(proc => ({
    id: proc.id,
    completed: false,
    waitingTime: 0,
    turnAroundTime: 0,
    exitTime: 0,
    lastExecutionEnd: proc.arrivalTime  // Track when process was last executed
  }));
  
  // Continue until all processes are completed
  while (true) {
    // Check for new arrivals and add to queue
    for (let i = 0; i < processesCopy.length; i++) {
      if (processesCopy[i].arrivalTime <= currentTime && 
          processesCopy[i].remainingTime > 0 && 
          !queue.includes(i)) {
        queue.push(i);
      }
    }
    
    // If queue is empty but processes remain, advance time to next arrival
    if (queue.length === 0) {
      // Check if all processes are completed
      if (completionData.every(proc => proc.completed)) {
        break;
      }
      
      // Find next arrival time
      let nextArrival = Number.MAX_VALUE;
      for (let i = 0; i < processesCopy.length; i++) {
        if (processesCopy[i].remainingTime > 0 && processesCopy[i].arrivalTime > currentTime) {
          nextArrival = Math.min(nextArrival, processesCopy[i].arrivalTime);
        }
      }
      
      // Add idle time to Gantt chart
      ganttData.push({
        id: 'idle-' + currentTime,
        name: 'Idle',
        arrivalTime: currentTime,
        burstTime: Number(nextArrival - currentTime),
        priority: 0,
        color: '#f0f0f0', // Light gray for idle time
        idle: true,
        startTime: currentTime,
        endTime: nextArrival,
        exitTime: nextArrival,
        waitingTime: 0,
        turnAroundTime: 0
      });
      
      totalIdleTime += Number(nextArrival - currentTime);
      currentTime = nextArrival;
      continue;
    }
    
    // Get next process from queue
    const processIndex = queue.shift();
    const process = processesCopy[processIndex];
    
    // Determine execution time for this quantum
    const executionTime = Math.min(timeQuantum, process.remainingTime);
    
    // Calculate start and end time for this execution
    const startTime = currentTime;
    const endTime = currentTime + executionTime;
    
    // Update waiting time for this process (time since last execution or arrival)
    const waitTimeThisRound = Number(startTime - completionData[processIndex].lastExecutionEnd);
    completionData[processIndex].waitingTime += waitTimeThisRound;
    
    // Add to Gantt chart
    ganttData.push({
      ...process,
      idle: false,
      burstTime: executionTime,  // For this round only
      startTime,
      endTime,
      waitingTime: waitTimeThisRound,  // For this round only
      turnAroundTime: 0  // Will be calculated at completion
    });
    
    // Update process remaining time
    process.remainingTime = Number(process.remainingTime) - executionTime;
    
    // Update current time
    currentTime = endTime;
    completionData[processIndex].lastExecutionEnd = endTime;
    
    // Check if process is completed
    if (process.remainingTime <= 0) {
      completionData[processIndex].completed = true;
      completionData[processIndex].exitTime = endTime;
      completionData[processIndex].turnAroundTime = Number(endTime - process.arrivalTime);
      
      // Update totals
      totalWaitingTime += Number(completionData[processIndex].waitingTime);
      totalTurnAroundTime += Number(completionData[processIndex].turnAroundTime);
    } else {
      // Process still has remaining time, add back to queue
      // But first check for other arrivals with higher priority
      for (let i = 0; i < processesCopy.length; i++) {
        if (processesCopy[i].arrivalTime <= currentTime && 
            processesCopy[i].remainingTime > 0 && 
            !queue.includes(i) && 
            i !== processIndex) {
          queue.push(i);
        }
      }
      queue.push(processIndex);  // Re-add current process to end of queue
    }
  }
  
  // Augment Gantt data with final metrics for completed processes
  for (let i = 0; i < ganttData.length; i++) {
    if (!ganttData[i].idle) {
      const procIndex = processesCopy.findIndex(p => p.id === ganttData[i].id);
      if (procIndex >= 0) {
        ganttData[i].exitTime = completionData[procIndex].exitTime;
        if (ganttData[i].endTime === completionData[procIndex].exitTime) {
          // Only the final execution segment shows the full turnaround time
          ganttData[i].turnAroundTime = completionData[procIndex].turnAroundTime;
        }
      }
    }
  }
  
  // Calculate averages
  const avgWaitingTime = totalWaitingTime / processesCopy.length;
  const avgTurnAroundTime = totalTurnAroundTime / processesCopy.length;
  const totalRunningTime = currentTime;
  
  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

//Preemptive Priority Scheduling Algorithm
export function pp(processes) {
  // Create a deep copy of processes and ensure numeric values
  const processesCopy = processes.map(proc => ({
    ...proc, 
    burstTime: Number(proc.burstTime),
    remainingTime: Number(proc.burstTime),  // Add remaining time for tracking
    arrivalTime: Number(proc.arrivalTime),
    priority: Number(proc.priority || 0) // Ensure priority is numeric if present
  }));
  
  // Sort initially by arrival time
  processesCopy.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  let currentTime = 0;
  let ganttData = [];
  let totalWaitingTime = 0;
  let totalTurnAroundTime = 0;
  let totalIdleTime = 0;
  let completedProcesses = 0;
  const totalProcesses = processesCopy.length;
  
  // Track process completion and metrics
  const completionData = processesCopy.map(proc => ({
    id: proc.id,
    completed: false,
    exitTime: 0,
    waitingTime: 0,
    turnAroundTime: 0,
    lastTimeChecked: Number(proc.arrivalTime)  // Track when we last checked this process
  }));
  
  // Track the currently running process
  let currentProcess = -1;
  let currentProcessStartTime = 0;
  
  // Continue until all processes are completed
  while (completedProcesses < totalProcesses) {
    // Find the highest priority process (lowest priority number) among available processes
    let highestPriorityIndex = -1;
    let highestPriority = Number.MAX_VALUE;
    
    for (let i = 0; i < totalProcesses; i++) {
      // Process must have arrived, not be completed, and have remaining time
      if (!completionData[i].completed && 
          processesCopy[i].arrivalTime <= currentTime && 
          processesCopy[i].remainingTime > 0) {
        
        // Lower priority number means higher priority
        if (processesCopy[i].priority < highestPriority) {
          highestPriorityIndex = i;
          highestPriority = processesCopy[i].priority;
        }
      }
    }
    
    // If no process is available, add idle time
    if (highestPriorityIndex === -1) {
      // Find the next arrival time
      let nextArrival = Number.MAX_VALUE;
      
      for (let i = 0; i < totalProcesses; i++) {
        if (!completionData[i].completed && 
            processesCopy[i].arrivalTime > currentTime && 
            processesCopy[i].arrivalTime < nextArrival) {
          nextArrival = processesCopy[i].arrivalTime;
        }
      }
      
      // Add idle time to Gantt chart
      if (nextArrival !== Number.MAX_VALUE) {
        ganttData.push({
          id: 'idle-' + currentTime,
          name: 'Idle',
          arrivalTime: currentTime,
          burstTime: Number(nextArrival - currentTime),
          priority: 0,
          color: '#f0f0f0', // Light gray for idle time
          idle: true,
          startTime: currentTime,
          endTime: nextArrival,
          exitTime: nextArrival,
          waitingTime: 0,
          turnAroundTime: 0
        });
        
        totalIdleTime += Number(nextArrival - currentTime);
        currentTime = nextArrival;
      } else {
        // This shouldn't happen, but just in case
        break;
      }
      
      // Reset current process tracking
      currentProcess = -1;
    } 
    else {
      // If we're switching processes, record the current one in the Gantt chart
      if (currentProcess !== highestPriorityIndex && currentProcess !== -1) {
        const duration = Number(currentTime - currentProcessStartTime);
        
        if (duration > 0) {
          // Add the previous process execution to the Gantt chart
          ganttData.push({
            ...processesCopy[currentProcess],
            burstTime: duration,  // Just this execution segment
            idle: false,
            startTime: currentProcessStartTime,
            endTime: currentTime,
            exitTime: 0,  // Will be updated at completion
            waitingTime: 0,  // Will be calculated at completion
            turnAroundTime: 0  // Will be calculated at completion
          });
        }
      }
      
      // Check if we're starting a new process or continuing
      if (currentProcess !== highestPriorityIndex) {
        currentProcess = highestPriorityIndex;
        currentProcessStartTime = currentTime;
      }
      
      // Determine how long this process will run before we need to check for preemption
      let runUntil = Number(currentTime + processesCopy[highestPriorityIndex].remainingTime);
      
      // Check for any process arrivals that might preempt this one
      for (let i = 0; i < totalProcesses; i++) {
        if (!completionData[i].completed && 
            processesCopy[i].arrivalTime > currentTime && 
            processesCopy[i].arrivalTime < runUntil && 
            processesCopy[i].priority < processesCopy[highestPriorityIndex].priority) {
          runUntil = processesCopy[i].arrivalTime;
        }
      }
      
      // Execute the process until either completion or preemption
      const executionTime = Number(runUntil - currentTime);
      processesCopy[highestPriorityIndex].remainingTime -= executionTime;
      
      // Update waiting time for all ready but not running processes
      for (let i = 0; i < totalProcesses; i++) {
        if (!completionData[i].completed && 
            i !== highestPriorityIndex && 
            processesCopy[i].arrivalTime <= currentTime) {
          completionData[i].waitingTime += executionTime;
        }
      }
      
      // Check if the process completed
      if (processesCopy[highestPriorityIndex].remainingTime <= 0) {
        // Add the process execution to Gantt chart
        ganttData.push({
          ...processesCopy[highestPriorityIndex],
          burstTime: executionTime,
          idle: false,
          startTime: currentTime,
          endTime: runUntil,
          exitTime: runUntil,
          waitingTime: 0, // Placeholder
          turnAroundTime: 0 // Placeholder
        });
        
        // Mark as completed and calculate final metrics
        completionData[highestPriorityIndex].completed = true;
        completionData[highestPriorityIndex].exitTime = runUntil;
        
        // Calculate turn around time
        const turnAroundTime = Number(runUntil - processesCopy[highestPriorityIndex].arrivalTime);
        completionData[highestPriorityIndex].turnAroundTime = turnAroundTime;
        
        // Calculate waiting time (turnaround time - burst time)
        const waitingTime = Number(turnAroundTime - processesCopy[highestPriorityIndex].burstTime);
        completionData[highestPriorityIndex].waitingTime = waitingTime;
        
        // Add to totals
        totalWaitingTime += waitingTime;
        totalTurnAroundTime += turnAroundTime;
        
        completedProcesses++;
        
        // Reset current process tracking
        currentProcess = -1;
      } 
      else if (runUntil < Number(currentTime + processesCopy[highestPriorityIndex].remainingTime + executionTime)) {
        // Process was preempted, add to Gantt chart
        ganttData.push({
          ...processesCopy[highestPriorityIndex],
          burstTime: executionTime,
          idle: false,
          startTime: currentTime,
          endTime: runUntil,
          exitTime: 0, // Will be updated at completion
          waitingTime: 0, // Placeholder
          turnAroundTime: 0 // Placeholder
        });
      }
      
      // Update current time
      currentTime = runUntil;
    }
  }
  
  // Update Gantt data with final metrics for completed processes
  for (let i = 0; i < ganttData.length; i++) {
    if (!ganttData[i].idle) {
      const procIndex = processesCopy.findIndex(p => p.id === ganttData[i].id);
      if (procIndex >= 0) {
        // Only the final segment gets the exit time
        if (ganttData[i].endTime === completionData[procIndex].exitTime) {
          ganttData[i].exitTime = completionData[procIndex].exitTime;
          ganttData[i].waitingTime = completionData[procIndex].waitingTime;
          ganttData[i].turnAroundTime = completionData[procIndex].turnAroundTime;
        }
      }
    }
  }
  
  // Calculate averages
  const avgWaitingTime = totalWaitingTime / totalProcesses;
  const avgTurnAroundTime = totalTurnAroundTime / totalProcesses;
  const totalRunningTime = currentTime;
  
  return {
    avgTurnAroundTime,
    avgWaitingTime,
    ganttData,
    totalRunningTime,
    totalIdleTime,
  };
}

