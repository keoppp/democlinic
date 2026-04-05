import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function POST(request: Request) {
  const webhookUrl = N8N_CONFIG.RESERVATION_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { status: 'error', message: 'Webhook URLが未設定です。' },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        type: 'INITIAL_VISIT',
        timestamp: new Date().toISOString()
      })
    });

    // n8n のレスポンスをテキストとして取得し、そのまま返す
    const rawText = await n8nResponse.text();
    console.log('[API /reservation] n8n HTTP:', n8nResponse.status, 'RawBody:', rawText);

    // n8n のレスポンスをそのままフロントエンドに中継する（加工しない）
    return new Response(rawText, {
      status: 200, // フロントエンドには常に200で返す（エラー判定はbody内のstatusフィールドで行う）
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('[API /reservation] Error:', error?.message || error);
    return NextResponse.json(
      { status: 'error', message: '通信エラー: ' + (error?.message || '不明なエラー') },
      { status: 200 } // フロントエンドがcatchに落ちないよう200で返す
    );
  }
}
