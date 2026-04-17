---
name: paper-trading
description: Skill untuk merekod dan mengurus simulasi trading (Paper Trade) tanpa menggunakan modal sebenar.
---
# Skill Paper Trading Log

Gunakan skill ini apabila user meminta untuk merekod simulasi trade atau menjalankan latihan trading.

## Protokol Perekodan
Setiap kali satu cadangan trade dibuat dalam mod Paper Trade, anda **WAJIB** membina jurnal mengikut format di bawah:

### 📝 Template Jurnal Paper Trade
| Field | Maklumat |
| :--- | :--- |
| **Timestamp** | [Waktu & Tarikh Sekarang] |
| **Coin Pair** | [Nama Coin, cth: BTC/USDT] |
| **Harga Masuk (Entry)** | [Harga Semasa] |
| **Sebab Beli (Reason)** | [Sebab teknikal/news/behavior] |
| **Support Utama** | [Level support yang dikenal pasti] |
| **Stop Loss (1%)** | [Entry - 1%] |
| **Take Profit (3%)** | [Entry + 3%] |
| **Status** | ⏳ Pending (2-3 hari) |

## Arahan Tugasan
1. **Verifikasi**: Pastikan coin yang dipilih adalah Shariah-Compliant.
2. **Kekal Konsisten**: Gunakan Stop Loss 1% dan Take Profit 3% tanpa kompromi untuk konsistensi data.
3. **Simpan Rekod**: Jika user meminta, simpan rekod ini dalam fail `.opencode/paper_trade_logs.md` (jika anda mempunyai akses untuk menulis fail tersebut).

## Cara Guna
Ejen, apabila user berkata: *"Rekod paper trade untuk [Coin]"*, anda perlu panggil skill ini dan berikan output dalam format jadual di atas.
