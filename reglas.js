// =====================================================================
// CALCULADORA CONECTA VPH ANDALUCÍA · REGLAS DE DECISIÓN
// ---------------------------------------------------------------------
// Este archivo contiene toda la lógica clínica, sin interfaz. Es la
// matriz de reglas que valida el panel (Estudio I): cada recomendación
// lleva un identificador de regla, sus fuentes y la marca AEPCC cuando
// procede de la AEPCC porque el PDPCCU no contempla la situación.
// Principio: el PDPCCU prevalece; la AEPCC solo cubre lo que el PDPCCU
// no regula.
// =====================================================================

(function (root) {
  "use strict";

  const VERSION = "2.2.0";
  const FECHA_VERSION = "2026-10-25";
  const BASE = "PDPCCU de Andalucía (junio de 2024) y anexo «VPH + con genotipado indeterminado» v1.3; AEPCC 2022 y AEPCC 2025 donde el PDPCCU no llega";

  // ------------------------------------------------------------------
  // FUENTES
  // ------------------------------------------------------------------
  const F = {
    P3: "PDPCCU (junio 2024), p. 3",
    P12: "PDPCCU (junio 2024), algoritmos p. 12",
    P13: "PDPCCU (junio 2024), algoritmos p. 13",
    PANX: "PDPCCU, anexo «VPH + con genotipado indeterminado» v1.3",
    PXI: "PDPCCU, anexo XI (criterios de exclusión)",
    A22_43: "AEPCC 2022, apartado 4.3 (p. 43–44)",
    A22_55: "AEPCC 2022, apartado 6.1 (p. 55–56)",
    A22_57: "AEPCC 2022, apartado 6.3.1 (p. 57)",
    A22_COP: "AEPCC 2022, definición de co-test positivo (p. 59, 64 y 68)",
    A22_53: "AEPCC 2022, apartado 5.4 (p. 53–54): infección VPH persistente sin lesión cervical",
    A22_CIN1: "AEPCC 2022, algoritmo «Biopsia LSIL/CIN1»",
    A22_ALTO: "AEPCC 2022, algoritmos «Citología HSIL», «Citología ASC-H» y «Citología ACG»: tras colposcopia negativa, co-test anual dos veces y colposcopia si es positivo",
    ASCCP: "ASCCP 2019 (Perkins et al., 2020) y Egemen et al. (2020): vigilancia al año tras colposcopia con CIN1 o menos",
    A22_238: "AEPCC 2022, apartado 2.3.8",
    A22_634: "AEPCC 2022, apartado 6.3.4 (gestantes)",
    A25_19: "AEPCC 2025, tabla 2, apartado 3 (p. 19)",
    A25_24: "AEPCC 2025, apartado 2.2.3 (p. 24)",
    A25_7: "AEPCC 2025, tabla 2, apartado 7 (p. 20)",
    A25_8: "AEPCC 2025, tabla 2, apartado 8 (p. 20)",
    A25_9: "AEPCC 2025, tabla 2, apartado 9 (p. 20)",
    A25_1011: "AEPCC 2025, tabla 2, apartados 10 y 11 (p. 20)",
    DEC: "Decisión del equipo investigador (pendiente de validación por el panel)"
  };

  // ------------------------------------------------------------------
  // MATRIZ DE REGLAS: id -> descripción, fuentes y marca AEPCC
  // ------------------------------------------------------------------
  const REGLAS = {
    // Edad y exclusiones
    "EDAD-MENOR25": { d: "Menor de 25 años: fuera de la población diana", f: [F.P3], aepcc: false },
    "EDAD-MAYOR75": { d: "Mayor de 75 años sin situación especial: no procede cribado", f: [F.A25_19], aepcc: true },

    // Cribado primario 25–34 (citología)
    "C25-NORMAL": { d: "Citología negativa: cribado rutinario", f: [F.P12, F.P3], aepcc: false },
    "C25-NV-PREVIO": { d: "Citología no valorable con previa inmediata no valorable: colposcopia", f: [F.P12], aepcc: false },
    "C25-NV-REPETIR": { d: "Citología no valorable: repetir la toma en 2–4 meses", f: [F.P12, F.A22_55], aepcc: false },
    "C25-ALTO": { d: "ASC-H, HSIL, AGC o carcinoma: colposcopia", f: [F.P12], aepcc: false },
    "C25-ASCUS-NEG": { d: "ASC-US con VPH negativo: co-test en 3 años", f: [F.P12], aepcc: false },
    "C25-LSIL-NEG": { d: "LSIL con VPH negativo: co-test en 1 año", f: [F.P12], aepcc: false },
    "C25-BAJO-NO1618": { d: "ASC-US o LSIL con VPH no 16/18: co-test en 1 año", f: [F.P12], aepcc: false },
    "C25-BAJO-1618": { d: "ASC-US o LSIL con VPH 16/18: colposcopia", f: [F.P12], aepcc: false },
    "C25-INDET": { d: "ASC-US o LSIL con VPH positivo y genotipado indeterminado: repetir la toma", f: [F.PANX], aepcc: false },
    "C25-INDET-2": { d: "Segundo VPH positivo con genotipado indeterminado: valoración ginecológica", f: [F.PANX], aepcc: false },
    "C25-VPHNV-PREVIO": { d: "VPH de triaje no valorable con previo inmediato no valorable: colposcopia", f: [F.P12, F.DEC], aepcc: false },
    "C25-VPHNV-REPETIR": { d: "VPH de triaje no valorable: repetir la toma para nueva prueba de VPH en 2–4 meses", f: [F.A22_57, F.A22_55, F.DEC], aepcc: true },
    "C25-PENDIENTE": { d: "VPH de triaje pendiente: completar cuando esté el resultado", f: [F.P12], aepcc: false },

    // Cribado primario 35–65 (VPH)
    "C35-NEG": { d: "VPH negativo: cribado rutinario con VPH en 5 años", f: [F.P12], aepcc: false },
    "C35-NEG-SALIDA": { d: "VPH negativo entre 61 y 64 años: la siguiente prueba (66–69 años) es la de salida", f: [F.P12, F.A25_24], aepcc: true },
    "C35-NEG-65-ADEC": { d: "VPH negativo a los 65 años con cribado previo adecuado y negativo: fin del cribado", f: [F.A25_19], aepcc: true },
    "C35-NEG-65-INADEC": { d: "VPH negativo a los 65 años con cribado previo inadecuado o desconocido: VPH a los 70 años", f: [F.A25_19], aepcc: true },
    "C35-VPHNV-PREVIO": { d: "VPH no valorable con previo inmediato no valorable: colposcopia", f: [F.P12], aepcc: false },
    "C35-VPHNV-REPETIR": { d: "VPH no valorable: repetir la toma en 2–4 meses", f: [F.P12, F.A22_55], aepcc: false },
    "C35-1618": { d: "VPH 16/18 positivo: colposcopia", f: [F.P12], aepcc: false },
    "C35-NO1618-NEG": { d: "VPH no 16/18 con citología refleja negativa: co-test en 1 año", f: [F.P12], aepcc: false },
    "C35-BAJO-MENO": { d: "VPH no 16/18 con ASC-US o LSIL en mujer menopáusica: colposcopia", f: [F.P12], aepcc: false },
    "C35-BAJO-NOMENO": { d: "VPH no 16/18 con ASC-US o LSIL en mujer no menopáusica: co-test en 1 año", f: [F.P12], aepcc: false },
    "C35-ALTO": { d: "VPH positivo con ASC-H, HSIL, AGC o carcinoma: colposcopia", f: [F.P12, F.PANX], aepcc: false },
    "C35-CITNV-REPETIR": { d: "VPH no 16/18 con citología refleja no valorable: repetir la citología en 2–4 meses", f: [F.A22_55], aepcc: true },
    "C35-CITNV-2": { d: "VPH no 16/18 con citología repetida de nuevo no valorable: colposcopia", f: [F.A22_55], aepcc: true },
    "C35-PENDIENTE": { d: "Citología refleja pendiente: completar cuando esté el resultado", f: [F.P12], aepcc: false },
    "C35-INDET-NEG": { d: "Genotipado indeterminado con citología refleja negativa: repetir la toma", f: [F.PANX], aepcc: false },
    "C35-INDET-BAJO-MENO": { d: "Genotipado indeterminado con ASC-US o LSIL en mujer menopáusica: colposcopia", f: [F.PANX], aepcc: false },
    "C35-INDET-BAJO-NOMENO": { d: "Genotipado indeterminado con ASC-US o LSIL en mujer no menopáusica: repetir la toma", f: [F.PANX], aepcc: false },
    "C35-INDET-CITNV": { d: "Genotipado indeterminado con citología refleja no valorable: repetir la toma", f: [F.PANX], aepcc: false },
    "C35-INDET-2": { d: "Segundo VPH positivo con genotipado indeterminado: valoración ginecológica", f: [F.PANX], aepcc: false },

    // Seguimiento con co-test
    "SEG-ALTO": { d: "Co-test con citología ASC-H, HSIL, AGC o carcinoma: colposcopia", f: [F.P13, F.A22_CIN1], aepcc: false },
    "SEG-1618": { d: "Co-test con VPH 16/18, con cualquier citología: colposcopia", f: [F.P13, F.A22_53, F.A22_CIN1], aepcc: false },
    "SEG-BAJO-SINCOLPO": { d: "Co-test con citología ASC-US o LSIL, o VPH no 16/18, sin colposcopia previa en este seguimiento: colposcopia", f: [F.P13, F.A22_COP], aepcc: false },
    "SEG-BAJO-ALTOPREVIO": { d: "Citología ASC-US o LSIL, o VPH no 16/18, tras colposcopia por citología HSIL, ASC-H o AGC sin CIN2+: colposcopia", f: [F.P13, F.A22_ALTO], aepcc: false },
    "SEG-BAJO-CONTROL": { d: "Citología negativa, ASC-US o LSIL con VPH negativo o no 16/18, y colposcopia hace menos de 2 años, indicada por una citología distinta de HSIL, ASC-H o AGC, que descartó HSIL/CIN2+: co-test en 1 año", f: [F.A22_53, F.A22_CIN1, F.ASCCP], aepcc: true },
    "SEG-BAJO-COLPO": { d: "Citología negativa, ASC-US o LSIL con VPH negativo o no 16/18, y última colposcopia hace 2 años o más: colposcopia", f: [F.A22_53, F.A22_CIN1], aepcc: true },
    "SEG-INDET": { d: "Co-test con genotipado indeterminado (citología negativa o no valorable, o ASC-US/LSIL en mujer no menopáusica o menor de 35 años): repetir la toma", f: [F.PANX], aepcc: false },
    "SEG-INDET-BAJO-MENO": { d: "Co-test con genotipado indeterminado y ASC-US o LSIL en mujer menopáusica o mayor de 65 años: colposcopia", f: [F.PANX, F.DEC], aepcc: false },
    "SEG-INDET-2": { d: "Segundo VPH positivo consecutivo con genotipado indeterminado: valoración ginecológica", f: [F.PANX], aepcc: false },
    "SEG-NV-PREVIO": { d: "Co-test con una prueba no valorable y previo inmediato también no valorable: colposcopia", f: [F.P12, F.DEC], aepcc: false },
    "SEG-NV-REPETIR": { d: "Co-test con una prueba no valorable, sin otro resultado que indique colposcopia: repetir el co-test en 2–4 meses", f: [F.A22_55, F.DEC], aepcc: true },
    "SEG-ANUAL1-NEG": { d: "Primer co-test anual negativo (o primero negativo tras un co-test con hallazgo): segundo co-test en 1 año", f: [F.P13, F.A22_CIN1], aepcc: false },
    "SEG-RESUELTO": { d: "Seguimiento resuelto (dos co-test anuales negativos o co-test a 3 años negativo): vuelta al cribado según edad", f: [F.P13, F.P3], aepcc: false },
    "SEG-RESUELTO-SALIDA": { d: "Seguimiento resuelto entre 61 y 64 años: la siguiente prueba (66–69 años) es la de salida", f: [F.P13, F.A25_24], aepcc: true },
    "SEG-RESUELTO-65": { d: "Seguimiento resuelto a los 65 años (equivale a cribado inadecuado): VPH a los 70 años", f: [F.A25_19, F.DEC], aepcc: true },
    "SEG-RESUELTO-66": { d: "Seguimiento resuelto entre 66 y 75 años: fin del cribado", f: [F.A25_19, F.DEC], aepcc: true },

    // Vuelta al cribado tras valoración ginecológica
    "GINE-RUTINA": { d: "Vuelta al cribado según edad", f: [F.P13, F.P3], aepcc: false },
    "GINE-MAYOR65": { d: "Siguiente valoración después de los 65 años: exclusión y seguimiento fuera del cribado", f: [F.P13, F.A25_19, F.A25_24, F.DEC], aepcc: false },

    // Prueba de salida o captación activa 66–75
    "SAL-NEG": { d: "Prueba de salida negativa: fin del cribado", f: [F.A25_19, F.A25_24], aepcc: true },
    "SAL-POS": { d: "Prueba de salida positiva: colposcopia", f: [F.A25_19, F.A25_24], aepcc: true },
    "SAL-NV": { d: "Prueba de salida no valorable: repetir la toma en 2–4 meses", f: [F.A22_55, F.DEC], aepcc: true }
  };

  // ------------------------------------------------------------------
  // CAMPOS DEL FORMULARIO
  // ------------------------------------------------------------------
  const SI_NO = [["si", "Sí"], ["no", "No"]];
  const CIT = [
    ["negativa", "Negativa (normal)"],
    ["ascus", "ASC-US"],
    ["lsil", "LSIL"],
    ["alto", "ASC-H, HSIL, AGC o carcinoma"],
    ["no_valorable", "No valorable / no concluyente"]
  ];
  const VPH = [
    ["negativo", "Negativo"],
    ["no1618", "Positivo no 16/18"],
    ["1618", "Positivo 16/18"],
    ["indet", "Positivo con genotipado indeterminado"],
    ["no_valorable", "No valorable / no concluyente"]
  ];

  const CAMPOS = {
    edad: { etiqueta: "Edad en la fecha de la toma (años)", tipo: "numero" },
    contexto: { etiqueta: "Situación clínica" }, // opciones según la edad
    cit_cribado: { etiqueta: "Resultado de la citología de cribado", opciones: CIT },
    previo_nv_cit: { etiqueta: "¿La citología previa inmediata fue también no valorable?", opciones: SI_NO },
    vph_triaje: {
      etiqueta: "Resultado del VPH de triaje",
      opciones: VPH.concat([["pendiente", "Pendiente"]])
    },
    vph_cribado: { etiqueta: "Resultado del VPH de cribado", opciones: VPH },
    previo_indet: { etiqueta: "¿El resultado previo inmediato fue también VPH positivo con genotipado indeterminado?", opciones: SI_NO },
    previo_nv_vph: { etiqueta: "¿La prueba de VPH previa inmediata fue también no valorable?", opciones: SI_NO },
    cit_refleja: {
      etiqueta: "Resultado de la citología refleja",
      opciones: CIT.concat([["pendiente", "Pendiente"]])
    },
    menopausia: { etiqueta: "¿Es menopáusica?", opciones: SI_NO },
    cit_repetida: { etiqueta: "¿Es ya la citología repetida tras una citología refleja no valorable?", opciones: SI_NO },
    cribado_adecuado: {
      etiqueta: "¿Cribado previo adecuado y negativo en los últimos 10 años, incluida esta prueba?",
      ayuda: "Dos pruebas de VPH, tres citologías, o dos citologías y una prueba de VPH negativas, en los intervalos establecidos (AEPCC 2025).",
      opciones: [["si", "Sí"], ["no", "No o no consta"]]
    },
    tipo_cotest: {
      etiqueta: "¿Qué co-test es?",
      opciones: [
        ["anual_1", "Primer co-test anual de control, o el primero tras un co-test con hallazgo"],
        ["anual_2", "Segundo co-test anual (el anterior fue negativo)"],
        ["trienal", "Co-test a los 3 años (tras ASC-US con VPH negativo)"]
      ]
    },
    cot_cit: { etiqueta: "Citología del co-test", opciones: CIT },
    cot_vph: { etiqueta: "VPH del co-test", opciones: VPH },
    ultima_colpo: {
      etiqueta: "¿Cuándo fue la última colposcopia que descartó HSIL/CIN2+?",
      opciones: [["menos2", "Hace menos de 2 años"], ["2omas", "Hace 2 años o más"], ["ninguna", "No se ha hecho colposcopia"]]
    },
    origen_colpo: {
      etiqueta: "¿Qué citología motivó esa colposcopia?",
      opciones: [["alto", "HSIL, ASC-H o AGC"], ["otro", "Otra (negativa, ASC-US o LSIL)"]]
    },
    previo_nv_cot: { etiqueta: "¿El co-test previo inmediato fue también no valorable?", opciones: SI_NO },
    prueba_salida: { etiqueta: "Prueba realizada", opciones: [["vph", "Prueba de VPH"], ["cotest", "Co-test"]] },
    vph_salida: {
      etiqueta: "Resultado del VPH",
      opciones: [["negativo", "Negativo"], ["positivo", "Positivo (cualquier genotipo)"], ["no_valorable", "No valorable / no concluyente"]]
    }
  };

  // ------------------------------------------------------------------
  // UTILIDADES
  // ------------------------------------------------------------------
  function edadValida(d) {
    const e = d.edad;
    return typeof e === "number" && Number.isInteger(e) && e >= 0 && e <= 120;
  }

  // Hallazgo en la prueba de salida (cualquier resultado positivo).
  function hallazgoCotest(cit, vph) {
    return ["ascus", "lsil", "alto"].includes(cit) || ["no1618", "1618", "indet"].includes(vph);
  }

  // Co-test de seguimiento: resultado de bajo grado (citología ASC-US o
  // LSIL, o VPH no 16/18), sin citología de alto grado ni VPH 16/18 ni
  // genotipado indeterminado.
  function bajoGradoCotest(cit, vph) {
    if (cit === "alto" || vph === "1618" || vph === "indet") return false;
    return ["ascus", "lsil"].includes(cit) || vph === "no1618";
  }

  function opciones(campo, d) {
    if (campo === "contexto") {
      if (d.edad >= 66) {
        return [
          ["salida", "Prueba de salida o captación activa (66–75 años)"],
          ["seguimiento", "Resultado de un co-test de seguimiento"],
          ["vuelta_gine", "Vuelta al cribado indicada por ginecología (según edad)"]
        ];
      }
      return [
        ["cribado", "Resultado de la prueba de cribado"],
        ["seguimiento", "Resultado de un co-test de seguimiento"],
        ["vuelta_gine", "Vuelta al cribado indicada por ginecología (según edad)"]
      ];
    }
    return CAMPOS[campo].opciones;
  }

  function valorValido(campo, valor, d) {
    if (campo === "edad") return edadValida({ edad: valor });
    return opciones(campo, d).some((o) => o[0] === valor);
  }

  function etiquetaValor(campo, valor, d) {
    if (campo === "edad") return valor + " años";
    const o = opciones(campo, d).find((x) => x[0] === valor);
    return o ? o[1] : String(valor);
  }

  // ------------------------------------------------------------------
  // CAMPOS VISIBLES SEGÚN LOS DATOS
  // ------------------------------------------------------------------
  function camposVisibles(d) {
    const v = ["edad"];
    if (!edadValida(d) || d.edad < 25) return v;

    if (d.edad > 75) return v;

    v.push("contexto");
    const ctx = valorValido("contexto", d.contexto, d) ? d.contexto : null;
    if (!ctx) return v;

    if (ctx === "cribado" && d.edad <= 34) {
      v.push("cit_cribado");
      if (d.cit_cribado === "no_valorable") v.push("previo_nv_cit");
      if (["ascus", "lsil"].includes(d.cit_cribado)) {
        v.push("vph_triaje");
        if (d.vph_triaje === "indet") v.push("previo_indet");
        if (d.vph_triaje === "no_valorable") v.push("previo_nv_vph");
      }
    } else if (ctx === "cribado") {
      v.push("vph_cribado");
      if (d.vph_cribado === "negativo" && d.edad === 65) v.push("cribado_adecuado");
      if (d.vph_cribado === "no_valorable") v.push("previo_nv_vph");
      if (d.vph_cribado === "indet") v.push("previo_indet");
      const pideCitologia = d.vph_cribado === "no1618" || (d.vph_cribado === "indet" && d.previo_indet === "no");
      if (pideCitologia) {
        v.push("cit_refleja");
        if (["ascus", "lsil"].includes(d.cit_refleja)) v.push("menopausia");
        if (d.vph_cribado === "no1618" && d.cit_refleja === "no_valorable") v.push("cit_repetida");
      }
    } else if (ctx === "seguimiento") {
      v.push("tipo_cotest", "cot_cit", "cot_vph");
      const cit = d.cot_cit, vph = d.cot_vph;
      if (valorValido("cot_cit", cit, d) && valorValido("cot_vph", vph, d) && cit !== "alto" && vph !== "1618") {
        const nv = cit === "no_valorable" || vph === "no_valorable";
        if (vph === "indet") {
          v.push("previo_indet");
          if (d.previo_indet === "no" && ["ascus", "lsil"].includes(cit) && d.edad >= 35 && d.edad <= 65) v.push("menopausia");
        } else if (bajoGradoCotest(cit, vph)) {
          v.push("ultima_colpo");
          if (d.ultima_colpo === "menos2") {
            v.push("origen_colpo");
            if (nv && d.origen_colpo === "otro") v.push("previo_nv_cot");
          }
        } else if (nv) {
          v.push("previo_nv_cot");
        }
      }
    } else if (ctx === "salida") {
      v.push("prueba_salida");
      if (d.prueba_salida === "vph") v.push("vph_salida");
      if (d.prueba_salida === "cotest") v.push("cot_cit", "cot_vph");
    }
    return v;
  }

  // Elimina los valores de campos que ya no están visibles o no son válidos.
  function depurar(d) {
    const limpio = {};
    let cambiado = true;
    let actual = Object.assign({}, d);
    while (cambiado) {
      cambiado = false;
      const vis = camposVisibles(actual);
      const nuevo = {};
      vis.forEach((c) => {
        if (actual[c] !== undefined && actual[c] !== null && actual[c] !== "" && valorValido(c, actual[c], actual)) {
          nuevo[c] = actual[c];
        }
      });
      if (JSON.stringify(nuevo) !== JSON.stringify(actual)) { actual = nuevo; cambiado = true; }
    }
    Object.assign(limpio, actual);
    return limpio;
  }

  // ------------------------------------------------------------------
  // CONSTRUCCIÓN DEL RESULTADO
  // ------------------------------------------------------------------
  function resultado(id, recomendacion, tipo, ruta, extra) {
    const r = REGLAS[id];
    if (!r) throw new Error("Regla desconocida: " + id);
    const e = extra || {};
    return {
      completo: true,
      id: id,
      recomendacion: recomendacion,
      detalle: e.detalle || "",
      tipo: tipo, // cribado | control | colposcopia | fuera
      ruta: ruta.slice(),
      fuentes: r.f.slice(),
      aepcc: r.aepcc,
      notas: (e.notas || []).slice(),
      info: e.info || null
    };
  }

  const CONSULTA = "Por el circuito de citología de consulta (Atención Primaria, fuera del cribado poblacional).";
  const COLPO = "Colposcopia (valoración ginecológica)";

  function edadSegunTramo(edad) { return edad < 35 ? "25–34 años: cribado con citología" : "35–65 años: cribado con prueba de VPH"; }

  // Siguiente prueba tras un resultado negativo que devuelve al cribado.
  // origen: "primario" (tras la prueba de cribado), "resuelto" (tras un
  // seguimiento con co-test) o "gine" (vuelta indicada por ginecología).
  function siguienteRutina(d, ruta, origen, ids, info) {
    const edad = d.edad;
    const intervalo = edad < 35 ? 3 : 5;
    const proxima = edad + intervalo;

    if (origen === "resuelto" && edad === 65) {
      ruta.push("Seguimiento resuelto a los 65 años: se trata como cribado previo inadecuado");
      return resultado("SEG-RESUELTO-65", "Prueba de VPH a los 70 años", "fuera", ruta,
        { detalle: CONSULTA + " Si es negativa, fin del cribado.", info: "pruebaSalida" });
    }
    if (origen === "resuelto" && edad >= 66) {
      ruta.push("Seguimiento resuelto entre los 66 y los 75 años");
      return resultado("SEG-RESUELTO-66", "Fin del cribado", "cribado", ruta, { info: "finCribado" });
    }
    if (origen === "gine" && proxima > 65) {
      ruta.push("Siguiente valoración después de los 65 años (a los " + proxima + ")");
      const cuando = proxima > 75 ? "ahora" : "a los " + proxima + " años";
      return resultado("GINE-MAYOR65", "Exclusión del cribado poblacional: prueba de VPH de salida " + cuando, "fuera", ruta,
        { detalle: CONSULTA + " Si es negativa, fin del cribado; si es positiva, colposcopia.", info: "pruebaSalida" });
    }
    if (proxima > 65) { // 61–64 años con intervalo de 5 años
      ruta.push("La siguiente prueba sería a los " + proxima + " años: prueba de salida del cribado");
      return resultado(ids.salida, "Prueba de VPH en 5 años (a los " + proxima + " años) como prueba de salida", "cribado", ruta,
        { detalle: CONSULTA + " Si es negativa, fin del cribado; si es positiva, colposcopia.", info: "pruebaSalida" });
    }
    const prueba = proxima >= 35 ? "prueba de VPH" : "citología";
    let detalle = "";
    if (edad < 35 && proxima >= 35) {
      ruta.push("Intervalo de 3 años; a los " + proxima + " años corresponde prueba de VPH");
      detalle = "Intervalo de 3 años; a partir de los 35 años la prueba de cribado es la de VPH.";
    }
    return resultado(ids.rutina, "Cribado rutinario: " + prueba + " en " + intervalo + " años (a los " + proxima + " años)", "cribado", ruta,
      { detalle: detalle, info: info });
  }

  // Detalle para un control que cae después de los 65 años.
  function fueraSiMayor65(meses, d) {
    const años = Math.floor(meses / 12);
    return d.edad + años > 65 ? CONSULTA : "";
  }

  // ------------------------------------------------------------------
  // EVALUACIÓN
  // ------------------------------------------------------------------
  function incompleto(faltan, d) {
    return { completo: false, faltan: faltan, etiquetas: faltan.map((c) => CAMPOS[c].etiqueta) };
  }

  function evaluar(entrada) {
    const d = depurar(entrada || {});
    const vis = camposVisibles(d);
    const faltan = vis.filter((c) => d[c] === undefined);
    if (faltan.length) return incompleto(faltan, d);

    const ruta = [];
    const edad = d.edad;

    if (edad < 25) {
      ruta.push("Edad: " + edad + " años");
      return resultado("EDAD-MENOR25", "Fuera de la población diana: el cribado comienza a los 25 años", "fuera", ruta);
    }

    if (edad > 75) {
      ruta.push("Edad: " + edad + " años");
      return resultado("EDAD-MAYOR75", "No procede cribado (mayor de 75 años)", "fuera", ruta);
    }

    let r;
    const ctx = d.contexto;
    if (ctx === "cribado" && edad <= 34) r = cribado25(d, ruta);
    else if (ctx === "cribado") r = cribado35(d, ruta);
    else if (ctx === "seguimiento") r = seguimiento(d, ruta);
    else if (ctx === "vuelta_gine") {
      ruta.push("Vuelta al cribado indicada por ginecología, según edad");
      r = siguienteRutina(d, ruta, "gine", { rutina: "GINE-RUTINA", salida: "GINE-MAYOR65" }, "vueltaCribado");
    } else r = salida(d, ruta);

    return r;
  }

  function cribado25(d, ruta) {
    ruta.push(edadSegunTramo(d.edad));
    const c = d.cit_cribado;
    if (c === "negativa") {
      ruta.push("Citología negativa");
      return siguienteRutina(d, ruta, "primario", { rutina: "C25-NORMAL", salida: "C25-NORMAL" }, "citologiaNormal");
    }
    if (c === "no_valorable") {
      ruta.push("Citología no valorable");
      if (d.previo_nv_cit === "si") {
        ruta.push("Previa inmediata también no valorable");
        return resultado("C25-NV-PREVIO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      ruta.push("Previa inmediata valorable");
      return resultado("C25-NV-REPETIR", "Repetir la toma de muestra en 2–4 meses", "control", ruta,
        { info: "repetirNoValorable", notas: ["Si el informe describe atrofia, inflamación o infección, tratarla antes de repetir la toma (AEPCC 2022)."] });
    }
    if (c === "alto") {
      ruta.push("Citología ASC-H, HSIL, AGC o carcinoma");
      return resultado("C25-ALTO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    // ASC-US o LSIL: triaje con VPH
    ruta.push("Citología " + (c === "ascus" ? "ASC-US" : "LSIL") + ": triaje con VPH genotipado");
    const v = d.vph_triaje;
    if (v === "pendiente") {
      return resultado("C25-PENDIENTE", "Pendiente del resultado del VPH de triaje: vuelva a calcular cuando esté disponible", "control", ruta);
    }
    if (v === "negativo") {
      ruta.push("VPH negativo");
      if (c === "ascus") return resultado("C25-ASCUS-NEG", "Co-test en 3 años", "control", ruta, { info: "ascusVphNegativo" });
      return resultado("C25-LSIL-NEG", "Co-test en 1 año", "control", ruta, { info: "lsilVphNegativo" });
    }
    if (v === "no1618") {
      ruta.push("VPH positivo no 16/18");
      return resultado("C25-BAJO-NO1618", "Co-test en 1 año", "control", ruta, { info: "cotest1Anio" });
    }
    if (v === "1618") {
      ruta.push("VPH positivo 16/18");
      return resultado("C25-BAJO-1618", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    if (v === "indet") {
      ruta.push("VPH positivo con genotipado indeterminado");
      if (d.previo_indet === "si") {
        ruta.push("Segundo resultado consecutivo con genotipado indeterminado");
        return resultado("C25-INDET-2", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      return resultado("C25-INDET", "Repetir la toma de muestra en Atención Primaria", "control", ruta, { info: "repetirIndeterminado" });
    }
    // VPH de triaje no valorable
    ruta.push("VPH de triaje no valorable");
    if (d.previo_nv_vph === "si") {
      ruta.push("Prueba de VPH previa inmediata también no valorable");
      return resultado("C25-VPHNV-PREVIO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    return resultado("C25-VPHNV-REPETIR", "Repetir la toma para una nueva prueba de VPH en 2–4 meses", "control", ruta, { info: "repetirNoValorable" });
  }

  function cribado35(d, ruta) {
    ruta.push(edadSegunTramo(d.edad));
    const v = d.vph_cribado;
    if (v === "negativo") {
      ruta.push("VPH negativo");
      if (d.edad === 65) {
        if (d.cribado_adecuado === "si") {
          ruta.push("65 años con cribado previo adecuado y negativo");
          return resultado("C35-NEG-65-ADEC", "Fin del cribado", "cribado", ruta, { info: "finCribado" });
        }
        ruta.push("65 años con cribado previo inadecuado o desconocido");
        return resultado("C35-NEG-65-INADEC", "Prueba de VPH a los 70 años", "fuera", ruta,
          { detalle: CONSULTA + " Si es negativa, fin del cribado.", info: "pruebaSalida" });
      }
      return siguienteRutina(d, ruta, "primario", { rutina: "C35-NEG", salida: "C35-NEG-SALIDA" }, "vphNegativo");
    }
    if (v === "no_valorable") {
      ruta.push("VPH no valorable");
      if (d.previo_nv_vph === "si") {
        ruta.push("Prueba previa inmediata también no valorable");
        return resultado("C35-VPHNV-PREVIO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      return resultado("C35-VPHNV-REPETIR", "Repetir la toma de muestra en 2–4 meses", "control", ruta, { info: "repetirNoValorable" });
    }
    if (v === "1618") {
      ruta.push("VPH positivo 16/18");
      return resultado("C35-1618", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    if (v === "indet") {
      ruta.push("VPH positivo con genotipado indeterminado");
      if (d.previo_indet === "si") {
        ruta.push("Segundo resultado consecutivo con genotipado indeterminado");
        return resultado("C35-INDET-2", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      const c = d.cit_refleja;
      if (c === "pendiente") return resultado("C35-PENDIENTE", "Pendiente de la citología refleja: vuelva a calcular cuando esté disponible", "control", ruta);
      if (c === "alto") {
        ruta.push("Citología refleja ASC-H, HSIL, AGC o carcinoma");
        return resultado("C35-ALTO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      if (c === "negativa") {
        ruta.push("Citología refleja negativa");
        return resultado("C35-INDET-NEG", "Repetir la toma de muestra en Atención Primaria", "control", ruta, { info: "repetirIndeterminado" });
      }
      if (c === "no_valorable") {
        ruta.push("Citología refleja no valorable");
        return resultado("C35-INDET-CITNV", "Repetir la toma de muestra en Atención Primaria", "control", ruta, { info: "repetirIndeterminado" });
      }
      ruta.push("Citología refleja " + (c === "ascus" ? "ASC-US" : "LSIL"));
      if (d.menopausia === "si") {
        ruta.push("Menopáusica");
        return resultado("C35-INDET-BAJO-MENO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      ruta.push("No menopáusica");
      return resultado("C35-INDET-BAJO-NOMENO", "Repetir la toma de muestra en Atención Primaria", "control", ruta, { info: "repetirIndeterminado" });
    }
    // VPH positivo no 16/18
    ruta.push("VPH positivo no 16/18");
    const c = d.cit_refleja;
    if (c === "pendiente") return resultado("C35-PENDIENTE", "Pendiente de la citología refleja: vuelva a calcular cuando esté disponible", "control", ruta);
    if (c === "negativa") {
      ruta.push("Citología refleja negativa");
      return resultado("C35-NO1618-NEG", "Co-test en 1 año", "control", ruta, { detalle: fueraSiMayor65(12, d), info: "citologiaNormalVphNo1618" });
    }
    if (c === "alto") {
      ruta.push("Citología refleja ASC-H, HSIL, AGC o carcinoma");
      return resultado("C35-ALTO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    if (c === "no_valorable") {
      ruta.push("Citología refleja no valorable");
      if (d.cit_repetida === "si") {
        ruta.push("La citología repetida vuelve a ser no valorable");
        return resultado("C35-CITNV-2", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      return resultado("C35-CITNV-REPETIR", "Repetir la citología en 2–4 meses", "control", ruta,
        { info: "repetirNoValorable", notas: ["Si el informe describe atrofia, inflamación o infección, tratarla antes de repetir la toma (AEPCC 2022)."] });
    }
    ruta.push("Citología refleja " + (c === "ascus" ? "ASC-US" : "LSIL"));
    if (d.menopausia === "si") {
      ruta.push("Menopáusica");
      return resultado("C35-BAJO-MENO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    ruta.push("No menopáusica");
    return resultado("C35-BAJO-NOMENO", "Co-test en 1 año", "control", ruta, { detalle: fueraSiMayor65(12, d), info: "cotest1Anio" });
  }

  function seguimiento(d, ruta) {
    const nombres = {
      anual_1: "Primer co-test anual de control",
      anual_2: "Segundo co-test anual",
      trienal: "Co-test a los 3 años"
    };
    ruta.push(nombres[d.tipo_cotest]);
    const cit = d.cot_cit, vph = d.cot_vph;
    ruta.push("Citología: " + etiquetaValor("cot_cit", cit, d) + " · VPH: " + etiquetaValor("cot_vph", vph, d));

    if (cit === "alto") {
      ruta.push("Citología ASC-H, HSIL, AGC o carcinoma");
      return resultado("SEG-ALTO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    if (vph === "1618") {
      ruta.push("VPH 16/18");
      return resultado("SEG-1618", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    }
    if (vph === "indet") {
      ruta.push("VPH positivo con genotipado indeterminado: anexo del PDPCCU");
      if (d.previo_indet === "si") {
        ruta.push("Segundo resultado consecutivo con genotipado indeterminado");
        return resultado("SEG-INDET-2", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      if (["ascus", "lsil"].includes(cit) && (d.edad > 65 || (d.edad >= 35 && d.menopausia === "si"))) {
        ruta.push((d.edad > 65 ? "Mayor de 65 años (posmenopáusica)" : "Menopáusica") + " con citología " + (cit === "ascus" ? "ASC-US" : "LSIL"));
        return resultado("SEG-INDET-BAJO-MENO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      return resultado("SEG-INDET", "Repetir la toma de muestra en Atención Primaria", "control", ruta,
        { detalle: fueraSiMayor65(3, d), info: "repetirIndeterminado" });
    }
    const nv = cit === "no_valorable" || vph === "no_valorable";
    if (bajoGradoCotest(cit, vph)) {
      ruta.push("Resultado de bajo grado: citología negativa, ASC-US o LSIL con VPH negativo o no 16/18");
      if (d.ultima_colpo === "ninguna") {
        ruta.push("Sin colposcopia previa en este seguimiento");
        return resultado("SEG-BAJO-SINCOLPO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      if (d.ultima_colpo === "2omas") {
        ruta.push("Última colposcopia hace 2 años o más");
        return resultado("SEG-BAJO-COLPO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      ruta.push("Colposcopia que descartó HSIL/CIN2+ hace menos de 2 años");
      if (d.origen_colpo === "alto") {
        ruta.push("Colposcopia indicada por citología HSIL, ASC-H o AGC: cualquier co-test positivo lleva a colposcopia");
        return resultado("SEG-BAJO-ALTOPREVIO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      ruta.push("Colposcopia indicada por citología negativa, ASC-US o LSIL");
      if (!nv) {
        const detalle = ["Mientras persista, co-test anual y colposcopia cada 2 años (cada año si aparece VPH 16/18).", fueraSiMayor65(12, d)].filter(Boolean).join(" ");
        return resultado("SEG-BAJO-CONTROL", "Co-test en 1 año", "control", ruta, { detalle: detalle, info: "controlTrasColposcopia" });
      }
    }
    if (nv) {
      ruta.push("Co-test con una prueba no valorable");
      if (d.previo_nv_cot === "si") {
        ruta.push("Co-test previo inmediato también no valorable");
        return resultado("SEG-NV-PREVIO", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      }
      return resultado("SEG-NV-REPETIR", "Repetir el co-test en 2–4 meses", "control", ruta, { detalle: fueraSiMayor65(3, d), info: "repetirNoValorable" });
    }
    ruta.push("Co-test negativo");
    if (d.tipo_cotest === "anual_1") {
      return resultado("SEG-ANUAL1-NEG", "Co-test en 1 año (segundo co-test de control)", "control", ruta, { detalle: fueraSiMayor65(12, d), info: "primerCotestNegativo" });
    }
    ruta.push(d.tipo_cotest === "anual_2" ? "Dos co-test anuales negativos: vuelta al cribado" : "Co-test a 3 años negativo: vuelta al cribado");
    return siguienteRutina(d, ruta, "resuelto", { rutina: "SEG-RESUELTO", salida: "SEG-RESUELTO-SALIDA" }, "segundoCotestNegativo");
  }

  function salida(d, ruta) {
    ruta.push("66–75 años: prueba de salida o captación activa");
    if (d.prueba_salida === "vph") {
      ruta.push("Prueba de VPH: " + etiquetaValor("vph_salida", d.vph_salida, d));
      if (d.vph_salida === "negativo") return resultado("SAL-NEG", "Fin del cribado", "cribado", ruta, { info: "finCribado" });
      if (d.vph_salida === "positivo") return resultado("SAL-POS", COLPO, "colposcopia", ruta, { info: "colposcopia" });
      return resultado("SAL-NV", "Repetir la toma de muestra en 2–4 meses", "control", ruta, { detalle: CONSULTA, info: "repetirNoValorable" });
    }
    const cit = d.cot_cit, vph = d.cot_vph;
    ruta.push("Co-test · citología: " + etiquetaValor("cot_cit", cit, d) + " · VPH: " + etiquetaValor("cot_vph", vph, d));
    if (hallazgoCotest(cit, vph)) return resultado("SAL-POS", COLPO, "colposcopia", ruta, { info: "colposcopia" });
    if (cit === "no_valorable" || vph === "no_valorable") {
      return resultado("SAL-NV", "Repetir la toma de muestra en 2–4 meses", "control", ruta, { detalle: CONSULTA, info: "repetirNoValorable" });
    }
    return resultado("SAL-NEG", "Fin del cribado", "cribado", ruta, { info: "finCribado" });
  }

  // Resumen legible de los datos introducidos (solo campos visibles).
  function resumen(entrada) {
    const d = depurar(entrada || {});
    return camposVisibles(d).filter((c) => d[c] !== undefined).map((c) => ({
      campo: c,
      etiqueta: CAMPOS[c].etiqueta,
      valor: etiquetaValor(c, d[c], d)
    }));
  }

  const API = {
    VERSION, FECHA_VERSION, BASE, FUENTES: F, REGLAS, CAMPOS,
    opciones, camposVisibles, depurar, evaluar, resumen, hallazgoCotest
  };
  root.ReglasPDPCCU = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : globalThis);
