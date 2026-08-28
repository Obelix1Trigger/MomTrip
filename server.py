from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path
from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage

# Load .env
load_dotenv()

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent

# Gmail settings
GMAIL_ADDRESS = os.getenv("GMAIL_ADDRESS")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
MOM_EMAIL = os.getenv("MOM_EMAIL")


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def files(filename):
    return send_from_directory(BASE_DIR, filename)


def send_confirmation_email(date, time):

    message = EmailMessage()

    message["Subject"] = "❤️ MomTrip — Swimming Trip Confirmed!"
    message["From"] = GMAIL_ADDRESS
    message["To"] = MOM_EMAIL

    message.set_content(f"""
❤️ MOMTRIP CONFIRMATION ❤️

The swimming trip has been confirmed!

🏊 Destination:
Chris Hotel Swimming Pool

👦 Kids:
Jacques and Frank

📅 Date:
{date}

🕐 Time:
{time}

We can't wait! ❤️

— MomTrip
""")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(
            GMAIL_ADDRESS,
            GMAIL_APP_PASSWORD
        )

        smtp.send_message(message)


@app.route("/api/confirm", methods=["POST"])
def confirm():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No trip information received."
        }), 400

    date = data.get("date", "")
    time = data.get("time", "")

    if not date or not time:
        return jsonify({
            "success": False,
            "message": "Please choose both a date and time."
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

    try:

        send_confirmation_email(date, time)

        print("📧 Email sent successfully!")
        print()

        return jsonify({
            "success": True,
            "message": "Trip confirmed and email sent!"
        })

    except Exception as error:

        print()
        print("❌ EMAIL ERROR:")
        print(error)
        print()

        return jsonify({
            "success": False,
            "message": "Trip received, but the email could not be sent."
        }), 500


if __name__ == "__main__":

    print()
    print("❤️ MomTrip is running!")
    print()

    # Render provides PORT automatically.
    # 5000 is used when running locally.
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )