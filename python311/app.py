from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/build-board/<width>/<height>/<mines>', methods=['GET'])
def build_board(width, height, mines):
    test='this is the test' + width + height + mines

    # we will return the board as JSON
    return jsonify([["M", "M", "M",], ["M", "M", "M",], ["M", "M", "M",],])

