import os

from flask import Flask, request, jsonify, send_from_directory
import resend

app = Flask(__name__)


# =========================================
# HOME
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

    api_key = os.getenv("RESEND_API_KEY")
    receiver_email = os.getenv("EMAIL_TO")

    if not api_key:
        print("Resend API key is missing.")
        return False

    if not receiver_email:
        print("EMAIL_TO is missing.")
        return False

    try:

        resend.api_key = api_key

        params = {
            "from": "MomTrip <onboarding@resend.dev>",
            "to": [receiver_email],
            "subject": "❤️ MomTrip Confirmation",
            "text": f"""❤️ MOMTRIP CONFIRMATION

🏊 Trip:
Chris Hotel Swimming Pool

👦 Kids:
Jacques and Frank

📅 Date:
{date}

🕐 Time:
{time}

MomTrip confirmation sent successfully.
"""
        }

        result = resend.Emails.send(params)

        print("==============================")
        print("❤️ MOMTRIP CONFIRMATION")
        print("==============================")
        print("🏊 Trip: Chris Hotel Swimming Pool")
        print("👦 Kids: Jacques and Frank")
        print(f"📅 Date: {date}")
        print(f"🕐 Time: {time}")
        print("✅ EMAIL SENT SUCCESSFULLY!")
        print("Email result:", result)

        return True

    except Exception as error:

        print("==============================")
        print("⚠️ EMAIL COULD NOT BE SENT")
        print("==============================")
        print("Email error:", error)

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

        email_sent = send_confirmation_email(date, time)

        return jsonify({
            "success": True,
            "message": "Trip confirmed!",
            "email_sent": email_sent
        }), 200

    except Exception as error:

        print("❌ Confirmation error:", error)

        return jsonify({
            "success": False,
            "message": "Something went wrong."
        }), 500


# =========================================
# RUN
# =========================================

if __name__ == "__main__":

    print("❤️ MomTrip is running!")

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )