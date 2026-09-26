import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export const ActionPlanPage: React.FC = () => {
  const { actionTasks, toggleTask, profile, setActiveTab } = useApp();

  const completedCount = actionTasks.filter((t) => t.completed).length;
  const totalCount = actionTasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const phases = ['Phase 1: Days 1–30', 'Phase 2: Days 31–60', 'Phase 3: Days 61–90'] as const;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              30-60-90 Day Execution Roadmap
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
              Action Plan for {profile.name}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Check off tasks as you complete them to track your enterprise readiness in <strong>{profile.district}, {profile.state}</strong>.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center sm:text-right shrink-0">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Roadmap Progress</span>
            <span className="font-serif text-2xl font-bold text-emerald-950">
              {progressPercent}%
            </span>
            <span className="text-[11px] text-emerald-700 block font-medium">
              {completedCount} of {totalCount} Tasks Done
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 pt-2">
          <div className="h-3.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-700 transition-all duration-700 ease-out rounded-full shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task Roadmap by Phase (3-Column Kanban Layout on Widescreen) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {phases.map((phase) => {
          const phaseTasks = actionTasks.filter((t) => t.phase === phase);
          return (
            <div key={phase} className="bg-slate-50/60 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col transition-colors">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="h-8 w-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-emerald-950 dark:text-slate-100">
                    {phase}
                  </h2>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {phaseTasks.filter(t => t.completed).length} of {phaseTasks.length} Completed
                  </span>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                {phaseTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`bg-white dark:bg-slate-800 rounded-2xl p-4 border transition-all duration-200 hover-card-lift cursor-pointer flex items-start gap-3 select-none active:scale-98 ${
                      task.completed
                        ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-950/20 opacity-85'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 shadow-2xs'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400 transition-transform active:scale-90">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </button>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            task.category === 'Legal & Bank'
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                              : task.category === 'Operations'
                              ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                              : task.category === 'Marketing'
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          }`}
                        >
                          {task.category}
                        </span>

                        {task.completed && (
                          <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                            Done
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-serif text-sm font-bold ${
                          task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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

      {/* Navigation CTAs Bar */}
      <div className="bg-emerald-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl font-bold text-white">
            Need Expert Review on Your Action Plan?
          </h4>
          <p className="text-emerald-200 text-xs mt-1">
            Book a 1-on-1 expert consultation session with an agri-business specialist.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('expert-session')}
          className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md whitespace-nowrap"
        >
          <Users className="h-4 w-4" /> Book Expert Session <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
};
