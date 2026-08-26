# FARO — MASTER REPLICATION PROCESS

> Documento vivo para reconstruir y replicar el proceso completo seguido en FARO desde el origen de **The Last Lighthouse** hasta la versión actual.
>
> Regla principal: **no copiar solo el resultado final; copiar el proceso de observación, comparación, diagnóstico, iteración, validación y consolidación.**

---

## 0. Propósito de este documento

Este documento conserva el aprendizaje acumulado durante FARO para poder repetirlo en futuros proyectos inmersivos sin volver a cometer los mismos errores.

FARO no llegó a su nivel actual por una única implementación. El progreso real vino de una secuencia de:

1. conservar una referencia original;
2. construir una primera versión funcional;
3. comparar contra referencias visuales superiores;
4. medir la distancia real sin autoengañarnos;
5. crear LABs para aislar problemas;
6. estudiar proyectos/referencias que ya resolvían partes concretas;
7. sustituir parches por soluciones de arquitectura cuando el problema era estructural;
8. validar visualmente en navegador y vídeo;
9. documentar cada fase antes de seguir;
10. convertir lo aprendido en una metodología reusable.

---

# 1. ORIGEN — THE LAST LIGHTHOUSE

FARO parte del proyecto original **The Last Lighthouse**.

La primera obligación del proceso fue conservar el ADN original: concepto, narrativa, luz, faro, atmósfera, composición y sentido emocional. Las mejoras posteriores no debían convertir FARO en otra demo técnica distinta.

### Lección reusable

Antes de mejorar una experiencia hay que identificar tres capas:

- **ADN:** lo que nunca debe perderse.
- **PIEL:** todo lo visual que puede evolucionar.
- **NEURONAS / MOTOR:** lógica, estado, interacción, cámara, render y comportamiento.

Modificar la piel no debe romper las neuronas. Cambiar las neuronas no debe borrar el ADN.

---

# 2. PRIMERA FASE — HACER QUE EXISTA Y FUNCIONE

La primera etapa no buscaba perfección visual. Buscaba una versión navegable y verificable.

Objetivos iniciales:

- escena visible;
- faro reconocible;
- navegación funcionando;
- señal/luz operativa;
- interacción básica;
- contenido/storytelling accesible;
- posibilidad de probar en navegador real.

### Error frecuente detectado

Una demo técnicamente funcional puede parecer terminada cuando todavía está muy lejos de la referencia visual.

### Regla reusable

**FUNCIONA ≠ ESTÁ TERMINADO.**

Separar siempre:

- funcionalidad;
- fidelidad visual;
- calidad de movimiento;
- dirección artística;
- robustez.

---

# 3. EL LAB COMO HERRAMIENTA DE DIAGNÓSTICO

Cuando una experiencia compleja empieza a degradarse, no hay que seguir añadiendo capas dentro del producto final.

Se crea un **LAB**.

El LAB sirve para:

- aislar una capacidad;
- disponer de botones/controles directos;
- probar variantes sin narrativa ni UI final;
- comparar movimientos uno al lado del otro;
- recuperar versiones que funcionaban mejor;
- evitar que nuevos cambios destruyan comportamientos ya buenos.

En FARO esta filosofía se convirtió en una regla de trabajo: cuando una capacidad se vuelve difícil de evaluar dentro de la experiencia final, se extrae y se prueba en aislamiento.

### Patrón reusable

```text
Problema complejo
      ↓
LAB mínimo
      ↓
pruebas A/B/C
      ↓
versión aprobada
      ↓
integración
      ↓
validación de regresión
```

Nunca usar el producto final como único banco de pruebas.

---

# 4. COMPARACIÓN CONTRA KAGE — DE LA INTUICIÓN A UNA REFERENCIA EXIGENTE

FARO se comparó con **KAGE** porque KAGE mostraba una calidad visual y de composición claramente superior en aspectos que FARO necesitaba resolver.

La comparación no debía ser estética en abstracto. Se descompuso en capacidades concretas.

En una evaluación crítica se fijó FARO aproximadamente en **36 % de paridad visual respecto a KAGE**. Ese número fue importante porque evitó confundir progreso técnico con calidad visual final.

### Qué se aprendió al comparar

No preguntar:

> “¿Se parece?”

