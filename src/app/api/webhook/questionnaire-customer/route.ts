import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('reservationId');

    if (!reservationId) {
        return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 });
    }

    const webhookUrl = N8N_CONFIG.QUESTIONNAIRE_CUSTOMER_WEBHOOK_URL;

    if (webhookUrl) {
        try {
            // Send GET request to n8n with reservationId as a query param
            const urlWithParams = new URL(webhookUrl);
            urlWithParams.searchParams.append('reservationId', reservationId);

            const n8nResponse = await fetch(urlWithParams.toString(), { next: { revalidate: 0 } });

            if (n8nResponse.ok) {
                const data = await n8nResponse.json();
                return NextResponse.json(data);
            }
            throw new Error(`n8n responded with status: ${n8nResponse.status}`);
        } catch (error) {
            console.error("n8n Webhook Error (Questionnaire Fetch):", error);
            // Fallthrough to mock data below
        }
    }

    // モックデータ (n8n非連動時)
    // 擬似的なフェッチ遅延
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
        name: "自動紐付けテスト（モック）",
        phone: "090-0000-0000",
        dob: "1980-01-01"
    });
}
