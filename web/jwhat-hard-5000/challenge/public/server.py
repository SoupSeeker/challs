from flask import Flask, request
import jwt, time, os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)

private_key = open('priv').read()
public_key = open('pub').read()
flag = open('flag.txt').read()

#this would be too easy i think
#@app.route("/get_key")
#def get_key():
#    return "<pre>%s</pre>" % private_key

@app.route("/get_token")
def get_token():
    return jwt.encode({'admin': False, 'now': time.time()}, private_key, algorithm='RS256')

@app.route("/get_flag", methods=['POST'])
def get_flag():
    try:
        payload = jwt.decode(request.form['jwt'], public_key, algorithms=['RS256'])
        print(payload)
        if payload['admin']:
            return flag
    except:
        return ">:o Are you trying to hack us???"

@app.route("/")
def get_home():
    return "<pre>Something something something don't steal my info</pre>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)