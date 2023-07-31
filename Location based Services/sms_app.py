from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_ngrok import run_with_ngrok
app = Flask(__name__)


@app.route('/')
def hello_world():
    # account_sid = "ACbf9fd807080a5890ae0adbfd9ff1c0f9"
    # auth_token  = "51ac519fbe6573bee5039f6b3ebc54ff"

    # client = Client(account_sid, auth_token)

    # message = client.messages.create(
    #     to="+917387768854", 
    #     from_="+17088477121",
    #     body="Ignore this message, its for project. Do you have oxygen supply?")

    # print(message.sid)
    return render_template('g_map.html')


@app.route('/pno/<string:sno>', methods = ['GET', 'POST'])
def phone_request(sno):
        
        print(sno)
        account_sid = "AC02a498f794dae1096187364b6177efd7"
        auth_token  = "188369bd1b78015ae026f6493fcb3a52"
        client = Client(account_sid, auth_token)
        message = client.messages.create(
            to="+919172062357", #sno = contact details of hospital
            from_="+15674722399",
            body="Do you have any available beds?")

        print(message.sid)
       
        resp = MessagingResponse()

    # Add a text message
        msg = resp.message("ok")

    # Add a picture message
        msg.media(
        "https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg"
         )
        return render_template('g_map.html')


if __name__ == '__main__':  
   app.run(port=5006,debug = True)  
#ngrok pass: 2v2?72nE97!AP2n