Preguntar:

- ¿usan el mismo tipo de mundo/render?
- ¿la cámara tiene la misma autoridad?
- ¿foreground y background pertenecen realmente al mismo espacio?
- ¿la luz afecta de forma coherente a todos los elementos?
- ¿la profundidad es física o simulada con capas 2D?
- ¿hay un único compositor o varios renders pegados?
- ¿cómo se gestionan alpha, depth, clipping y feather?
- ¿qué shaders construyen el volumen?
- ¿qué parte del resultado depende del postprocesado?

### Regla reusable

Comparar referencias por **sistemas**, no por capturas.

---

# 5. FASE KAGE PARITY — ARQUEOLOGÍA ANTES DE REESCRIBIR

Antes de modificar runtime se estudió la “piedra exacta” del proyecto/referencia que ya contenía soluciones útiles.

La estrategia fue:

1. encontrar la versión exacta que funcionaba;
2. estudiar cómo resolvía cada capacidad;
3. separar solución estructural de decoración;
4. comprobar compatibilidad con FARO;
5. coser la capacidad mínima necesaria.

### Principio clave

**No reinventar una solución que ya existe dentro de nuestro propio ecosistema si puede trasplantarse limpiamente.**

Pero tampoco copiar archivos completos sin comprender las dependencias.

---

# 6. EL CAMBIO ESTRUCTURAL DECISIVO — UN SOLO MUNDO WEBGL

Uno de los aprendizajes más importantes fue detectar que determinados problemas visuales no podían solucionarse afinando CSS, posiciones o máscaras.

La solución V5 aplicó una arquitectura inspirada en KAGE:

- **un único mundo WebGL**;
- cámara gobernada por **pose + target + FOV**;
- foreground integrado con `alphaTest`, `depthWrite` y feather;
- viewport compartido mediante scissor;
- materiales/shaders para machine y Fresnel;
- beam volumétrico;
- capa Afterlight / postprocesado.

### Por qué fue importante

Cuando foreground, mundo y efectos se renderizan como sistemas desconectados, aparecen:

- escalas incoherentes;
- profundidad falsa;
- halos;
- solapes incorrectos;
- sensación de collage;
- cámara que no afecta igual a todos los objetos.

Un mundo compartido devuelve coherencia espacial.

### Regla reusable

Si varios elementos deben sentirse físicamente dentro de la misma escena, **deben compartir cámara, espacio y profundidad siempre que sea posible**.

---

# 7. CÁMARA — DE “MOVER COSAS” A DIRIGIR LA ESCENA

Otro salto importante fue dejar de compensar problemas de composición desplazando elementos individualmente.

La cámara pasa a ser una autoridad principal:

```text
pose
+ target
+ FOV
+ framing
= composición
```

### Error anterior

Mover objetos para corregir encuadres provoca que la escena solo funcione desde una captura concreta.

### Solución

Definir estados de cámara coherentes y hacer que la composición se derive de ellos.

### Regla reusable

Antes de mover un objeto, preguntar:

> “¿El problema está realmente en el objeto o en la cámara?”

---

# 8. FOREGROUND / ALPHA / DEPTH — EL PROBLEMA DE LOS RECORTES

El foreground necesitó un tratamiento más físico.

Capacidades aplicadas:

- `alphaTest`;
- `depthWrite` controlado;
- feather de borde;
- integración en el render compartido.

### Problemas que resuelve

- bordes duros;
- transparencias fantasma;
- halos alrededor de elementos recortados;
- profundidad errónea;
- elementos que parecen pegatinas.

### Regla reusable

Las transparencias son también un problema de **depth**, no únicamente de alpha.

---

# 9. LUZ — DEL EFECTO DECORATIVO AL VOLUMEN

La luz del faro debía sentirse como una presencia espacial, no como una capa gráfica.

Se evolucionó hacia:

- beam volumétrico;
- materiales con respuesta Fresnel;
- interacción entre luz, escena y atmósfera;
- Afterlight/postprocesado para consolidar la lectura.

### Lección reusable

Un efecto luminoso premium necesita al menos:

```text
fuente
+ volumen
+ respuesta de superficies
+ atmósfera
+ composición final
```

Una simple imagen/gradiente no puede sustituir ese sistema cuando la luz es protagonista narrativa.

