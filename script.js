/* =========================================
   MOMTRIP — FULL SCRIPT
   ========================================= */

/* =========================================
   PAGE 1 → QUESTION PAGE
   ========================================= */

function goToQuestion() {
    console.log("MomTrip: Continue clicked");
    showQuestionPage();
}


/* =========================================
   QUESTION PAGE
   ========================================= */

function showQuestionPage() {

    document.body.innerHTML = `
        <div class="question-page">

            <div class="pool-glow"></div>

            <div class="bubble bubble1">🫧</div>
            <div class="bubble bubble2">🫧</div>
            <div class="bubble bubble3">🫧</div>
            <div class="bubble bubble4">🫧</div>

            <div class="question-card">

                <div class="teddy">🧸</div>

                <div class="pool-decoration">
                    🏊‍♂️ 💦 🏊‍♀️
                </div>

                <p class="small-text">
                    ONE IMPORTANT QUESTION
                </p>

                <h1>
                    Mom, can we go swimming? 🏊‍♂️
                </h1>

                <p class="question-text">
                    Would you like to take
                    <strong>me and my brother Frank</strong>
                    to
                    <strong>Chris Hotel's swimming pool</strong>
                    during these holidays?
                </p>

                <div class="buttons-area">

                    <button
                        class="yes-button"
                        onclick="sayYes()"
                    >
                        YES! ❤️
                    </button>

                    <button
                        class="no-button"
                        id="noButton"
                        type="button"
                    >
                        NO 😭
                    </button>

                </div>

            </div>

            <div
                class="pleading-message"
                id="pleadingMessage"
            >
                <span>Mommmm 🥹❤️ please say YES!</span>
            </div>

        </div>
    `;

    setupNoButton();
}


/* =========================================
   SMART NO BUTTON
   ========================================= */

function setupNoButton() {

    const noButton = document.getElementById("noButton");
    const message = document.getElementById("pleadingMessage");

    if (!noButton || !message) {
        console.error("MomTrip: NO button setup failed.");
        return;
    }

    let attempts = 0;

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let animationFrame = null;
    let initialized = false;


    /* -----------------------------------------
       INITIALIZE
       ----------------------------------------- */

    function initializeButton() {

        if (initialized) return;

        const rect = noButton.getBoundingClientRect();

        currentX = rect.left;
        currentY = rect.top;

        targetX = currentX;
        targetY = currentY;

        initialized = true;
    }


    /* -----------------------------------------
       KEEP BUTTON INSIDE SCREEN
       ----------------------------------------- */

    function keepInsideScreen(x, y) {

        const width = noButton.offsetWidth;
        const height = noButton.offsetHeight;

        const padding = 20;

        const maxX = Math.max(
            padding,
            window.innerWidth - width - padding
        );

        const maxY = Math.max(
            padding,
            window.innerHeight - height - padding
        );

        return {
            x: Math.max(
                padding,
                Math.min(x, maxX)
            ),

            y: Math.max(
                padding,
                Math.min(y, maxY)
            )
        };
    }


    /* -----------------------------------------
       ANIMATE BUTTON
       ----------------------------------------- */

    function animateButton() {

        const speed = 0.14;

        currentX += (targetX - currentX) * speed;
        currentY += (targetY - currentY) * speed;

        noButton.style.left = `${currentX}px`;
        noButton.style.top = `${currentY}px`;

        const differenceX = Math.abs(targetX - currentX);
        const differenceY = Math.abs(targetY - currentY);

        if (differenceX > 0.5 || differenceY > 0.5) {

            animationFrame =
                requestAnimationFrame(animateButton);

        } else {

            currentX = targetX;
            currentY = targetY;

            noButton.style.left = `${currentX}px`;
            noButton.style.top = `${currentY}px`;

            animationFrame = null;
        }
    }


    /* -----------------------------------------
       MOVE NO BUTTON
       ----------------------------------------- */

    function moveButton(mouseX, mouseY) {

        initializeButton();

        const rect = noButton.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const dx = centerX - mouseX;
        const dy = centerY - mouseY;

        const distance =
            Math.sqrt(dx * dx + dy * dy);

        const dangerDistance = 135;

        if (distance > dangerDistance) {
            return;
        }

        attempts++;

        /* -----------------------------------------
           DIRECTION AWAY FROM CURSOR
           ----------------------------------------- */

        let directionX;
        let directionY;

        if (distance < 1) {

            const angle =
                Math.random() * Math.PI * 2;

            directionX = Math.cos(angle);
            directionY = Math.sin(angle);

        } else {

            directionX = dx / distance;
            directionY = dy / distance;
        }


        /* -----------------------------------------
           MOVEMENT
           ----------------------------------------- */

        const moveDistance =
            140 + Math.random() * 80;

        let newX =
            currentX + directionX * moveDistance;

        let newY =
            currentY + directionY * moveDistance;


        /* Small randomness */
        newX +=
            (Math.random() - 0.5) * 60;

        newY +=
            (Math.random() - 0.5) * 50;


        /* -----------------------------------------
           KEEP INSIDE SCREEN
           ----------------------------------------- */

        const safePosition =
            keepInsideScreen(newX, newY);

        targetX = safePosition.x;
        targetY = safePosition.y;


        /* -----------------------------------------
           MAKE POSITION FIXED
           ----------------------------------------- */

        if (
            getComputedStyle(noButton).position !==
            "fixed"
        ) {

            const buttonRect =
                noButton.getBoundingClientRect();

            currentX = buttonRect.left;
            currentY = buttonRect.top;

            noButton.style.position = "fixed";

            noButton.style.left =
                `${currentX}px`;

            noButton.style.top =
                `${currentY}px`;
        }


        /* -----------------------------------------
           START ANIMATION
           ----------------------------------------- */

        if (!animationFrame) {

            animationFrame =
                requestAnimationFrame(
                    animateButton
                );
        }


        /* -----------------------------------------
           NICE MESSAGES
           ----------------------------------------- */

        const messages = [

            "Mommmm 🥹❤️ please say YES!",

            "Please Mom 🥹💕 we would love to go!",

            "Just one swimming trip, Mom? 🏊‍♂️❤️",

            "Pretty please, Mom? 🥹❤️",

            "It would make us so happy! ❤️",

            "Mom pleaseee 😭💕 we promise it'll be fun!",

            "One little YES, Mom? 🥹❤️",

            "Please make our holiday special! 🏊‍♂️❤️",

            "Mommmm, we're asking nicely 🥹❤️",

            "Please Mom! A swimming day would be amazing! 🏊‍♂️💕"
        ];

        message.classList.add("show");

        message.innerHTML =
            `<span>${
                messages[
                    (attempts - 1) %
                    messages.length
                ]
            }</span>`;
    }


    /* -----------------------------------------
       MOUSE MOVEMENT
       ----------------------------------------- */

    document.addEventListener(
        "mousemove",
        function(event) {

            moveButton(
                event.clientX,
                event.clientY
            );
        }
    );


    /* -----------------------------------------
       TOUCH
       ----------------------------------------- */

    noButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            const touch =
                event.touches[0];

            moveButton(
                touch.clientX,
                touch.clientY
            );
        },
        {
            passive: false
        }
    );


    /* -----------------------------------------
       CLICK
       ----------------------------------------- */

    noButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const rect =
                noButton.getBoundingClientRect();

            moveButton(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    );


    /* -----------------------------------------
       RESIZE
       ----------------------------------------- */

    window.addEventListener(
        "resize",
        function() {

            initializeButton();

            const safe =
                keepInsideScreen(
                    currentX,
                    currentY
                );

            currentX = safe.x;
            currentY = safe.y;

            targetX = safe.x;
            targetY = safe.y;

            noButton.style.left =
                `${currentX}px`;

            noButton.style.top =
                `${currentY}px`;
        }
    );
}


