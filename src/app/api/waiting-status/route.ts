import { NextResponse } from 'next/server';
import { N8N_CONFIG } from '@/config/clinic-data';

export async function GET() {
    // ① 設定ファイルから n8n Webhook URL を取得して使用するロジック
    const webhookUrl = N8N_CONFIG.WAITING_STATUS_WEBHOOK_URL;

    if (webhookUrl) {
        try {
            // 実際の実装パターン (n8nがある場合)
            const n8nResponse = await fetch(webhookUrl, { next: { revalidate: 0 } });
            if (n8nResponse.ok) {
                const data = await n8nResponse.json();
                return NextResponse.json(data);
            }
        } catch (error) {
            console.error("n8n Webhook Error (Waiting Status):", error);
            // エラー時はフェールセーフ稼働 (下部のモックデータにフォールバック)
        }
    }

    // ② n8n URLが設定されていない、または通信エラー時のモックデータ (デモ用)
    const randomWait = Math.floor(Math.random() * 5) * 5 + 10;
    const randomCount = Math.floor(randomWait / 4);

    // ユーザー要件追加: ダッシュボードで表示する「気配り」メッセージ
    let statusMessage = "現在、診察はスムーズに進んでいます。";
    if (randomWait >= 25) {
        statusMessage = "急患対応のため少しお時間をいただいています。申し訳ございません。";
    } else if (randomWait >= 15) {
        statusMessage = "標準的な待ち時間となっております。";
    }

    return NextResponse.json({
        waitTimeMinutes: randomWait,
        waitingCount: randomCount,
        statusMessage: statusMessage
    });
}