---

# 10. STORYTELLING SIN ROMPER LA EXPERIENCIA ORIGINAL

FARO terminó conservando dos lecturas/versiones principales:

- **Original**;
- **Storytelling**.

Además se integró soporte bilingüe **EN / ES**.

La evolución de contenido se hizo sin destruir el núcleo visual original.

### Regla reusable

Cuando una nueva capa narrativa es experimental, evitar reemplazar la versión aprobada. Mantener variantes hasta validación.

```text
BASE APROBADA
   ├── Original
   └── Storytelling
```

---

# 11. LIGHT → SIGNAL → ANSWER → CONNECTION

El proyecto consolidó una relación narrativa reusable entre interacción y respuesta:

```text
LIGHT
  ↓
SIGNAL
  ↓
ANSWER
  ↓
CONNECTION
```

No se trata únicamente de pulsar botones. Cada acción del usuario debe tener un sentido narrativo:

1. sucede una señal;
2. el usuario decide responder;
3. el sistema reconoce la respuesta;
4. se genera conexión/consecuencia.

En el repositorio existe documentación específica bajo:

`docs/LIGHT-SIGNAL-ANSWER-CONNECTION/`

con `SOURCE-ORIGINAL.txt` y `MASTER.md`.

También quedaron integradas **cinco acciones de apoyo** dentro de esta lógica.

### Regla reusable

Diseñar interacción como una cadena de significado, no como colección de controles.

---

# 12. VALIDACIÓN — NUNCA DECLARAR ÉXITO SOLO POR CÓDIGO

Una de las reglas más importantes nacidas de FARO:

> **la validación final es visual y navegable.**

Proceso mínimo:

1. código implementado;
2. syntax/build checks;
3. abrir demo real;
4. navegar;
5. grabar o capturar;
6. comparar contra referencia;
7. listar divergencias;
8. corregir;
9. repetir;
10. solo entonces aprobar.

### Tres tipos de prueba

#### A. Técnica

- no errores;
- assets cargan;
- runtime estable;
- eventos funcionan.

#### B. Visual

- composición;
- escala;
- luz;
- profundidad;
- movimiento;
- legibilidad.

#### C. Experiencial

- narrativa;
- ritmo;
- feedback;
- sorpresa;
- comprensión.

Pasar A no implica pasar B o C.

---

# 13. PROCESO DE ERROR → SOLUCIÓN

Durante FARO el error dejó de tratarse como una anomalía que había que ocultar y pasó a convertirse en documentación.

Formato reusable:

```text
SÍNTOMA
Qué vemos.

HIPÓTESIS
Qué creemos que lo produce.

PRUEBA
Cómo aislamos la causa.

CAUSA RAÍZ
Qué estaba realmente mal.

SOLUCIÓN
Qué cambiamos.

REGRESIÓN
Qué capacidades podrían romperse.

VALIDACIÓN
Cómo demostramos que quedó solucionado.

LECCIÓN
Qué reutilizamos en otro proyecto.
```

Este formato debe utilizarse en futuros LABs.

---

# 14. LO QUE NO FUNCIONA — ANTIPATRONES IDENTIFICADOS

## 14.1 Seguir parcheando una arquitectura equivocada

Si cada nueva corrección genera dos nuevos defectos, detenerse y revisar la raíz.

## 14.2 Trabajar sin referencia visual congelada

Si la referencia cambia durante la implementación, nunca existe un criterio estable de aprobación.

## 14.3 Mejorar estética destruyendo interacción

Cada evolución visual debe pasar regresión funcional.

## 14.4 Confundir complejidad con calidad

Más partículas, shaders o movimiento no garantizan una experiencia mejor.

## 14.5 Reescribir componentes aprobados

La regla correcta es:

```text
NUEVA VERSIÓN = BASE APROBADA + CAPACIDAD NUEVA
```

no:

```text
NUEVA VERSIÓN = RECONSTRUCCIÓN COMPLETA
```

## 14.6 Comparar solo screenshots

Hay que comparar también cámara, timing, depth, interacción y comportamiento temporal.

## 14.7 Aprobar sin navegador

Nunca declarar una capacidad terminada porque el código “parece correcto”.

---

# 15. PIPELINE FARO REPLICABLE

