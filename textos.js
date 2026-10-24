// =====================================================================
// TEXTOS DE INFORMACIÓN PARA LA PACIENTE
// Los textos de la versión 1 se mantienen literalmente, salvo el de
// colposcopia, del que se ha retirado la frase sobre el umbral del 5 %.
// Los textos marcados como NUEVO están pendientes de revisión.
// =====================================================================

(function (root) {
  "use strict";

  const SINTOMAS = `<p>Si antes de esa fecha presenta síntomas como sangrado vaginal fuera de la menstruación, después de las relaciones sexuales o flujo vaginal persistente no habitual, consulte con su profesional sanitario de referencia.</p>`;

  const T = {};

  T.general = `
  <div class="info-paciente">
    <p><strong>Recomendaciones generales:</strong></p>
    <p>Si no está vacunada frente al VPH, se recomienda la vacunación. La vacuna no trata una infección ya existente, pero sí ayuda a prevenir futuras infecciones.</p>
    <p>Si fuma, se recomienda dejar el tabaco, ya que favorece la persistencia del VPH y aumenta el riesgo de lesiones en el cuello del útero.</p>
    <p>El uso del preservativo ayuda a reducir el riesgo de transmisión del VPH, aunque no lo previene al 100 %.</p>
  </div>`;

  T.vphNegativo = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de la prueba del Virus del Papiloma Humano (VPH) es negativo.</p>
    <p>Esto significa que no se ha detectado infección por VPH de alto riesgo en la muestra tomada del cuello del útero (cérvix).</p>
    <p>Se trata de un resultado muy tranquilizador. Los estudios científicos realizados en un gran número de mujeres muestran que, cuando la prueba de VPH es negativa, la probabilidad de presentar una lesión importante en el cuello del útero en los próximos 5 años es inferior al 0,15 %.</p>
    <p>Por este motivo, no necesita realizar ninguna prueba adicional en este momento.</p>
    <p>Dentro del Programa de Detección Precoz de Cáncer de Cuello de Útero de Andalucía, la siguiente prueba de cribado se realizará dentro de 5 años.</p>
    <p>Es importante que participe de nuevo cuando reciba la próxima invitación.</p>
    ${SINTOMAS}
  </div>`;

  T.citologiaNormal = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de su citología es normal —negativo—.</p>
    <p>Esto significa que no se han detectado alteraciones en las células del cuello del útero —cérvix— en la muestra analizada.</p>
    <p>Se trata de un resultado tranquilizador. Los estudios científicos realizados en un gran número de mujeres muestran que, cuando la citología es negativa, la probabilidad de presentar una lesión importante en el cuello del útero en los próximos 5 años es inferior al 0,25 %.</p>
    <p>Por este motivo, no necesita realizar ninguna prueba adicional en este momento.</p>
    <p>Dentro del Programa de Detección Precoz de Cáncer de Cuello de Útero de Andalucía, la siguiente prueba de cribado se realizará dentro de 3 años.</p>
    <p>Es importante que participe de nuevo cuando reciba la próxima invitación.</p>
    ${SINTOMAS}
  </div>`;

  T.ascusVphNegativo = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de su citología muestra cambios leves en las células —ASC-US—, y la prueba del Virus del Papiloma Humano —VPH— es negativa.</p>
    <p>Esto significa que se han observado alteraciones celulares leves e inespecíficas en la muestra del cuello del útero —cérvix—, pero no se ha detectado infección por VPH de alto riesgo.</p>
    <p>Se trata de un resultado tranquilizador. La probabilidad de presentar una lesión importante en los próximos 5 años es aproximadamente del 0,5 %.</p>
    <p>Este riesgo es similar al de las mujeres con una citología normal, por lo que se considera un riesgo bajo.</p>
    <p>Por este motivo, no necesita realizar ninguna prueba adicional en este momento.</p>
    <p>La siguiente prueba de cribado se realizará dentro de 3 años.</p>
    <p>Es importante que participe de nuevo cuando reciba la próxima invitación.</p>
    ${SINTOMAS}
  </div>`;

  T.cotest1Anio = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de su prueba de cribado muestra cambios leves que requieren seguimiento.</p>
    <p>Esto significa que la prueba ha detectado una infección por VPH de alto riesgo y/o alteraciones celulares leves en el cuello del útero —cérvix—.</p>
    <p>Este resultado no significa que tenga cáncer. En la mayoría de los casos, estos cambios son leves y pueden desaparecer de forma espontánea.</p>
    <p>La probabilidad de presentar una lesión importante en los próximos 5 años se sitúa entre más del 0,5 % y el 4 %.</p>
    <p>Este nivel de riesgo se considera bajo-intermedio, por lo que no es necesario realizar una colposcopia en este momento.</p>
    <p>Lo recomendado es realizar un nuevo control dentro de 1 año mediante co-test, que incluye la prueba de VPH y la citología.</p>
    <p>Este seguimiento permite comprobar si la infección o los cambios celulares han desaparecido o si persisten y precisan una valoración adicional.</p>
    <p>Es muy importante acudir a esta revisión en la fecha indicada.</p>
    ${SINTOMAS}
  </div>`;

  // Versión 1 sin la frase: «Según las guías clínicas actuales, cuando el
  // riesgo estimado [...] es igual o superior al 5 %, se recomienda realizar
  // una colposcopia.» (no es aplicable a todas las indicaciones)
  T.colposcopia = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de su prueba de cribado indica la necesidad de realizar una valoración más detallada del cuello del útero —cérvix—.</p>
    <p>Esto significa que la prueba ha detectado cambios que aconsejan estudiar la zona con mayor detalle para descartar o confirmar la presencia de una lesión en el cuello del útero.</p>
    <p><strong>Este resultado no significa que tenga cáncer.</strong></p>
    <p>La colposcopia es una prueba sencilla que permite al profesional sanitario observar con aumento el cuello del útero mediante un aparato similar a una lupa con luz, llamado colposcopio.</p>
    <p>Durante la exploración, se aplica un líquido especial sobre el cuello del útero que ayuda a identificar posibles zonas con cambios celulares.</p>
    <p>La prueba se realiza en consulta, es similar a una revisión ginecológica habitual y no requiere ingreso ni anestesia general.</p>
    <p>En algunos casos, si el profesional observa una zona que necesita estudiarse mejor, puede tomar una pequeña muestra de tejido —biopsia— para analizarla.</p>
    <p>La mayoría de las veces, esta prueba sirve para confirmar que los cambios son leves o para detectar precozmente lesiones que pueden tratarse de forma sencilla antes de que progresen.</p>
    <p>La recomendación de realizar una colposcopia forma parte del seguimiento habitual del programa de cribado y permite actuar de manera preventiva.</p>
    <p>Es importante acudir a la cita programada para completar el estudio.</p>
  </div>`;

  T.primerCotestNegativo = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado del co-test de control ha sido negativo (normal).</p>
    <p>Esto significa que no se ha detectado infección por VPH de alto riesgo ni tampoco se han detectado alteraciones en las células del cuello del útero (cérvix) en la muestra analizada.</p>
    <p>Siguiendo el Programa de Detección Precoz de Cáncer de Cuello de Útero de Andalucía, lo recomendado es realizar un nuevo control dentro de 1 año mediante co-test, que incluye la prueba de VPH y la citología.</p>
    <p>Dado el antecedente de la prueba de cribado previa, se establece este seguimiento para confirmar la persistencia de este resultado normal en el tiempo y garantizar su correcta evolución.</p>
    <p>Es muy importante acudir a esta revisión en la fecha indicada, ya que el seguimiento periódico es la mejor forma de prevenir la aparición de lesiones de mayor importancia.</p>
    ${SINTOMAS}
  </div>`;

  T.segundoCotestNegativo = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado del co-test de control ha sido negativo (normal).</p>
    <p>Esto significa que no se ha detectado infección por VPH de alto riesgo ni tampoco se han observado alteraciones en las células del cuello del útero (cérvix) en las pruebas realizadas.</p>
    <p>Este resultado confirma la normalización de la situación detectada previamente.</p>
    <p>Por este motivo, puede volver al programa habitual de cribado poblacional.</p>
    <p>Dentro del Programa de Detección Precoz de Cáncer de Cuello de Útero de Andalucía, la siguiente prueba se realizará según el intervalo establecido para su edad y situación clínica.</p>
    <p>Es importante continuar participando en el programa cuando reciba nuevas invitaciones.</p>
    <p>Si antes de la próxima revisión presenta síntomas como sangrado vaginal fuera de la menstruación, después de las relaciones sexuales o flujo vaginal persistente no habitual, consulte con su profesional sanitario de referencia.</p>
  </div>`;

  T.citologiaNormalVphNo1618 = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de su citología es normal, pero se ha detectado una infección por VPH de alto riesgo diferente de los tipos 16 y 18.</p>
    <p>Esto significa que no se han observado alteraciones en las células del cuello del útero —cérvix—, pero sí se ha detectado la presencia de un tipo de VPH que requiere seguimiento.</p>
    <p>Este resultado no significa que tenga cáncer. En la mayoría de los casos, la infección por VPH desaparece de forma espontánea.</p>
    <p>Lo recomendado es realizar un nuevo control dentro de 1 año mediante co-test, que incluye la prueba de VPH y la citología.</p>
    <p>Este seguimiento permite comprobar si la infección ha desaparecido o si persiste y precisa una valoración adicional.</p>
    <p>Es muy importante acudir a esta revisión en la fecha indicada.</p>
    <p>Si antes de la próxima revisión presenta síntomas como sangrado vaginal fuera de la menstruación, después de las relaciones sexuales o flujo vaginal persistente no habitual, consulte con su profesional sanitario de referencia.</p>
  </div>`;

  T.lsilVphNegativo = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>El resultado de su citología muestra cambios leves en las células del cuello del útero —LSIL—, y la prueba del Virus del Papiloma Humano —VPH— es negativa.</p>
    <p>Esto significa que se han observado alteraciones celulares leves, pero no se ha detectado infección por VPH de alto riesgo.</p>
    <p>Se trata de una situación de bajo riesgo. En muchos casos, estos cambios desaparecen de forma espontánea.</p>
    <p>Por este motivo, no es necesario realizar una colposcopia en este momento.</p>
    <p>Lo recomendado es realizar un nuevo control dentro de 1 año mediante co-test, que incluye la prueba de VPH y la citología.</p>
    <p>Este seguimiento permite confirmar la evolución favorable de estos cambios.</p>
    <p>Es muy importante acudir a esta revisión en la fecha indicada.</p>
    <p>Si antes de la próxima revisión presenta síntomas como sangrado vaginal fuera de la menstruación, después de las relaciones sexuales o flujo vaginal persistente no habitual, consulte con su profesional sanitario de referencia.</p>
  </div>`;

  // ---------------- NUEVO: pendientes de revisión ----------------

  T.repetirNoValorable = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>La muestra tomada no ha permitido obtener un resultado valorable.</p>
    <p>Esto ocurre en ocasiones por motivos técnicos, por ejemplo cuando la muestra tiene pocas células, contiene sangre o hay inflamación. No significa que exista una lesión en el cuello del útero.</p>
    <p>Para completar el estudio es necesario repetir la toma de la muestra en su centro de salud, habitualmente pasados entre 2 y 4 meses.</p>
    <p>Es importante que acuda a esta cita para poder completar el estudio.</p>
    ${SINTOMAS}
  </div>`;

  T.repetirIndeterminado = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>La prueba ha detectado el Virus del Papiloma Humano (VPH) de alto riesgo, pero el laboratorio no ha podido identificar de qué tipo se trata.</p>
    <p>Esto ocurre en pocas ocasiones y no significa que tenga una lesión en el cuello del útero.</p>
    <p>Para conocer el tipo de virus y decidir el seguimiento adecuado, es necesario repetir la toma de la muestra en su centro de salud. Recibirá una carta con esta recomendación.</p>
    <p>Es importante que acuda a esta cita para poder completar el estudio.</p>
    ${SINTOMAS}
  </div>`;

  T.finCribado = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>Con los resultados de sus pruebas, ha finalizado el cribado de cáncer de cuello de útero y no necesita realizar más pruebas de cribado.</p>
    <p>En las mujeres de esta edad con pruebas de cribado negativas, el riesgo de desarrollar una lesión importante en el cuello del útero es muy bajo.</p>
    <p>Si en el futuro presenta síntomas como sangrado vaginal fuera de la menstruación, después de las relaciones sexuales o tras la menopausia, o flujo vaginal persistente no habitual, consulte con su profesional sanitario de referencia.</p>
  </div>`;

  T.pruebaSalida = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>Su próxima prueba será la última antes de finalizar el cribado de cáncer de cuello de útero.</p>
    <p>Se realizará en la consulta de su centro de salud, fuera del programa de cribado poblacional, en la fecha que le indique su profesional sanitario.</p>
    <p>Si el resultado es negativo, no necesitará más pruebas de cribado. Si es positivo, se le indicará una valoración más detallada.</p>
    <p>Es importante que acuda a esta prueba.</p>
    ${SINTOMAS}
  </div>`;

  T.vueltaCribado = `
  <div class="info-paciente">
    <h3>Información para la paciente</h3>
    <p>Tras la valoración en ginecología, puede volver al programa habitual de cribado poblacional.</p>
    <p>La siguiente prueba se realizará según el intervalo establecido para su edad.</p>
    <p>Es importante que participe cuando reciba la próxima invitación.</p>
    ${SINTOMAS}
  </div>`;

  root.TextosPaciente = T;
  if (typeof module !== "undefined" && module.exports) module.exports = T;
})(typeof window !== "undefined" ? window : globalThis);
