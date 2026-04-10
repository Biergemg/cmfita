# oferta-y-sistema-de-adquisicion-sin-humo

Skill operativa para diagnosticar mercado, diseñar una oferta menos comparable y definir un sistema de adquisición ejecutable sin depender de hype, descuentos reflejos ni promesas no respaldadas.

## Propósito
Convertir el contenido de `SKILL.md` en un repositorio usable por:
- agentes de IA que necesitan reglas, inputs y contratos de salida claros;
- operadores humanos que necesitan plantillas y ejemplos reutilizables.

## Qué hace
- Diagnostica mercado, dolor, temperatura de demanda y comparabilidad.
- Reescribe la oferta desde la ecuación de valor y las fricciones reales.
- Define oferta principal, bonos, mecanismo de entrada, garantía y pricing.
- Selecciona canal principal y secundario según nicho, confianza, ticket y capacidad operativa.
- Produce entregables listos para implementación comercial.

## Qué no hace
- No inventa autoridad, pruebas, diferenciadores ni resultados.
- No recomienda bajar precio como respuesta automática.
- No redacta anuncios, funnels o landing pages antes de aclarar mercado, oferta y entrega.
- No trata branding, storytelling o contenido como sustitutos de una oferta sólida.

## Cuándo usar esta skill
- Cuando hay que crear o rehacer una oferta.
- Cuando el negocio compite por precio.
- Cuando se quiere lanzar funnel, landing, lead magnet, ads o guiones de ventas con base estratégica real.
- Cuando hay que adaptar una oferta a un nicho específico.
- Cuando se necesita un repo operativo que otra IA o equipo pueda ejecutar.

## Cuándo no usarla
- Cuando el objetivo es solo diseño visual de marca.
- Cuando el usuario quiere copy aislado sin validar mercado, oferta y capacidad de entrega.
- Cuando no se acepta trabajar con supuestos explícitos y validaciones pendientes.
- Cuando el caso exige asesoría legal, regulatoria o clínica específica fuera del alcance estratégico.

## Estructura del repo
- `SKILL.md`: canon operativo para agentes.
- `docs/`: modelo operativo, guardrails, contrato de salida y decisiones por nicho.
- `inputs/`: formularios YAML para capturar hechos, restricciones, evidencia y decisiones.
- `templates/`: plantillas listas para rellenar y producir entregables.
- `references/`: principios y reglas condensadas para consulta rápida.
- `examples/`: ejemplos completos y sobrios por tipo de negocio.
- `checklists/`: control de calidad del repo y de las salidas estratégicas.

## Flujo de uso paso a paso
1. Leer `SKILL.md` para entender reglas, fases y límites.
2. Completar `inputs/business-intake.yaml`.
3. Completar los inputs específicos faltantes según el caso:
   - `niche-diagnosis.yaml`
   - `offer-design.yaml`
   - `acquisition-plan.yaml`
   - `evidence-log.yaml`
4. Ejecutar la secuencia de trabajo descrita en `docs/operating-model.md`.
5. Usar las plantillas de `templates/` para producir entregables concretos.
6. Validar con `checklists/strategy-output-checklist.md` y `checklists/anti-bullshit-checklist.md`.
7. Si cualquier requisito crítico falla, declarar `NO PUBLICAR TODAVÍA`.

## Inputs requeridos
Mínimo:
- nicho;
- cliente objetivo;
- problema doloroso;
- resultado deseado;
- oferta actual o borrador;
- ticket objetivo o rango;
- canal principal;
- capacidad de entrega;
- evidencia disponible;
- restricciones legales y operativas.

Si falta un dato crítico, usar `MISSING_CRITICAL_INPUT`, documentar el supuesto y seguir con una versión provisional.

## Outputs esperados
Toda ejecución completa debe producir como mínimo:
- diagnóstico del negocio;
- mapa de dolor y transformación;
- propuesta de oferta;
- estructura de pricing;
- bonos;
- garantía;
- lead magnet;
- estrategia de adquisición;
- activos recomendados;
- plan de implementación por fases.

El contrato formal está en [`docs/output-spec.md`](docs/output-spec.md).

## Correspondencia con la estructura interna de la skill
La skill original describe funciones internas como `input/`, `strategy/`, `assets/`, `automation/` y `validation/`. Este repo no duplica carpetas: las cubre así.

| Función operativa | Superficie pública del repo |
| --- | --- |
| `input/` | `inputs/` |
| `strategy/` | `docs/` + `templates/` |
| `assets/` | `templates/` + salidas generadas desde ellas |
| `automation/` | `templates/implementation-plan.md` + `docs/output-spec.md` |
| `validation/` | `inputs/evidence-log.yaml` + `checklists/` |
| `references/` | `references/` |

## Limitaciones
- No sustituye evidencia de mercado real.
- No valida cumplimiento legal sectorial.
- No garantiza performance comercial.
- No decide por sí sola si un negocio tiene capacidad real para cumplir una promesa.

## Ejemplo rápido de uso
1. Una clínica dental quiere dejar de vender “limpieza + descuento”.
2. Se captura el caso en `inputs/business-intake.yaml` y `inputs/niche-diagnosis.yaml`.
3. Se usa `templates/market-diagnosis.md` para clasificar demanda, dolor, objeciones y comparabilidad.
4. Se diseña una oferta con `templates/offer-architecture.md`, `templates/pricing-stack.md` y `templates/guarantee-design.md`.
5. Se selecciona un canal en `templates/channel-strategy.md` y se genera un mecanismo de entrada con `templates/lead-magnet.md`.
6. Se validan riesgos con `checklists/anti-bullshit-checklist.md` antes de escribir cualquier anuncio.