Este es el pipeline que debe heredarse a cualquier nuevo proyecto premium.

## FASE A — FREEZE

Guardar:

- original;
- vídeo/capturas de referencia;
- commit exacto;
- lista de capacidades aprobadas.

## FASE B — AUDIT

Puntuar:

- funcional;
- visual;
- movimiento;
- narrativa;
- rendimiento.

## FASE C — GAP MAP

Para cada diferencia:

```text
GAP
→ síntoma
→ causa probable
→ referencia que lo resuelve
→ dificultad
→ riesgo
```

## FASE D — ARCHAEOLOGY

Buscar primero en:

1. versiones previas propias;
2. repos hermanos;
3. referencias aprobadas;
4. solo después soluciones nuevas.

## FASE E — LAB

Crear prueba aislada para cada problema difícil.

## FASE F — ROOT FIX

Si el problema es arquitectónico, arreglar arquitectura antes de seguir afinando visuales.

## FASE G — INTEGRATION

Integrar la solución mínima sobre la base aprobada.

## FASE H — REGRESSION

Comprobar que no se rompe:

- navegación;
- cámara;
- assets;
- interacción;
- responsive;
- narrativa;
- rendimiento.

## FASE I — VISUAL VALIDATION

Captura/vídeo real y comparación contra referencia.

## FASE J — MEMORY

Documentar:

- qué se hizo;
- por qué;
- qué falló;
- cómo se solucionó;
- qué debe reutilizarse.

Solo después avanzar.

---

# 16. QUALITY GATE FARO

Una capacidad solo puede considerarse consolidada si responde **SÍ** a todo:

- [ ] ¿Existe una referencia explícita?
- [ ] ¿Se conserva la base aprobada?
- [ ] ¿Está aislada la nueva capacidad?
- [ ] ¿Se entiende la causa raíz del problema?
- [ ] ¿El runtime funciona sin errores?
- [ ] ¿Se ha probado en navegador real?
- [ ] ¿Se ha comparado visualmente?
- [ ] ¿No introduce regresiones?
- [ ] ¿Está documentado el aprendizaje?
- [ ] ¿Puede otro agente/persona reproducirlo leyendo el repo?

Si alguna respuesta es NO, todavía no está cerrada.

---

# 17. ESTRUCTURA DE MEMORIA RECOMENDADA PARA FUTUROS PROYECTOS

Cada proyecto que adopte el método FARO debería contener:

```text
docs/
  00-ORIGINAL/
  01-REFERENCES/
  02-AUDIT/
  03-GAP-MAP/
  04-LABS/
  05-ARCHAEOLOGY/
  06-IMPLEMENTATION/
  07-VALIDATION/
  08-ERRORS-SOLUTIONS/
  09-REPLICATION/
```

Y en raíz:

```text
README.md
METHOD.md
QUALITY-GATE.md
CURRENT-STATE.md
```

---

# 18. ESTADO CONSOLIDADO DE FARO

A fecha de consolidación de esta memoria:

- existe el repositorio maestro de memoria;
- se conservan fases específicas de paridad KAGE;
- se documentó el root fix;
- existe Quality Gate;
- existe metodología;
- `main` mantiene las versiones **Original / Storytelling**;
- existe soporte **EN / ES**;
- se consolidó la conexión `LIGHT → SIGNAL → ANSWER → CONNECTION`;
- están integradas cinco acciones de apoyo;
- la evolución visual adoptó la arquitectura de un único mundo WebGL, cámara pose/target/FOV, tratamiento de foreground/depth, materiales/Fresnel, beam volumétrico y Afterlight;
- la documentación principal vive en este repositorio para que FARO funcione también como **caso de estudio reusable**.

---

# 19. PRINCIPIO FINAL

La mayor lección de FARO no es un shader, una cámara ni un efecto de luz.

Es el método:

```text
OBSERVAR
↓
MEDIR
↓
AISLAR
↓
ENTENDER
↓
CORREGIR LA RAÍZ
↓
INTEGRAR SIN DEGRADAR
↓
VALIDAR VISUALMENTE
↓
DOCUMENTAR
↓
REUTILIZAR
```

Ese ciclo es el verdadero activo que debe trasladarse a los siguientes proyectos.
