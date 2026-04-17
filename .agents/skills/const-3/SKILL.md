---
name: const-3
description: Strategi fokus profit 3% dalam 2-3 hari melalui analisis behavior 30 hari dan tapisan sentimen berita.
---
# Strategi "const-3"

Gunakan skill ini untuk mencari peluang trading yang memberikan **projeksi profit 3% dalam masa 2 ke 3 hari.**

## Protokol Kelakuan (WAJIB)
1. Sertakan **Progress Indicator** di baris pertama.
2. Tunjukkan **To-Do List** bagi fasa analisis ini.
3. **PENTING**: Sebelum memulakan Fasa 1, minta pengesahan user untuk menggunakan strategi "const-3".

## Langkah Kerja (Internal Workflow)

### Fasa 1: Market Context (News Sweep - 7 Hari)
- Gunakan `fetch_news` untuk melihat berita pasaran crypto secara umum bagi 7 hari yang lepas.
- **Keputusan**: Jika pasaran dalam keadaan "Extreme Fear" atau ada berita makro yang sangat buruk, laporkan kepada user bahawa market terlalu bahaya untuk trade. Jika stabil, teruskan ke Fasa 2.

### Fasa 2: Pengumpulan Data & Analisis Behavior (30 Hari)
Bagi setiap coin yang diminta atau calon yang berpotensi:
1. Panggil `get_market_behavior` untuk mendapatkan data 30 hari (Price change, Average Volume, Volatility).
2. Panggil `get_ticker` untuk harga semasa.
3. Panggil `get_order_book` untuk melihat tekanan beli/jual terkini.
- **Definisi "Behavior" (Pattern Matching)**:
    1. **Identifikasi Sejarah**: Cari titik dalam masa 30 hari lepas di mana coin tersebut naik 3% atau lebih dalam tempoh 48 jam.
    2. **Bedah Siasat Corak**: Perhatikan keadaan Harga, Volum, Order Book, dan bentuk Candle 1-2 hari **sebelum** kenaikan itu berlaku.
    3. **Konsistensi**: Semakin kerap kenaikan 3% berlaku selepas corak yang sama, semakin "predictable" coin tersebut.
- **Kriteria "Berpotensi"**: Mencari coin yang **sedang membentuk corak** yang sama dengan corak sejarahnya yang pernah membuahkan hasil 3% sebelum ini.

### Fasa 3: Pemilihan Calon (Top 3)
- Listkan **3 coin paling berpotensi** berdasarkan unjuran kenaikan 3% dalam tempoh 2 hari akan datang. Berikan ulasan kenapa coin ini dipilih berdasarkan behavior 30 hari lepas.

### Fasa 4: Tapisan Sentimen (Sentimen Filtering - 3 Hari)
- Bagi Top 3 calon tadi, jalankan `fetch_news` khusus untuk setiap coin (Current Day + 3 Days back).
- **Tujuan**: Memastikan tiada berita negatif yang boleh membatalkan (invalidate) projeksi kita. Jika ada berita positif (supportive sentiment), coin tersebut menjadi **Pemenang Utama**.

### Fasa 5: Rekomendasi Akhir
- Beritahu User:
    - **Pemenang Utama**: Nama Coin.
    - **Harga Beli (Entry)**: Harga semasa atau harga di support level.
    - **Harga Take Profit (TP)**: Harga Entry + 3%.
    - **Tempoh Target**: 2 - 3 Hari.

## Arahan Penting
- Jadilah seorang penganalisis yang skeptikal (conservative).
- Jika tiada coin yang memenuhi kriteria, jangan paksa trade. Laporkan "No Trade".
