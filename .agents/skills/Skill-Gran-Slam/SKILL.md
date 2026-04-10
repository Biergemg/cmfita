---
name: oferta-y-sistema-de-adquisicion-sin-humo
version: 1.0.0
purpose: >-
  Diseñar una oferta defendible y un sistema de adquisición ejecutable para cualquier
  negocio, usando únicamente marcos documentados en la investigación base: ecuación
  de valor, oferta tipo Grand Slam, gancho-historia-oferta, lead magnets y canales
  de adquisición. Esta skill no promete resultados; obliga a diagnosticar mercado,
  fricción, entrega, riesgo, pricing y adquisición antes de producir copy, funnels
  o automatizaciones.
activation_when:
  - El usuario quiere crear o rehacer una oferta.
  - El usuario quiere dejar de competir por precio.
  - El usuario necesita un funnel, landing, lead magnet, ads o guiones de ventas.
  - El usuario quiere adaptar una oferta a un nicho específico.
  - El usuario quiere instrucciones para que una IA construya el repo comercial completo.
inputs_required:
  - nicho
  - cliente_objetivo
  - problema_doloroso
  - resultado_deseado
  - oferta_actual_o_borrador
  - ticket_objetivo_o_rango
  - canal_principal
  - capacidad_de_entrega
  - evidencia_disponible
  - restricciones_legales_y_operativas
outputs_required:
  - diagnostico_de_mercado
  - mapa_de_valor
  - arquitectura_de_oferta
  - pricing_y_garantia
  - lead_magnet
  - sistema_de_adquisicion
  - mensajes_base
  - activos_a_construir
  - plan_de_repo
hard_rules:
  - No inventar diferenciadores, pruebas, autoridad, testimonios, garantías ni resultados.
  - No recomendar bajar precio como primera respuesta.
  - No construir copy antes de validar mercado, oferta y entrega.
  - No usar lenguaje inflado, promesas vagas ni afirmaciones imposibles de respaldar.
  - No asumir que un canal sirve solo porque está de moda; justificarlo por nicho, ciclo de compra y capacidad operativa.
  - Si faltan datos críticos, marcar el hueco y trabajar con supuestos explícitos, nunca ocultos.
  - Separar siempre hechos, inferencias y propuestas.
success_criteria:
  - La oferta reduce comparabilidad directa.
  - El valor percibido aumenta al subir resultado/credibilidad o al bajar tiempo/esfuerzo.
  - El sistema de adquisición es medible por canal.
  - El entregable final puede ser ejecutado por una persona, un agente o un equipo sin rehacer la estrategia.
---

# SKILL.MD — Manual de guerra para construir una oferta y un sistema de adquisición sin humo

## 0. Qué hace esta skill

Esta skill toma una investigación sobre construcción de ofertas y adquisición y la convierte en un sistema operativo. Su base son cinco piezas documentadas en la investigación: evitar la comoditización, usar la ecuación de valor, construir una oferta por resolución de obstáculos, comunicar con gancho-historia-oferta, y adquirir demanda mediante alcance tibio, contenido, alcance en frío y anuncios.

No sirve para “inspirarse”. Sirve para decidir:

1. **Qué vender exactamente.**
2. **A quién sí vender y a quién no.**
3. **Cómo empaquetarlo para dejar de competir solo por precio.**
4. **Qué prometer sin mentir.**
5. **Qué canal usar primero y por qué.**
6. **Qué activos deben construirse en el repo para operar la venta.**

---

## 1. Principios obligatorios

### 1.1 No competir por precio si la oferta sigue siendo comparable

La investigación es clara: cuando el mercado percibe que tu producto o servicio es intercambiable con otros, la decisión cae en precio y margina al negocio. La salida no es “mejor copy”; es rediseñar la oferta para que ya no se compare de forma directa.

### 1.2 El mercado pesa más que la persuasión

La jerarquía operativa base es: **mercado → oferta → persuasión**. Un mercado con dolor fuerte y demanda real tolera una ejecución imperfecta mejor que un mercado tibio con gran copy. La persuasión entra después, no antes.

### 1.3 El valor es percepción estructurada, no opinión

Usa siempre la ecuación de valor:

\[
Valor = \frac{Resultado\ Deseado \times Probabilidad\ Percibida\ de\ Logro}{Retraso\ de\ Tiempo \times Esfuerzo\ y\ Sacrificio}
\]

La investigación atribuye este marco a Hormozi y lo usa como eje para subir valor sin depender de descuentos. La tarea práctica de esta skill es mover esas cuatro variables con evidencia y diseño de entrega.

### 1.4 No se redacta una oferta; se diseña contra fricciones

La oferta no nace de adjetivos. Nace de listar obstáculos, convertirlos en soluciones, elegir forma de entrega y apilar componentes de alto valor percibido y costo controlable. Ese flujo está explícito en el proceso de 5 pasos descrito en la investigación.

### 1.5 No se descuenta primero; se aumenta el valor total

La investigación recomienda no descontar la oferta principal como reacción automática, sino ampliar la diferencia entre precio y valor con bonos, garantías y mejor estructura de entrega.

### 1.6 La historia vende la creencia; la oferta cierra la transacción

El marco de Brunson en la investigación divide la comunicación en **Gancho, Historia y Oferta**. El gancho captura atención, la historia cambia creencias y la oferta convierte. No mezclar funciones.

### 1.7 Adquisición primero simple, luego escalable

La investigación reduce la adquisición a cuatro mecanismos base: alcance tibio, contenido gratuito, alcance en frío y anuncios pagados. Esta skill obliga a escoger uno primario, uno secundario y dejar los demás en cola.

---

## 2. Entradas mínimas que debes exigir antes de construir nada

Si alguna falta, la IA debe marcarla como `MISSING_CRITICAL_INPUT`.

```yaml
business_profile:
  brand_name:
  niche:
  geography:
  offer_type: # servicio, producto, consultoría, instalación, software, educación, clínica, retail, etc.
  sales_model: # one-shot, recurrente, alto ticket, afiliación, cita, e-commerce, suscripción

customer_profile:
  ideal_customer:
  pain:
  urgency_level:
  desired_outcome:
  common_objections:
  current_alternatives:

delivery_profile:
  fulfillment_method:
  capacity_limit:
  team_available:
  turnaround_time:
  proof_assets:
  constraints:

economics:
  price_floor:
  target_price:
  margin_constraints:
  cac_tolerance:
  ltv_if_known:

go_to_market:
  main_channel:
  secondary_channel:
  crm_or_followup_stack:
  lead_capture_method:
  appointment_or_checkout_flow:
```

Si el usuario no conoce algo, no bloquear. Proceder con:

```yaml
assumption_policy:
  - declarar el supuesto
  - explicar por qué importa
  - mostrar el riesgo de seguir sin validarlo
  - continuar con la mejor versión provisional posible
```

---

## 3. Secuencia obligatoria de trabajo

La IA o agente debe seguir esta secuencia exacta. No saltar al copy ni al funnel antes del diagnóstico.

### Fase 1 — Diagnóstico de mercado

#### Objetivo
Determinar si existe un dolor claro, poder de compra, segmentación viable y una transformación que pueda venderse sin caer en commodity. La investigación coloca el mercado como el factor más determinante del sistema.

#### Procedimiento

1. Identificar el dolor principal que el cliente **quiere resolver ya**.
2. Identificar el deseo final que compra realmente.
3. Listar alternativas actuales que el mercado usa.
4. Evaluar si la oferta actual es comparable o incomparable.
5. Clasificar el mercado:
   - `HOT`: dolor explícito, búsqueda activa, decisión rápida.
   - `WARM`: reconoce el problema, pero posterga.
   - `COLD`: necesita educación fuerte.
6. Evaluar facilidad de segmentación.
7. Evaluar si el nicho tiene restricciones regulatorias o de confianza altas.

#### Salida obligatoria

```yaml
market_diagnosis:
  demand_temperature:
  painful_problem:
  desired_transformation:
  current_substitutes:
  segmentation_axes:
  why_this_is_or_is_not_a_commodity:
  risks:
```

#### Regla decisiva

- Si `demand_temperature = COLD` y el ticket es alto, no lanzar anuncios de conversión directa como canal principal.
- Si el servicio depende de confianza alta, incorporar prueba, proceso y reducción de riesgo desde el primer activo.

