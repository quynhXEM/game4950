(function () {
    const urlAction = {
        bet: "https://bet.nguyenxuanquynh1812nc1.workers.dev/",
        get_game: "https://get-game.nguyenxuanquynh1812nc1.workers.dev/",
        block: "https://block.nguyenxuanquynh1812nc1.workers.dev/",
        block_info: "https://block-info.nguyenxuanquynh1812nc1.workers.dev/"
    }
    const containerId = 'trading-cards-widget';
    let container = document.getElementById(containerId);
    if (!container) {
        console.error("Widget need 'trading-cards-widget' box id")
        return;
    }

    const slug = container.getAttribute("data-id") || null;
    if (slug) {
        data_game()
    } else {
        document.body.innerHTML = `
            <h1>No Data</h1>
        `
    }


    const color = {
        red: "#FF3F3F",
        green: "#00D335",
        blue: "#15B1FF",
        orange: "#FFC30F"
    }

    const network = [
        {
            "name": "Ethereum",
            "symbol": "ETH",
            "native_currency": "Ether",
            "chain_id": 1,
            "api_explorer": "https://api.etherscan.io/v2/api",
            "api_url": "https://mainnet.infura.io/v3",
            "scan_url": "https://etherscan.io",
            "rpc_url": "https://rpc.builder0x69.io"
        },
        {
            "name": "Binance Smart Chain",
            "symbol": "BNB",
            "native_currency": "BNB",
            "chain_id": 56,
            "api_url": "https://bsc-testnet.infura.io/v3",
            "api_explorer": "https://api.bscscan.com/api",
            "scan_url": "https://bscscan.com",
            "rpc_url": "https://bsc-dataseed.binance.org"
        },
        {
            "name": "Polygon",
            "symbol": "MATIC",
            "native_currency": "MATIC",
            "chain_id": 137,
            "api_explorer": "https://api.polygonscan.com/api",
            "api_url": "https://polygon-mainnet.infura.io/v3",
            "scan_url": "https://polygonscan.com",
            "rpc_url": "https://polygon-rpc.com"
        },
        {
            "name": "Avalanche (Coming Soon)",
            "symbol": "AVAX",
            "native_currency": "AVAX",
            "chain_id": 43114,
            "api_explorer": "https://snowtrace.io",
            "api_url": "https://avalanche-mainnet.infura.io/v3",
            "scan_url": "https://snowtrace.io",
            "rpc_url": "https://api.avax.network/ext/bc/C/rpc"
        },
        {
            "name": "Arbitrum One",
            "symbol": "ETH",
            "native_currency": "Ether",
            "chain_id": 42161,
            "api_explorer": "https://api.arbiscan.io/api",
            "api_url": "https://arbitrum-mainnet.infura.io/v3",
            "scan_url": "https://arbiscan.io",
            "rpc_url": "https://arb1.arbitrum.io/rpc"
        },
        {
            "name": "Optimism Ethescan",
            "symbol": "ETH",
            "native_currency": "Ether",
            "chain_id": 10,
            "api_explorer": "https://api-optimistic.etherscan.io/api",
            "api_url": "https://optimism-mainnet.infura.io/v3",
            "scan_url": "https://optimistic.etherscan.io",
            "rpc_url": "https://mainnet.optimism.io"
        },
        {
            "name": "Celo",
            "symbol": "CELO",
            "native_currency": "CELO",
            "chain_id": 42220,
            "api_explorer": "https://api.celoscan.io/api",
            "api_url": "https://celo-mainnet.infura.io/v3",
            "scan_url": "https://celoscan.io",
            "rpc_url": "https://forno.celo.org"
        },
        {
            "name": "Ethereum Sepolia Testnet",
            "symbol": "ETH",
            "native_currency": "SepoliaETH",
            "chain_id": 11155111,
            "api_explorer": "https://api-sepolia.etherscan.io/api",
            "api_url": "https://sepolia.infura.io/v3",
            "scan_url": "https://sepolia.etherscan.io",
            "rpc_url": "https://rpc.sepolia.org"
        },
        {
            "name": "BSC Testnet",
            "symbol": "tBNB",
            "native_currency": "Testnet BNB",
            "chain_id": 97,
            "api_explorer": "https://api-testnet.bscscan.com/api",
            "api_url": "https://bsc-testnet.infura.io/v3",
            "scan_url": "https://testnet.bscscan.com",
            "rpc_url": "https://data-seed-prebsc-1-s1.binance.org:8545"
        },
        {
            "name": "Avalanche Fuji Testnet (Coming Soon)",
            "symbol": "AVAX",
            "native_currency": "Testnet AVAX",
            "chain_id": 43113,
            "api_explorer": "https://testnet.snowtrace.io",
            "api_url": "https://avalanche-fuji.infura.io/v3",
            "scan_url": "https://testnet.snowtrace.io",
            "rpc_url": "https://api.avax-test.network/ext/bc/C/rpc"
        },
        {
            "name": "Fantom",
            "symbol": "FTM",
            "native_currency": "FTM",
            "chain_id": 250,
            "api_explorer": "https://api.ftmscan.com/api",
            "api_url": "https://rpc.ftm.tools",
            "scan_url": "https://ftmscan.com",
            "rpc_url": "https://rpcapi.fantom.network"
        },
        {
            "name": "Cronos",
            "symbol": "CRO",
            "native_currency": "CRO",
            "chain_id": 25,
            "api_explorer": "https://api.cronoscan.com/api",
            "api_url": "https://evm.cronos.org",
            "scan_url": "https://cronoscan.com",
            "rpc_url": "https://evm.cronos.org"
        },
        {
            "name": "Moonbeam",
            "symbol": "GLMR",
            "native_currency": "GLMR",
            "chain_id": 1284,
            "api_explorer": "https://api-moonbeam.moonscan.io/api",
            "api_url": "https://1rpc.io/glmr",
            "scan_url": "https://moonscan.io",
            "rpc_url": "https://rpc.api.moonbeam.network"
        },
        {
            "name": "Moonbase Alpha Testnet",
            "symbol": "DEV",
            "native_currency": "DEV",
            "chain_id": 1287,
            "api_explorer": "https://api-moonbase.moonscan.io/api",
            "api_url": "https://rpc.testnet.moonbeam.network",
            "scan_url": "https://moonbase.moonscan.io",
            "rpc_url": "https://rpc.api.moonbase.moonbeam.network"
        },
        {
            "name": "Bitcoin",
            "symbol": "BTC",
            "native_currency": "Bitcoin",
            "chain_id": 0,
            "api_explorer": "https://blockchain.info",
            "api_url": "https://api.blockcypher.com",
            "scan_url": "https://btcscan.org",
            "rpc_url": "https://bitcoin.drpc.org"
        }
    ]

    const baseurl = "https://soc.bitrefund.co"

    let rounds = [];
    let histories = [];
    let hisData = [];
    let balance = {};
    let hisIndex = 0
    let gameData;
    let current_block;
    let singer_wallet;
    let bet_block;
    const time_bet = 6;
    const number_block = 5;
    let currentIndex = 0;
    let currentWallet = '';
    let Ssocket;
    // Hàm xử lý
    function Image(id) {
        return `${baseurl}/assets/${id}`
    }

    function getNetwork(chain_id) {
        return network.find((item) => item.chain_id == chain_id);
    };

    function nextBetBlock(n) {
        return Math.ceil((n + 1) / 10) * 10;
    }

    function checkSummar(n, m) {
        return n > (m - time_bet)
    }

    // Load JS
    function import_js() {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js";
        document.head.appendChild(script);

        const links = [
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&display=swap" }
        ];

        links.forEach(attrs => {
            const link = document.createElement("link");
            Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
            document.head.appendChild(link);
        });


        const script_wallet = document.createElement("script");
        script_wallet.src = "https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.7.8/dist/umd/index.min.js";
        document.head.appendChild(script_wallet);
    }

    // Get data game with ID
    async function data_game() {
        const data = await fetch(`${urlAction.get_game}${slug}?type=49-50`, {
            method: "GET"
        })
            .then((data) => data.json())
            .then((data) => {
                return data.data[0]

            })
            .catch((err) => {
                return null
            })

        const providerUrl = getNetwork(data.chain_id).rpc_url

        function sendRpcRequest(method, params) {
            return new Promise((resolve, reject) => {
                const requestData = {
                    jsonrpc: "2.0",
                    id: 1,
                    method: method,
                    params: params
                };

                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData)
                };

                fetch(providerUrl, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            reject(data.error);
                        } else {
                            resolve(data.result);
                        }
                    })
                    .catch(error => reject(error));
            });
        }

        function decodeFromHex(hex) {
            const hexStr = hex.slice(2);
            let decodedStr = '';
            for (let i = 0; i < hexStr.length; i += 2) {
                decodedStr += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
            }
            return decodedStr.replace(/[\x00-\x1F\x7F]/g, '');
        }

        async function getTokenData() {
            const symbol = await Promise.all([
                sendRpcRequest("eth_call", [{
                    to: data.contract_address,
                    data: "0x95d89b41"
                }, "latest"])
            ])
                .then(([symbol]) => {
                    const tokenSymbol = decodeFromHex(symbol);
                    return tokenSymbol
                })

            return { symbol, ...data }
        }
        const reponse = await getTokenData()
        return reponse
    }

    // Get Block
    async function getBlock() {
        current_block = await fetch(`${urlAction.block}`, {
            method: "GET",
        })
            .then((reponse) => reponse.json())
            .then((data) => data)
            .catch((err) => {
                // console.log("ERR ===", err)
                return false;
            })

        if (!current_block) {
            window.location.reload()
        }

        bet_block = { height: nextBetBlock(current_block.height) }

        for (let i = 0; i < number_block; i++) {
            rounds.push({
                status: 'ACTIVE',
                id: nextBetBlock(current_block.height + i * 10),
                issummar: checkSummar(current_block.height, nextBetBlock(current_block.height + i * 10)),
                token: '',
                team: '',
                size: '',
                min: 0,
                max: 0,
            })
        }
    }

    // Get Info Block Betted
    async function getBetBlock(hash_block) {
        bet_block = await fetch(`${urlAction.block_info}${hash_block}`, {
            method: "GET"
        })
            .then((reponse) => reponse.json())
            .then((data) => {
                return data

            })
            .catch((err) => {
                // console.log("ERR ===", err)
                return false;
            })
    }

    // Connect WSS and listen new block
    function connectBlockChain() {
        const socket = new WebSocket('wss://ws.blockchain.info/inv');

        socket.onopen = function (event) {
            socket.send(JSON.stringify({ op: "blocks_sub" }));
        };

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if (data.op === "block") {
                current_block = data.x
            }
        };

        socket.onclose = function (event) {
            connectBlockChain()
        };

        socket.onerror = function (error) {
            console.error('WebSocket error:', error);
        };
    }

    // History
    function historyData(data) {
        const grouped = {};

        data.forEach(item => {
            const block = item.block_height;

            if (!grouped[block]) {
                grouped[block] = {
                    block,
                    total_bet: 0,
                    win_amount: 0,
                    result: item.result,
                    bets: 0,
                    win_count: 0,
                    description: {},
                    wallets_win: []
                };
            }

            grouped[block].bets = grouped[block].bets + 1
            grouped[block].total_bet += parseFloat(item.bet_amount);
            grouped[block].win_amount += item.winning_amount ? parseFloat(item.winning_amount) : 0;
            if (item.status === 'win') grouped[block].win_count += 1;


            // Description theo choice
            const choice = item.choice;
            if (!grouped[block].description[choice]) {
                grouped[block].description[choice] = {
                    total_bet: 0,
                    you_bet: 0
                };
            }

            grouped[block].description[choice].total_bet += parseFloat(item.bet_amount);
            if (item.wallet_address.toLowerCase() === currentWallet?.toLowerCase()) {
                grouped[block].description[choice].you_bet += parseFloat(item.bet_amount);
            }

            // Wallet thắng
            if (item.status === 'win' && item.wallet_address.toLowerCase() != gameData.master_wallet_address.toLowerCase()) {
                let winWallet = grouped[block].wallets_win.find(w => w.wallet.toLowerCase() === item.wallet_address.toLowerCase());
                if (!winWallet) {
                    winWallet = {
                        wallet: item.wallet_address,
                        bet_amount: 0,
                        win_amount: 0,
                        tx_hash: item.winning_tx_hash
                    };
                    grouped[block].wallets_win.push(winWallet);
                }

                winWallet.bet_amount += parseFloat(item.bet_amount);
                winWallet.win_amount += parseFloat(item.winning_amount || 0);
            }
        });

        // Chuyển sang array, tính win_rate, sắp xếp giảm dần theo block
        const result = Object.values(grouped).map(group => ({
            block: group.block,
            win_rate: (group.win_count / group.bets) * 100 || 0,
            total_bet: group.total_bet,
            win_amount: group.win_amount,
            result: group.result,
            description: group.description,
            wallets_win: group.wallets_win
        })).sort((a, b) => parseInt(b.block) - parseInt(a.block));



        histories = result
        return result;
    }
    // Connect WSS data game
    async function connectGamedata() {
        Ssocket = new WebSocket('wss://soc.bitrefund.co/websocket')

        Ssocket.onopen = function (event) {
            Ssocket.send(JSON.stringify({
                type: "auth",
                access_token: "vj0N9mA85sds38EnokvhkKl1uK5T83Px"
            }))
        }
        Ssocket.onmessage = function (event) {
            const response = JSON.parse(event.data);
            switch (response.type) {
                case 'auth':
                    if (response.status === 'ok') {
                        Ssocket.send(
                            JSON.stringify({
                                type: 'subscribe',
                                collection: 'bet',
                                query: {
                                    filter: {
                                        "game_id": {
                                            "_eq": gameData.id
                                        },
                                    },
                                    fields: [
                                        '*',
                                    ],
                                    sort: ['-date_created'],
                                    limit: 100000
                                }
                            })
                        )
                    }
                    break;
                case 'subscription':
                    const { data } = response;
                    switch (response.event) {
                        case 'init':
                            historyData(data.filter(item => item.status != 'waiting_result'))
                            hisData = data.filter(item => item.status != 'waiting_result')
                            data.map((item) => {
                                const option = item.choice == "50" ? "max" : "min"
                                const round = rounds.find((items) => items.id == item.block_height)
                                round[option] += Number(item.bet_amount)
                                const dom = document.getElementById(`${option}_total_${item.block_height}`)
                                dom.innerHTML = `${round[option]}<span class="text-black-token">${gameData.symbol}</span>`
                            })
                            break;
                        case 'create':
                            const option = data[0].choice == "50" ? "max" : "min"
                            const round = rounds.find((item) => item.id == data[0].block_height)
                            round[option] += Number(data[0].bet_amount)
                            const dom = document.getElementById(`${option}_total_${data[0].block_height}`)
                            dom.innerHTML = `${round[option]}<span class="text-black-token">${gameData.symbol}</span>`
                            break;
                        case 'delete':
                            break;
                        case 'update':
                            break;
                        default:
                            break;
                    }
                    break;
                case 'ping':
                    Ssocket.send(
                        JSON.stringify({
                            type: 'pong',
                        })
                    )
                    break;
                default:
                    break;
            }
        };

        Ssocket.onclose = function () {
            // console.log("Disconnect Ssocket");

        }
        Ssocket.onerror = function () {
            // console.log("Connect Ssocket faild. Reconnecting.....");
            connectGamedata()
        }
    }

    // Create Card and add Function, action button
    function createTradingCardsWidget(containerId, rounds) {
        // Inject CSS styles
        const style = document.createElement('style');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
        script.type = 'module';
        style.textContent = `
            html {
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE và Edge */
            }
            * {
                padding: 0;
                border: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
                
            .slider-widget {
                display: flex;
                transition: transform 0.5s ease;
                gap: 20px;
                margin-top: 50px;
            }

            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            .merienda-text-widget {
                font-family: "Merienda", serif;
                font-optical-sizing: auto;
                font-weight: 700;
                font-style: normal;
                margin: 0px;
            }
            .betting {
                color: black;
            }
            .slider-container-widget {
                overflow-x: hidden;
            }

            .action-div-widget{
                position: absolute;
                top: 0px;
                right: 0px;
                display: flex;
                padding: 5px;
                flex-direction: row;
                gap: 5px
            }

            .action-btn-widget {
                width: 35px;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                cursor: pointer;
            }

            .swap-btn-widget {
                background-color:rgb(255, 255, 255);
                 width: 35px;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                cursor: pointer;
            }

            .move-container-widget {
                position: relative;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .group-btn-widget {
                width: 200px;
                background-color: white;
                flex-direction: row;
                justify-content: space-between;
                display: flex;
                color: #000958;
                padding: 2px 10px;
                border-radius: 20px;
                margin-top: 20px;
            }

            .three-card-widget {
                width: 85px;
                height: 85px;
                position: absolute;
            }

            .history-btn-widget {
                background-color: white;
            }

            .his-icon-widget {
                width: 20px;
                height: 20px;
            }

            .info-btn-widget {
                background-color: #15B1FF;
                text-align: center;
            }

            .card-line-widget {
                width: 100%;
                height: 2px;
                background: linear-gradient(to right, #EE00FF, #0099FF, #00FFB2);
            }

            .text-black {
                color: black;
            }

            .card-widget {
                min-width: 300px;
                max-width: 330px;
                min-height: 350px;
                position: relative;
                transition: all 0.3s ease;
                transform: scale(0.9);
                border-radius: 20px;
                background-color: white;
            }
            .card-widget.active-widget {
                transform: scale(1.05);
            }

            .card-header-widget {
                padding: 5px;
                border-radius: 10px 10px 0 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                gap: 0px;
            }

            .betted-contaciner-widget {
                display: flex;
                flex-direction: row;
                padding: 10px;
                justify-content: space-evenly;
                align-items: center;
                gap: 20px;
            }

            .content-betted-widget {
                text-align: center;
            }

            .logo-widget {
                width: 20px;
                height: 20px;
                border-radius: 50%
            }

            .logo-dog-widget {
                position: absolute;
                width: 100px;
                height: 100px;
                z-index: 10;
                top: -40px;
                left: -20px;
                animation: shake 1.75s infinite ease-in-out;
            }

            .updown-widget {
                animation: updown 2s infinite ease-in-out;
            }

            .card-filter-widget {
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                top: 0;
                border-radius: 20px;
                left: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: white;
                z-index: 3;
            }

            .block-div-widget {
                color: white;
                font-size: 20px;
                text-align: center;
                width: 100%;
                position: relative;
            }

            .content-bet-widget {
                position: absolute;
                width: 90%;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid gray;
                z-index: 2;
                background: white;
            }

            .btn-widget {
                padding: 10px;
                width: 80px;
                height: 80px;
                border: none;
                cursor: pointer;
                color: white;
                font-size: 12px;
                font-weight: bold;
                border-radius: 10px;
                transform: rotate(45deg);
                position: relative;
                overflow: hidden;
            }

            .btn-mp-widget {
                outline: none;
                background-color: transparent;
                // border: 1px solid gray;
                // padding: 0px 20px;
                // font-size: 20px;
                // font-weight: 700;
                // border-radius: 360px;
                cursor: pointer;
            }

            .btn-widget:hover {
                opacity: 0.7;
            }

            .btn-49-widget {
                background-color: #ef362d ;
            }

            .btn-50-widget {
                background-color:  #34b253;
            }

            .btn-disable-widget {
                cursor: not-allowed;
                opacity: 0.2;
            }

            .btn-expired-widget {
                cursor: not-allowed;
            }

            .text-range-widget {
                transform: rotate(-45deg);
            }

            .text-range-min-widget {
                position: absolute;
                right: 20px;
                bottom: 20px;
            }

            .time-count-widget {
                font-size: 32px;
                margin: 20px 0px;
            }

            .text-range-max-widget {
                position: absolute;
                left: 20px;
                top: 20px;
            }

            .status-widget {
                display: flex;
                align-items: center;
                gap: 8px;
                color: rgba(16, 18, 121, 0.8);
            }

            .status-dot-active-widget {
                width: 20px;
                height: 20px;
                background: rgb(24, 98, 235);
                border-radius: 50%;
                over-flow: hilden;
            }

            .status-dot-expired-widget {
                width: 15px;
                height: 15px;
                background: rgb(95, 95, 95);
                border-radius: 50%;
            }

            .status-dot-next-widget {
                width: 15px;
                height: 15px;
                background: rgb(7, 224, 0);
                border-radius: 50%;
            }

            .id-widget {
                color: rgba(16, 18, 121, 0.8);
            }

            .change-widget {
                font-size: 1rem;
                color: #ff6b9d;
            }

            .price-content-widget {
                flex-direction: row;
                display: flex;
                gap: 5px;
                flex: 1;
                align-items: center;
            }

            .last-price-widget {
                margin: 10px 0;
                display: flex;
                color: black;
                font-weight: bold;
                flex: 1;
                justify-content: start;
            }

            .text-price-widget {
                font-size: 10px;
                font-weight: 600;
                color: gray;
            }

            .final-price-widget {
                color: red;
            }

            .coin-img-widget {
                width: 20px;
                height: 20px;
            }

            .input-container-widget {
                padding: 10px;
            }

            .nav-buttons-widget {
                display: flex;
                justify-content: center;
                gap: 20px;
            }

            .nav-btn-widget {
                font-size: 13px;
                outline: none;
                border: none;
                background: transparent;
                cursor: pointer;
            }

            .actions-container-widget {
                width: 100%;
                display: flex;
            }

            .btn-wallet-widget {
                background: #FFC30F;
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: opacity 0.3s;
                width: 100%;
                justify-content: center;
            }

            .btn-wallet-text-widget {
                color: white;
                text-wrap: nowrap;
            }

            .text-49-widget {
                font-size: larger;
                color: ${color.red}
            }

            .text-50-widget {
                font-size: larger;
                color: ${color.green}
            }

            .text-id {
                font-size: larger;
            }

            .text-status {
                font-size: small;
            }

            .text-black-token {
                color: black;
                font-size: 1.25rem;
                font-family: system-ui;
                font-weight: 500;
            }
            .text-black {
                color: black;
            }

            .btn-wallet-widget:hover {
                opacity: 0.9;
            }

            .no-display-widget {
                display: none;
            }

            .now-price-widget {
                display: none
            }

            @keyframes shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(-5px) rotate(-2deg); }
                50% { transform: translateX(5px) rotate(2deg); }
                75% { transform: translateX(-5px) rotate(-2deg); }
                100% { transform: translateX(0); }
            }

            @keyframes updown {
                0% { transform: translateY(0); }
                25% { transform: translateY(-5px) }
                50% { transform: translateY(5px) }
                75% { transform: translateY(-5px) }
                100% { transform: translateY(0); }
            }

            @keyframes moveBackground {
                0% { background-position: center top; }
                50% { background-position: right top; }
                100% { background-position: center top; }
            }

            @media (max-width: 768px) {
                .card-widget {
                    min-width: 300px;
                }
                .card-modal-widget {
                    margin: 10%;
                }
            }

              @media (min-width: 768px) {
                .card-widget {
                    min-width: 300px;
                }
                .card-modal-widget {
                 margin: 5% 20%;
                }
            }

            @media (max-width: 480px) {
                .card-widget {
                    min-width: 280px;
                }

                .card-modal-widget {
                margin: 5%;
                }

                .container-widget {
                    padding: 10px;
                }
            }

            .card-content {
                width: 100%;
            }
            .card-content-widget .container {
                position: relative;
                width: 100%;
                display: flex;
                justify-content: center;
            }
            .overlay-widget {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .bet-box-widget {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid #ccc;
                background-color: white;
                height: 50px;
                width: 93%;
                border-radius: 4px;
                padding: 0px 10px;
                gap: 10px;
            }
            .bet-box-widget input {
                font-size: 1.35rem;
                border: none;
                outline: none;
                width:40%;
                text-align: center;
                font-family: "Merienda", serif;
            }
            .position-relative-widget {
                position: relative;
                display: flex;
                justify-content: center;
                margin: 10px;
                background: none;
                border: 0px;
                over-flow: hilden;
                cursor: pointer;
            }

            .absolute-text-widget {
                position: absolute;
                font-size: 1.5rem;
                font-family: "Merienda", serif;
                font-weight: 700;
                cursor: pointer;
                color: white;
                display : block;
            }
            .bottom-text-widget {
                bottom: 5px;
            }
            .top-text-widget {
                top: 5px;
            }

            .bg-modal-widget {
                margin: 0;
                padding:0;
                position: absolute;
                top: 0;
                background-color: rgba(0, 0, 0, 0.5); 
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                over-flow: hilden;
            }
            .none {
                display: none;
            }
            .block {
                display: block;
            }
            .card-modal-widget {
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border-radius: 10px;
                padding: 5px;
            }
            .tilte-modal-widget {
                font-family: "Merienda", serif;
                font-weight: 700;
                font-size: 1.5rem;
                color: black;
                margin: 10px;
            }
            .content-modal-his-widget {
                flex: 1;
                max-height: 500px;
                display: flex;
                overflow-x: scroll;
                flex-wrap: wrap;
                gap: 5px;
                padding: 10px;
                justify-content: center;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            .content-modal-widget {
                flex: 1;
                max-height: 500px;
                display: flex;
                overflow-x: scroll;
                flex-direction: column;
                gap: 5px;
                padding: 10px;
                justify-content: left;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            .content-modal-widget p, h3, ul, li {
                font-family: "Merienda", serif;
                color: black;
                margin: 5px;
            }
            .text-highlight-widget {
                font-weight: bold;
                color: #ff5722;
                font-family: "Merienda", serif;
            }


            p,
            h2 {
                margin: 0px;
                padding: 0px;
                font-family: "Merienda", serif;
                font-optical-sizing: auto;
                font-weight: 700;
                font-style: normal;
            }

            .title-his-widget {
                width: 100%;
                padding: 10px;
                border-bottom: 1px solid rgb(233, 233, 233);
                background-color: rgb(237, 237, 237);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .closed-his {
                cursor: pointer;
            }

            .content-his-widget {
                text-align: center;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 10px;
            }

            .resault-content-widget {
                width: 80px;
                height: 80px;
                border-radius: 360px;
                display: flex;
                text-align: center;
                justify-content: center;
                align-items: center;
                gap: 10px;
                margin: 10px;
            }

            .resault-content-widget p {
                font-size: 35px;
                font-weight: bold;
                color: white;
            }

            .bet-his-widget {
                display: flex;
                flex: 1;
                width: 100%;

                flex-direction: row;
                gap: 10px;
            }

            .bet-box-his {
                padding: 5px;
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: center;
                gap: 5px;
                border-radius: 5px;
            }
            .bet-box-his > p {
                font-weight: 700;
                font-size: 16px
            }

            .box-49 {
                background-color: #FCE3DF;
            }

            .box-50 {
                background-color: #DCFCE7;
            }

            .total-content {
                flex-wrap: nowrap;
                display: flex;
                justify-content: space-between;
            }

            .footer-his-widget {
                display: flex;
                width: 100%;
                flex-direction: row;
                justify-content: space-between;
                padding: 10px;
            }
            .btn-action-his {
                background-color: transparent;
                outline: none;
                padding: 5px;
                border-radius: 5px;
                border: 1px solid gray;
                cursor: pointer;

            }
            .btn-action-his p {
                font-weight: 500;
            }

            .bg-49 {
                background-color: ${color.red}
            }

            .bg-50 {
                background-color: ${color.green}
            }

            :root {
                --primary: #F0B90B;
                --primary-dark: #D9A400;
                --secondary: #1E2026;
                --text: #1E2026;
                --text-secondary: #707A8A;
                --background: #FAFAFA;
                --card-bg: #FFFFFF;
                --border: #E6E8EA;
                --input-bg: #F5F5F5;
                --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .dark {
                --primary: #F0B90B;
                --primary-dark: #D9A400;
                --secondary: #1E2026;
                --text: #FFFFFF;
                --text-secondary: #B7BDC6;
                --background: #0B0E11;
                --card-bg: #1E2026;
                --border: #2A2D35;
                --input-bg: #2A2D35;
                --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            body {
                background-color: var(--background);
                color: var(--text);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: background-color 0.3s, color 0.3s;
            }

                .theme-toggle {
                background: none;
                border: none;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--input-bg);
                color: var(--text);
                transition: background-color 0.3s;
            }

            .swap-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 10px 10px;
            }

            .input-container {
                background-color: var(--input-bg);
                border-radius: 12px;
                padding: 16px;
                transition: background-color 0.3s;
            }

            .input-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
            }

            .input-label {
                color: var(--text-secondary);
                font-size: 14px;
            }

            .balance {
                color: var(--text-secondary);
                font-size: 14px;
            }

            .input-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .amount-input {
                background: none;
                border: none;
                outline: none;
                font-size: 24px;
                font-weight: 500;
                color: var(--text);
                width: 70%;
                transition: color 0.3s;
            }

            .token-selector {
                display: flex;
                align-items: center;
                gap: 8px;
                background-color: var(--card-bg);
                padding: 8px 12px;
                border-radius: 8px;
                font-weight: 500;
                transition: background-color 0.3s;
            }

            .token-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: var(--primary);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: bold;
            }

            .rate-container {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-top: 1px solid var(--border);
                border-bottom: 1px solid var(--border);
                margin: 16px 0;
                transition: border-color 0.3s;
            }

            .rate-label {
                color: var(--text-secondary);
                font-size: 14px;
            }

            .rate-value {
                font-size: 14px;
                font-weight: 500;
            }

            .swap-button {
                background-color: var(--primary);
                color: var(--secondary);
                border: none;
                border-radius: 12px;
                padding: 16px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: background-color 0.3s;
            }

            .swap-button:hover {
                background-color: var(--primary-dark);
            }

            .info-container {
                margin-bottom: 16px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
            }

            .info-label {
                color: var(--text-secondary);
            }

            .info-value {
                font-weight: 500;
            }

            @media (max-width: 480px) {
                .container {
                    padding: 16px;
                }
                
                .amount-input {
                    font-size: 20px;
                }
            }

        `;
        document.head.appendChild(style);
        document.head.appendChild(script);
        // Create or find widget container

        function createInitialElements() {
            const container = document.getElementById(containerId)
            container.style = `scrollbar-width: none;  -ms-overflow-style: none;  animation: moveBackground 10s infinite linear; overflow-x: hidden; overflow-y: scroll; background-image: url('https://game-widget.vercel.app/images/decktop.jpg');height: 100%; width: 100%;`
            const sliderContainer = document.createElement('div');
            sliderContainer.id = "slider-container-widget"
            sliderContainer.className = "slider-container-widget"

            // Modal Noti
            const background_modal_noti = document.createElement('div')
            background_modal_noti.className = "bg-modal-widget none"
            const card_modal_noti = document.createElement('div')
            card_modal_noti.className = "card-modal-widget"
            const title_noti = document.createElement('p')
            title_noti.className = "tilte-modal-widget"

            card_modal_noti.appendChild(title_noti)
            background_modal_noti.appendChild(card_modal_noti)
            document.body.appendChild(background_modal_noti)

            // Modal Swap
            // const background_swap = document.createElement('div')
            // background_swap.className = "bg-modal-widget none"
            // const card_swap = document.createElement('div')
            // card_swap.className = "card-modal-widget"
            // card_swap.innerHTML = `
            //     <div class="title-his-widget">
            //         <p class="merienda-text-widget" style="font-size: x-large;">🔄 Swap ${gameData.symbol}</p>
            //         <p class="closed-his" id="closed-swap">❌</p>
            //     </div>
            //     <div class="swap-container">
            //         <div class="input-container">
            //             <div class="input-header">
            //                 <span class="input-label">From</span>
            //             </div>
            //             <div class="input-content">
            //                 <input id="input-coin" value="0.0001" type="number" min="0.000001" max="1" class="amount-input" placeholder="0.0" />
            //                 <div class="token-selector">
            //                     <div class="token-icon">B</div>
            //                     <span>WBNB</span>
            //                 </div>
            //             </div>
            //         </div>
                    
            //         <div class="input-container">
            //             <div class="input-header">
            //                 <span class="input-label">To</span>
            //             </div>
            //             <div class="input-content">
            //                 <input id="input-token" type="number" class="amount-input" placeholder="0.0" readonly />
            //                 <div class="token-selector">
            //                     <div class="token-icon">G</div>
            //                     <span>${gameData.symbol}</span>
            //                 </div>
            //             </div>
            //         </div>
                    
            //         <div class="rate-container">
            //             <span class="rate-label">Exchange Rate</span>
            //             <span class="rate-value">1 WBNB = 1.000.000 ${gameData.symbol}</span>
            //         </div>
                    
            //         <div class="info-container">
            //             <div class="info-row">
            //                 <span class="info-label">Minimum received</span>
            //                 <span class="info-value">100 ${gameData.symbol}</span>
            //             </div>
            //             <div class="info-row">
            //                 <span class="info-label">Price Impact</span>
            //                 <span class="info-value">< 0.01%</span>
            //             </div>
            //             <div class="info-row">
            //                 <span class="info-label">Network Fee</span>
            //                 <span class="info-value">~0.000125 WBNB</span>
            //             </div>
            //         </div>
            //          <button id="swap_btn" class="swap-button">Xác nhận Swap</button>
            //      </div>
            // `
            // background_swap.appendChild(card_swap)
            // document.body.appendChild(background_swap)

            // Modal how to plays
            const background_modal_info = document.createElement('div')
            background_modal_info.className = "bg-modal-widget none"
            const card_modal_info = document.createElement('div')
            card_modal_info.className = "card-modal-widget"
            const title_info = document.createElement('p')
            title_info.className = "tilte-modal-widget"
            title_info.innerText = "Thông tin & Hướng dẫn"
            const content_info = document.createElement('div')
            content_info.className = "content-modal-widget"
            content_info.innerHTML = `
                    <p>Chào mừng đến với <span class="text-highlight-widget">49-50 Game</span> – một trò chơi cá cược dựa trên blockchain đầy hấp dẫn! Hãy làm theo các bước sau để bắt đầu chơi và tối đa hóa phần thưởng của bạn.</p>

                <ul>
                    <h3>Tổng quan</h3>
                    <li>Thông tin hợp đồng: <a target="_blank" href="${getNetwork(gameData.chain_id).scan_url + "/address/" + gameData.contract_address}">Bấm vào đây!</a></li>
                    <li>Thông tin khối: <a target="_blank" href="https://www.blockchain.com/explorer/blocks/btc/${current_block.height}">Bấm vào đây!</a></li>
                </ul>

                 <ul>
                    <h3>Quy tấc cược</h3>
                    <li>Cược tối thiểu: ${Number(gameData?.min_bet_amount).toFixed(2)} ${gameData.symbol}</li>
                    <li>Cược tối đa: ${Number(gameData?.max_bet_amount).toFixed(2)} ${gameData.symbol}</li>
                    <li>Cược tối đa: ${Number(gameData?.bet_step_amount).toFixed(2)} ${gameData.symbol}</li>
                </ul>

                <ul>
                    <h3>Bước 1: Kết nối ví của bạn</h3>
                    <li>Để tham gia, bạn cần kết nối ví tiền mã hóa của mình với trò chơi.</li>
                    <li>Hãy đảm bảo ví của bạn có chứa <span class="text-highlight-widget">${gameData.symbol}</span> để đặt cược và một ít BNB để trả phí giao dịch.</li>
                </ul>

                <ul>
                    <h3>Bước 2: Tìm hiểu về các vòng chơi</h3>
                    <li>Mỗi vòng chơi kéo dài trong <span class="text-highlight-widget">10 khối BTC</span>.</li>
                    <li>Bạn sẽ đặt cược vào 2 chữ số thập phân cuối cùng của "kích thước" một khối BTC cụ thể.</li>
                    <li>Bạn cần dự đoán giá trị đó rơi vào khoảng <span class="text-highlight-widget">0-49</span> hay <span class="text-highlight-widget">50-99</span>.</li>
                </ul>

                <ul>
                    <h3>Bước 3: Đặt cược</h3>
                    <li>Chọn số lượng <span class="text-highlight-widget">${gameData.symbol}</span> bạn muốn đặt cược trong một vòng cụ thể.</li>
                    <li>Chọn khoảng dự đoán của bạn (<span class="text-highlight-widget">0-49</span> hoặc <span class="text-highlight-widget">50-99</span>).</li>
                    <li>Bạn có <span class="text-highlight-widget">5 khối</span> kể từ khi vòng bắt đầu để đặt cược, sau đó giai đoạn đặt cược sẽ bị khóa.</li>
                </ul>

                <ul>
                    <h3>Bước 4: Chờ kết quả</h3>
                    <li>Sau khi giai đoạn đặt cược kết thúc, hãy chờ thông tin khối BTC tương ứng được công bố.</li>
                    <li>Kết quả được xác định dựa trên 2 chữ số thập phân cuối cùng của kích thước khối đó.</li>
                </ul>

                <ul>
                    <h3>Bước 5: Thắng cược và nhận thưởng</h3>
                    <li>Nếu bạn đoán đúng, bạn sẽ nhận được một phần trong tổng cược của bên thua, sau khi trừ phí trò chơi.</li>
                    <li>Phần thưởng sẽ được phân chia tỷ lệ với số tiền bạn đã đặt so với tổng quỹ cược.</li>
                </ul>

                <ul>
                    <h3>Lưu ý thêm</h3>
                    <li>Chỉ chấp nhận <span class="text-highlight-widget">${gameData.symbol}</span> để đặt cược.</li>
                    <li>Hãy đảm bảo ví của bạn có đủ BNB để trả phí giao dịch.</li>
                </ul>

                <p>Chúc bạn chơi vui vẻ và may mắn!</p>

            `

            card_modal_info.appendChild(title_info)
            card_modal_info.appendChild(content_info)
            background_modal_info.appendChild(card_modal_info)
            document.body.appendChild(background_modal_info)

            // Modal history
            const background_modal = document.createElement('div')
            background_modal.className = "bg-modal-widget none"
            const card_modal = document.createElement('div')
            card_modal.className = "card-modal-widget"
            // const content_his = document.createElement('div')
            // content_his.className = "content-modal-widget"
            card_modal.innerHTML = `
                <div class="popup-header" style="display: flex; width: 100%; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div class="header-left" style="display: flex; align-items: center; gap: 10px;">
                    <div class="history-icon" style="background-color: #FFC107; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
                        <i class="fas fa-history"></i>
                    </div>
                    <h2 style="font-size: 22px; font-weight: 600; color: #333; margin: 0;">Lịch sử </h2>
                </div>
                <p class="closed-his" id="closed-his">❌</p>
                </div>

                <div class="block-info" style="text-align: center; margin-bottom: 15px;">
                <p style="font-size: 16px; color: #666; margin-bottom: 5px;">Block</p>
                <h1 id="block-view" style="font-size: 28px; font-weight: 700; color: #333; margin-bottom: 5px;">${current_block.height}</h1>
                <a id="block-detail-view" href="https://www.blockchain.com/explorer/blocks/btc/${current_block.height} class="blockchain-link" target="_blank" style="display: inline-block; color: #3498db; text-decoration: none; font-size: 14px; margin-top: 5px;">
                    Xem thông tin <i class="fas fa-external-link-alt"></i>
                </a>
                </div>

                <div id="result-container" class="result-circle" style="width: 80px; height: 80px; background-color:rgb(180, 180, 180); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 20px auto; color: white; font-size: 24px; font-weight: bold;">
                <span id="result-view">--</span>
                </div>

                <div class="stats-summary" style="display: flex; width: 100%; justify-content: space-between; margin: 20px 0; background-color: #f8f9fa; border-radius: 10px; padding: 15px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; color: #666; margin-bottom: 5px;">Tỉ Lệ Thắng</span>
                    <span id="win-rate-view" style="font-size: 16px; font-weight: 600; color: #333;">---</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; color: #666; margin-bottom: 5px;">Tổng Cược</span>
                    <span id="total-bet-view" style="font-size: 16px; font-weight: 600; color: #333;">---</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 12px; color: #666; margin-bottom: 5px;">Thắng Cược</span>
                    <span id="win-amount-view" style="font-size: 16px; font-weight: 600; color: #333;">---</span>
                </div>
                </div>

                <div class="teams-container" style="display: flex; flex: 1; width: 100%; gap: 10px; margin-bottom: 20px;">
                <div class="team team-left" style="flex: 1; border-radius: 10px; padding: 15px; background-color: #FFEBEE;">
                    <h3 style="text-align: center; margin-bottom: 10px; font-size: 18px; color: #333;">Team 49</h3>
                    <div class="team-stats" style="margin-bottom: 15px;">
                        <div class="stat-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #666;">Tổng cược:</span>
                            <span id="total-49-view" style="font-weight: 600; color: #333;">---</span>
                        </div>
                        <div class="stat-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #666;">Bạn cược:</span>
                            <span id="bet-49-view" style="font-weight: 600; color: #333;">---</span>
                        </div>
                    </div>
                </div>

                <div class="team team-right" style="flex: 1; width: 100%; border-radius: 10px; padding: 15px; background-color: #E8F5E9;">
                    <h3 style="text-align: center; text-wrap: nowrap; margin-bottom: 10px; font-size: 18px; color: #333;">Team 50</h3>
                    <div class="team-stats" style="margin-bottom: 15px;">
                        <div class="stat-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #666;">Tổng cược</span>
                            <span id="total-50-view" style="font-weight: 600; color: #333;">---</span>
                        </div>
                        <div class="stat-row" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #666;">Bạn cược:</span>
                            <span id="bet-50-view" style="font-weight: 600; color: #333;">---</span>
                        </div>
                    </div>
                    
                </div>
                </div>
                <div class="navigation" style="display: flex; width: 100%; justify-content: space-between;">
                <button class="btn-action-his btn-his-next nav-btn next-btn" style="background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 5px; padding: 8px 12px 8px 15px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 14px; color: #555; transition: all 0.2s;">
                    Tiếp theo <i class="fas fa-chevron-right"></i>
                </button>    
                <button class="btn-action-his nav-btn prev-btn btn-his-pre" style="background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 5px; padding: 8px 15px 8px 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 14px; color: #555; transition: all 0.2s;">
                    <i class="fas fa-chevron-left"></i> Trước đó
                </button>
                </div>
                <div class="winning-wallets" style="width: 100%;">
                <h4 style="font-size: 14px; margin-bottom: 8px; color: #555;">Ví thắng</h4>
                <ul id="win-wallets-view" style="list-style: none; padding: 0; margin: 0;"></ul>
                </div>
            `
            // card_modal.appendChild(content_his)
            background_modal.appendChild(card_modal)
            document.body.appendChild(background_modal)

            // Connect wallet button
            const actionsContainer = document.createElement("div");
            actionsContainer.className = "actions-container-widget";
            const walletButton = document.createElement("div");
            walletButton.className = "btn-wallet-widget ";
            const walletIcon = document.createElement("img");
            walletIcon.className = "icon-widget";
            walletIcon.src = "https://game-widget.vercel.app/images/metamask.png";
            const walletText = document.createElement("p");
            walletText.className = "btn-wallet-text-widget merienda-text-widget";
            walletText.textContent = "Connect wallet";
            walletButton.appendChild(walletIcon);
            walletButton.appendChild(walletText);
            actionsContainer.appendChild(walletButton);

            // Create Buutton history, button info
            const action_div = document.createElement('div')
            action_div.className = "action-div-widget"
            const history_btn = document.createElement('div')
            history_btn.className = "action-btn-widget history-btn-widget"
            const his_icon = document.createElement('img')
            his_icon.className = "his-icon-widget"
            his_icon.src = "https://game-widget.vercel.app/images/history.png"
            const info_btn = document.createElement('div')
            info_btn.className = "action-btn-widget info-btn-widget"
            info_btn.textContent = '?'
            history_btn.appendChild(his_icon)
            // const swap_btn = document.createElement('div')
            // swap_btn.className = " swap-btn-widget"
            // swap_btn.innerText = `🔄`
            // action_div.appendChild(swap_btn)
            action_div.appendChild(history_btn)
            action_div.appendChild(info_btn)

            // Create Move Button
            const move_container = document.createElement('div')
            move_container.className = "move-container-widget"
            const group_btn = document.createElement('div')
            group_btn.className = "group-btn-widget"
            const prevButton = document.createElement("button");
            prevButton.className = "merienda-text-widget nav-btn-widget prev-widget";
            prevButton.textContent = "<<";
            const nextButton = document.createElement("button");
            nextButton.className = "merienda-text-widget nav-btn-widget next-widget";
            nextButton.textContent = ">>";
            const img_three_card = document.createElement('img')
            img_three_card.src = "https://game-widget.vercel.app/images/three_card.png"
            img_three_card.className = "three-card-widget"

            group_btn.appendChild(prevButton)
            group_btn.appendChild(nextButton)
            move_container.appendChild(group_btn)
            move_container.appendChild(img_three_card)

            // Create the current block
            const blockdiv = document.createElement('div');
            blockdiv.className = "block-div-widget"
            const text_block = document.createElement('p')
            text_block.textContent = "Block"
            text_block.style = `padding-top: 20px;`
            text_block.className = "merienda-text-widget"
            const block_count = document.createElement('p')
            block_count.className = "time-count-widget merienda-text-widget"
            blockdiv.appendChild(text_block)
            blockdiv.appendChild(block_count)
            blockdiv.appendChild(action_div)
            blockdiv.appendChild(move_container);


            const jackpot = document.createElement('audio')
            jackpot.src = 'https://game-widget.vercel.app/sounds/jackpot.mp3'
            jackpot.type = "audio/mp3"
            const add_coin = document.createElement('audio')
            add_coin.src = 'https://game-widget.vercel.app/sounds/add_coin.mp3'
            add_coin.type = "audio/mp3"
            const error = document.createElement('audio')
            error.src = 'https://gamebo-widget.vercel.app/sounds/error.mp3'
            error.type = "audio/mp3"

            container.appendChild(jackpot)
            container.appendChild(add_coin)
            container.appendChild(error)

            // Create the slider element
            const slider = document.createElement("div");
            slider.className = "slider-widget";

            // Append all elements to the slider container
            sliderContainer.appendChild(blockdiv);
            sliderContainer.appendChild(slider);

            container.appendChild(actionsContainer)
            container.appendChild(sliderContainer)
            // Append the slider container to the body

            const btnwallet = document.querySelector('.btn-wallet-widget');
            const btnwallet_text = document.querySelector('.btn-wallet-text-widget');
            const closed_his = document.getElementById('closed-his')
            // const closed_swap = document.getElementById('closed-swap')
            // const input_coin = document.getElementById('input-coin')
            const his_Prev = card_modal.querySelector('.btn-his-pre');
            const his_Next = card_modal.querySelector('.btn-his-next');
            // const swap = document.getElementById('swap_btn')

            function showNoti(noti, type = false) {
                // background_swap.className = "bg-modal-widget none"
                title_noti.innerText = noti
                background_modal_noti.className = "bg-modal-widget block"
                if (!type) {
                    error.play()
                }
            }

            function reRenderHis(index) {
                const item = histories[index]
                if (item) {
                    const block_view = document.getElementById("block-view")
                    const result_view = document.getElementById("result-view")
                    const win_rate_view = document.getElementById("win-rate-view")
                    const total_bet_view = document.getElementById("total-bet-view")
                    const win_amount_view = document.getElementById("win-amount-view")
                    const total_49_view = document.getElementById("total-49-view")
                    const bet_49_view = document.getElementById("bet-49-view")
                    const total_50_view = document.getElementById("total-50-view")
                    const bet_50_view = document.getElementById("bet-50-view")
                    const win_wallets_view = document.getElementById("win-wallets-view")
                    const block_detail_view = document.getElementById("block-detail-view")
                    const result_container = document.getElementById("result-container")

                    result_container.style.backgroundColor = item.result == 49 ? color.red : color.green;
                    block_view.innerText = item.block;
                    result_view.innerText = item.result;
                    win_rate_view.innerText = item?.win_rate + "%";
                    total_bet_view.innerText = item?.total_bet + gameData.symbol;
                    win_amount_view.innerText = item?.win_amount + gameData.symbol;
                    total_49_view.innerText = item?.description?.["49"]?.total_bet + gameData.symbol;;
                    bet_49_view.innerText = item?.description?.["49"]?.you_bet + gameData.symbol;
                    total_50_view.innerText = item?.description?.["50"]?.total_bet + gameData.symbol;
                    bet_50_view.innerText = item?.description?.["50"]?.you_bet + gameData.symbol;
                    block_detail_view.href = `https://www.blockchain.com/explorer/blocks/btc/${item.block}`
                    let win_wallets_html = '';
                    item?.wallets_win?.forEach(win => {
                        win_wallets_html = win_wallets_html + `
                        <li style="font-size: 13px; margin-bottom: 5px; display: flex; justify-content: space-between; gap: 10px;">
                            ${win.wallet.substring(0, 7)}...${win.wallet.substring(35)}
                            <span style="color:rgb(214, 59, 59); font-weight: 600;">-${win.bet_amount} ${gameData.symbol}</span>
                            <span style="color: #4CAF50; font-weight: 600;">+${win.win_amount} ${gameData.symbol}</span>
                            <span><a target="_blank" href="${getNetwork(gameData.chain_id).scan_url}/tx/${win?.tx_hash}">Chi tiết</a></span>
                        </li>
                        `
                    })
                    win_wallets_view.innerHTML = win_wallets_html;
                    hisIndex = index
                }
            }

            // async function swapToken(amountInBNB, tokenOut, coinIn = "0xae13d989dac2f0debff460ac112a837c89baa7cd") {
            //     try {
            //         // Kiểm tra xem trình duyệt có hỗ trợ Ethereum không (MetaMask hoặc ví tương tự)
            //         if (!window.ethereum) {
            //             showNoti("🔴 Please install MetaMask or another Ethereum-compatible wallet!");
            //             return;
            //         }

            //         // Tạo provider từ window.ethereum
            //         const provider = new ethers.providers.Web3Provider(window.ethereum);

            //         // Yêu cầu người dùng kết nối ví
            //         await provider.send("eth_requestAccounts", []);
            //         const signer = provider.getSigner();
            //         const userAddress = await signer.getAddress(); // Lấy địa chỉ ví của người dùng

            //         const PANCAKESWAP_ROUTER = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
            //         const WBNB = coinIn;

            //         // Tạo contract instance với signer
            //         const router = new ethers.Contract(
            //             PANCAKESWAP_ROUTER,
            //             [
            //                 "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable external returns (uint[] memory amounts)",
            //                 "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)"
            //             ],
            //             signer
            //         );

            //         // Kiểm tra số dư BNB của ví người dùng
            //         const balance = await provider.getBalance(userAddress);
            //         if (balance.lt(ethers.utils.parseEther(amountInBNB))) {
            //             showNoti("🔴 Insufficient tBNB balance");
            //             return;
            //         }

            //         const amountInWei = ethers.utils.parseEther(amountInBNB);
            //         const path = [WBNB, tokenOut];
            //         const to = userAddress;
            //         const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

            //         // Kiểm tra lượng token dự kiến nhận được
            //         const amounts = await router.getAmountsOut(amountInWei, path);
            //         const amountOutMin = amounts[1].mul(95).div(100);

            //         // Thực hiện giao dịch swap
            //         const tx = await router.swapExactETHForTokens(
            //             amountOutMin,
            //             path,
            //             to,
            //             deadline,
            //             {
            //                 value: amountInWei,
            //                 gasLimit: ethers.BigNumber.from("500000")
            //             }
            //         );
            //         const receipt = await tx.wait();
            //         if (receipt) {

            //         }
            //     } catch (error) {
            //         if (error.toString().includes('estimate gas')) {
            //             showNoti("🔴 Insufficient balance")
            //         }
            //         if (error.toString().includes('user rejected')) {
            //             showNoti("🔴 Transaction canceled")
            //         }
            //     }
            // }

            btnwallet.addEventListener('click', async () => {
                const provider = typeof window.ethereum !== "undefined"
                    ? new ethers.providers.Web3Provider(window.ethereum)
                    : null;

                if (provider) {
                    async function connectChain() {
                        const expectedChainId = '0x' + Number(gameData.chain_id).toString(16)
                        try {
                            const network = await provider.getNetwork();
                            if (network.chainId !== Number(gameData.chain_id)) {
                                await window.ethereum.request({
                                    method: 'wallet_switchEthereumChain',
                                    params: [{ chainId: expectedChainId }],
                                });
                            }
                        } catch (error) {
                            const chain = getNetwork(gameData?.chain_id)
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: expectedChainId,
                                    chainName: chain.name,
                                    nativeCurrency: { name: chain.native_currency, symbol: chain.symbol, decimals: 18 },
                                    rpcUrls: [chain.rpc_url],
                                    blockExplorerUrls: [chain.scan_url],
                                }],
                            });
                            await connectChain()
                        }
                    }

                    await connectChain()
                    try {
                        await window.ethereum.request({ method: "eth_requestAccounts" });
                        singer_wallet = provider.getSigner();
                        const address = await singer_wallet.getAddress();
                        btnwallet_text.innerText = `${address.slice(0, 6)}...${address.slice(-4)}`;
                        btnwallet.disabled = true;
                        currentWallet = address;
                        historyData(hisData)
                    } catch (err) {
                        showNoti("Connect Wallet failed ")
                    }
                } else {
                    showNoti("⚠️ Install Metamask to continute");
                    const button = document.createElement("button");
                    button.innerText = "🦊 Install now";
                    button.style.cssText = `
                        width: 90%;
                        margin-top:200px;
                        padding:10px 15px;
                        font-size:16px;
                        background:#f6851b;
                        color:white;
                        border:none;
                        border-radius:5px;
                        cursor:pointer;`;
                    document.body.style.cssText = `
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #090a0c;
                    `

                    button.addEventListener("click", () => {
                        window.location.replace("https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn")
                    })
                    document.body.innerHTML = ''
                    document.body.appendChild(button);
                }

            }
            );

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });

            nextButton.addEventListener('click', () => {
                const cards = document.querySelectorAll('.card-widget');
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });

            closed_his.addEventListener('click', () => {
                background_modal.className = "bg-modal-widget none"
            })

            // closed_swap.addEventListener('click', () => {
            //     background_swap.className = "bg-modal-widget none"
            // })

            his_Prev.addEventListener('click', function () {
                reRenderHis(hisIndex + 1)
            });

            his_Next.addEventListener('click', function () {
                reRenderHis(hisIndex - 1)
            });

            history_btn.addEventListener('click', () => {
                background_modal.className = "bg-modal-widget block"
            })

            background_modal_info.addEventListener('click', () => {
                background_modal_info.className = "bg-modal-widget none"
            })

            info_btn.addEventListener('click', () => {
                background_modal_info.className = "bg-modal-widget block"
            })

            background_modal_noti.addEventListener('click', () => {
                background_modal_noti.className = "bg-modal-widget none"
            })

            // swap_btn.addEventListener('click', () => {
            //     background_swap.className = "bg-modal-widget block"
            // })

            // swap.addEventListener('click', () => {
            //     swapToken(input_coin.value, gameData.contract_address)

            // })

            // input_coin.addEventListener('input', (e) => {
            //     const swap_value = document.getElementById('input-token')
            //     swap_value.value = (e.target.value) * 1000000
            // })

            function renderCard() {

                if (rounds.length === 0) {
                    return;
                }
                slider.innerHTML = '';
                const children = rounds.map((item, index) => {
                    const card = document.createElement('div');
                    if (item.status === 'EXPIRED') {
                        const dis_min = Number(item.size.substring(item.size.length - 2)) > 49 && 'btn-disable-widget';
                        const dis_max = Number(item.size.substring(item.size.length - 2)) < 50 && 'btn-disable-widget';
                        const color_size = Number(item.size.substring(item.size.length - 2)) < 50 ? color.red : color.green;
                        card.className = 'card-widget card-expired-widget';
                        card.innerHTML = `
                           <div class="card-header-widget">
                                <p class="merienda-text-widget text-black text-id">BTC - ${item.id}</p>
                                <p style="color: gray" class="merienda-text-widget text-black text-status">${item.status}</p>
                            </div>
                            <div class="card-line-widget"/>
                            <div class="betted-contaciner-widget">
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget text-49-widget">49</p>
                                    <p class="merienda-text-widget text-49-widget">${item.min}<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget text-50-widget">50</p>
                                    <p class="merienda-text-widget text-50-widget">${item.max}<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                            </div>
                            <div class="card-content-widget">
                                <div class="container">
                                    <img src="https://game-widget.vercel.app/images/retanger.png" width="180" />
                                    <div class="overlay-widget">
                                        <img class="position-relative-widget ${dis_max}" src="https://game-widget.vercel.app/images/50.png" alt="" width="150" height="60" />
                                        <div class="bet-box-widget">
                                            <img src="${Image(gameData.contract_icon)}" width="30" height="30" />
                                            <p class="merienda-text-widget text-black" style="width: 100%; text-align: center; font-size: 1.35rem; text-spacing: 10px;">${item.size.substring(0, item.size.length - 2)}<span style="color: ${color_size}">${item.size.substring(item.size.length - 2)}</span></p>
                                            <p class="text-black-token">${gameData.symbol}</p>
                                        </div>
                                        <img class="position-relative-widget ${dis_min}" src="https://game-widget.vercel.app/images/49.png" alt="" width="150" height="60" />
                                    </div>
                                </div>
                            </div>
                        `;
                    } else if (item.status === 'ACTIVE') {
                        card.className = `card-widget`;
                        card.id = `${item.id}`
                        card.innerHTML = `
                            <div class="card-header-widget">
                                <p class="merienda-text-widget text-black text-id">BTC - ${item.id}</p>
                                <p style="color: blue" class="merienda-text-widget text-black text-status">${item.status}</p>
                            </div>
                            <div class="card-line-widget"/>
                            <div class="betted-contaciner-widget">
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget text-49-widget">49</p>
                                    <p id="min_total_${item.id}" class="merienda-text-widget text-49-widget">${item.min}<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget text-50-widget">50</p>
                                    <p id="max_total_${item.id}" class="merienda-text-widget text-50-widget">${item.max}<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                            </div>
                            <div class="card-content-widget">
                                <div class="container">
                                    <img src="https://game-widget.vercel.app/images/retanger.png" width="180" />
                                    <div class="overlay-widget">
                                        <img id="btn-max-widget" class="position-relative-widget" src="https://game-widget.vercel.app/images/50.png" alt="" width="150" height="60" />
                                        <div class="bet-box-widget">
                                            <img src="${Image(gameData.contract_icon)}" width="20" height="20" />
                                            <div style="display: flex; justify-content: space-around; width: inherit; gap: 5px">
                                                <button id="btn-mine-widget" class="btn-mp-widget">➖</button>
                                                <input class="input-token-widget text-black" style="width: 100%" type="number" value="5" min=${gameData.min_bet_amount} max=${gameData.max_bet_amount} placeholder="Enter token to bet" />
                                                <button id="btn-plus-widget" class="btn-mp-widget">➕</button>
                                            </div>
                                            <p class="text-black-token">${gameData.symbol}</p>
                                        </div>
                                        <img id="btn-min-widget" class="position-relative-widget " src="https://game-widget.vercel.app/images/49.png" alt="" width="150" height="60" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-filter-widget ${!item.issummar && "no-display-widget"} ">
                                <div class="updown-widget" ><dotlottie-player src="https://lottie.host/a1fcfa91-d888-42b6-81cf-66500f61a342/tdWY7X3hp2.lottie" background="transparent" speed="1" style="width: 120px; height: 120px" loop autoplay></dotlottie-player></div>
                                <p class="merienda-text-widget" >Summarizing,</p>
                                <p class="merienda-text-widget" > Waiting for new transactions</p>
                            </div>
                            <img class="logo-dog-widget" src="https://game-widget.vercel.app/images/dog.png" />
                        `;
                    }
                    currentIndex = rounds.findIndex(item => item.status === "ACTIVE")
                    return card;
                });
                // Append all cards to the slider
                children.forEach(child => slider.appendChild(child));
            }

            renderCard();

            function updateSlider() {
                if (rounds.length === 0) {
                    return;
                } else {
                    const cards = document.querySelectorAll('.card-widget');
                    const cardWidth = cards[0].offsetWidth + 20;
                    const containerWidth = document.querySelector('.actions-container-widget').offsetWidth;
                    const offset = (-currentIndex * cardWidth + (containerWidth - cardWidth) / 2) + 10;
                    slider.style.transform = `translateX(${offset}px)`;
                    slider.style.width = `${cards.length * (cardWidth)}px`;

                    // Update active state
                    cards.forEach((card, index) => {
                        card.classList.toggle('active-widget-widget', index === currentIndex);
                    });
                }
            }

            updateSlider()

            //Transfer token
            async function TransferToken(value) {

                try {

                    const abi = ["function transfer(address to, uint256 value) public returns (bool)", "function decimals() view returns (uint256)"];
                    const tokenContract = new ethers.Contract(gameData.contract_address, abi, singer_wallet);
                    const recipient = gameData.master_wallet_address;
                    const decimals = await tokenContract.decimals();
                    const amount = ethers.utils.parseUnits(value, decimals);
                    const tx = await tokenContract.transfer(recipient, amount);
                    const data = await tx.wait()
                    return { status: true, data }
                } catch (error) {
                    if (error.toString().includes('estimate gas')) {
                        showNoti("🔴 Insufficient balance")
                    }
                    if (error.toString().includes('user rejected')) {
                        showNoti("🔴 Transaction canceled")
                    }
                    return { status: false, data: error }
                }
            }

            slider.addEventListener('click', async (event) => {
                const id_click = event.target.id
                const card = event.target.closest('.card-widget');
                const input = card.querySelector('.input-token-widget');
                const index_block = rounds.findIndex(item => item.id == card.id)

                const checkValue = () => {
                    if (Number(input.value) > Number(gameData.max_bet_amount)) {
                        showNoti(`🟡 Max bet amount is ${gameData.max_bet_amount}`)
                        return false
                    }
                    if (Number(input.value) < Number(gameData.min_bet_amount)) {
                        showNoti(`🟡 Min bet amount is ${gameData.min_bet_amount}`)
                        return false
                    }
                    return true
                }

                switch (id_click) {
                    case "btn-plus-widget":
                        input.value = Number(input.value) + Number(gameData.bet_step_amount)
                        break;
                    case "btn-mine-widget":
                        input.value = Number(input.value) - Number(gameData.bet_step_amount) > 0 ? Number(input.value) - Number(gameData.bet_step_amount) : gameData.bet_step_amount
                        break;
                    case "btn-min-widget":
                        if (!checkValue()) {
                            return;
                        }
                        function isCheck(n, m) {
                            return n > (m - time_bet)
                        }
                        if (isCheck(current_block.height, rounds[index_block].id)) {
                            return;
                        } else {
                            if (!currentWallet) {
                                showNoti("🟡 Please connect your wallet!!!")
                                return;
                            }

                            if (input.value > 0) {
                                const tx = await TransferToken(input.value)
                                if (tx.status) {
                                    const body = (value, choice) => {
                                        return {
                                            "game_id": gameData.id,
                                            "wallet_address": currentWallet,
                                            "block_height": rounds[index_block].id,
                                            "choice": choice ? "49" : "50",
                                            "bet_amount": value,
                                            "bet_tx_hash": tx.data.transactionHash,
                                        }
                                    }

                                    const bet = await fetch(`${urlAction.bet}`, {
                                        method: "POST",
                                        body: JSON.stringify(body(input.value, event.target.id === 'btn-min-widget'))
                                    }).then(data => data.json()).then(() => true)
                                        .catch(err => {
                                            showNoti(`🔴 Bet Failed !!!`)
                                            return false
                                        })
                                    if (bet) {
                                        rounds[index_block].team = event.target.id === 'btn-min-widget' ? 49 : 50;
                                        rounds[index_block].token = input.value;
                                        showNoti(`🟢 You have been bet ${input.value}${gameData.symbol} for range ${rounds[index_block].team}`, true)
                                        add_coin.play()
                                    }
                                }
                            } else {
                                showNoti('🟡 Please enter the number of tokens');
                            }
                        }
                        break;
                    case "btn-max-widget":
                        if (!checkValue()) {
                            return;
                        }
                        function isCheck(n, m) {
                            return n > (m - time_bet)
                        }

                        if (isCheck(current_block.height, rounds[index_block].id)) {
                            return;
                        } else {
                            if (!currentWallet) {
                                showNoti("🟡 Please connect your wallet!!!")
                                return;
                            }

                            if (input.value > 0) {

                                const tx = await TransferToken(input.value)
                                if (tx.status) {
                                    const body = (value, choice) => {
                                        return {
                                            "game_id": gameData.id,
                                            "wallet_address": currentWallet,
                                            "block_height": rounds[index_block].id,
                                            "choice": choice ? "49" : "50",
                                            "bet_amount": value,
                                            "bet_tx_hash": tx.data.transactionHash,
                                        }
                                    }

                                    const bet = await fetch(`${urlAction.bet}`, {
                                        method: "POST",
                                        body: JSON.stringify(body(input.value, event.target.id === 'btn-min-widget'))
                                    }).then(data => data.json()).then(() => true)
                                        .catch(err => {
                                            showNoti(`🔴 Bet Failed !!!`)
                                            return false
                                        })
                                    if (bet) {
                                        rounds[index_block].team = event.target.id === 'btn-min-widget' ? 49 : 50;
                                        rounds[index_block].token = input.value;
                                        showNoti(`🟢 You have been bet ${input.value}${gameData.symbol} for range ${rounds[index_block].team}`, true)
                                        add_coin.play()
                                    }

                                }
                            } else {
                                showNoti('🟡 Please enter the number of tokens');
                            }
                        }
                        break;
                    default:
                        break;
                }
            });

            function updateClock() {
                if (rounds.length === 0) {
                    return;
                } else {
                    const block_0 = rounds.findIndex(item => item.status === 'ACTIVE')
                    block_count.textContent = `${current_block.height}`;
                    if (current_block.height < rounds[block_0].id) {
                        if ((current_block.height > (rounds[block_0].id - time_bet))) {
                            rounds[block_0].issummar = true
                            const card = document.getElementById(`${rounds[block_0].id}`)
                            const filter = card.querySelector('.card-filter-widget');
                            filter.classList.remove('no-display-widget');
                        }

                    } else {
                        getBetBlock(current_block.hash).then(() => {
                            rounds.push({
                                status: 'ACTIVE',
                                id: nextBetBlock(current_block.height + (number_block - 1) * 10),
                                issummar: false,
                                token: '',
                                team: '',
                                size: '',
                                min: 0,
                                max: 0,
                            })

                            rounds[block_0].status = 'EXPIRED';
                            rounds[block_0].size = bet_block.size + "";
                            rounds[block_0].issummar = false
                            renderCard();
                            updateSlider();
                        })
                    }
                }
            }

            setInterval(updateClock, 10000);
            updateClock()
            window.addEventListener('resize', updateSlider);
        }
        createInitialElements()
    }

    function changeFavicon(url) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
            link.href = url;
            document.title = gameData.name
        }
    }

    // render marqueText
    function renderCommingSoon() {
        const container = document.getElementById(containerId)
        container.style = `display: flex; justify-content: center; padding-top: 20px`

        const style = document.createElement('style');
        style.textContent = `
      * {
        margin: 0; padding: 0; box-sizing: border-box;
        font-family: 'Arial', sans-serif;
      }
      body {
        background-color: #0f172a;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxZTI5M2IiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=');
      }
      .container {
        max-width: 600px;
        width: 90%;
        padding: 2rem;
        background-color: rgba(30, 41, 59, 0.8);
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        text-align: center;
        animation: fadeIn 1s ease-out;
      }
      h1 {
        color: #f8fafc;
        margin-bottom: 1.5rem;
        font-size: 2rem;
      }
      .notification {
        background-color: #334155;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        position: relative;
        overflow: hidden;
      }
      .notification::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 5px;
        height: 100%;
        background-color: #3b82f6;
      }
      .message {
        font-size: 1.2rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
      .countdown {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 2rem 0;
        flex-wrap: wrap;
      }
      .countdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 80px;
      }
      .countdown-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: #3b82f6;
        background-color: #1e293b;
        border-radius: 8px;
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      .countdown-label {
        font-size: 0.9rem;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .btn {
        background-color: #3b82f6;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
        letter-spacing: 0.5px;
      }
      .btn:hover {
        background-color: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .btn:active {
        transform: translateY(0);
      }
      .disabled {
        background-color: #64748b;
        cursor: not-allowed;
      }
      .disabled:hover {
        background-color: #64748b;
        transform: none;
        box-shadow: none;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      .pulse {
        animation: pulse 2s infinite;
      }
    `;
        document.head.appendChild(style);

        // ===== 2. Create HTML Elements via JS =====
        const containerNoti = document.createElement('div');
        containerNoti.className = 'container';
        container.appendChild(containerNoti);

        const title = document.createElement('h1');
        title.textContent = 'Thông Báo Mở Cửa Trò Chơi';
        containerNoti.appendChild(title);

        const notification = document.createElement('div');
        notification.className = 'notification';
        containerNoti.appendChild(notification);

        const message = document.createElement('p');
        message.className = 'message';
        const openTime = document.createElement('strong');
        openTime.id = 'openTime';
        message.innerHTML = `Trò chơi sẽ chính thức mở cửa vào lúc ${new Date(gameData.open_time).toLocaleString("vi-VN")}`;
        message.appendChild(openTime);
        message.innerHTML += '. Hãy chuẩn bị sẵn sàng để tham gia!';
        notification.appendChild(message);

        const countdown = document.createElement('div');
        countdown.className = 'countdown';
        containerNoti.appendChild(countdown);

        const units = ['Ngày', 'Giờ', 'Phút', 'Giây'];
        const ids = ['days', 'hours', 'minutes', 'seconds'];

        ids.forEach((id, i) => {
            const item = document.createElement('div');
            item.className = 'countdown-item';

            const value = document.createElement('div');
            value.className = 'countdown-value';
            value.id = id;
            value.textContent = '00';

            const label = document.createElement('div');
            label.className = 'countdown-label';
            label.textContent = units[i];

            item.appendChild(value);
            item.appendChild(label);
            countdown.appendChild(item);
        });

        // ===== 3. Logic countdown + format thời gian =====
        const openDate = new Date(gameData.open_time).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = openDate - now;

            let [d, h, m, s] = [0, 0, 0, 0];
            if (distance > 0) {
                d = Math.floor(distance / (1000 * 60 * 60 * 24));
                h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                s = Math.floor((distance % (1000 * 60)) / 1000);
            }

            document.getElementById('days').textContent = d.toString().padStart(2, '0');
            document.getElementById('hours').textContent = h.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = s.toString().padStart(2, '0');

            if (distance <= 0) {
                clearInterval(timer);
                document.querySelector('.message').innerHTML = '<strong>Trò chơi chưa được phát hành. Hãy đợi thông báo chính thức và quay lại sau.</strong>';
            }
        };

        // Cập nhật định dạng thời gian mở cửa
        const openDateObj = new Date(openDate);
        const options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
        openTime.textContent = openDateObj.toLocaleString('vi-VN', options);

        // Chạy countdown mỗi giây
        const timer = setInterval(updateCountdown, 1000);
        updateCountdown(); // gọi lần đầu
    }

    function renderWillClose() {
        if (!gameData.close_time) {
            return;
        }
        const container = document.getElementById(containerId)

        const style = document.createElement('style');
        style.textContent = `
            body {
                overflow: hidden;
            }
            .marquee-container {
                position: absolute;
                bottom: 50px;
                width: 100%;
                overflow: hidden;
                height: 30px;
            }
            .marquee-text {
                white-space: nowrap;
                position: relative;
                color:rgb(255, 255, 255);
                font-weight: bold;
                font-size: 1.3em;
                left: 100%;
            }
        `;
        document.head.appendChild(style);

        const marqueeContainer = document.createElement('div');
        marqueeContainer.className = 'marquee-container';
        document.body.appendChild(marqueeContainer);

        const marqueeText = document.createElement('div');
        marqueeText.className = 'marquee-text';
        marqueeText.textContent = `🛠 Trò chơi sẽ tạm khóa vào lúc ${new Date(gameData.close_time).toLocaleString("vi-VN")} để bảo trì, hạn chế giao dịch vào trước khung giờ khóa 30 phút. 🛠`;
        marqueeContainer.appendChild(marqueeText);

        container.appendChild(marqueeText)

        // ===== JS animation =====
        let pos = window.innerWidth;
        let isPaused = false;

        function scrollText() {
            if (!isPaused) {
                pos--;
                if (pos < -marqueeText.offsetWidth) {
                    pos = window.innerWidth;
                }
                marqueeText.style.left = pos + 'px';
            }
            requestAnimationFrame(scrollText);
        }

        scrollText();
    }

    import_js()
    // Genarate UI
    data_game().then((data) => {
        if (data.status === 'draft') {
            gameData = data
            renderCommingSoon()
        } else {
            gameData = data
            changeFavicon(Image(gameData.contract_icon));
            getBlock().then(() => {
                connectBlockChain()
                connectGamedata()
                createTradingCardsWidget(containerId, rounds);
            })
            renderWillClose()
        }

    })

    window.addEventListener("unload", function () {
        if (Ssocket) {
            Ssocket.close();
        }
    });

})();

