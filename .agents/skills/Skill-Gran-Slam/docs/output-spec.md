# Output Spec

## Contrato mínimo de salida
Toda ejecución completa de la skill debe entregar, como mínimo:
1. diagnóstico del negocio;
2. mapa de dolor y transformación;
3. propuesta de oferta;
4. estructura de pricing;
5. bonos;
6. garantía;
7. lead magnet;
8. estrategia de adquisición;
9. activos recomendados;
10. plan de implementación por fases.

## Formato uniforme obligatorio
```markdown
# Diagnóstico
## Hechos verificados
## Inferencias
## Propuestas

# Mapa de dolor y transformación
## Dolor principal
## Resultado deseado
## Sustitutos actuales
## Temperatura de demanda
## Comparabilidad actual

# Oferta propuesta
## Oferta principal
## Bonos
## Mecanismo de entrada
## Exclusiones

# Precio
## Lógica de pricing
## Estructura de pago
## Riesgos

# Garantía
## Tipo
## Términos
## Riesgo de abuso

# Lead magnet
## Problema estrecho
## Problema mayor revelado
## Formato
## CTA

# Estrategia de adquisición
## Canal principal
## Canal secundario
## Captura
## Seguimiento
## Métricas iniciales

# Activos recomendados
## Activos mínimos
## Activos posteriores

# Plan por fases
## Fase 1
## Fase 2
## Fase 3

# Riesgos y validaciones pendientes
```

## Reglas de salida
- No mezclar hechos con propuestas.
- Si falta un input crítico, marcar `MISSING_CRITICAL_INPUT` en la sección afectada.
- Si la salida no pasa checklist de publicación, abrir con `NO PUBLICAR TODAVÍA`.
- Toda garantía debe usar una de estas etiquetas: `UNCONDITIONAL`, `CONDITIONAL`, `ANTI_GUARANTEE`, `PERFORMANCE_BASED`.
- Todo canal principal debe usar una de estas etiquetas: `WARM_OUTREACH`, `FREE_CONTENT`, `COLD_OUTREACH`, `PAID_ADS`.

## Criterios mínimos de calidad
- La oferta se entiende como transformación, no como lista de servicios.
- El precio se compara contra alternativa o costo del problema, no solo contra competencia.
- El canal principal es compatible con demanda, confianza y operación.
- Los riesgos y pruebas pendientes quedan explícitos.
