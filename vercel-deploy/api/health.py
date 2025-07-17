from flask import Flask, jsonify
from datetime import datetime
import json

app = Flask(__name__)

@app.route('/api/health')
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'database': 'vercel-serverless'
    })

# Vercel handler
def handler(request):
    return app