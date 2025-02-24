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
    let temp = [];
    let gameData;
    let current_block;
    let bet_block;
    const time_bet = 6;
    const number_block = 5;

    const value_bet = "Size Block prediction of Bitcoin"
    //
    let currentIndex = 0;
    let currentWallet = '';

    // Load ethers.js từ CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js";
    document.head.appendChild(script);

    const script_wallet = document.createElement("script");
    script_wallet.src = "https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.7.8/dist/umd/index.min.js";
    document.head.appendChild(script_wallet);

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
        script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js';
        script.type = 'module';
        style.textContent = `
            .container-widget {
                position: relative;
                padding: 20px;
                background: #090a0c;
            }
    
            .slider-container-widget {
                position: relative;
                overflow: hidden;
                width: 100%;
                flex: 1;
            }
    
            .slider-widget {
                display: flex;
                padding: 5px;
                transition: transform 0.5s ease;
                gap: 20px;
                margin-top: 15px;
            }

            .info-modal-widget {
                width: 100%;
                height: 100%;
                flex: 1;
                position: relative;
            }
    
            .card-widget {
                min-width: 280px;
                position: relative;
                transition: all 0.3s ease;
                transform: scale(0.9);
                border-radius: 20px;
                overflow: hidden;
                background-color: white;
                border: 1px solid rgb(0, 0, 0);
            }
            .card-widget.active-widget {
                transform: scale(1.05);
            }
    
            .card-header-widget {
                color: white;
                padding: 10px 15px;
                border-radius: 10px 10px 0 0;
                border-bottom: 3px solid #6c5ce7;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }

            .logo-widget {
                width: 20px;
                height: 20px;
                border-radius: 50%
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
                left: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: white;
                z-index: 3;
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

            .info-button-widget {
                padding: 10px 100px;
                margin-top: 10px;
                border: 1px solid black;
                background: #ffffff;
                color: rgb(0, 0, 0);
                font-size: 12px;
                font-weight: bold;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: opacity 0.3s;
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
                font-family: 'Courier New', Courier, monospace;
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
                font-family: 'Courier New', Courier, monospace;
                font-weight: bold;
                outline: none;
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
                padding: 10px 20px;
                border: none;
                background: #6c5ce7;
                color: white;
                border-radius: 5px;
                margin-top: 10px;
                cursor: pointer;
            }
    
            .nav-btn-widget:hover {
                opacity: 0.8;
            }
    
            .nav-btn-widget:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
    
            .actions-container-widget {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
    
            .btn-wallet-widget {
                padding: 0px 10px;
                margin-top: 10px;
                border: 2px solid black;
                background: #ffffff;
                color: rgb(0, 0, 0);
                font-size: 12px;
                font-weight: bold;
                font-family: 'Courier New', Courier, monospace;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: opacity 0.3s;
            }
    
            .btn-wallet-text-widget {
                text-wrap: nowrap;
            }
    
            .btn-wallet-widget:hover {
                opacity: 0.9;
            }
    
            .icon-widget {
                width: 20px;
                height: 20px;
                margin: 0px 5px;
            }
    
            .time-clock-widget {
                padding: 0px 10px;
                margin-top: 10px;
                border: 2px solid black;
                background: #ffffff;
                color: rgb(0, 0, 0);
                font-size: 13px;
                font-weight: bold;
                font-family: 'Courier New', Courier, monospace;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                transition: opacity 0.3s;
            }
    
            .no-display-widget {
                display: none;
            }
    
            .now-price-widget {
                display: none
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
            container.style = `
               position: relative;
                overflow: hidden;
                width: 100%;
                flex: 1;
            `

            const sliderContainer = document.createElement('div');
            sliderContainer.id = "slider-container-widget"

            // Create the actions container
            const actionsContainer = document.createElement("div");
            actionsContainer.className = "actions-container-widget";

            // Create the wallet button
            const walletButton = document.createElement("button");
            walletButton.className = "btn-wallet-widget";

            const walletIcon = document.createElement("img");
            walletIcon.className = "icon-widget";
            walletIcon.src = "https://e7.pngegg.com/pngimages/337/177/png-clipart-bitcoin-cryptocurrency-wallet-blockchain-bitcoin-text-rectangle.png";

            const walletText = document.createElement("p");
            walletText.className = "btn-wallet-text-widget";
            walletText.textContent = "Wallet";

            walletButton.appendChild(walletIcon);
            walletButton.appendChild(walletText);

            // Create the time clock
            const timeClock = document.createElement("div");
            timeClock.className = "time-clock-widget";

            const timeCount = document.createElement("p");
            timeCount.className = "time-count-widget";

            const clockIcon = document.createElement("img");
            clockIcon.className = "icon-widget";
            clockIcon.src = "https://cdn.freelogovectors.net/wp-content/uploads/2021/12/blockchain-com-logo-freelogovectors.net_.png";

            timeClock.appendChild(clockIcon);
            timeClock.appendChild(timeCount);

            // Append wallet button and time clock to actions container
            actionsContainer.appendChild(walletButton);
            actionsContainer.appendChild(timeClock);


            // Create the slider element
            const slider = document.createElement("div");
            slider.className = "slider-widget";

            // Create navigation buttons
            const navButtons = document.createElement("div");
            navButtons.className = "nav-buttons-widget";

            const prevButton = document.createElement("button");
            prevButton.className = "nav-btn-widget prev-widget";
            prevButton.textContent = "<";

            const nextButton = document.createElement("button");
            nextButton.className = "nav-btn-widget next-widget";
            nextButton.textContent = ">";

            navButtons.appendChild(prevButton);
            navButtons.appendChild(nextButton);

            // Append all elements to the slider container
            sliderContainer.appendChild(actionsContainer);
            sliderContainer.appendChild(slider);
            sliderContainer.appendChild(navButtons);

            container.appendChild(sliderContainer)
            // Append the slider container to the body

            const btnwallet = document.querySelector('.btn-wallet-widget');
            const nextBtn = document.querySelector('.next-widget');
            const pevBtn = document.querySelector('.prev-widget');
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
                        font-family: Arial, sans-serif;
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

            pevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });

            nextBtn.addEventListener('click', () => {
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
                                        <p class="text-price-widget">${value_bet}</p>
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
                            <div id="${index}" class="card-header-widget">
                                <div class="status-widget">
                                    <div class="status-dot-active-widget">
                                        <img src="${Image(gameData.icon)}" class="logo-widget"/>
                                    </div>
                                    ${item.status}
                                </div>
                                <div class="id-widget">BTC~${item.id}</div>
                            </div>
                            <div class="card-content-widget">
                                <button id="btn-max-widget" class="btn-widget btn-50-widget"><p class="text-range-widget text-range-max-widget">50</p></button>
                                <div class="content-bet-widget">
                                    <div class="price-content-widget">
                                        <img class="coin-img-widget" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                                        <p class="text-price-widget">${value_bet}</p>
                                    </div>
                                    <h3 class="now-price-widget last-price-widget">- - -</h3>
                                    <input class="input-token-widget" placeholder="Enter${gameData.symbol} to bet" type="number" min="0.000001" />
                                </div>
                                <button id="btn-min-widget" class="btn-widget btn-49-widget btn-${item.id}"><p class="text-range-widget text-range-min-widget">49</p></button>
                            </div>
                            <div class="card-filter-widget ${!item.issummar && "no-display-widget"} ">
                                <lottie-player src="https://lottie.host/b5652d98-b56c-4b89-9409-b305fc11807b/krUTeNCeSi.json" background="##FFFFFF" speed="1" style="width: 100px; height: 100px" loop autoplay direction="1" mode="normal"></lottie-player>
                                Summarizing, Waiting for new transactions
                            </div>
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

                    // Update button states
                    pevBtn.disabled = currentIndex === 0;
                    nextBtn.disabled = currentIndex === cards.length - 1;
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
                    timeCount.textContent = `${current_block.height}`;
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

    // Genarate UI
    data_game().then((data) => {
        gameData = data
        changeFavicon(Image(gameData.icon));
        getBlock().then(() => {
            connect()
            createTradingCardsWidget(containerId);
            console.log(gameData);

        })
    })

})();

