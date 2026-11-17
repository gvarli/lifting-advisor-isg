'use client';

import React from 'react';
import { AiTaskMode } from '@/types/ai';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Compass, Camera, AlertOctagon, LineChart } from 'lucide-react';

interface TaskSelectorBarProps {
  activeTask: AiTaskMode;
  onSelectTask: (task: AiTaskMode) => void;
}

export const TaskSelectorBar: React.FC<TaskSelectorBarProps> = ({
  activeTask,
  onSelectTask,
}) => {
  const { locale } = useTranslation();

  const tasks = [
    {
      id: 'rigging_planner' as AiTaskMode,
      title: locale === 'tr' ? '1. Ekipman Seçimi & Planlama' : '1. Rigging Planner',
      desc: 'Yük parametrelerine göre sapan, mapa ve prosedür seçimi',
      icon: Compass,
    },
    {
      id: 'visual_defect_inspector' as AiTaskMode,
      title: locale === 'tr' ? '2. Görsel Hasar & Hurda Kararı' : '2. Visual Defect Vision',
      desc: 'Fotoğraftan tel kırığı, ezilme ve hurda kararı',
      icon: Camera,
    },
    {
      id: 'method_audit' as AiTaskMode,
      title: locale === 'tr' ? '3. Sapanlama Denetimi' : '3. Rigging Method Audit',
      desc: 'Mevcut yöntemdeki ölümcül hataların tespiti ve revize plan',
      icon: AlertOctagon,
    },
    {
      id: 'predictive_risk' as AiTaskMode,
      title: locale === 'tr' ? '4. Kestirimci Risk & Gizli Hata' : '4. Predictive Failure Risk',
      desc: 'Ortama göre hidrojen kırılganlığı ve gizli yorulma öngörüsü',
      icon: LineChart,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
      {tasks.map((task, idx) => {
        const Icon = task.icon;
        const isActive = activeTask === task.id;

        return (
          <button
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              isActive
                ? 'bg-purple-950/80 text-white border-purple-500 shadow-lg shadow-purple-500/10 font-bold'
                : 'bg-[#111827] text-slate-300 border-[#23314d] hover:border-slate-500 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-purple-300' : 'text-slate-400'}`}>
                GÖREV [0{idx + 1}]
              </span>
              <Icon className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
            <div className="text-xs font-bold leading-tight">{task.title}</div>
            <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{task.desc}</div>
          </button>
        );
      })}
    </div>
  );
};