---

### Fase 2 — Ingeniería de valor

#### Objetivo
Reescribir la oferta en términos de resultado, credibilidad, tiempo y fricción, usando la ecuación de valor.

#### Procedimiento

1. Definir el **resultado deseado** en lenguaje del cliente.
2. Puntuar de 1 a 10:
   - resultado deseado
   - probabilidad percibida de logro
   - retraso de tiempo
   - esfuerzo y sacrificio
3. Identificar qué variable está más débil.
4. Diseñar intervenciones concretas para mover esa variable.

#### Biblioteca de intervención por variable

**Si falla resultado deseado:**
- volverlo más específico
- conectarlo con identidad, estatus, dinero, seguridad o alivio
- convertir “servicio genérico” en transformación medible

**Si falla probabilidad percibida:**
- agregar casos, evidencia, demostración, proceso, garantía o diagnóstico previo
- eliminar ambigüedad sobre cómo se obtiene el resultado

**Si falla retraso de tiempo:**
- quick wins
- diagnóstico inmediato
- instalación o onboarding acelerado
- activo entregable en 24h

**Si falla esfuerzo y sacrificio:**
- done-for-you
- plantillas
- acompañamiento
- automatización
- recordatorios
- simplificación del proceso de compra o implementación

#### Salida obligatoria

```yaml
value_map:
  dream_outcome:
  perceived_likelihood_score:
  time_delay_score:
  effort_sacrifice_score:
  weakest_variable:
  interventions:
    - variable:
      action:
      proof_needed:
```

---

### Fase 3 — Obstáculos y soluciones

#### Objetivo
Construir la oferta resolviendo fricciones reales antes de venderla. La investigación describe listar obstáculos, transformarlos en soluciones y elegir entrega por costo/valor.

#### Procedimiento

1. Listar mínimo 20 obstáculos del cliente.
2. Para cada obstáculo, generar 1 a 3 soluciones.
3. Clasificar cada solución por formato de entrega:
   - `DFY` hecho por ti
   - `DWY` hecho contigo
   - `DIY` hazlo tú mismo
4. Evaluar costo de entrega vs valor percibido.
5. Eliminar lo costoso con poco valor percibido.
6. Conservar lo barato para el negocio pero muy valioso para el cliente.

#### Matriz de decisión

```yaml
obstacle_solution_matrix:
  - obstacle:
    emotional_or_operational:
    solution_options:
      - solution:
        delivery_type: DFY|DWY|DIY
        perceived_value: high|medium|low
        delivery_cost: high|medium|low
        keep: true|false
        reason:
```

#### Regla decisiva

- Si el nicho compra conveniencia, priorizar `DFY`.
- Si el nicho compra control o formación, `DWY` o `DIY` pueden subir margen.
- Si el equipo operativo no puede cumplir lo prometido, rebajar complejidad antes de publicar.

---

### Fase 4 — Arquitectura de la oferta

#### Objetivo
Convertir soluciones sueltas en una oferta principal, bonos, mecanismo de entrada y garantía.

#### Procedimiento

1. Nombrar la oferta en lenguaje claro, específico y utilitario.
2. Definir la oferta principal.
3. Definir bonos, solo si resuelven fricciones posteriores o aumentan probabilidad de éxito.
4. Definir el mecanismo de entrada:
   - diagnóstico
   - auditoría
   - muestra
   - prueba
   - guía
   - visita
   - sesión
5. Definir garantía según naturaleza de entrega y control del resultado.
6. Definir qué queda fuera para evitar sobrepromesa.

#### Tipos de garantía permitidos según investigación

- `UNCONDITIONAL`
- `CONDITIONAL`
- `ANTI_GUARANTEE`
- `PERFORMANCE_BASED`

La investigación distingue estos tipos y su uso depende de cuánto control tiene el cliente o el negocio sobre el resultado.

#### Regla de selección de garantía

- Usa `UNCONDITIONAL` si el entregable es claro, reversible y de bajo abuso.
- Usa `CONDITIONAL` si el cliente debe ejecutar pasos críticos.
- Usa `ANTI_GUARANTEE` solo si el valor se entrega de inmediato y no es recuperable.
- Usa `PERFORMANCE_BASED` solo si puedes medir rendimiento sin ambigüedad contractual.

