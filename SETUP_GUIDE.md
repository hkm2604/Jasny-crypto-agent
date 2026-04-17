# 🚀 Crypto Trading Agent: Setup Guide

Selamat datang ke projek **Crypto Trading Agent**. Panduan ini akan membantu anda memasang dan mengkonfigurasi ejen trading anda untuk digunakan bersama OpenCode atau Gemini CLI.

---

## 📋 Langkah 1: Dapatkan Kod Projek

Pilih salah satu daripada dua kaedah di bawah untuk memasukkan fail projek ke dalam komputer anda.

### Pilihan A: Menggunakan GitHub (Disyorkan)
Sesuai jika anda ingin sentiasa mengemaskini kod (sync) antara pelbagai PC.
1. Buka terminal dan jalankan:
   ```bash
   git clone https://github.com/hkm2604/Jasny-crypto-agent.git
   cd Jasny-crypto-agent
   ```

### Pilihan B: Salinan Manual (Copy-Paste)
Sesuai untuk pemasangan pantas tanpa akaun GitHub.
1. Salin folder `crypto-agent` ke PC baru anda.
2. **Nota**: Pastikan anda tidak menyalin folder `node_modules/` atau `build/` untuk mengelakkan ralat versi.

### Pilihan C: Pemasangan Pantas via Curl
Sesuai untuk Linux/macOS yang mempunyai `curl`. Jika anda sudah berada di dalam folder projek:
```bash
curl -sSL https://raw.githubusercontent.com/hkm2604/Jasny-crypto-agent/main/setup.sh | bash
```
*(Pastikan anda mempunyai akses internet)*

---

## 🛠️ Langkah 2: Pemasangan (Installation)

Setelah fail berada di PC anda, jalankan arahan berikut di dalam folder projek:

1. **Pasang Library**:
   ```bash
   npm install
   ```
2. **Bina (Build) Projek**:
   ```bash
   npm run build
   ```
3. **Pautan Global (Optional)**:
   Untuk membolehkan sistem mengenali arahan `crypto-trading-agent` di mana-mana:
   ```bash
   sudo npm link
   ```

---

## ⚙️ Langkah 3: Konfigurasi Persekitaran

Ejen ini memerlukan sambungan ke bursa (Bybit) untuk berfungsi.

1. Cari fail `.env.example` dan salin kepada `.env`:
   ```bash
   cp .env.example .env
   ```
2. Buka `.env` dan masukkan API Key anda:
   ```text
   BYBIT_API_KEY=api_key_anda_di_sini
   BYBIT_SECRET=secret_key_anda_di_sini
   TRADING_MODE=paper
   ```
   > [!IMPORTANT]
   > Pastikan `TRADING_MODE` kekal `paper` untuk tujuan ujian. Tukar kepada `live` hanya apabila sudah bersedia.

---

## 🤖 Langkah 4: Integrasi AI (OpenCode / Gemini CLI)

Sekarang, beritahu AI anda bagaimana untuk menggunakan ejen ini sebagai MCP Server.

### Untuk OpenCode (`opencode.json`):
Tambah konfigurasi ini:
```json
{
  "mcp": {
    "crypto-trading": "npx -y crypto-trading-agent"
  }
}
```

### Untuk Gemini CLI (`~/.gemini/settings.json`):
```json
{
  "mcpServers": {
    "crypto-trading": {
      "command": "npx",
      "args": ["-y", "crypto-trading-agent"]
    }
  }
}
```

---

## ✅ Langkah 5: Pengesahan (Verification)

Cuba tanya AI anda soalan berikut untuk memastikan semuanya berfungsi:
- "Apa harga semasa BTC/USDT?"
- "Berikan analisis RSI untuk ETH/USDT."
- "Gunakan strategi const-3 untuk mencari peluang trade."

---

**Setup Anda Selesai!** Selamat berdagang secara bijak. 📈
