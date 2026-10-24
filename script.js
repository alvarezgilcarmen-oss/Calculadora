// =====================================================================
// CALCULADORA CONECTA VPH ANDALUCÍA · INTERFAZ
// La lógica clínica está en reglas.js y los textos para la paciente en
// textos.js. Este archivo solo construye el formulario y muestra el
// resultado, que aparece únicamente al pulsar «Calcular».
// =====================================================================

(function () {
  "use strict";

  // true muestra el aviso «Versión en revisión»; false lo oculta.
  const BORRADOR = false;

  const R = window.ReglasPDPCCU;
  const T = window.TextosPaciente;
  const form = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");
  let datos = {};

  // Campos del bloque «Paciente»; el resto va al bloque «Prueba».
  const BLOQUE_PACIENTE = ["edad"];
  // Con hasta tres opciones se muestran botones en lugar de desplegable.
  const MAX_BOTONES = 3;

  // Texto breve de cada dato para la línea de resumen del resultado.
  const SI = (si, no) => (v) => (v === "si" ? si : no);
  const CORTO = {
    edad: (v) => v + " años",
    contexto: (v) => ({ cribado: "Prueba de cribado", seguimiento: "Co-test de seguimiento", vuelta_gine: "Vuelta tras ginecología", salida: "Prueba de salida o captación" }[v]),
    cit_cribado: (v, t) => "Citología: " + t,
    previo_nv_cit: SI("Citología previa no valorable", "Citología previa valorable"),
    vph_triaje: (v, t) => "VPH de triaje: " + t,
    vph_cribado: (v, t) => "VPH: " + t,
    previo_indet: SI("Indeterminado previo", "Sin indeterminado previo"),
    previo_nv_vph: SI("VPH previo no valorable", "VPH previo valorable"),
    cit_refleja: (v, t) => "Citología refleja: " + t,
    menopausia: SI("Menopáusica", "No menopáusica"),
    cit_repetida: SI("Citología ya repetida", "Primera citología refleja"),
    cribado_adecuado: SI("Cribado previo adecuado", "Cribado previo inadecuado o desconocido"),
    tipo_cotest: (v, t) => t,
    cot_cit: (v, t) => "Citología: " + t,
    cot_vph: (v, t) => "VPH: " + t,
    previo_nv_cot: SI("Co-test previo no valorable", "Co-test previo valorable"),
    prueba_salida: (v, t) => t,
    vph_salida: (v, t) => "VPH: " + t
  };

  // ---------------- utilidades ----------------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function limpiarResultado() {
    resultado.innerHTML = "";
    resultado.className = "resultado hidden";
  }

  function firma(campo) {
    if (R.CAMPOS[campo].tipo === "numero") return "numero";
    return R.opciones(campo, datos).map((o) => o[0]).join("|");
  }

  function usaBotones(campo) {
    return R.CAMPOS[campo].tipo !== "numero" && R.opciones(campo, datos).length <= MAX_BOTONES;
  }

  function alCambiar(campo, valor) {
    if (valor === "" || valor === undefined) delete datos[campo];
    else datos[campo] = valor;
    limpiarResultado();
    actualizarFormulario();
  }

  // ---------------- formulario ----------------
  function crearCampo(campo) {
    const def = R.CAMPOS[campo];
    const grupo = document.createElement("div");
    grupo.className = "form-group";
    grupo.dataset.campo = campo;
    const id = "f_" + campo;

    if (usaBotones(campo)) {
      const etiqueta = document.createElement("p");
      etiqueta.className = "etiqueta";
      etiqueta.id = id + "_etiqueta";
      etiqueta.textContent = def.etiqueta;
      grupo.appendChild(etiqueta);
      const caja = document.createElement("div");
      caja.className = "opciones-botones";
      caja.id = id;
      caja.setAttribute("role", "radiogroup");
      caja.setAttribute("aria-labelledby", etiqueta.id);
      grupo.appendChild(caja);
      rellenarBotones(caja, campo);
    } else {
      const label = document.createElement("label");
      label.htmlFor = id;
      label.className = "etiqueta";
      label.textContent = def.etiqueta;
      grupo.appendChild(label);

      let control;
      if (def.tipo === "numero") {
        control = document.createElement("input");
        control.type = "number";
        control.inputMode = "numeric";
        control.min = "0";
        control.max = "120";
        control.step = "1";
        control.placeholder = "Ej.: 42";
        if (datos[campo] !== undefined) control.value = datos[campo];
        control.addEventListener("input", () => {
          const n = Number(control.value);
          const valido = control.value !== "" && Number.isInteger(n) && n >= 0 && n <= 120;
          alCambiar(campo, valido ? n : undefined);
        });
      } else {
        control = document.createElement("select");
        rellenarSelect(control, campo);
        control.addEventListener("change", () => alCambiar(campo, control.value));
      }
      control.id = id;
      grupo.appendChild(control);
    }

    if (def.ayuda) {
      const ayuda = document.createElement("p");
      ayuda.className = "ayuda";
      ayuda.textContent = def.ayuda;
      grupo.appendChild(ayuda);
    }
    grupo.dataset.firma = firma(campo);
    return grupo;
  }

  function rellenarSelect(select, campo) {
    select.innerHTML = "";
    const vacia = document.createElement("option");
    vacia.value = "";
    vacia.textContent = "Selecciona una opción";
    select.appendChild(vacia);
    R.opciones(campo, datos).forEach(([valor, texto]) => {
      const o = document.createElement("option");
      o.value = valor;
      o.textContent = texto;
      select.appendChild(o);
    });
    select.value = datos[campo] !== undefined ? datos[campo] : "";
  }

  function rellenarBotones(caja, campo) {
    caja.innerHTML = "";
    const opciones = R.opciones(campo, datos);
    caja.classList.toggle("opciones-largas", opciones.some((o) => o[1].length > 20));
    opciones.forEach(([valor, texto]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opcion";
      b.dataset.valor = valor;
      b.setAttribute("role", "radio");
      b.textContent = texto;
      b.addEventListener("click", () => {
        if (datos[campo] !== valor) alCambiar(campo, valor);
      });
      caja.appendChild(b);
    });
    marcarBotones(caja, campo);
  }

  function marcarBotones(caja, campo) {
    caja.querySelectorAll(".opcion").forEach((b) => {
      b.setAttribute("aria-checked", datos[campo] === b.dataset.valor ? "true" : "false");
    });
  }

  function seccion(nombre, titulo) {
    let s = form.querySelector('[data-bloque="' + nombre + '"]');
    if (!s) {
      s = document.createElement("section");
      s.className = "bloque";
      s.dataset.bloque = nombre;
      const h = document.createElement("h2");
      h.textContent = titulo;
      const campos = document.createElement("div");
      campos.className = "campos";
      s.appendChild(h);
      s.appendChild(campos);
      form.appendChild(s);
    }
    return s;
  }

  function actualizarFormulario() {
    datos = R.depurar(datos);
    const visibles = R.camposVisibles(datos);
    const bloques = {
      paciente: visibles.filter((c) => BLOQUE_PACIENTE.includes(c)),
      prueba: visibles.filter((c) => !BLOQUE_PACIENTE.includes(c))
    };

    form.querySelectorAll(".form-group").forEach((el) => {
      if (!visibles.includes(el.dataset.campo)) el.remove();
    });

    [["paciente", "1. Paciente"], ["prueba", "2. Prueba"]].forEach(([nombre, titulo]) => {
      const s = seccion(nombre, titulo);
      s.hidden = bloques[nombre].length === 0;
      const contenedor = s.querySelector(".campos");
      let anterior = null;
      bloques[nombre].forEach((campo) => {
        let grupo = form.querySelector('[data-campo="' + campo + '"]');
        if (grupo && grupo.dataset.firma !== firma(campo)) { grupo.remove(); grupo = null; }
        if (!grupo) grupo = crearCampo(campo);
        else {
          const select = grupo.querySelector("select");
          if (select) select.value = datos[campo] !== undefined ? datos[campo] : "";
          const caja = grupo.querySelector(".opciones-botones");
          if (caja) marcarBotones(caja, campo);
        }
        const referencia = anterior ? anterior.nextSibling : contenedor.firstChild;
        if (grupo !== referencia) contenedor.insertBefore(grupo, referencia);
        anterior = grupo;
      });
    });
  }

  // ---------------- resultado ----------------
  function lineaDatos() {
    return R.camposVisibles(datos)
      .filter((c) => datos[c] !== undefined && CORTO[c])
      .map((c) => {
        const o = R.CAMPOS[c].tipo === "numero" ? null : R.opciones(c, datos).find((x) => x[0] === datos[c]);
        return CORTO[c](datos[c], o ? o[1] : String(datos[c]));
      })
      .filter(Boolean)
      .join(" · ");
  }

  function mostrarIncompleto(r) {
    const lista = r.etiquetas.map((e) => "<li>" + esc(e) + "</li>").join("");
    resultado.innerHTML =
      '<div class="recomendacion">Completa los datos</div>' +
      '<ul class="faltan">' + lista + "</ul>";
    resultado.className = "resultado incompleto";
  }

  function mostrarResultado(r) {
    let html = '<div class="recomendacion">' + esc(r.recomendacion) + "</div>";
    if (r.detalle) html += '<p class="detalle">' + esc(r.detalle) + "</p>";
    html += '<p class="datos-linea"><span class="sr-only">Datos introducidos: </span>' + esc(lineaDatos()) + "</p>";

    if (r.aepcc) {
      html += '<p class="aepcc"><span class="etiqueta-aepcc">AEPCC</span> El PDPCCU no contempla esta situación; la recomendación procede de la AEPCC.</p>';
    }
    if (r.notas.length) {
      html += '<ul class="notas">' + r.notas.map((n) => "<li>" + esc(n) + "</li>").join("") + "</ul>";
    }

    if (r.info && T[r.info]) {
      html +=
        '<details class="paciente"><summary>Información para la paciente</summary>' +
        '<div class="acciones-paciente">' +
        '<button type="button" class="accion" data-accion="imprimir">Imprimir</button>' +
        '<button type="button" class="accion" data-accion="copiar">Copiar texto</button>' +
        '<span class="aviso-copia" aria-live="polite"></span></div>' +
        '<div class="texto-paciente"><p class="solo-impresion">Conecta VPH Andalucía</p>' +
        T[r.info] + T.general + "</div></details>";
    }

    resultado.innerHTML = html;
    resultado.className = "resultado " + r.tipo;

    const imprimir = resultado.querySelector('[data-accion="imprimir"]');
    if (imprimir) imprimir.addEventListener("click", imprimirPaciente);
    const copiar = resultado.querySelector('[data-accion="copiar"]');
    if (copiar) copiar.addEventListener("click", copiarPaciente);
  }

  function imprimirPaciente() {
    const det = resultado.querySelector("details.paciente");
    const abierto = det.open;
    det.open = true;
    document.body.classList.add("imprimir-paciente");
    const fin = () => {
      document.body.classList.remove("imprimir-paciente");
      det.open = abierto;
      window.removeEventListener("afterprint", fin);
    };
    window.addEventListener("afterprint", fin);
    window.print();
  }

  function copiarPaciente() {
    const texto = resultado.querySelector(".texto-paciente").innerText.trim();
    const aviso = resultado.querySelector(".aviso-copia");
    const hecho = (ok) => { aviso.textContent = ok ? "Texto copiado" : "No se ha podido copiar"; };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(() => hecho(true), () => hecho(copiaManual(texto)));
      } else {
        hecho(copiaManual(texto));
      }
    } catch (e) {
      hecho(false);
    }
  }

  function copiaManual(texto) {
    try {
      const area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch (e) {
      return false;
    }
  }

  function calcular() {
    const r = R.evaluar(datos);
    if (!r.completo) mostrarIncompleto(r);
    else mostrarResultado(r);
    resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function reiniciar() {
    datos = {};
    form.innerHTML = "";
    limpiarResultado();
    actualizarFormulario();
    const edad = document.getElementById("f_edad");
    if (edad) edad.focus();
  }

  // ---------------- inicio ----------------
  document.getElementById("btn-calcular").addEventListener("click", calcular);
  document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);

  document.getElementById("version").textContent =
    "Versión " + R.VERSION + " · " + R.FECHA_VERSION.split("-").reverse().join("/");
  document.getElementById("base").textContent = "Basada en: " + R.BASE + ".";
  if (BORRADOR) document.getElementById("aviso-borrador").classList.remove("hidden");

  // En pantallas pequeñas, los criterios de exclusión empiezan plegados.
  const exclusiones = document.querySelector(".exclusiones");
  if (exclusiones && window.matchMedia && window.matchMedia("(max-width: 640px)").matches) exclusiones.open = false;

  actualizarFormulario();
})();