#### Salida obligatoria

```yaml
offer_architecture:
  main_offer:
    name:
    target_customer:
    transformation:
    deliverables:
    exclusions:
  bonuses:
    - name:
      solves:
      delivery_format:
      estimated_perceived_value:
  lead_in_mechanism:
    type:
    narrow_problem_solved:
    bigger_problem_revealed:
  guarantee:
    type:
    terms:
    abuse_risk:
```

---

### Fase 5 — Pricing

#### Objetivo
Poner precio sin destruir señal, margen ni credibilidad.

La investigación argumenta que el precio alto puede reforzar percepción de calidad y compromiso del cliente, siempre que el valor entregado lo respalde. También recomienda usar valor y estructura antes que descuento como reflejo primario.

#### Procedimiento

1. Determinar piso económico real.
2. Determinar techo defendible por mercado y evidencia.
3. Comparar precio con alternativa del cliente, no solo con competencia.
4. Crear estructura de precio:
   - pago único
   - mensualidad
   - setup + mensualidad
   - depósito + saldo
   - performance + mínimo
5. Validar impacto operativo y de conversión.

#### Regla decisiva

- No usar precio premium sin proceso de credibilidad.
- No usar precio bajo si obliga a volumen imposible o mala entrega.
- No reducir precio si el problema real es confianza, claridad o fricción.

#### Salida obligatoria

```yaml
pricing_model:
  pricing_logic:
  anchor_or_comparison:
  payment_structure:
  why_this_price_is_defensible:
  margin_risks:
```

---

### Fase 6 — Narrativa comercial

#### Objetivo
Traducir la arquitectura a mensajes. La investigación usa `Gancho → Historia → Oferta` como marco central de comunicación.

#### Procedimiento

1. Crear 5 ganchos.
2. Elegir una historia base:
   - descubrimiento del problema
   - fracaso previo
   - cambio de método
   - caso del cliente
3. Construir la historia con estructura:
   - situación actual
   - muro
   - epifanía
   - plan
   - resultado
4. Presentar la oferta con stack:
   - qué incluye
   - valor de cada componente
   - qué riesgo se elimina
   - llamada a la acción

#### Salida obligatoria

```yaml
messaging:
  hooks:
    -
    -
    -
    -
    -
  core_story:
    situation:
    wall:
    epiphany:
    plan:
    result:
  stack_script:
  cta:
```

#### Regla decisiva

- El gancho no debe prometer lo que la oferta no sostiene.
- La historia no sustituye la prueba.
- La oferta debe explicar siguiente paso, fricción mínima y criterio de elegibilidad.

---

### Fase 7 — Sistema de adquisición

#### Objetivo
Escoger el canal inicial correcto con base en el nicho, temperatura de demanda y capacidad de seguimiento.

La investigación reduce la adquisición a cuatro canales base y añade la idea de lead magnet como solución completa a un problema estrecho que revela un problema mayor.

#### Canales permitidos por defecto

1. `WARM_OUTREACH`
2. `FREE_CONTENT`
3. `COLD_OUTREACH`
4. `PAID_ADS`

#### Regla de decisión por contexto

```yaml
channel_selection_rules:
  - if: ticket_high AND trust_required_high AND audience_small_or_local
    then: WARM_OUTREACH + DIRECT_APPOINTMENT

  - if: problem_visible AND search_or_intent_exists AND proof_available
    then: PAID_ADS or SEARCH_CAPTURE

  - if: market_needs_education AND founder_has_expertise_story
    then: FREE_CONTENT + LEAD_MAGNET + NURTURE

  - if: b2b AND ideal_customer_is_identifiable
    then: COLD_OUTREACH + AUDIT_OR_DIAGNOSTIC

  - if: team_cannot_follow_up_fast
    then: do_not_scale_paid_traffic_yet
```

#### Diseño del lead magnet

Según la investigación, el lead magnet efectivo no debe ser “contenido gratis” genérico, sino una solución completa a un problema estrecho que expone un problema mayor, cuya resolución completa pertenece a la oferta principal.

