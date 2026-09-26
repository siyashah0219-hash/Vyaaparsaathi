import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { actionTasks, toggleTask, profile, setActiveTab } = useApp();

  const completedCount = actionTasks.filter((t) => t.completed).length;
  const totalCount = actionTasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const phases = ['Phase 1: Days 1–30', 'Phase 2: Days 31–60', 'Phase 3: Days 61–90'] as const;

  return (
    <div className="space-y-4 px-3.5 pt-3 pb-24 animate-fade-in-up">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
              30-60-90 Day Roadmap
            </span>
            <h1 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              Execution Action Plan
            </h1>
            <p className="text-[11px] text-slate-500">
              Tap tasks to mark them complete as you set up your business.
            </p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/80 p-2.5 rounded-2xl text-center border border-emerald-200 dark:border-emerald-800 shrink-0">
            <span className="font-serif text-lg font-bold text-emerald-800 dark:text-emerald-300">
              {progressPercent}%
            </span>
            <span className="text-[9px] text-slate-500 block">
              {completedCount}/{totalCount} Done
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Phase Lists */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseTasks = actionTasks.filter((t) => t.phase === phase);
          return (
            <div key={phase} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Calendar className="h-4 w-4 text-amber-500" />
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100">
                  {phase}
                </h3>
              </div>

              <div className="space-y-2">
                {phaseTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`bg-white dark:bg-slate-900 rounded-2xl p-3.5 border transition-all cursor-pointer flex items-start gap-3 touch-bounce select-none ${
                      task.completed
                        ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-950/20 opacity-80'
                        : 'border-slate-200/80 dark:border-slate-800/80 shadow-xs'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </button>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-200 dark:border-blue-800">
                          {task.category}
                        </span>
                        {task.completed && (
                          <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300">
                            Completed ✓
                          </span>
                        )}
                      </div>

                      <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 leading-snug">
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
