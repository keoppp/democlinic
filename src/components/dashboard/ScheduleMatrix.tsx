import { CLINIC_SCHEDULE_MATRIX } from '@/config/clinic-data';

export default function ScheduleMatrix() {
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden flex flex-col h-full">
            {/* Header Bar matching image design ( Sandy Gold ) */}
            <div className="bg-[#EADDB6] px-5 py-3.5 border-b-2 border-slate-800/10">
                <h3 className="font-bold text-slate-800 tracking-widest text-sm md:text-base">
                    {CLINIC_SCHEDULE_MATRIX.department}
                </h3>
            </div>

            {/* Table Container */}
            <div className="p-4 md:p-6 overflow-x-auto flex-1 flex items-center bg-white">
                <table className="w-full text-center border-collapse text-sm min-w-[500px] border border-slate-200 rounded-xl overflow-hidden">
                    <thead>
                        <tr className="bg-white">
                            <th className="border border-slate-200 p-3 font-medium text-slate-500 w-[15%]"></th>
                            <th className="border border-slate-200 p-3 font-medium text-slate-600 bg-slate-50/50">診療時間</th>
                            {CLINIC_SCHEDULE_MATRIX.days.map((day, idx) => (
                                <th key={idx} className="border border-slate-200 p-3 font-medium text-slate-600 w-[8%]">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {CLINIC_SCHEDULE_MATRIX.rows.map((row, idx) => (
                            <tr key={idx} className="bg-white hover:bg-slate-50/30 transition-colors">
                                <td className="border border-slate-200 p-4 font-bold text-slate-700 bg-slate-50/50 tracking-widest">{row.name}</td>
                                <td className="border border-slate-200 p-4 font-mono text-slate-600 font-medium tracking-wider">{row.time}</td>
                                {row.schedule.map((mark, i) => (
                                    <td key={i} className={`border border-slate-200 p-4 text-xl font-bold ${mark === '〇' ? 'text-slate-800' : 'text-slate-300'}`}>
                                        {mark}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