Tipos válidos:
- revelar problema
- muestra o prueba
- un paso del proceso

#### Salida obligatoria

```yaml
acquisition_system:
  primary_channel:
  secondary_channel:
  why:
  lead_magnet:
    type:
    title:
    narrow_problem:
    bigger_problem_revealed:
    delivery_format:
  capture_flow:
  followup_flow:
  appointment_or_checkout_logic:
  key_metrics:
    - lead_volume
    - qualified_rate
    - appointment_rate
    - close_rate
    - cac_if_paid
```

---

### Fase 8 — Red de multiplicación

#### Objetivo
Agregar terceros que traigan demanda solo después de validar conversión básica.

La investigación enumera cuatro tipos de “lead getters”: clientes, afiliados, empleados y agencias.

#### Regla decisiva

- No meter afiliados antes de tener mensaje y oferta que conviertan.
- No meter agencia si el negocio no entiende sus métricas mínimas.
- Pedir referidos solo en momentos de satisfacción verificable.

#### Salida obligatoria

```yaml
lead_getter_plan:
  referrals:
  affiliates:
  internal_sales_or_sdr:
  agencies:
  activation_conditions:
```

---

## 4. Adaptación por nicho

Esta sección obliga a la IA a cambiar estrategia según el tipo de negocio. No todo nicho necesita el mismo embudo.

### 4.1 Servicios locales de confianza alta
Ejemplos: clínica, instalación, construcción, impermeabilización, mantenimiento, legal, dental.

**Prioridades:**
- prueba
- proceso claro
- elegibilidad
- visita, auditoría o diagnóstico
- garantía realista
- velocidad de respuesta

**Oferta base sugerida:**
- servicio principal + diagnóstico + reducción de riesgo + prueba de ejecución

**Canales primarios más probables:**
- alcance tibio
- contenido local
- Google/Meta con intención clara
- WhatsApp/call booking

**Errores prohibidos:**
- prometer resultados absolutos cuando dependen del sitio o del cliente
- usar descuentos masivos en vez de credibilidad
- ocultar tiempos, cobertura o exclusiones

### 4.2 Consultoría, agencia, servicios B2B

**Prioridades:**
- dolor económico u operativo concreto
- proceso
- auditoría o diagnóstico
- casos o benchmark
- calificación fuerte del lead

**Oferta base sugerida:**
- auditoría, diagnóstico o sprint inicial que revele costo del problema mayor

**Canales primarios más probables:**
- cold outreach
- referrals
- contenido con autoridad

**Errores prohibidos:**
- vender “marketing”, “IA” o “automatización” como commodity abstracto
- no definir deliverables y exclusiones
- cerrar tickets altos sin proceso de calificación

### 4.3 Educación, coaching y programas formativos

**Prioridades:**
- resultado específico
- soporte
- disminución de abandono
- quick wins
- prueba de metodología

**Oferta base sugerida:**
- programa principal + plantillas + comunidad + checkpoints + garantía condicional si aplica

**Canales primarios más probables:**
- contenido
- lead magnet
- webinar, clase, guía o test

**Errores prohibidos:**
- vender solo información
- prometer transformación sin mecanismo de acompañamiento
- meter garantía agresiva cuando depende del cumplimiento del alumno

### 4.4 E-commerce o retail

**Prioridades:**
- claridad de uso
- conveniencia
- bundles
- pruebas visuales
- reducción de fricción de compra

**Oferta base sugerida:**
- bundle, kit, prueba, promoción de entrada o incentivo por primera compra sin destruir margen

**Canales primarios más probables:**
- contenido visual
- paid ads
- remarketing
- activación de tráfico a tienda si aplica

**Errores prohibidos:**
- depender solo del producto base sin bundle ni narrativa
- competir por precio cuando el mercado no recuerda la marca
- ocultar políticas, tiempos o compatibilidades

### 4.5 Salud, bienestar, terapia o temas sensibles

**Prioridades:**
- cumplimiento
- precisión de claims
- seguridad
- límites claros de lo que sí y no se promete
- evaluación previa si corresponde

**Oferta base sugerida:**
- diagnóstico, sesión de valoración o plan guiado

