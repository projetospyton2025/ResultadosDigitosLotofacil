import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # Carregar variáveis de ambiente do arquivo .env

app = Flask(__name__, 
            static_folder='../static',
            template_folder='../templates')
CORS(app)

from app import routes