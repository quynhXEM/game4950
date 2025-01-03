(function () {  // Immediately Invoked Function Expression (IIFE)
    const containerId = 'trading-cards-widget';
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
    }


    function createTradingCardsWidget(containerId) {
        // Inject CSS styles
        const style = document.createElement('style');
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js';
        script.type = 'module';
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            body {
                font-family: Arial, sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #090a0c;
            }
    
            .container {
                position: relative;
                padding: 20px;
                background: #090a0c;
            }
    
            .slider-container {
                position: relative;
                overflow: hidden;
                width: 100%;
                flex: 1;
            }
    
            .slider {
                display: flex;
                padding: 5px;
                transition: transform 0.5s ease;
                gap: 20px;
                margin-top: 15px;
            }
    
            .card {
                min-width: 280px;
                position: relative;
                transition: all 0.3s ease;
                transform: scale(0.9);
                border-radius: 20px;
                overflow: hidden;
                background-color: white;
                border: 1px solid rgb(0, 0, 0);
            }
            .card.active {
                transform: scale(1.05);
            }
    
            .card-header {
                color: white;
                padding: 10px 15px;
                border-radius: 10px 10px 0 0;
                border-bottom: 3px solid #6c5ce7;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }
    
            .card-content {
                position: relative;
                padding: 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-self: center;
                align-items: center;
            }
    
            .card-filter {
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
    
            .content-bet {
                position: absolute;
                width: 90%;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid gray;
                z-index: 2;
                background: white;
            }
    
            .btn {
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
    
            .btn:hover {
                opacity: 0.7;
            }
    
            .btn-49 {
                background-color: #34b253;
            }
    
            .btn-50 {
                background-color: #ef362d;
            }
    
            .btn-disable {
                background-color: gray;
                cursor: not-allowed;
                opacity: 0.5;
            }
    
            .btn-expired {
                cursor: not-allowed;
            }
    
            .text-range {
                transform: rotate(-45deg);
            }
    
            .text-range-min {
                position: absolute;
                right: 20px;
                bottom: 20px;
            }
    
            .text-range-max {
                position: absolute;
                left: 20px;
                top: 20px;
            }
    
            .status {
                display: flex;
                align-items: center;
                gap: 8px;
                color: rgba(16, 18, 121, 0.8);
            }
    
            .status-dot-active {
                width: 15px;
                height: 15px;
                background: rgb(24, 98, 235);
                border-radius: 50%;
            }
    
            .status-dot-expired {
                width: 15px;
                height: 15px;
                background: rgb(95, 95, 95);
                border-radius: 50%;
            }
    
            .status-dot-next {
                width: 15px;
                height: 15px;
                background: rgb(7, 224, 0);
                border-radius: 50%;
            }
    
            .id {
                color: rgba(16, 18, 121, 0.8);
            }
    
            .change {
                font-size: 1rem;
                color: #ff6b9d;
            }
    
            .price-content {
                flex-direction: row;
                display: flex;
                gap: 5px;
                flex: 1;
                align-items: center;
            }
    
            .last-price {
                margin: 10px 0;
                display: flex;
                color: black;
                flex: 1;
                justify-content: start;
            }
    
            .text-price {
                font-size: 10px;
                font-weight: 600;
                color: gray;
            }
    
            .final-price {
                color: red;
            }
    
            .coin-img {
                width: 20px;
                height: 20px;
            }
    
            .input-container {
                padding: 10px;
            }
    
            .input-token {
                border: 1px solid gray;
                border-radius: 5px;
                min-height: 30px;
                margin-top: 10px;
                width: 100%;
                padding-left: 10px;
                overflow: hidden;
                font-size: 12px;
                font-weight: bold;
                outline: none;
            }
    
            .input-token:focus {
                outline: none;
            }
    
            .nav-buttons {
                display: flex;
                justify-content: center;
                gap: 20px;
            }
    
            .nav-btn {
                padding: 10px 20px;
                border: none;
                background: #6c5ce7;
                color: white;
                border-radius: 5px;
                margin-top: 10px;
                cursor: pointer;
            }
    
            .nav-btn:hover {
                opacity: 0.8;
            }
    
            .nav-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
    
            .actions-container {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
    
            .btn-wallet {
                padding: 10px 20px;
                margin-top: 10px;
                border: none;
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
    
            .btn-wallet-text {
                text-wrap: nowrap;
            }
    
            .btn-wallet:hover {
                opacity: 0.9;
            }
    
            .icon {
                width: 20px;
                height: 20px;
                margin: 0px 5px;
            }
    
            .time-clock {
                padding: 10px 20px;
                border: none;
                background: #ffffff;
                color: rgb(0, 0, 0);
                border-radius: 5px;
                font-size: 16px;
                font-weight: 700;
                display: flex;
                margin-top: 10px;
                align-items: center;
                font-family: 'Courier New', Courier, monospace;
                transition: opacity 0.3s;
            }
    
            .no-display {
                display: none;
            }
    
            .now-price {
                display: none
            }
            
            @media (max-width: 768px) {
                .card {
                    min-width: 260px;
                }
            }
    
            @media (max-width: 480px) {
                .card {
                    min-width: 220px;
                }
    
                .container {
                    padding: 10px;
                }
            }
        `;
        document.head.appendChild(style);
        document.head.appendChild(script);
        // Create or find widget container
        const container = document.getElementById(containerId) || document.createElement('div');
        if (!document.getElementById(containerId)) {
            container.id = containerId;
            document.body.appendChild(container);
        }
    
        container.innerHTML = `
            <div class="slider-container"></div>
        `;
    
    
        // Widget data (replace with your data fetching logic)
        let temp = [
            {
                status: 'EXPIRED',
                id: '340212',
                textPrice: 'Dự đoán volume(24) của Bitcoin',
                coinImg: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
                lastPrice: '398724',
            },
            {
                status: 'EXPIRED',
                id: '340212',
                textPrice: 'Dự đoán volume(24) của Bitcoin',
                coinImg: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
                lastPrice: '398756',
            },
            {
                status: 'ACTIVE',
                id: '340213',
                textPrice: 'Dự đoán volume(24) của Bitcoin',
                coinImg: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
                lastPrice: '398724',
            }
        ];
    
        let currentIndex = 0;
        let currentToken = 0;
        let currentWallet = '';
        let currentTeam = '';
    
        // Create initial elements (actions container, slider, nav buttons)
        function createInitialElements() {
            const sliderContainer = container.querySelector('.slider-container');

            container.appendChild(sliderContainer);
            // Create the actions container
            const actionsContainer = document.createElement("div");
            actionsContainer.className = "actions-container";
    
            // Create the wallet button
            const walletButton = document.createElement("button");
            walletButton.className = "btn-wallet";
    
            const walletIcon = document.createElement("img");
            walletIcon.className = "icon";
            walletIcon.src = "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400";
    
            const walletText = document.createElement("p");
            walletText.className = "btn-wallet-text";
            walletText.textContent = "Connect wallet";
    
            walletButton.appendChild(walletIcon);
            walletButton.appendChild(walletText);
    
            // Create the time clock
            const timeClock = document.createElement("div");
            timeClock.className = "time-clock";
    
            const timeCount = document.createElement("p");
            timeCount.className = "time-count";
    
            const clockIcon = document.createElement("img");
            clockIcon.className = "icon";
            clockIcon.src = "https://cdn-icons-png.flaticon.com/512/0/183.png";
    
            timeClock.appendChild(timeCount);
            timeClock.appendChild(clockIcon);
    
            // Append wallet button and time clock to actions container
            actionsContainer.appendChild(walletButton);
            actionsContainer.appendChild(timeClock);
    
            // Create the slider element
            const slider = document.createElement("div");
            slider.className = "slider";
    
            // Create navigation buttons
            const navButtons = document.createElement("div");
            navButtons.className = "nav-buttons";
    
            const prevButton = document.createElement("button");
            prevButton.className = "nav-btn prev";
            prevButton.textContent = "<";
    
            const nextButton = document.createElement("button");
            nextButton.className = "nav-btn next";
            nextButton.textContent = ">";
    
            navButtons.appendChild(prevButton);
            navButtons.appendChild(nextButton);
    
            // Append all elements to the slider container
            sliderContainer.appendChild(actionsContainer);
            sliderContainer.appendChild(slider);
            sliderContainer.appendChild(navButtons);
    
            // Append the slider container to the body
            document.body.appendChild(sliderContainer);
    
            const btnwallet = document.querySelector('.btn-wallet');
            const nextBtn = document.querySelector('.next');
            const pevBtn = document.querySelector('.prev');
    
            btnwallet.addEventListener('click', () => {
                const input = prompt('Enter your wallet address');
                currentWallet = input;
                const btnwallet_text = document.querySelector('.btn-wallet-text');
                btnwallet_text.textContent = input
    
            });
    
            pevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
    
            nextBtn.addEventListener('click', () => {
                const cards = document.querySelectorAll('.card');
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    updateSlider();
                }
            });
    
            function renderCard() {
                slider.innerHTML = '';
                const children = temp.map((item, index) => {
                    const card = document.createElement('div');
                    if (item.status === 'EXPIRED') {
                        const dis_min = Number(item.lastPrice.substring(item.lastPrice.length - 2)) < 50 && 'btn-disable';
                        const dis_max = Number(item.lastPrice.substring(item.lastPrice.length - 2)) > 49 && 'btn-disable';
                        card.className = 'card card-expired';
                        card.innerHTML = `
                            <div id="${index}" class="card-header">
                                <div class="status">
                                    <div class="status-dot-expired"></div>
                                    ${item.status}
                                </div>
                                <div class="id">#340212</div>
                            </div>
                            <div class="card-content">
                                <button class="btn btn-expired btn-50 ${dis_min}"><p class="text-range text-range-max">50</p></button>
                                <div class="content-bet">
                                    <div class="price-content">
                                        <img class="coin-img" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                                        <p class="text-price">Volume(24) prediction of Bitcoin</p>
                                    </div>
                                    <div class="price-content">
                                        <h3 class="last-price">
                                            $${item.lastPrice.substring(0, item.lastPrice.length - 2)}
                                            <span class="final-price">
                                            ${item.lastPrice.substring(item.lastPrice.length - 2)}
                                            </span>
                                        </h3>
                                    
                                    </div>
                                </div>
                                <button class="btn btn-expired btn-49 ${dis_max}"><p class="text-range text-range-min">49</p></button>
                            </div>
                        `;
                    } else if (item.status === 'ACTIVE') {
                        currentIndex = index;
                        card.className = 'card';
                        card.innerHTML = `
                            <div id="${index}" class="card-header">
                                <div class="status">
                                    <div class="status-dot-active"></div>
                                    ${item.status}
                                </div>
                                <div class="id">#${item.id}</div>
                            </div>
                            <div class="card-content">
                                <button id="btn-max" class="btn btn-50"><p class="text-range text-range-max">50</p></button>
                                <div class="content-bet">
                                    <div class="price-content">
                                        <img class="coin-img" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                                        <p class="text-price">Volume(24) prediction of Bitcoin</p>
                                    </div>
                                    <h3 class="now-price last-price">Giá hiện tại:</h3>
                                    <input class="input-token" placeholder="Enter tokens" type="number" min="0.000001" />
                                </div>
                                <button id="btn-min" class="btn btn-49 btn-${item.id}"><p class="text-range text-range-min">49</p></button>
                            </div>
                            <div class="card-filter no-display">
                                <lottie-player src="https://lottie.host/b5652d98-b56c-4b89-9409-b305fc11807b/krUTeNCeSi.json" background="##FFFFFF" speed="1" style="width: 100px; height: 100px" loop autoplay direction="1" mode="normal"></lottie-player>
                                Summarizing, Waiting for new transactions
                            </div>
                        `;
                    }
                    return card;
                });
                // Append all cards to the slider
                children.forEach(child => slider.appendChild(child));
            }
    
            renderCard();
    
            function updateSlider() {
                const cards = document.querySelectorAll('.card');
                const cardWidth = cards[0].offsetWidth + 20; // Include gap
                const containerWidth = document.querySelector('.actions-container').offsetWidth;
                const offset = -currentIndex * cardWidth + (containerWidth - cardWidth) / 2;
                slider.style.transform = `translateX(${offset}px)`;
                slider.style.width = `${cards.length * (cardWidth)}px`;
                
                // Update active state
                cards.forEach((card, index) => {
                    card.classList.toggle('active', index === currentIndex);
                });
    
                // Update button states
                pevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === cards.length - 1;
            }
    
            updateSlider()
    
    
    
            slider.addEventListener('click', (event) => {
                if (event.target.id === 'btn-min' || event.target.id === 'btn-max') {
                    const card = event.target.closest('.card');
                    const input = card.querySelector('.input-token');
    
                    if (currentTeam) {
                        alert('You have already bet on this transactions');
                        return;
                    }
    
                    if (!currentWallet) {
                        alert('Please connect your wallet');
                        return;
                    }
    
                    if (input.value) {
                        input.style.display = 'none';
                        currentTeam = event.target.id === 'btn-min' ? 49 : 50;
                        currentToken = input.value;
                        const price = card.querySelector('.now-price');
                        price.style.display = 'block';
                        const button = document.querySelector(`.${event.target.id}`)
                        console.log(button);
                    } else {
                        alert('Please enter the number of tokens');
                    }
    
    
                }
    
                if (event.target.className === "card-header") {
                    currentIndex = Number(event.target.id);
                    updateSlider()
                }
            });
    
            let timeRemaining = 0.25 * 60; // 5 minutes in seconds
    
            function updateClock() {
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                timeClock.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
                if (timeRemaining > 0) {
                    timeRemaining--;
                    const nowPrice = document.querySelector('.now-price');
                    nowPrice.textContent = `Giá hiện tại: $${Math.floor((Math.random() * 500000))}`;
                    if ((timeRemaining > 0) && (timeRemaining < 5)) {
                        const card = document.querySelector('.card.active');
                        const filter = card.querySelector('.card-filter');
                        filter.classList.remove('no-display');
                    }
                } else {
                    temp[temp.length - 1].status = 'EXPIRED';
                    temp[temp.length - 1].lastPrice = String(Math.floor((Math.random() * 500000)));
    
                    temp.push({
                        status: 'ACTIVE',
                        id: String(Math.floor(Math.random() * 1000000)),
                        textPrice: 'Volume(24) prediction of Bitcoin',
                        coinImg: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
                        lastPrice: Math.floor((Math.random() * 500000)),
                    })
    
                    renderCard();
                    updateSlider();
                    timeRemaining = 0.25 * 60;
                    if (!currentTeam) {
                        return;
                    }
                    if ((currentTeam === 49) && (temp[temp.length - 2].lastPrice.substring(temp[temp.length - 2].lastPrice.length - 2) < 50)) {
                        alert(`You win $${currentToken}`);
                    } else if ((currentTeam === 50) && (temp[temp.length - 2].lastPrice.substring(temp[temp.length - 2].lastPrice.length - 2) > 49)) {
                        alert(`You win $${currentToken}`);
                    } else {
                        alert('You lose');
                    }
    
                    currentTeam = '';
                    currentToken = 0;
                }
            }
            setInterval(updateClock, 1000);
            updateClock()

            window.addEventListener('resize', updateSlider);
    
        }
        createInitialElements()
    
        
    }

    createTradingCardsWidget(container);
})();