**Errores prohibidos:**
- afirmaciones clínicas no verificadas
- garantías de resultados biológicos o psicológicos absolutos
- uso de urgencia o miedo de forma engañosa

---

## 5. Formato de respuesta obligatorio de la IA

Cada vez que esta skill se active, la IA debe responder con esta estructura y en este orden:

```markdown
# Diagnóstico
- mercado
- dolor
- temperatura de demanda
- comparabilidad actual

# Ecuación de valor
- resultado deseado
- probabilidad percibida
- tiempo
- esfuerzo
- variable más débil

# Obstáculos y soluciones
- tabla o lista priorizada

# Oferta propuesta
- oferta principal
- bonos
- mecanismo de entrada
- garantía
- exclusiones

# Precio
- lógica
- estructura
- riesgo

# Adquisición
- canal principal
- canal secundario
- lead magnet
- captura
- seguimiento

# Activos a construir
- landing
- guion
- anuncios
- crm/follow-up
- automatizaciones

# Riesgos y validaciones pendientes
- supuestos
- huecos de evidencia
- pruebas que faltan
```

---

## 6. Estructura de repo que esta skill debe ordenar construir

La investigación menciona el uso de `SKILL.MD` como estándar operativo para que una IA implemente estos marcos de forma estructurada, con metadatos, instrucciones y recursos.

Usa este repo base:

```text
commercial-offer-engine/
├── SKILL.md
├── README.md
├── input/
│   ├── business_profile.yaml
│   ├── customer_profile.yaml
│   ├── delivery_profile.yaml
│   ├── economics.yaml
│   └── channels.yaml
├── strategy/
│   ├── market_diagnosis.md
│   ├── value_equation.md
│   ├── obstacle_solution_matrix.md
│   ├── offer_architecture.md
│   ├── pricing.md
│   ├── acquisition_system.md
│   └── lead_getter_plan.md
├── assets/
│   ├── landing/
│   │   ├── wireframe.md
│   │   ├── copy.md
│   │   └── sections.yaml
│   ├── ads/
│   │   ├── hooks.md
│   │   ├── angles.md
│   │   └── creatives_brief.md
│   ├── sales/
│   │   ├── call_script.md
│   │   ├── objection_handling.md
│   │   └── stack_script.md
│   ├── lead_magnet/
│   │   ├── concept.md
│   │   ├── outline.md
│   │   └── cta.md
│   └── crm/
│       ├── qualification_rules.yaml
│       ├── followup_sequences.yaml
│       └── pipeline_stages.yaml
├── automation/
│   ├── event_map.md
│   ├── whatsapp_flow.md
│   ├── email_flow.md
│   ├── ads_to_crm_flow.md
│   └── appointment_logic.md
├── validation/
│   ├── assumptions.md
│   ├── evidence_log.md
│   ├── offer_tests.md
│   └── channel_tests.md
└── references/
    └── research_summary.md
```

### Reglas del repo

- `input/` contiene hechos y restricciones, no copy.
- `strategy/` contiene decisiones y justificación.
- `assets/` contiene materiales que se publican o usan para vender.
- `automation/` contiene lógica operacional, no estrategia.
- `validation/` contiene supuestos, pruebas pendientes y resultados de test.
- Ningún archivo de `assets/` debe contradecir `strategy/`.

---

## 7. Reglas de ejecución para agentes o IA

### 7.1 Modo diagnóstico
Usar cuando el usuario llega con idea vaga.

**Objetivo:** producir mercado, ecuación de valor, obstáculos y propuesta preliminar.

### 7.2 Modo reconstrucción
Usar cuando el usuario ya vende algo pero compite por precio o no convierte.

**Objetivo:** detectar comparabilidad, rediseñar oferta y corregir canal.

### 7.3 Modo lanzamiento
Usar cuando ya existe oferta clara y toca producir activos y flujos.

**Objetivo:** generar landing, lead magnet, guiones, anuncios y seguimiento.

### 7.4 Modo auditoría
Usar cuando ya hay funnel, ads o proceso comercial corriendo.

**Objetivo:** encontrar si el cuello está en mercado, oferta, narrativa, canal o follow-up.

