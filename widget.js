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
        window.location.reload('https://new.bitrefund.co/')
    }

    const color = {
        red : "#FF3F3F",
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
    let isinfo = false;
    let ishistory = false;
    let temp = [];
    let gameData;
    let current_block;
    let bet_block;
    const time_bet = 6;
    const number_block = 5;

    const value_bet = "Size Block prediction of Bitcoin"
    let currentIndex = 0;
    let currentWallet = '';

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
                console.log("ERR ===", err)
                return false;
            })

        if (!current_block) {
            window.location.reload()
        }

        bet_block = { height: nextBetBlock(current_block.height) }

        for (let i = 0; i < number_block; i++) {
            temp.push({
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
                console.log("ERR ===", err)
                return false;
            })
    }

    // Connect WSS and listen new block
    function connect() {
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
            setTimeout(connect, 1000);
        };

        socket.onerror = function (error) {
            console.error('WebSocket error:', error);
        };
    }

    // Create Card and add Function, action button
    function createTradingCardsWidget(containerId) {
        // Inject CSS styles
        const style = document.createElement('style');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
        script.type = 'module';
        style.textContent = `
            .slider-widget {
                display: flex;
                transition: transform 0.5s ease;
                gap: 20px;
                margin-top: 50px;
            }
            
            .merienda-text-widget {
                font-family: "Merienda", serif;
                font-optical-sizing: auto;
                font-weight: 700;
                font-style: normal;
                margin: 0px;
            }

            .slider-container-widget {
                background-color: red;
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
                min-width: 280px;
                height: 300px;
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
    
            .card-content-widget {
                position: relative;
                padding: 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-self: center;
                align-items: center;
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
                background-color: gray;
                cursor: not-allowed;
                opacity: 0.5;
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
    
            .input-token-widget {
                border: 0.5px solid gray;
                border-radius: 5px;
                min-height: 30px;
                margin-top: 10px;
                color: black;
                width: 94%;
                padding-left: 10px;
                overflow: hidden;
                font-size: 12px;
                font-weight: bold;
                outline: none;
                font-family: "Merienda", serif;
                font-optical-sizing: auto;
                font-weight: 700;
                font-style: normal;
            }
    
            .input-token-widget:focus {
                outline: none;
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
                text-wrap: nowrap;
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
                    min-width: 280px;
                }
            }
    
            @media (max-width: 480px) {
                .card-widget {
                    min-width: 260px;
                }
    
                .container-widget {
                    padding: 10px;
                }
            }
        `;
        document.head.appendChild(style);
        document.head.appendChild(script);
        // Create or find widget container

        function createInitialElements() {
            const container = document.getElementById(containerId)
            container.style = `animation: moveBackground 45s infinite linear; overflow: hidden; background-image: url('https://game-widget.vercel.app/images/decktop.jpg');height: 100%; width: 100%;`
            const sliderContainer = document.createElement('div');
            sliderContainer.id = "slider-container-widget"

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

                        alert(address)
                        btnwallet_text.innerText = `✅ ${address.slice(0, 6)}...${address.slice(-4)}`;
                        btnwallet.disabled = true;
                    } catch (err) {
                        alert("Cannot connect Wallet on Phone")
                        console.error("Lỗi kết nối WalletConnect:", err);
                    }
                } else {
                    // PC
                    if (provider) {
                        try {
                            await window.ethereum.request({ method: "eth_requestAccounts" });
                            const signer = provider.getSigner();
                            const address = await signer.getAddress();
                            btnwallet_text.innerText = `${address.slice(0, 6)}...${address.slice(-4)}`;
                            btnwallet.disabled = true;
                            currentWallet = address;
                        } catch (err) {
                            alert("Connect Wallet failed ")
                        }
                    } else {
                        alert("⚠️ Install Metamask to continute");
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

            function renderCard() {
                if (temp.length === 0) {
                    return;
                }
                slider.innerHTML = '';
                const children = temp.map((item, index) => {
                    const card = document.createElement('div');
                    if (item.status === 'EXPIRED') {
                        const dis_min = Number(item.size.substring(item.size.length - 2)) < 50 && 'btn-disable';
                        const dis_max = Number(item.size.substring(item.size.length - 2)) > 49 && 'btn-disable';
                        card.className = 'card-widget card-expired-widget';
                        card.innerHTML = `
                            <div id="${index}" class="card-header-widget">
                                <div class="status-widget">
                                    <div class="status-dot-expired-widget">
                                        <img src="${Image(gameData.icon)}" class="logo-widget"/>
                                    </div>
                                    ${item.status}
                                </div>
                                <div class="id-widget">BTC~${item.id}</div>
                            </div>
                            <div class="card-content-widget">
                                <button class="btn-widget btn-expired-widget btn-50-widget ${dis_min}"><p class="text-range-widget text-range-max-widget">50</p></button>
                                <div class="content-bet-widget">
                                    <div class="price-content-widget">
                                        <img class="coin-img-widget" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                                        <p class="text-price-widget merienda-text-widget">${value_bet}</p>
                                    </div>
                                    <div class="price-content-widget">
                                        <h3 class="last-price-widget">
                                            $${item.size.substring(0, item.size.length - 2)}
                                            <span class="final-price-widget">
                                            ${item.size.substring(item.size.length - 2)}
                                            </span>
                                        </h3>
                                    
                                    </div>
                                </div>
                                <button class="btn-widget btn-expired-widget btn-49-widget ${dis_max}"><p class="text-range-widget text-range-min-widget">49</p></button>
                            </div>
                        `;
                    } else if (item.status === 'ACTIVE') {
                        card.className = `card-widget`;
                        card.id = `${item.id}`
                        card.innerHTML = `
                            <div class="card-header-widget">
                                <p class="merienda-text-widget text-black" style="font-size: 14px;">BTC - ${item.id}</p>
                                <p class="merienda-text-widget text-black" style="font-size: 10px;">${item.status}</p>
                            </div>
                            <div class="card-line-widget"/>
                            <div class="betted-contaciner-widget">
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget" style="color: ${color.red}">49</p>
                                    <p class="merienda-text-widget" style="color: ${color.red}">97,29347<span style="color: black;">${gameData.symbol}</span></p>
                                </div>
                                <div class="content-betted-widget">
                                    <p class="merienda-text-widget" style="color: ${color.green}">50</p>
                                    <p class="merienda-text-widget" style="color: ${color.green}">97,29347<span style="color: black;">${gameData.symbol}</span></p>
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
                    currentIndex = temp.findIndex(item => item.status === "ACTIVE")
                    return card;
                });
                // Append all cards to the slider
                children.forEach(child => slider.appendChild(child));
            }
            

            renderCard();

            function updateSlider() {
                if (temp.length === 0) {
                    return;
                } else {
                    const cards = document.querySelectorAll('.card-widget');
                    const cardWidth = cards[0].offsetWidth + 20;
                    const containerWidth = document.querySelector('.actions-container-widget').offsetWidth;
                    const offset = -currentIndex * cardWidth + (containerWidth - cardWidth) / 2;
                    slider.style.transform = `translateX(${offset}px)`;
                    slider.style.width = `${cards.length * (cardWidth)}px`;

                    // Update active state
                    cards.forEach((card, index) => {
                        card.classList.toggle('active-widget-widget', index === currentIndex);
                    });
                }
            }

            updateSlider()

            slider.addEventListener('click', (event) => {
                if (event.target.id === 'btn-min-widget' || event.target.id === 'btn-max-widget') {
                    const card = event.target.closest('.card-widget');
                    const input = card.querySelector('.input-token-widget');
                    const index_block = temp.findIndex(item => item.id == card.id)

                    function isCheck(n, m) {
                        return n > (m - time_bet)
                    }

                    if (isCheck(current_block.height, temp[index_block].id)) {
                        return;
                    } else {
                        if (temp[index_block].team) {
                            alert('You have already bet on this transactions');
                            return;
                        }

                        if (!currentWallet) {
                            alert('Please connect your wallet');
                            return;
                        }

                        if (input.value > 0) {
                            input.style.display = 'none';
                            temp[index_block].team = event.target.id === 'btn-min-widget' ? 49 : 50;
                            temp[index_block].token = input.value
                            const price = card.querySelector('.now-price-widget');
                            price.style.display = 'block';
                            price.innerHTML = `You bet: ${temp[index_block].token} ${gameData.symbol} for ${temp[index_block].team}`

                        } else {
                            alert('Please enter the number of tokens');
                        }
                    }

                }

                if (event.target.className === "card-header-widget") {
                    currentIndex = Number(event.target.id);
                    updateSlider()
                }
            });

            function updateClock() {
                if (temp.length === 0) {
                    return;
                } else {
                    const block_0 = temp.findIndex(item => item.status === 'ACTIVE')
                    block_count.textContent = `${current_block.height}`;
                    if (current_block.height < temp[block_0].id) {
                        if ((current_block.height > (temp[block_0].id - time_bet))) {
                            temp[block_0].issummar = true
                            const card = document.getElementById(`${temp[block_0].id}`)
                            const filter = card.querySelector('.card-filter-widget');
                            filter.classList.remove('no-display-widget');
                        }

                    } else {
                        getBetBlock(current_block.hash).then(() => {

                            temp.push({
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
                                return temp[block_0].size.substring(temp[block_0].size.length - 2)
                            }

                            if (temp[block_0].team) {
                                if ((temp[block_0].team === 49) && (getRessault() < 50)) {
                                    alert(`You win $${burnToken(temp[block_0].token)}`);
                                } else if ((temp[block_0].team === 50) && (getRessault() > 49)) {
                                    alert(`You win $${burnToken(temp[block_0].token)}`);
                                } else {
                                    alert('You lose');
                                }
                            }

                            temp[block_0].status = 'EXPIRED';
                            temp[block_0].size = bet_block.size + "";
                            temp[block_0].issummar = false

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
        getBlock().then(() => {
            connect()
            createTradingCardsWidget(containerId);
        })
    })

})();

