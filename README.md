# 🤖 Jasny Crypto Trading Agent

Selamat datang ke **Jasny Crypto Agent**! Projek ini merupakan sebuah *Modular Crypto Trading Assistant* berasaskan Model Context Protocol (MCP) yang direka untuk kegunaan peribadi mahupun integrasi ke dalam sistem AI yang menyokong MCP (contohnya OpenCode atau Gemini CLI).

## 🚀 Pemasangan Pantas (Quick Start)

Untuk memasang ejen ini dengan pantas tanpa perlu *clone* dan *install* secara manual, anda boleh jalankan kod ini di terminal (Mac/Linux):

```bash
curl -sSL https://raw.githubusercontent.com/hkm2604/Jasny-crypto-agent/main/setup.sh | bash
```

> **Nota 🔑**: Selepas pemasangan pantas ini berjaya, skrip ini akan menyambung arahan node secara rasmi ke PC anda. Sila masukkan API Key Bybit ke dalam fail `.env` yang bakal dihasilkan sebelum mula menggunakan keupayaan *Live Trading*.

## 📘 Panduan Lanjut

Masih keliru atau inginkan pasang ejen ini secara berasingan/manual menggunakan GitHub? Jangan risau, kami ada sediakan **[Setup Guide Penuh](SETUP_GUIDE.md)** yang lebih menyeluruh. Anda juga boleh menjenguk di **`AGENTS.md`** untuk gambaran ringkas AI Agent yang dilaraskan.

---

## ✨ Ciri-Ciri Utama

- 🔗 **Integrasi MCP Terbina**: Memeriksa harga semasa, rekod data bersejarah (OHLCV), order book, serta menjalankan indikator teknikal (RSI, SMA, dll).
- 🎯 **Crypto-Skills Khusus**: Dilengkapi kemahiran teras seperti strategi `const-3` yang mengutamakan potensi keuntungan 3% dalam masa terdekat melalui analisis *behavior* pasaran kripto.
- 🛡️ **Keselamatan (Safety First)**: Ciri dagangan kertas (*paper trading*) terbina di mana ejen tidak akan melakukan dagangan sebenar secara fizikal jika tidak diarahkan dengan teliti, mengekalkan kawalan di tangan manusia.

## 🧠 Bagaimana Ejen Bekerja

Ejen ini tidak membuat dagangan (trade) secara melulu, sebaliknya ia beroperasi menggunakan **Workflow Analisis Berperingkat** ("const-3") untuk membuat keputusan terarah. Ia membaca data mentah dari bursa secara *real-time* dan memprosesnya secara objektif:

### ⚙️ Aliran Kerja (Workflow)
1. 🌍 **Pemerhatian Pasaran (Makro)**: Melihat pergerakan harga berita umum selama 7 hari ke belakang bagi mengesan risiko *Extreme Fear*. Jika keadaan berbahaya, ejen dilarang untuk *trade*.
2. 📊 **Analisis Kelakuan (30 Hari)**: Mengumpul data perubahan harga, volum, kemerahan lilin (OHLCV) dan volatiliti untuk mencari syiling kripto yang mempunyai sejarah corak potensi untung 3% tanpa risiko yang tinggi.
3. 📰 **Tapisan Sentimen (Mikro)**: Hanya untuk 3 syiling teratas ("Top 3"), ejen akan menyemak sentimen berita berkaitan syiling tersebut untuk hari ini dan 3 hari ke belakang. Jika ada impak negatif kuat, projeksi itu akan terbatal.
4. 🏅 **Cadangan (Recommendation)**: Tapis syiling-syiling sehingga tertinggal syiling 'Pemenang Utama'.
5. 👤 **Human-In-The-Loop (Pilihan)**: Ejen akan berhenti dan membentangkan hasil (*Confirmation Gate*) kepada anda sebelum meneruskan apa-apa bentuk transaksi sekiranya mod *live-trading* dihidupkan.

### 💰 Apa Hasil Yang Anda Akan Dapat?
Setiap kali anda berinteraksi, ejen akan mengembalikan:
- 📝 Laporan rasionalisasi yang ringkas tentang mengapa koin tersebut dipilih.
- 🎯 **Harga Masuk (Entry Price)** di paras sokongan terbaik.
- 🟢 **Harga Take Profit (TP)** (+3% dari entry) dan 🔴 **Stop Loss (SL)** (-1%)
- ⏱️ Sasaran masa pelaburan selalunya dalam tempoh 2 hingga 3 hari (*Swing Trading* ringkas).

---

*Didorong dan direka dengan fokus pada pengurusan masa automatik dalam ekosistem kripto yang semakin rencam. Sentiasa pastikan anda lakukan semakan risiko (due diligence) sendiri.*
