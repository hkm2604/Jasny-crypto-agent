# Project: Crypto Trading Agent

This project is an AI-powered crypto trading system. It includes an MCP server for exchange interaction and modular skills for trading logic.

## AI Agent Guidance
- **Primary Agent**: Please use the `/agent crypto-trader` for all trading tasks.
- **Tools**: All market data is provided via the `crypto-trading` MCP tools.
- **Skills**: Modular trading techniques are located in `.opencode/skills/`.

## Operational Commands
- **Build**: `npm run build`
- **Setup**: Follow `SETUP_GUIDE.md`
- **Test**: `node test-build.js`

## Safety Protocol
- All trades require manual confirmation unless the user explicitly enables autonomous mode.
- Market data is public, but portfolio data requires API keys in `.env`.
