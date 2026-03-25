'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Stethoscope, UserCircle, CalendarPlus, FileText, Settings, LogOut, Info } from 'lucide-react';
import { CLINIC_INFO } from '@/config/clinic-data';

const NAV_ITEMS = [
    { name: 'メインページ', path: '/', icon: LayoutDashboard },
    { name: '診療科・検査', path: '/clinic', icon: Stethoscope },
    { name: '医師紹介', path: '/doctor', icon: UserCircle },
    { name: 'オンライン初診予約', path: '/reservation', icon: CalendarPlus, highlight: true },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col hidden lg:flex border-r border-slate-800 shadow-2xl relative z-20">

            {/* Brand Header */}
            <div className="p-6 border-b border-white/10 shrink-0">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
                        A
                    </div>
                    <div>
                        <h1 className="text-white font-bold tracking-wider text-lg">
                            {CLINIC_INFO.name}
                        </h1>
                        <p className="text-[10px] text-teal-300 font-mono tracking-widest uppercase opacity-80">Medical Dashboard</p>
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Menu</p>

                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all font-medium text-sm ${isActive
                                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm'
                                : item.highlight
                                    ? 'bg-white/5 text-white hover:bg-teal-500/20 hover:text-teal-300 border border-white/5'
                                    : 'hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className={`h-5 w-5 ${isActive ? 'text-teal-400' : item.highlight ? 'text-teal-500' : 'text-slate-400'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Footer Area / System Status */}
            <div className="p-4 border-t border-white/10 shrink-0 bg-slate-900/50">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-mono text-slate-400 flex-1">System Online</span>
                </div>
                <div className="mt-3 px-3 text-[10px] text-slate-600 leading-tight">
                    Powered by n8n & SystemBook Framework.
                </div>
            </div>
        </div>
    );
}