/* =========================================
   YES BUTTON
   ========================================= */

function sayYes() {

    console.log("MomTrip: YES clicked");

    document.body.innerHTML = `

        <div class="schedule-page">

            <div class="schedule-card">

                <div class="celebration">
                    🎉 🧸 ❤️ 🏊‍♂️
                </div>

                <p class="small-text">
                    YAAAAAY!!!
                </p>

                <h1>
                    Mom said YES! 🥹❤️
                </h1>

                <p class="schedule-text">
                    Now let's choose a day and time
                    for our swimming trip during
                    these holidays.
                </p>

                <div class="schedule-form">

                    <label>
                        📅 Choose the date
                    </label>

                    <input
                        type="date"
                        id="tripDatePicker"
                        class="native-date"
                    >

                    <input
                        type="text"
                        id="tripDate"
                        class="date-display"
                        placeholder="DD/MM/YYYY"
                        inputmode="numeric"
                        maxlength="10"
                        autocomplete="off"
                    >

                    <label for="tripTime">
                        🕐 Choose the time
                    </label>

                    <input
                        type="time"
                        id="tripTime"
                    >

                    <button
                        class="confirm-button"
                        onclick="confirmSchedule()"
                        type="button"
                    >
                        CONFIRM OUR TRIP ❤️
                    </button>

                </div>

            </div>

        </div>
    `;

    setupDateInput();
}


/* =========================================
   DATE INPUT
   ========================================= */

