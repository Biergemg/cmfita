# Contribuir

## Objetivo de este repo
Este repositorio existe para ejecutar una skill estratégica de oferta y adquisición sin adornos. Cualquier contribución debe mejorar claridad operativa, no inflar teoría.

## Reglas editoriales
- Mandan `SKILL.md` y sus hard rules.
- No introducir marcos, benchmarks, cifras ni claims no contenidos o no razonablemente implicados por la skill.
- Escribir en español técnico y sobrio.
- Separar siempre `Hechos verificados`, `Inferencias` y `Propuestas`.
- Usar `MISSING_CRITICAL_INPUT` cuando falte un dato crítico.
- Si una salida no pasa checklist de publicación, marcar `NO PUBLICAR TODAVÍA`.

## Cómo añadir o editar contenido
1. Revisa si el cambio pertenece a `SKILL.md`, `docs/`, `inputs/`, `templates/`, `references/`, `examples/` o `checklists/`.
2. Evita duplicar contenido ya resuelto en otro archivo.
3. Si agregas una plantilla, debe incluir:
   - propósito;
   - instrucciones de llenado;
   - criterio de completitud;
   - secciones de Hechos / Inferencias / Propuestas.
4. Si agregas un ejemplo, debe incluir:
   - contexto del negocio;
   - inputs recibidos;
   - supuestos explícitos;
   - razonamiento operativo resumido;
   - salida estructurada.
5. Si agregas reglas nuevas, documenta también dónde se validan: `docs/guardrails.md` o `checklists/`.

## Criterios de aceptación
- El contenido permite ejecutar la skill sin “inspiración”.
- No hay contradicción con `SKILL.md`.
- No hay placeholders vacíos.
- Los YAML siguen siendo válidos.
- Los links internos relevantes funcionan.

## No hacer
- No convertir el repo en material de marketing.
- No llenar archivos con teoría repetida.
- No usar ejemplos con promesas agresivas, testimonios inventados o cifras ficticias.
