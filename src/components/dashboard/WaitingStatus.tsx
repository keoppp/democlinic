'use client';

import { useEffect, useState, useCallback } from 'react';
import { Clock, Users, RefreshCw, HeartPulse } from 'lucide-react';

export default function WaitingStatus() {
    const [status, setStatus] = useState({
        available: false,
        waitTimeMinutes: '--',
        waitingCount: '--',
        statusMessage: 'データを取得しています...',
        lastUpdated: ''
    });
    const [loading, setLoading] = useState(true);

    const fetchStatus = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/waiting-status');
            if (res.ok) {
                const data = await res.json();
                if (data.available) {
                    setStatus({
                        available: true,
                        waitTimeMinutes: String(data.waitTimeMinutes ?? '--'),
                        waitingCount: String(data.waitingCount ?? '--'),
                        statusMessage: data.statusMessage || '現在、通常通りご案内しております。',
                        lastUpdated: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    });
                } else {
                    setStatus({
                        available: false,
                        waitTimeMinutes: '--',
                        waitingCount: '--',
                        statusMessage: data.statusMessage || '現在、待ち情報を取得できません。',
                        lastUpdated: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch waiting status', error);
            setStatus(prev => ({
                ...prev,
                available: false,
                statusMessage: '最新情報の取得に失敗しました。窓口までお尋ねください。'
            }));
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    return (
        <div className="w-full h-full p-6 md:p-8 relative overflow-hidden group">
            {/* Decorative pulse effect */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <HeartPulse className="w-64 h-64 -translate-y-12 translate-x-12" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
                <div>
                    <h2 className="text-2xl font-black flex items-center gap-3 text-slate-800">
                        <span className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.available ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${status.available ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        </span>
                        現在の診察状況
                    </h2>
                    <p className={`font-medium text-sm mt-2 flex items-center px-3 py-1.5 rounded-lg w-fit ${status.available ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                        {status.statusMessage}
                    </p>
                </div>
                <button
                    onClick={fetchStatus}
                    disabled={loading}
                    className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-800 px-4 py-2 rounded-full transition-all border border-slate-200 shadow-sm"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-emerald-500' : ''}`} />
                    <span>{status.lastUpdated ? `${status.lastUpdated} 更新` : '更新中...'}</span>
                </button>
            </div>

            {status.available ? (
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl p-6 md:p-8 border border-emerald-100/60 flex flex-col items-center justify-center text-center transition-all hover:shadow-md">
                        <div className="flex items-center justify-center p-3 bg-white rounded-full text-emerald-600 mb-5 shadow-sm border border-emerald-50">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div className="text-emerald-800/70 font-bold text-sm mb-1 tracking-wider">待ち時間の目安</div>
                        <div className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
                            <span className="font-mono text-transparent bg-clip-text bg-gradient-to-tr from-emerald-600 to-teal-800">{status.waitTimeMinutes}</span>
                            <span className="text-2xl text-slate-500 ml-2 font-bold">分</span>
                        </div>
                    </div>

                    <div className="bg-slate-50/80 rounded-2xl p-6 md:p-8 border border-slate-200/60 flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:bg-white">
                        <div className="flex items-center justify-center p-3 bg-white rounded-full text-slate-600 mb-5 shadow-sm border border-slate-100">
                            <Users className="h-6 w-6" />
                        </div>
                        <div className="text-slate-500 font-bold text-sm mb-1 tracking-wider">現在のご案内人数</div>
                        <div className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
                            <span className="font-mono text-slate-700">{status.waitingCount}</span>
                            <span className="text-2xl text-slate-500 ml-2 font-bold">名</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
                    <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 w-full">
                        <p className="text-amber-800 font-bold text-base mb-2">待ち情報を表示できません</p>
                        <p className="text-amber-700 text-sm">受付窓口にてお尋ねいただくか、しばらくしてから再度お試しください。</p>
                    </div>
                </div>
            )}
        </div>
    );
}

