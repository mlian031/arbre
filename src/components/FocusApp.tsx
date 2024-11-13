"use client";
import React, { useState, useEffect } from 'react';
import { Timer, Calendar, ChevronRight, ChevronLeft, Play, Pause, RefreshCcw, BarChart } from 'lucide-react';

const FocusApp = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const schedule = [
    { 
      time: "11:50 AM - 12:20 PM", 
      title: "Breakfast + Double Espresso", 
      type: "break", 
      notes: "High-protein breakfast + double espresso. Review study outline while eating." 
    },
    { 
      time: "12:20 PM - 1:30 PM", 
      title: "Linear Algebra: Ch.8 & Ch.9 Foundations", 
      type: "study", 
      notes: "Linear Independence, Spanning Sets (Ch.8) → Basis and Dimension (Ch.9). Focus on connecting concepts." 
    },
    { 
      time: "1:30 PM - 2:15 PM", 
      title: "Lunch Break + Walk", 
      type: "break", 
      notes: "Protein-rich lunch, 15-min walk. Quick review of morning concepts during walk." 
    },
    { 
      time: "2:15 PM - 2:30 PM", 
      title: "Americano + Chapter Review", 
      type: "break", 
      notes: "Second coffee (Americano) while reviewing next chapters' objectives" 
    },
    { 
      time: "2:30 PM - 4:00 PM", 
      title: "Linear Algebra: Ch.10 Deep Dive", 
      type: "study", 
      notes: "Dimension Theorems + Linear Systems of Equations. Create concept map linking theorems." 
    },
    { 
      time: "4:00 PM - 4:15 PM", 
      title: "Active Break + Snack", 
      type: "break", 
      notes: "Nuts/fruit + 5-min stretching. Recite key theorems learned." 
    },
    { 
      time: "4:15 PM - 5:45 PM", 
      title: "Microeconomics: Ch.5 & Ch.6", 
      type: "study", 
      notes: "Efficiency (Ch.5) → Government Intervention (Ch.6). Focus on market equilibrium concepts." 
    },
    { 
      time: "5:45 PM - 6:30 PM", 
      title: "Dinner Break + Light Review", 
      type: "break", 
      notes: "Balanced meal. Create quick summary of covered chapters." 
    },
    { 
      time: "6:30 PM - 8:00 PM", 
      title: "Linear Algebra: Ch.11-13 Systems", 
      type: "study", 
      notes: "Solving Linear Systems (Ch.11-12) → Applications (Ch.13). Practice problem progression." 
    },
    { 
      time: "8:00 PM - 8:15 PM", 
      title: "Herbal Tea + Movement Break", 
      type: "break", 
      notes: "Chamomile tea, stretching. Quick recall of solving methods." 
    },
    { 
      time: "8:15 PM - 9:45 PM", 
      title: "Microeconomics: Ch.7 & Ch.12", 
      type: "study", 
      notes: "Consumer Behavior (Ch.7) → Costs of Production (Ch.12). Focus on graphical analysis." 
    },
    { 
      time: "9:45 PM - 10:00 PM", 
      title: "Energy Break + Quick Review", 
      type: "break", 
      notes: "Light snack (banana/dates), water. Mind-map key relationships." 
    },
    { 
      time: "10:00 PM - 11:00 PM", 
      title: "Linear Algebra: Ch.14 + Practice", 
      type: "study", 
      notes: "Matrix Multiplication (Ch.14) + Comprehensive practice problems." 
    },
    { 
      time: "11:00 PM - 11:30 PM", 
      title: "Economics Final Review", 
      type: "review", 
      notes: "Practice problems combining all Econ concepts, focus on numerical applications." 
    },
    { 
      time: "11:30 PM - 12:00 AM", 
      title: "Final Integration Review", 
      type: "review", 
      notes: "Cross-subject connections, summarize key formulas and concepts for both subjects." 
    }
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isActive && time > 0) {
      intervalId = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setPomodorosCompleted(prev => prev + 1);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive, time]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = (): void => setIsActive(!isActive);
  const resetTimer = (): void => {
    setIsActive(false);
    setTime(25 * 60);
  };
  const nextTask = (): void => setCurrentTask(prev => Math.min(prev + 1, schedule.length - 1));
  const prevTask = (): void => setCurrentTask(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl font-medium text-gray-100">Nexus</h1>
            <span className="text-sm text-blue-400/80 font-medium px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">Beta</span>
          </div>
          <p className="text-sm text-gray-500">Cognitive-optimized study planning</p>
        </div>

        <div className="grid gap-6">
          <div className="bg-[#252525]/50 backdrop-blur-xl rounded-lg border border-gray-800/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <button onClick={prevTask} className="p-2 hover:bg-gray-700/30 rounded-md transition-colors">
                <ChevronLeft size={20} />
              </button>

              <div className="text-center">
                <div className="text-5xl font-mono mb-4 text-gray-100 font-light">
                  {formatTime(time)}
                </div>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={toggleTimer}
                    className="p-3 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                  >
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-3 rounded-md bg-gray-700/20 hover:bg-gray-700/30 text-gray-400 transition-colors"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </div>

              <button onClick={nextTask} className="p-2 hover:bg-gray-700/30 rounded-md transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-300 font-medium">
                {schedule[currentTask].title}
              </div>
              <div className="text-xs text-gray-500">
                {schedule[currentTask].notes}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#252525]/50 backdrop-blur-xl rounded-lg border border-gray-800/50 p-6">
              <h2 className="text-sm font-medium text-gray-300 mb-4 flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Schedule
              </h2>
              <div className="space-y-2">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md ${
                      index === currentTask
                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        : index < currentTask
                        ? 'bg-gray-800/20 text-gray-500'
                        : 'bg-gray-800/10'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-xs opacity-60">{item.time}</div>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gray-700/30">
                        {item.type}
                      </div>
                    </div>
                    <div className={`text-sm ${index === currentTask ? 'font-medium' : ''}`}>
                      {item.title}
                    </div>
                    {(index === currentTask || index === currentTask + 1) && (
                      <div className="mt-1 text-xs text-gray-500 border-t border-gray-700/50 pt-1">
                        {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#252525]/50 backdrop-blur-xl rounded-lg border border-gray-800/50 p-6">
              <h2 className="text-sm font-medium text-gray-300 mb-4 flex items-center">
                <BarChart className="mr-2 h-4 w-4" /> Progress
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Pomodoros Completed</span>
                  <span className="text-gray-300">{pomodorosCompleted}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Tasks Completed</span>
                  <span className="text-gray-300">{currentTask}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Remaining Tasks</span>
                  <span className="text-gray-300">{schedule.length - currentTask - 1}</span>
                </div>
                <div className="w-full bg-gray-800/30 rounded-full h-1 mt-6">
                  <div
                    className="bg-blue-500/50 rounded-full h-1 transition-all duration-500"
                    style={{ width: `${(currentTask / (schedule.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusApp;