/* =========================================
   MOMTRIP — COMPLETE SCRIPT
   Welcome → Question → Schedule → Thank You
========================================= */


/* =========================================
   WELCOME → QUESTION
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
                        type="button"
                        class="yes-button"
                        id="yesButton"
                    >
                        YES! ❤️
                    </button>

                    <button
                        type="button"
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
                <span>
                    Mommmm 🥹❤️ please say YES!
                </span>
            </div>

        </div>
    `;

    /* IMPORTANT:
       Attach YES button AFTER creating the page.
    */

    const yesButton =
        document.getElementById("yesButton");

    if (yesButton) {
        yesButton.addEventListener(
            "click",
            sayYes
        );
    }

    setupNoButton();
}


/* =========================================
   SMART NO BUTTON
========================================= */

function setupNoButton() {

    const noButton =
        document.getElementById("noButton");

    const message =
        document.getElementById("pleadingMessage");

    if (!noButton || !message) {
        return;
    }

    let attempts = 0;

    const messages = [
        "Mommmm 🥹❤️ please say YES!",
        "Please Mom 🥹💕 we would love to go!",
        "Just one swimming trip, Mom? 🏊‍♂️❤️",
        "Pretty please, Mom? 🥹❤️",
        "It would make us so happy! ❤️",
        "Mom pleaseee 😭💕 we promise it'll be fun!",
        "One little YES, Mom? 🥹❤️",
        "Please make our holiday special! 🏊‍♂️💕",
        "Mommmm, we're asking nicely 🥹❤️",
        "Please Mom! A swimming day would be amazing! 🏊‍♂️💕"
    ];


    /* -----------------------------------------
       MOVE NO BUTTON
    ----------------------------------------- */

    function escapeButton(pointerX, pointerY) {

        attempts++;

        /*
         * Change to fixed positioning.
         * This prevents the button from moving
         * relative to the card.
         */

        const rect =
            noButton.getBoundingClientRect();

        noButton.style.position = "fixed";
        noButton.style.zIndex = "9999";

        /*
         * Current center
         */

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        /*
         * Direction away from pointer
         */

        let dx =
            centerX - pointerX;

        let dy =
            centerY - pointerY;

        let distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        /*
         * If pointer is directly on it,
         * choose a random direction.
         */

        if (distance < 1) {

            const angle =
                Math.random() *
                Math.PI *
                2;

            dx = Math.cos(angle);
            dy = Math.sin(angle);

            distance = 1;
        }

        dx /= distance;
        dy /= distance;


        /*
         * Make the escape distance
         * reasonably large.
         */

        const jump =
            180 +
            Math.random() * 120;


        let newX =
            centerX +
            dx * jump -
            rect.width / 2;

        let newY =
            centerY +
            dy * jump -
            rect.height / 2;


        /*
         * Add a little randomness.
         */

        newX +=
            (Math.random() - 0.5) * 80;

        newY +=
            (Math.random() - 0.5) * 60;


        /*
         * Keep completely inside screen.
         */

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


        /*
         * TELEPORT.
         *
         * No sliding.
         * No disappearing.
         */

        noButton.style.left =
            `${newX}px`;

        noButton.style.top =
            `${newY}px`;


        /*
         * Update message.
         */

        message.classList.add("show");

        message.innerHTML =
            `<span>${messages[
                (attempts - 1) %
                messages.length
            ]}</span>`;
    }


    /* -----------------------------------------
       MOUSE
    ----------------------------------------- */

    document.addEventListener(
        "mousemove",
        function(event) {

            /*
             * If the pointer gets close,
             * the button escapes.
             */

            const rect =
                noButton.getBoundingClientRect();

            const centerX =
                rect.left +
                rect.width / 2;

            const centerY =
                rect.top +
                rect.height / 2;

            const dx =
                centerX -
                event.clientX;

            const dy =
                centerY -
                event.clientY;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 110) {

                escapeButton(
                    event.clientX,
                    event.clientY
                );
            }
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

            escapeButton(
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

            escapeButton(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2
            );
        }
    );


    /* -----------------------------------------
       RESIZE
    ----------------------------------------- */

    window.addEventListener(
        "resize",
        function() {

            const rect =
                noButton.getBoundingClientRect();

            const padding = 20;

            const maxX =
                window.innerWidth -
                rect.width -
                padding;

            const maxY =
                window.innerHeight -
                rect.height -
                padding;

            let x =
                Math.max(
                    padding,
                    Math.min(rect.left, maxX)
                );

            let y =
                Math.max(
                    padding,
                    Math.min(rect.top, maxY)
                );

            noButton.style.left =
                `${x}px`;

            noButton.style.top =
                `${y}px`;
        }
    );
}


/* =========================================
   YES → SCHEDULE
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
                        type="button"
                        class="confirm-button"
                        id="confirmButton"
                    >
                        CONFIRM OUR TRIP ❤️
                    </button>

                </div>

            </div>

        </div>
    `;


    /*
     * Attach confirm button.
     */

    const confirmButton =
        document.getElementById(
            "confirmButton"
        );

    if (confirmButton) {

        confirmButton.addEventListener(
            "click",
            confirmSchedule
        );
    }


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
        return;
    }


    /* -----------------------------------------
       OPEN DATE PICKER
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
       DATE PICKER → TEXT
    ----------------------------------------- */

    picker.addEventListener(
        "change",
        function() {

            if (!picker.value) {
                return;
            }

            const parts =
                picker.value.split("-");

            const year = parts[0];
            const month = parts[1];
            const day = parts[2];

            display.value =
                `${day}/${month}/${year}`;
        }
    );


    /* -----------------------------------------
       FORMAT MANUAL DATE
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
   CONVERT DATE
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
   CONFIRM TRIP
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


    if (!time) {

        alert(
            "Mom ❤️ please choose a time."
        );

        timeInput.focus();

        return;
    }


    /*
     * Disable button while sending.
     */

    const confirmButton =
        document.getElementById(
            "confirmButton"
        );

    if (confirmButton) {

        confirmButton.disabled = true;

        confirmButton.textContent =
            "SENDING... ❤️";
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

            if (confirmButton) {

                confirmButton.disabled = false;

                confirmButton.textContent =
                    "CONFIRM OUR TRIP ❤️";
            }

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
            "Could not connect to MomTrip. Please make sure the server is running."
        );


        if (confirmButton) {

            confirmButton.disabled = false;

            confirmButton.textContent =
                "CONFIRM OUR TRIP ❤️";
        }
    }
}


/* =========================================
   FORMAT DATE
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
}


/* =========================================
   SAFETY STARTUP CHECK
========================================= */

console.log(
    "❤️ MomTrip JavaScript loaded successfully."
);