---

## 8. Reglas condicionales que la IA debe seguir

```yaml
decision_engine:
  - if: offer_is_generic
    then:
      - stop_copywriting
      - redesign_offer_against_obstacles

  - if: user_requests_funnel_but_no_offer_clarity
    then:
      - create_market_diagnosis
      - create_offer_architecture_first

  - if: user_wants_premium_price_without_proof
    then:
      - require_credibility_assets
      - add_risk_reversal_or_diagnostic

  - if: lead_magnet_is_generic_information
    then:
      - narrow_problem_scope
      - redesign_to_reveal_bigger_problem

  - if: niche_requires_trust_and_followup_is_weak
    then:
      - prioritize_manual_or_assisted_followup
      - avoid_scaling_paid_traffic

  - if: guarantee_exposes_business_to_abuse
    then:
      - switch_to_conditional_or_process_based_guarantee

  - if: business_capacity_is_low
    then:
      - reduce_offer_complexity
      - remove_high_touch_bonuses

  - if: evidence_is_weak
    then:
      - downgrade_claims
      - rewrite_offer_in_process_terms_not_outcome_certainty
```

---

## 9. Checklist de salida mínima antes de publicar una oferta

La IA no debe cerrar el trabajo como “listo” hasta cumplir esto:

```yaml
publish_readiness_check:
  market_defined: true
  customer_defined: true
  desired_outcome_defined: true
  objections_listed: true
  obstacle_solution_matrix_done: true
  offer_main_defined: true
  lead_in_mechanism_defined: true
  guarantee_defined: true
  exclusions_defined: true
  pricing_logic_defined: true
  primary_channel_defined: true
  followup_defined: true
  proof_assets_audited: true
  unsupported_claims_removed: true
```

Si cualquiera es `false`, la IA debe decir explícitamente:

```text
NO PUBLICAR TODAVÍA
```

Y explicar por qué.

---

## 10. Entregables estándar que esta skill debe producir

Según el punto de madurez del usuario, la IA debe generar uno o varios de estos entregables:

1. `market_diagnosis.md`
2. `value_equation.md`
3. `obstacle_solution_matrix.md`
4. `offer_architecture.md`
5. `pricing.md`
6. `lead_magnet.md`
7. `landing_copy.md`
8. `ad_angles.md`
9. `call_script.md`
10. `followup_sequences.yaml`
11. `automation_map.md`
12. `offer_audit.md`

---

## 11. Plantilla maestra de ejecución

```markdown
# Contexto del negocio

# Hechos verificados

# Supuestos explícitos

# Diagnóstico de mercado

# Ecuación de valor

# Obstáculos principales

# Soluciones seleccionadas

# Oferta principal

# Bonos

# Garantía

# Exclusiones

# Precio y estructura de pago

# Lead magnet

# Canal principal

# Canal secundario

# Captura y seguimiento

# Activos a construir

# Riesgos

# Validaciones pendientes
```

---

## 12. Qué no debe hacer nunca esta skill

- No usar “oferta irresistible” como eslogan vacío si no existe arquitectura de valor.
- No fabricar escasez falsa. La investigación advierte que la escasez y urgencia deben ser auténticas, porque la falsa destruye confianza.
- No meter bonos decorativos que no resuelven fricciones.
- No confundir contenido con lead magnet.
- No lanzar paid ads cuando el seguimiento comercial no existe.
- No prometer resultados absolutos en nichos donde hay variables fuera de control.
- No tratar una historia emocional como sustituto de un mecanismo de entrega real.
- No recomendar agencias, afiliados o escalamiento si la conversión base todavía no está validada.

---

## 13. Criterio final de calidad

La skill está bien usada solo si produce una respuesta que cumpla las cuatro condiciones siguientes:

1. **La oferta ya no se explica como lista de servicios, sino como transformación con entrega clara.**
2. **El precio tiene lógica económica y psicológica defendible.**
3. **El canal principal elegido coincide con el tipo de mercado y la capacidad operativa.**
4. **La IA deja claro qué parte está verificada, qué parte es inferencia y qué parte aún requiere prueba.**

Si no cumple esas cuatro, el trabajo no está terminado.