function setupDateInput() {

    const picker =
        document.getElementById(
            "tripDatePicker"
        );

    const display =
        document.getElementById(
            "tripDate"
        );

    if (!picker || !display) {
        console.error("MomTrip: Date input setup failed.");
        return;
    }


    /* Open calendar */
    display.addEventListener(
        "click",
        function() {

            if (
                typeof picker.showPicker ===
                "function"
            ) {

                picker.showPicker();

            } else {

                picker.focus();
            }
        }
    );


    /* Calendar date selected */
    picker.addEventListener(
        "change",
        function() {

            if (!picker.value) return;

            const parts =
                picker.value.split("-");

            const year = parts[0];
            const month = parts[1];
            const day = parts[2];

            display.value =
                `${day}/${month}/${year}`;
        }
    );


    /* Manual date entry */
    display.addEventListener(
        "input",
        function() {

            let value =
                display.value.replace(
                    /\D/g,
                    ""
                );

            if (value.length > 8) {

                value =
                    value.substring(
                        0,
                        8
                    );
            }

            if (value.length >= 5) {

                display.value =
                    value.substring(0, 2) +
                    "/" +
                    value.substring(2, 4) +
                    "/" +
                    value.substring(4, 8);

            } else if (value.length >= 3) {

                display.value =
                    value.substring(0, 2) +
                    "/" +
                    value.substring(2);

            } else {

                display.value =
                    value;
            }
        }
    );
}


/* =========================================
   CONVERT DATE
   ========================================= */

function convertDateToServerFormat(dateString) {

    const parts =
        dateString.split("/");

    if (parts.length !== 3) {
        return null;
    }

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    if (
        day.length !== 2 ||
        month.length !== 2 ||
        year.length !== 4
    ) {
        return null;
    }

    const dayNumber =
        Number(day);

    const monthNumber =
        Number(month);

    const yearNumber =
        Number(year);

    if (
        dayNumber < 1 ||
        dayNumber > 31 ||
        monthNumber < 1 ||
        monthNumber > 12 ||
        yearNumber < 2020
    ) {
        return null;
    }

    const testDate =
        new Date(
            yearNumber,
            monthNumber - 1,
            dayNumber
        );

    if (
        testDate.getFullYear() !== yearNumber ||
        testDate.getMonth() !== monthNumber - 1 ||
        testDate.getDate() !== dayNumber
    ) {
        return null;
    }

    return `${year}-${month}-${day}`;
}


/* =========================================
   CONFIRM TRIP
   ========================================= */

async function confirmSchedule() {

    console.log("MomTrip: Confirm clicked");

    const display =
        document.getElementById(
            "tripDate"
        );

    const timeInput =
        document.getElementById(
            "tripTime"
        );

    if (!display || !timeInput) {
        return;
    }

    const displayDate =
        display.value.trim();

    const time =
        timeInput.value;

    const serverDate =
        convertDateToServerFormat(
            displayDate
        );


    /* -----------------------------------------
       VALIDATE DATE
       ----------------------------------------- */

    if (!serverDate) {

        alert(
            "Mom ❤️ please enter a valid date like DD/MM/YYYY."
        );

        display.focus();

        return;
    }


    /* -----------------------------------------
       VALIDATE TIME
       ----------------------------------------- */

    if (!time) {

        alert(
            "Mom ❤️ please choose a time."
        );

        timeInput.focus();

        return;
    }


    /* -----------------------------------------
       SEND TO FLASK
       ----------------------------------------- */

    try {

        const response =
            await fetch(
                "/api/confirm",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        date: serverDate,
                        time: time
                    })
                }
            );


        const result =
            await response.json();


        if (!result.success) {

            alert(
                result.message ||
                "Something went wrong."
            );

            return;
        }


        /* -----------------------------------------
           SUCCESS
           ----------------------------------------- */

        showThankYou(
            serverDate,
            time
        );


    } catch (error) {

        console.error(
            "MomTrip connection error:",
            error
        );

        alert(
            "Could not connect to MomTrip. " +
            "Please make sure the server is running."
        );
    }
}


/* =========================================
   FORMAT DATE
   ========================================= */

function formatDateForDisplay(serverDate) {

    const parts =
        serverDate.split("-");

    if (parts.length !== 3) {
        return serverDate;
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}/${month}/${year}`;
}


/* =========================================
   THANK YOU PAGE
   ========================================= */

function showThankYou(date, time) {

    const formattedDate =
        formatDateForDisplay(date);

    document.body.innerHTML = `

        <div class="thankyou-page">

            <div class="thankyou-card">

                <div class="big-heart">
                    ❤️
                </div>

                <div class="celebration">
                    🎉 🏊‍♂️ 🧸 🎉
                </div>

                <p class="small-text">
                    IT'S OFFICIAL!
                </p>

                <h1>
                    Thank You Mom! 🥹❤️
                </h1>

                <p class="thank-message">
                    Thank you for making these
                    holidays extra special for
                    me and Frank.
                </p>

                <div class="trip-summary">

                    <p>
                        📅
                        <strong>
                            ${formattedDate}
                        </strong>
                    </p>

                    <p>
                        🕐
                        <strong>
                            ${time}
                        </strong>
                    </p>

                    <p>
                        🏊‍♂️ Chris Hotel Swimming Pool
                    </p>

                </div>

                <p class="final-message">
                    We can't wait! 😭❤️
                </p>

            </div>

        </div>
    `;
}


/* =========================================
   SAFETY CHECK
   ========================================= */

console.log("✅ MomTrip script loaded successfully.");