# Operating Model

## Principio rector
La secuencia manda: mercado → oferta → persuasión → activos → validación. Si el orden se rompe, la salida pierde utilidad operativa.

## Secuencia de 8 fases
### 1. Diagnóstico de mercado
- Identificar dolor urgente, deseo final, sustitutos y segmentación.
- Clasificar temperatura: `HOT`, `WARM`, `COLD`.
- Detectar comparabilidad y riesgos de confianza o regulación.

### 2. Ingeniería de valor
- Reescribir la oferta en torno a resultado, credibilidad, tiempo y esfuerzo.
- Puntuar la variable más débil y proponer intervenciones concretas.

### 3. Obstáculos y soluciones
- Listar obstáculos reales del cliente.
- Transformarlos en soluciones `DFY`, `DWY` o `DIY`.
- Mantener solo lo que tenga valor percibido defendible frente a costo de entrega.

### 4. Arquitectura de la oferta
- Definir oferta principal, bonos, mecanismo de entrada, garantía y exclusiones.
- Alinear promesa con control real del negocio sobre el resultado.

### 5. Pricing
- Calcular piso económico y techo defendible.
- Elegir estructura de cobro compatible con margen, señal y operación.

### 6. Narrativa comercial
- Construir `Gancho → Historia → Oferta` después del diagnóstico.
- No usar historia como sustituto de prueba o de mecanismo de entrega.

### 7. Sistema de adquisición
- Elegir un canal principal y uno secundario.
- Diseñar lead magnet, captura, seguimiento y lógica de cita o checkout.
- No escalar tráfico si el follow-up es débil.

### 8. Red de multiplicación
- Añadir referidos, afiliados, SDRs o agencia solo cuando la conversión base esté validada.

## Política de supuestos
Cuando falte un dato crítico:
1. marcar `MISSING_CRITICAL_INPUT`;
2. declarar el supuesto;
3. explicar por qué importa;
4. registrar el riesgo de seguir sin validarlo;
5. continuar con la mejor versión provisional posible.

## Separación obligatoria
Toda salida debe distinguir:
- **Hechos verificados**: información confirmada por el usuario, evidencia o historial real.
- **Inferencias**: lecturas razonables derivadas de los hechos.
- **Propuestas**: decisiones o diseños que todavía deben ejecutarse o validarse.

## Mapa entre estructura base y repo público
| Función original de la skill | Carpeta pública | Uso práctico |
| --- | --- | --- |
| `input/` | `inputs/` | Captura de hechos, restricciones y evidencia. |
| `strategy/` | `docs/` + `templates/` | Marco operativo y decisiones reproducibles. |
| `assets/` | `templates/` | Briefs y guiones listos para convertirse en activos reales. |
| `automation/` | `templates/implementation-plan.md` | Secuencia operacional y dependencias. |
| `validation/` | `inputs/evidence-log.yaml` + `checklists/` | Control de supuestos, pruebas y readiness. |
| `references/` | `references/` | Principios y reglas condensadas. |

## Señales de bloqueo
Detener publicación si ocurre cualquiera:
- la oferta sigue describiéndose como lista genérica de servicios;
- el precio no tiene lógica defendible;
- el canal elegido no coincide con el nicho o con la capacidad de seguimiento;
- hay claims no soportados;
- faltan inputs críticos sin suposición explícita.
