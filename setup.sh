#!/bin/bash

# 🚀 Crypto Trading Agent Setup Script
# Digunakan untuk pemasangan pantas via curl

set -e

echo "🔍 Menyemak persekitaran..."

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak dijumpai. Sila pasang Node.js terlebih dahulu."
    exit 1
fi

# 1.5. Clone repository if package.json does not exist
if [ ! -f "package.json" ]; then
    echo "📥 Memuat turun projek dari GitHub..."
    if [ -d "crypto-agent" ]; then
        echo "⚠️  Folder 'crypto-agent' sudah wujud. Sila padam atau tukar nama folder tersebut dahulu."
        exit 1
    fi
    git clone https://github.com/hkm2604/Jasny-crypto-agent.git crypto-agent
    cd crypto-agent
fi

# 2. Install dependencies
echo "📦 Memasang dependensi..."
npm install

# 3. Build project
echo "🏗️ Membina projek..."
npm run build

# 4. Setup .env
if [ ! -f .env ]; then
    echo "⚙️ Mencipta fail .env..."
    cp .env.example .env
    echo "✅ Fail .env dicipta. Sila masukkan API Key anda nanti."
else
    echo "ℹ️ Fail .env sudah wujud. Melangkau..."
fi

# 5. NPM Link
echo "🔗 Melakukan pautan global (npm link)..."
sudo npm link || echo "⚠️ Gagal melakukan sudo npm link. Anda mungkin perlu jalankannya secara manual."

echo ""
echo "✨ Pemasangan selesai!"
echo "Sila kemaskini fail .env dengan API Key anda, kemudian kemaskini opencode.json anda."
