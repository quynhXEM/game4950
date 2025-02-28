(function () {
    const containerId = 'trading-cards-widget';
    let container = document.getElementById(containerId);
    if (!container) {
        console.error("Widget need 'trading-cards-widget' box id")
        return;
    }

    const id = container.getAttribute("data-id") || null;
    if (id) {
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
            "chain_id": 1,
            "api_explorer": "https://api.etherscan.io/v2/api",
            "api_url": "https://mainnet.infura.io/v3"
        },
        {
            "name": "Binance Smart Chain",
            "chain_id": 56,
            "api_url": "https://bsc-testnet.infura.io/v3",
            "api_explorer": "https://api.bscscan.com/api"
        },
        {
            "name": "Polygon",
            "chain_id": 137,
            "api_explorer": "https://api.polygonscan.com/api",
            "api_url": "https://polygon-mainnet.infura.io/v3"
        },
        {
            "name": "Avalanche (Coming Soon)",
            "chain_id": 43114,
            "api_explorer": "https://snowtrace.io",
            "api_url": "https://avalanche-mainnet.infura.io/v3"
        },
        {
            "name": "Arbitrum One",
            "chain_id": 42161,
            "api_explorer": "https://api.arbiscan.io/api",
            "api_url": "https://arbitrum-mainnet.infura.io/v3"
        },
        {
            "name": "Optimism Ethescan",
            "chain_id": 10,
            "api_explorer": "https://api-optimistic.etherscan.io/api",
            "api_url": "https://optimism-mainnet.infura.io/v3"
        },
        {
            "name": "Celo",
            "chain_id": 42220,
            "api_explorer": "https://api.celoscan.io/api",
            "api_url": "https://celo-mainnet.infura.io/v3"
        },
        {
            "name": "Ethereum Sepolia Testnet",
            "chain_id": 11155111,
            "api_explorer": "https://api-sepolia.etherscan.io/api",
            "api_url": "https://sepolia.infura.io/v3"
        },
        {
            "name": "BSC Testnet",
            "chain_id": 97,
            "api_explorer": "https://api-testnet.bscscan.com/api",
            "api_url": "https://bsc-testnet.infura.io/v3"
        },
        {
            "name": "Avalanche Fuji Testnet (Coming Soon)",
            "chain_id": 43113,
            "api_explorer": "https://testnet.snowtrace.io",
            "api_url": "https://avalanche-fuji.infura.io/v3"
        },
        {
            "name": "Fantom",
            "chain_id": 250,
            "api_explorer": "https://api.ftmscan.com/api",
            "api_url": "https://rpc.ftm.tools"
        },
        {
            "name": "Cronos",
            "chain_id": 25,
            "api_explorer": "https://api.cronoscan.com/api",
            "api_url": "https://evm.cronos.org"
        },
        {
            "name": "Moonbeam",
            "chain_id": 1284,
            "api_explorer": "https://api-moonbeam.moonscan.io/api",
            "api_url": "https://1rpc.io/glmr"
        },
        {
            "name": "Moonbase Alpha Testnet",
            "chain_id": 1287,
            "api_explorer": "https://api-moonbase.moonscan.io/api",
            "api_url": "https://rpc.testnet.moonbeam.network"
        }
    ]

    let rounds = [{
        status: "EXPIRED",
        id: "0000000",
        size: "2374651",
        token: 0,
        team: ''
    }];
    let histories = [
        { id: "9234293", size: "8342837" },
        { id: "9234292", size: "8342865" },
        { id: "9234291", size: "8342835" },
        { id: "9234290", size: "8342876" },
        { id: "9234289", size: "8342890" },
        { id: "9234288", size: "8342872" },
        { id: "9234287", size: "8342801" },
        { id: "9234286", size: "8342855" },
        { id: "9234285", size: "8342849" },
        { id: "9234284", size: "8342850" },
    ]
    let gameData;
    let current_block;
    let singer_wallet;
    let bet_block;
    const time_bet = 6;
    const number_block = 5;
    let currentIndex = 0;
    let currentWallet = '';
    let Ssocket;
    let NotiFy;
    // Hàm xử lý 
    function Image(id) {
        return `https://soc.bitrefund.co/assets/${id}`
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
        const data = await fetch(`https://get-game.nguyenxuanquynh1812nc1.workers.dev/${id}`, {
            method: "GET"
        })
            .then((data) => data.json())
            .then((data) => {
                return data.data
            })
            .catch((err) => {
                return null
            })

        const providerUrl = getNetwork(data.network).api_url + "/379175b6c6c3436eab583d759cdeea5e"

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
        current_block = await fetch("https://block.nguyenxuanquynh1812nc1.workers.dev/", {
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
            })
        }
    }

    // Get Info Block Betted
    async function getBetBlock(hash_block) {
        bet_block = await fetch(`https://block-info.nguyenxuanquynh1812nc1.workers.dev/${hash_block}`, {
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

    // Connect WSS data game
    function connectGamedata() {
        Ssocket = new WebSocket('wss://soc.bitrefund.co/websocket')

        Ssocket.onopen = function (event) {
            Ssocket.send(JSON.stringify({
                type: 'auth',
                access_token: ""
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
                                collection: 'game',
                                query: {
                                    filter: {
                                        "id": {
                                            "_eq": gameData.id
                                        }
                                    },
                                    fields: [
                                        '*',
                                    ]
                                }
                            })
                        )
                    }
                    break;
                case 'subscription':
                    const { data } = response;
                    switch (response.event) {
                        case 'init':

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
    function createTradingCardsWidget(containerId) {
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
                height: 330px;
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
                font-size: large;
                font-family: system-ui;
                font-weight: 500;
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
                .card-modal-widget {
                    margin: 10% 20%;
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
                justify-content: center;
                border: 1px solid #ccc;
                background-color: white;
                height: 50px;
                width: 90%;
                border-radius: 4px;
                padding: 0px 10px;
            }
            .bet-box-widget input {
                margin: 0 10px;
                font-size: 1.35rem;
                border: none;
                outline: none;
                text-align: center;
                width: 100%;
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
                flex:1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border-radius: 10px;
            }
            .tilte-modal-widget {
                font-family: "Merienda", serif;
                font-weight: 700;
                font-size: 1.5rem;
                color: black;
                margin-top: 20px;
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
            background_modal_noti.id = "bg-modal-widget"
            const card_modal_noti = document.createElement('div')
            card_modal_noti.className = "card-modal-widget"
            const title_noti = document.createElement('p')
            title_noti.className = "tilte-modal-widget"

            card_modal_noti.appendChild(title_noti)
            background_modal_noti.appendChild(card_modal_noti)
            document.body.appendChild(background_modal_noti)

            // Modal how to play
            const background_modal_info = document.createElement('div')
            background_modal_info.className = "bg-modal-widget none"
            background_modal_info.id = "bg-modal-widget"
            const card_modal_info = document.createElement('div')
            card_modal_info.className = "card-modal-widget"
            const title_info = document.createElement('p')
            title_info.className = "tilte-modal-widget"
            title_info.innerText = "How to play ?"
            const content_info = document.createElement('div')
            content_info.className = "content-modal-widget"
            content_info.innerHTML = `
                    <p>Welcome to <span class="text-highlight-widget">49-50 Game</span>, an exciting blockchain-based betting game! Follow these steps to start playing and maximize your winnings.</p>
                    
                    <h3>Step 1: Connect Your Wallet</h3>
                    <ul>
                        <li>To participate, you must connect your cryptocurrency wallet to the game.</li>
                        <li>Ensure your wallet contains <span class="text-highlight-widget">${gameData.symbol}</span> for betting and some BNB for transaction fees.</li>
                    </ul>
                    
                    <h3>Step 2: Understanding the Game Rounds</h3>
                    <ul>
                        <li>Each game round lasts for <span class="text-highlight-widget">10 BTC blockchain blocks</span>.</li>
                        <li>You will be betting on the last two decimal digits of the "size" of a specific BTC block.</li>
                        <li>You need to predict whether the value falls within <span class="text-highlight-widget">0-49</span> or <span class="text-highlight-widget">50-99</span>.</li>
                    </ul>
                    
                    <h3>Step 3: Placing a Bet</h3>
                    <ul>
                        <li>Choose the amount of <span class="text-highlight-widget">${gameData.symbol}</span> you wish to bet in a specific round.</li>
                        <li>Select your prediction range (<span class="text-highlight-widget">0-49</span> or <span class="text-highlight-widget">50-99</span>).</li>
                        <li>You have <span class="text-highlight-widget">5 blocks</span> from the start of the round to place your bet before the betting phase is locked.</li>
                    </ul>
                    
                    <h3>Step 4: Awaiting Results</h3>
                    <ul>
                        <li>After the betting phase ends, wait for the corresponding BTC block information to be published.</li>
                        <li>The result is determined based on the last two decimal digits of the block size.</li>
                    </ul>
                    
                    <h3>Step 5: Winning and Payouts</h3>
                    <ul>
                        <li>If your prediction is correct, you win a share of the losing side's total bet, after deducting the game fee.</li>
                        <li>Winnings are distributed proportionally based on your bet amount relative to the total pool.</li>
                    </ul>
                    
                    <h3>Additional Notes</h3>
                    <ul>
                        <li>Only <span class="text-highlight-widget">${gameData.symbol}</span> is accepted for betting.</li>
                        <li>Make sure to have enough BNB in your wallet to cover transaction fees.</li>
                    </ul>
                    
                    <p>Enjoy the game and good luck!</p>
            `

            card_modal_info.appendChild(title_info)
            card_modal_info.appendChild(content_info)
            background_modal_info.appendChild(card_modal_info)
            document.body.appendChild(background_modal_info)

            // Modal history
            const background_modal = document.createElement('div')
            background_modal.className = "bg-modal-widget none"
            background_modal.id = "bg-modal-widget"
            const card_modal = document.createElement('div')
            card_modal.className = "card-modal-widget"
            const title_his = document.createElement('p')
            title_his.className = "tilte-modal-widget"
            title_his.innerText = "History games"
            const content_his = document.createElement('div')
            content_his.className = "content-modal-his-widget"
            histories.forEach(item => {
                const his_item = document.createElement('div')
                his_item.style = `
                    display: flex;
                    flex: 1;
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center; 
                    gap: 10px;
                `
                const his_id = document.createElement('p')
                his_id.innerText = `BTC - ${item.id}`
                his_id.className = "text-black merienda-text-widget"
                his_id.style = `
                    text-wrap: nowrap
                `
                const his_size = document.createElement('div')
                his_size.style = `
                    border-radius: 5px;
                    background-color: ${Number(item.size.substring(item.size.length - 2)) > 49 ? color.green : color.red};
                    font-family: "Merienda", serif;
                    font-weight: 700;
                    color: white;
                    padding: 10px;
                    font-size: 12px
                `
                his_size.textContent = item.size.substring(item.size.length - 2)

                his_item.appendChild(his_id)
                his_item.appendChild(his_size)
                content_his.appendChild(his_item)
            })
            card_modal.appendChild(title_his)
            card_modal.appendChild(content_his)
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

            function showNoti(noti) {
                title_noti.innerText = noti
                background_modal_noti.className = "bg-modal-widget block"
            }

            btnwallet.addEventListener('click', async () => {
                const provider = typeof window.ethereum !== "undefined"
                    ? new ethers.providers.Web3Provider(window.ethereum)
                    : null;

                function isMobileDevice() {
                    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                }

                if (isMobileDevice()) {
                    try {
                        const WalletConnectProvider = window.WalletConnectProvider;
                        const walletProvider = new WalletConnectProvider({
                            bridge: "https://bridge.walletconnect.org",
                        });

                        await walletProvider.enable();
                        const web3Provider = new ethers.providers.Web3Provider(walletProvider);
                        const signer = web3Provider.getSigner();
                        const address = await signer.getAddress();

                        showNoti(address)
                        btnwallet_text.innerText = `✅ ${address.slice(0, 6)}...${address.slice(-4)}`;
                        btnwallet.disabled = true;
                    } catch (err) {
                        showNoti("Cannot connect Wallet on Phone")
                        console.error("Lỗi kết nối WalletConnect:", err);
                    }
                } else {
                    // PC
                    if (provider) {
                        try {
                            await window.ethereum.request({ method: "eth_requestAccounts" });
                            singer_wallet = provider.getSigner();
                            const address = await singer_wallet.getAddress();
                            btnwallet_text.innerText = `${address.slice(0, 6)}...${address.slice(-4)}`;
                            btnwallet.disabled = true;
                            currentWallet = address;
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

            });

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

            background_modal.addEventListener('click', () => {
                background_modal.className = "bg-modal-widget none"
            })

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
                                    <p class="merienda-text-widget text-49-widget">97,29347<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget text-50-widget">50</p>
                                    <p class="merienda-text-widget text-50-widget">97,29347<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                            </div>
                            <div class="card-content-widget">
                                <div class="container">
                                    <img src="https://game-widget.vercel.app/images/retanger.png" width="180" />
                                    <div class="overlay-widget">
                                        <img class="position-relative-widget ${dis_max}" src="https://game-widget.vercel.app/images/50.png" alt="" width="150" height="60" />
                                        <div class="bet-box-widget">
                                            <img src="${Image(gameData.icon)}" width="30" height="30" />
                                            <p class="merienda-text-widget" style="width: 100%; text-align: center; font-size: 1.35rem; text-spacing: 10px;">${item.size.substring(0, item.size.length - 2)}<span style="color: ${color_size}">${item.size.substring(item.size.length - 2)}</span></p>
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
                                    <p class="merienda-text-widget text-49-widget">97,29347<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget text-50-widget">50</p>
                                    <p class="merienda-text-widget text-50-widget">97,29347<span class="text-black-token">${gameData.symbol}</span></p>
                                </div>
                            </div>
                            <div class="card-content-widget">
                                <div class="container">
                                    <img src="https://game-widget.vercel.app/images/retanger.png" width="180" />
                                    <div class="overlay-widget">
                                        <img id="btn-max-widget" class="position-relative-widget" src="https://game-widget.vercel.app/images/50.png" alt="" width="150" height="60" />
                                        <div class="bet-box-widget">
                                            <img src="${Image(gameData.icon)}" width="30" height="30" />
                                            <input class="input-token-widget" type="number" placeholder="Enter token to bet" />
                                             <p class="merienda-text-widget betting" style="width: 100%; text-align: center; font-size: 1.15rem; text-spacing: 10px; display: none;"></p>
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
                    const recipient = gameData.wallet_address;
                    const decimals = await tokenContract.decimals();
                    const amount = ethers.utils.parseUnits(value, decimals);
                    const tx = await tokenContract.transfer(recipient, amount);
                    return true
                } catch (error) {
                    showNoti(error.toString().split(';')[0])
                    return false
                }
            }

            slider.addEventListener('click', async (event) => {
                if (event.target.id === 'btn-min-widget' || event.target.id === 'btn-max-widget') {
                    const card = event.target.closest('.card-widget');
                    const input = card.querySelector('.input-token-widget');
                    const index_block = rounds.findIndex(item => item.id == card.id)

                    function isCheck(n, m) {
                        return n > (m - time_bet)
                    }

                    if (isCheck(current_block.height, rounds[index_block].id)) {
                        return;
                    } else {
                        if (!currentWallet) {
                            showNoti("Please connect your wallet!!!")
                            return;
                        }

                        if (rounds[index_block].team) {
                            showNoti("You have already bet on this transactions!!")
                            return;
                        }

                        if (input.value > 0) {
                            const tx = await TransferToken(input.value)
                            if (tx) {
                                rounds[index_block].team = event.target.id === 'btn-min-widget' ? 49 : 50;
                                rounds[index_block].token = input.value;
                                input.disabled = true;
                                input.style.display = 'none';
                                const betting = card.querySelector('.betting');
                                betting.style.display = 'block'
                                betting.innerText = `Betting team ${rounds[index_block].team} width  ${rounds[index_block].token}`
                                showNoti(`You have been bet ${input.value}${gameData.symbol} for range ${rounds[index_block].team}`)
                            }
                        } else {

                            showNoti('Please enter the number of tokens');
                        }
                    }

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
                            })

                            function burnToken(n) {
                                return parseFloat(n) * 90 / 100
                            }
                            function getRessault() {
                                return rounds[block_0].size.substring(rounds[block_0].size.length - 2)
                            }

                            if (rounds[block_0].team) {
                                if ((rounds[block_0].team === 49) && (getRessault() < 50)) {
                                    showNoti(`You win $${burnToken(rounds[block_0].token)}`);
                                } else if ((rounds[block_0].team === 50) && (getRessault() > 49)) {
                                    showNoti(`You win $${burnToken(rounds[block_0].token)}`);
                                } else {
                                    showNoti('You lose');
                                }
                            }

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
        }
    }

    import_js()
    // Genarate UI
    data_game().then((data) => {
        gameData = data
        changeFavicon(Image(gameData.icon));
        // connectGamedata()
        getBlock().then(() => {
            connectBlockChain()
            createTradingCardsWidget(containerId);
        })
    })

    window.addEventListener("unload", function () {
        if (Ssocket) {
            Ssocket.close();
        }
    });

})();

