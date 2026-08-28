from flask import Flask, request, jsonify, send_from_directory
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder=".", static_url_path="")


# =========================================
# HOME PAGE
# =========================================

@app.route("/")
def home():
    return send_from_directory(".", "index.html")


# =========================================
# STATIC FILES
# =========================================

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)


# =========================================
# SEND CONFIRMATION EMAIL
# =========================================

def send_confirmation_email(date, time):

    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_PASSWORD")
    receiver_email = os.getenv("EMAIL_TO")

    if not sender_email or not sender_password or not receiver_email:
        print("Email settings are missing.")
        return False

    message = EmailMessage()

    message["Subject"] = "❤️ MomTrip Confirmation"
    message["From"] = sender_email
    message["To"] = receiver_email

    message.set_content(
        f"""
❤️ MOMTRIP CONFIRMATION

🏊 Trip:
Chris Hotel Swimming Pool

👦 Kids:
Jacques and Frank

📅 Date:
{date}

🕐 Time:
{time}

==============================

Mom said YES! ❤️🥹
        """
    )

    print("==============================")
    print("❤️ MOMTRIP CONFIRMATION")
    print("==============================")
    print("🏊 Trip: Chris Hotel Swimming Pool")
    print("👦 Kids: Jacques and Frank")
    print(f"📅 Date: {date}")
    print(f"🕐 Time: {time}")
    print("==============================")

    try:

        # Gmail SMTP connection
        with smtplib.SMTP_SSL(
            "smtp.gmail.com",
            465,
            timeout=10
        ) as smtp:

            smtp.login(
                sender_email,
                sender_password
            )

            smtp.send_message(message)

        print("📧 Email sent successfully!")
        return True

    except Exception as error:

        print("⚠️ Email could not be sent.")
        print("Email error:", error)

        # IMPORTANT:
        # Email failure must NOT stop MomTrip.
        return False


# =========================================
# CONFIRM TRIP
# =========================================

@app.route("/api/confirm", methods=["POST"])
def confirm():

    try:

        data = request.get_json(silent=True) or {}

        date = data.get("date")
        time = data.get("time")

        if not date or not time:

            return jsonify({
                "success": False,
                "message": "Please choose both a date and a time."
            }), 400


        print()
        print("==============================")
        print("❤️ MOMTRIP CONFIRMATION")
        print("==============================")
        print("🏊 Trip: Chris Hotel Swimming Pool")
        print("👦 Kids: Jacques and Frank")
        print(f"📅 Date: {date}")
        print(f"🕐 Time: {time}")
        print("==============================")


        # Try to send the email.
        # If it fails, DO NOT fail the trip confirmation.
        email_sent = send_confirmation_email(
            date,
            time
        )


        # Always return success once the
        # date and time were received.
        return jsonify({
            "success": True,
            "message": "Trip confirmed! ❤️",
            "email_sent": email_sent
        }), 200


    except Exception as error:

        print("❌ Confirmation error:")
        print(error)

        return jsonify({
            "success": False,
            "message": "Something went wrong while confirming the trip."
        }), 500


# =========================================
# HEALTH CHECK
# =========================================

@app.route("/api/status")
def status():

    return jsonify({
        "online": True,
        "name": "MomTrip",
        "trip": "Chris Hotel Swimming Pool"
    })


# =========================================
# START SERVER
# =========================================

if __name__ == "__main__":

    print()
    print("❤️ MomTrip is running!")
    print()

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )