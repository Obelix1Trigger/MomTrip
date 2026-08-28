/* =========================================
   MOMTRIP — FULL SCRIPT
========================================= */


/* =========================================
   GO TO QUESTION
========================================= */

function goToQuestion() {
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
                    >
                        NO 😭
                    </button>

                </div>

            </div>

            <div
                class="pleading-message"
                id="pleadingMessage"
            >
                <span>Mommmm 😭 please say YES!</span>
            </div>

        </div>
    `;

    setupNoButton();
}


/* =========================================
   SMART NO BUTTON
   COMPUTER = PUSHED BY CURSOR
   PHONE = MOVES WHEN TOUCHED
========================================= */

function setupNoButton() {

    const noButton =
        document.getElementById("noButton");

    const message =
        document.getElementById("pleadingMessage");

    if (!noButton) return;

    let attempts = 0;

    let currentX = 0;
    let currentY = 0;

    let targetX = 0;
    let targetY = 0;

    let animationRunning = false;


    /* -----------------------------------------
       GET BUTTON POSITION
    ----------------------------------------- */

    function getPosition() {

        const rect =
            noButton.getBoundingClientRect();

        return {
            x: rect.left,
            y: rect.top
        };
    }


    /* -----------------------------------------
       MOVE BUTTON SMOOTHLY
    ----------------------------------------- */

    function animateButton() {

        if (!animationRunning) return;

        currentX +=
            (targetX - currentX) * 0.12;

        currentY +=
            (targetY - currentY) * 0.12;

        noButton.style.left =
            `${currentX}px`;

        noButton.style.top =
            `${currentY}px`;

        requestAnimationFrame(
            animateButton
        );
    }


    /* -----------------------------------------
       START POSITION
    ----------------------------------------- */

    const start =
        getPosition();

    currentX = start.x;
    currentY = start.y;

    targetX = start.x;
    targetY = start.y;


    /* -----------------------------------------
       PUSH AWAY FROM CURSOR
    ----------------------------------------- */

    function pushButton(mouseX, mouseY) {

        const rect =
            noButton.getBoundingClientRect();

        const buttonCenterX =
            rect.left + rect.width / 2;

        const buttonCenterY =
            rect.top + rect.height / 2;


        const dx =
            buttonCenterX - mouseX;

        const dy =
            buttonCenterY - mouseY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* Only react when cursor gets close */

        const dangerDistance = 120;

        if (distance > dangerDistance) {
            return;
        }


        attempts++;


        /* Avoid division by zero */

        let safeDistance =
            distance || 1;


        const directionX =
            dx / safeDistance;

        const directionY =
            dy / safeDistance;


        /* How strongly the cursor pushes it */

        const pushStrength =
            150 + Math.random() * 100;


        let newX =
            rect.left +
            directionX *
            pushStrength;

        let newY =
            rect.top +
            directionY *
            pushStrength;


        /* Keep button inside screen */

        const padding = 20;

        const maxX =
            window.innerWidth -
            rect.width -
            padding;

        const maxY =
            window.innerHeight -
            rect.height -
            padding;


        newX =
            Math.max(
                padding,
                Math.min(newX, maxX)
            );

        newY =
            Math.max(
                padding,
                Math.min(newY, maxY)
            );


        targetX = newX;
        targetY = newY;


        noButton.style.position =
            "fixed";


        noButton.style.left =
            `${currentX}px`;

        noButton.style.top =
            `${currentY}px`;


        animationRunning = true;

        requestAnimationFrame(
            animateButton
        );


        message.classList.add("show");


        /* -----------------------------------------
           FUN MESSAGES
        ----------------------------------------- */

        if (attempts < 3) {

            message.innerHTML =
                "<span>Mommmm 😭 please say YES!</span>";

        } else if (attempts < 6) {

            message.innerHTML =
                "<span>Hehe... you can't catch NO 😭</span>";

        } else if (attempts < 10) {

            message.innerHTML =
                "<span>PLEASE MOM 😭❤️</span>";

        } else {

            message.innerHTML =
                "<span>Okayyy... YES is waiting ❤️😂</span>";
        }
    }


    /* =========================================
       COMPUTER MOUSE
    ========================================= */

    document.addEventListener(
        "mousemove",
        function(event) {

            pushButton(
                event.clientX,
                event.clientY
            );

        }
    );


    /* =========================================
       PHONE TOUCH
    ========================================= */

    noButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            const touch =
                event.touches[0];

            pushButton(
                touch.clientX,
                touch.clientY
            );

        },
        {
            passive: false
        }
    );


    /* =========================================
       CLICK FALLBACK
    ========================================= */

    noButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            const rect =
                noButton.getBoundingClientRect();

            pushButton(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    );
}


/* =========================================
   YES BUTTON
========================================= */

function sayYes() {

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


                    <!--
                        Hidden native date picker
                        Works on computer + phone
                    -->

                    <input
                        type="date"
                        id="tripDatePicker"
                        class="native-date"
                    >


                    <!--
                        Visible DD/MM/YYYY field
                    -->

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
   DD/MM/YYYY
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


    if (!picker || !display) return;


    /* -----------------------------------------
       OPEN CALENDAR WHEN VISIBLE FIELD CLICKED
    ----------------------------------------- */

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


    /* -----------------------------------------
       DATE PICKER CHANGED
    ----------------------------------------- */

    picker.addEventListener(
        "change",
        function() {

            if (!picker.value) return;

            const parts =
                picker.value.split("-");

            const year =
                parts[0];

            const month =
                parts[1];

            const day =
                parts[2];


            display.value =
                `${day}/${month}/${year}`;
        }
    );


    /* -----------------------------------------
       MANUAL DD/MM/YYYY ENTRY
    ----------------------------------------- */

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
   CONVERT DD/MM/YYYY → YYYY-MM-DD
========================================= */

function convertDateToServerFormat(
    dateString
) {

    const parts =
        dateString.split("/");


    if (parts.length !== 3) {
        return null;
    }


    const day =
        parts[0];

    const month =
        parts[1];

    const year =
        parts[2];


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


    /* Check that the date actually exists */

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


    return (
        `${year}-${month}-${day}`
    );
}


/* =========================================
   CONFIRMATION → FLASK BACKEND
========================================= */

async function confirmSchedule() {

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


    /* -----------------------------------------
       CHECK DATE
    ----------------------------------------- */

    const serverDate =
        convertDateToServerFormat(
            displayDate
        );


    if (!serverDate) {

        alert(
            "Mom ❤️ please enter a valid date like DD/MM/YYYY."
        );

        display.focus();

        return;
    }


    /* -----------------------------------------
       CHECK TIME
    ----------------------------------------- */

    if (!time) {

        alert(
            "Mom ❤️ please choose a time."
        );

        timeInput.focus();

        return;
    }


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
            "Please make sure the Flask server is running."
        );
    }
}


/* =========================================
   FORMAT DATE FOR FINAL PAGE
   DD/MM/YYYY
========================================= */

function formatDateForDisplay(
    serverDate
) {

    const parts =
        serverDate.split("-");


    if (parts.length !== 3) {
        return serverDate;
    }


    const year =
        parts[0];

    const month =
        parts[1];

    const day =
        parts[2];


    return (
        `${day}/${month}/${year}`
    );
}


/* =========================================
   THANK YOU PAGE
========================================= */

function showThankYou(
    date,
    time
) {

    const formattedDate =
        formatDateForDisplay(
            date
        );


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
}/* =========================================
   MOMTRIP DATE INPUT
========================================= */

.native-date {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
}

.date-display {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.1rem;
    letter-spacing: 1px;
}

.date-display::placeholder {
    opacity: 0.6;
}