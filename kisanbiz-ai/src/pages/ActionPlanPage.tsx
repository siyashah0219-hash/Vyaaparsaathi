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
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-800 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task Roadmap by Phase */}
      <div className="space-y-8">
        {phases.map((phase) => {
          const phaseTasks = actionTasks.filter((t) => t.phase === phase);
          return (
            <div key={phase} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-xs shadow-xs">
                  <Calendar className="h-4 w-4" />
                </div>
                <h2 className="font-serif text-xl font-bold text-emerald-950">
                  {phase}
                </h2>
              </div>

              <div className="space-y-3">
                {phaseTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex items-start gap-4 select-none ${
                      task.completed
                        ? 'border-emerald-300 bg-emerald-50/40 opacity-90'
                        : 'border-emerald-200 hover:border-emerald-400 shadow-2xs'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-emerald-700">
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                    </button>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            task.category === 'Legal & Bank'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : task.category === 'Operations'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : task.category === 'Marketing'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {task.category}
                        </span>

                        {task.completed && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            Completed
                          </span>
                        )}
                      </div>

                      <h3
                        className={`font-serif text-base font-bold ${
                          task.completed ? 'line-through text-gray-500' : 'text-emerald-950'
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed">
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
