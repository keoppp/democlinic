import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function GET() {
    const webhookUrl = N8N_CONFIG.WAITING_STATUS_WEBHOOK_URL;

    if (webhookUrl) {
        try {
            const n8nResponse = await fetch(webhookUrl, { next: { revalidate: 0 } });
            if (n8nResponse.ok) {
                const data = await n8nResponse.json();
                return NextResponse.json({ available: true, ...data });
            }
        } catch (error) {
            console.error("n8n Webhook Error (Waiting Status):", error);
        }
    }

    // n8n未応答・未設定時はデータなしを返す（モックデータは表示しない）
    return NextResponse.json({
        available: false,
        statusMessage: '現在、待ち情報を取得できません。受付窓口にお尋ねください。'
    });
}
