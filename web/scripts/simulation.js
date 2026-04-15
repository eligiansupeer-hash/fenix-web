// =============================================
// SISTEMA FÉNIX — simulation.js
// Simulación del proceso real (sin APIs)
// =============================================

const SIM = {
  running: false,
  step: 0,
  logEl: null,
  progressEl: null,
  resultEl: null,
  btnEl: null,

  steps: [
    {
      label: "Recibiendo programa de cátedra",
      logs: [
        { type: "info", text: "Iniciando Sistema Fénix v2.1..." },
        { type: "dim",  text: "Conectando con el flujo de trabajo..." },
        { type: "ok",   text: "Programa recibido: Química Orgánica II — Unidades: 4" },
      ],
      progress: 15,
      delay: 400
    },
    {
      label: "Analizando estructura",
      logs: [
        { type: "info", text: "Mapeando estructura de contenidos..." },
        { type: "dim",  text: "  → Unidad 1: Nomenclatura IUPAC (38 págs)" },
        { type: "dim",  text: "  → Unidad 2: Grupos funcionales (52 págs)" },
        { type: "dim",  text: "  → Unidad 3: Reacciones (71 págs)" },
        { type: "dim",  text: "  → Unidad 4: Síntesis (44 págs)" },
        { type: "ok",   text: "Coherencia global establecida ✓" },
      ],
      progress: 35,
      delay: 500
    },
    {
      label: "Procesando Unidad 1",
      logs: [
        { type: "info", text: "Procesando Unidad 1: Nomenclatura IUPAC..." },
        { type: "dim",  text: "  Extrayendo conceptos clave..." },
        { type: "dim",  text: "  Identificando reglas de nomenclatura..." },
        { type: "dim",  text: "  Generando tabla de prefijos y sufijos..." },
        { type: "ok",   text: "U1 procesada — 12 conceptos, 3 tablas ✓" },
      ],
      progress: 52,
      delay: 600
    },
    {
      label: "Procesando Unidades 2, 3 y 4",
      logs: [
        { type: "info", text: "Procesando Unidades 2–4 en paralelo..." },
        { type: "dim",  text: "  U2: Grupos funcionales → esquemas visuales..." },
        { type: "dim",  text: "  U3: Reacciones → mecanismos paso a paso..." },
        { type: "dim",  text: "  U4: Síntesis → rutas y condiciones..." },
        { type: "ok",   text: "3 unidades procesadas con coherencia cruzada ✓" },
      ],
      progress: 72,
      delay: 700
    },
    {
      label: "Aplicando Sistema Fénix",
      logs: [
        { type: "info", text: "Aplicando protocolo de transformación..." },
        { type: "dim",  text: "  Jerarquizando información crítica..." },
        { type: "dim",  text: "  Creando anclas de memoria visual..." },
        { type: "dim",  text: "  Vinculando conceptos entre unidades..." },
        { type: "dim",  text: "  Generando preguntas de autoevaluación..." },
        { type: "ok",   text: "Protocolo aplicado — documento listo ✓" },
      ],
      progress: 90,
      delay: 500
    },
    {
      label: "Renderizando documento final",
      logs: [
        { type: "info", text: "Generando documento final..." },
        { type: "dim",  text: "  Formato: HTML interactivo" },
        { type: "dim",  text: "  Tamaño: 4 unidades · 205 páginas procesadas" },
        { type: "white", text: "" },
        { type: "ok",   text: "════════════════════════════════" },
        { type: "ok",   text: "  SISTEMA FÉNIX — PROCESO COMPLETO" },
        { type: "ok",   text: "  ✓ Material listo para estudiar" },
        { type: "ok",   text: "════════════════════════════════" },
      ],
      progress: 100,
      delay: 400
    }
  ],

  init() {
    this.logEl = document.getElementById('sim-log');
    this.progressEl = document.getElementById('sim-progress');
    this.resultEl = document.getElementById('sim-result');
    this.btnEl = document.getElementById('btn-simular');

    if (this.btnEl) {
      this.btnEl.addEventListener('click', () => this.start());
    }
  },

  start() {
    if (this.running) return;
    this.running = true;
    this.step = 0;
    this.logEl.innerHTML = '';
    this.resultEl.classList.remove('visible');
    this.btnEl.disabled = true;
    this.btnEl.textContent = 'Procesando...';
    this.progressEl.style.width = '0%';

    this.runStep();
  },

  runStep() {
    if (this.step >= this.steps.length) {
      this.finish();
      return;
    }

    const s = this.steps[this.step];
    this.progressEl.style.width = s.progress + '%';

    // Encabezado del paso
    this.addLog('info', `[PASO ${this.step + 1}/${this.steps.length}] ${s.label}`);

    let logIdx = 0;
    const writeLog = () => {
      if (logIdx >= s.logs.length) {
        this.step++;
        setTimeout(() => this.runStep(), s.delay);
        return;
      }
      const l = s.logs[logIdx++];
      this.addLog(l.type, l.text);
      setTimeout(writeLog, 220);
    };

    setTimeout(writeLog, 120);
  },

  addLog(type, text) {
    const line = document.createElement('div');
    line.className = 'log-line';

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    line.innerHTML = `
      <span class="log-time">${time}</span>
      <span class="log-${type}">${this.escape(text)}</span>
    `;
    this.logEl.appendChild(line);
    this.logEl.scrollTop = this.logEl.scrollHeight;
  },

  escape(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  finish() {
    this.running = false;
    this.btnEl.disabled = false;
    this.btnEl.textContent = '▶ Volver a simular';

    // Mostrar preview del documento procesado
    this.resultEl.classList.add('visible');
    this.loadDocPreview();
  },

  loadDocPreview() {
    const preview = document.getElementById('doc-preview');
    if (!preview) return;

    // Contenido de muestra del documento procesado real
    preview.innerHTML = `
      <div style="font-family: Georgia, serif; max-width: 100%;">
        <div style="background: #FF6B00; color: white; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; font-family: sans-serif;">
          🔥 Sistema Fénix — Documento Procesado
        </div>

        <h1 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 4px; font-family: sans-serif;">Química Orgánica II</h1>
        <p style="color: #888; font-size: 12px; margin-bottom: 20px; font-family: sans-serif;">Procesado con coherencia global · 4 unidades</p>

        <h2 style="font-size: 1rem; font-weight: 700; border-left: 3px solid #FF6B00; padding-left: 10px; margin-bottom: 10px; font-family: sans-serif;">Unidad 1: Nomenclatura IUPAC</h2>

        <p style="margin-bottom: 10px; font-size: 13px; color: #333;">
          <strong>Concepto central:</strong> La nomenclatura IUPAC es el sistema estándar para nombrar compuestos orgánicos. Se basa en identificar la cadena carbonada más larga como estructura base.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 12px;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Átomos de C</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Prefijo</th>
              <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">1</td><td style="padding: 8px; border: 1px solid #ddd;">met-</td><td style="padding: 8px; border: 1px solid #ddd;">Metano</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">2</td><td style="padding: 8px; border: 1px solid #ddd;">et-</td><td style="padding: 8px; border: 1px solid #ddd;">Etano</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">3</td><td style="padding: 8px; border: 1px solid #ddd;">prop-</td><td style="padding: 8px; border: 1px solid #ddd;">Propano</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;">4</td><td style="padding: 8px; border: 1px solid #ddd;">but-</td><td style="padding: 8px; border: 1px solid #ddd;">Butano</td></tr>
          </tbody>
        </table>

        <div style="background: #FFF8F0; border: 1px solid #FFD0A0; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 12px;">
          <strong>⚡ Punto de examen frecuente:</strong> Los grupos sustituyentes se numeran desde el extremo más cercano. En caso de ambigüedad, se usa el orden alfabético.
        </div>

        <h2 style="font-size: 1rem; font-weight: 700; border-left: 3px solid #FF6B00; padding-left: 10px; margin-bottom: 10px; font-family: sans-serif;">Unidad 2: Grupos Funcionales</h2>
        <p style="font-size: 13px; color: #333; margin-bottom: 8px;">Los grupos funcionales determinan la reactividad de los compuestos. Conectan directamente con las reacciones de la Unidad 3.</p>
        <ul style="font-size: 12px; color: #555; padding-left: 16px;">
          <li style="margin-bottom: 4px;"><strong>Alcoholes (–OH):</strong> Oxidación → Aldehídos o Cetonas</li>
          <li style="margin-bottom: 4px;"><strong>Aldehídos (–CHO):</strong> Oxidación → Ácidos carboxílicos</li>
          <li style="margin-bottom: 4px;"><strong>Cetonas (C=O):</strong> Reducción → Alcoholes secundarios</li>
        </ul>

        <div style="margin-top: 16px; padding: 10px; background: #f9f9f9; border-radius: 6px; font-size: 11px; color: #999; text-align: center; font-family: sans-serif;">
          Vista parcial — Documento completo entregado por WhatsApp
        </div>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => SIM.init());
