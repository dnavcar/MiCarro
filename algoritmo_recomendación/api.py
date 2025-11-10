#uvicorn api:app --host 0.0.0.0 --port 8000 --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
import torch.nn.functional as F

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # puedes poner ["http://localhost:3000"] para frontend específico
    allow_credentials=True,
    allow_methods=["*"],  # permite GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)

class MiniTransformer(nn.Module):
    def __init__(self, vocab_size, d_model=64, nhead=4, num_layers=1):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        encoder_layer = nn.TransformerEncoderLayer(d_model=d_model, nhead=nhead)
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.fc = nn.Linear(d_model, vocab_size)

    def forward(self, x):
        # x: [batch, seq_len] -> transformer espera [seq_len, batch, d_model]
        x = self.embedding(x).permute(1,0,2)
        x = self.transformer(x)
        # predecimos solo el último token de la secuencia
        x = self.fc(x[-1])
        return F.log_softmax(x, dim=-1)


# --- Cargar modelo entrenado ---
#checkpoint = torch.load("transformer_mercadona.pth")
#checkpoint = torch.load("transformer_alejandro.pth")
checkpoint = torch.load("transformer_mercadona_julio.pth")
model = MiniTransformer(vocab_size=len(checkpoint['vocab']))
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()
token2id = checkpoint['vocab']
id2token = {i: p for p, i in token2id.items()}

# --- Request model ---
class TicketRequest(BaseModel):
    products: list[str]  # lista de productos actuales

def predecir_siguiente(model, secuencia, token2id, id2token):
    secuencia_ordenada = sorted(secuencia)
    entrada_ids = torch.tensor([[token2id[p] for p in secuencia_ordenada]], dtype=torch.long)
    with torch.no_grad():
        output = model(entrada_ids)
        probs = output.exp().squeeze()
        for p in secuencia_ordenada:
            probs[token2id[p]] = 0.0
        probs = probs / probs.sum()
        idx = torch.argmax(probs).item()
    return id2token[idx]

@app.post("/predict")
def predict(ticket: TicketRequest):
    siguiente = predecir_siguiente(model, ticket.products, token2id, id2token)
    return {"siguiente_producto": siguiente}