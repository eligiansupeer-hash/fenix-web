# Configuración — Cloudflare Pages

## Deploy desde GitHub

1. Ir a [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. Conectar con la cuenta de GitHub
3. Seleccionar el repo `fenix-web`
4. Configurar:
   - **Framework preset**: None
   - **Build command**: (vacío)
   - **Build output directory**: `web`
   - **Root directory**: `/`
5. Clic en "Save and Deploy"

## Resultado

La landing quedará en:
```
https://fenix-web.pages.dev
```

O con dominio personalizado si se configura.

## Notas

- El directorio raíz de la web es `/web`
- El archivo de entrada es `web/index.html`
- No hay build step: es HTML/CSS/JS puro
- El documento de ejemplo está en `/data/processed-doc.html`

## Dominio personalizado (opcional)

En Cloudflare Pages → Custom Domains → agregar dominio propio.
