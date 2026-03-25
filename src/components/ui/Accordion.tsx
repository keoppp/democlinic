'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
    title: string;
    content: React.ReactNode;
    date?: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden transition-all duration-300 hover:border-primary-300 hover:shadow-sm">
                    <button
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 focus:outline-none"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                            {item.date && (
                                <span className="text-xs font-mono font-medium text-primary-700 bg-primary-100 px-2 py-1 rounded w-fit">
                                    {item.date}
                                </span>
                            )}
                            <span className={`${openIndex === index ? 'text-primary-700' : ''} transition-colors`}>{item.title}</span>
                        </div>
                        <div className={`p-1 rounded-full transition-colors ${openIndex === index ? 'bg-primary-100 text-primary-600' : 'bg-transparent text-slate-400'}`}>
                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                        </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-4 pt-0 md:pl-[6.5rem] text-slate-600 text-sm md:text-base leading-relaxed">
                            <div className="pt-2 border-t border-slate-200/60 mt-2 md:border-none md:mt-0 md:pt-0">
                                {item.content}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
