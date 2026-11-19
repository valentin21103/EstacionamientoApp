# Playa — Carpeta de presentación PPS/TFI

Borrador de trabajo adaptado a la **Guía para la Carpeta de Presentación del Proyecto PPS/TFI – UTN FRT**, incluida en la raíz del proyecto. Revisión del código: 12 de noviembre de 2026. Los campos `[Completar]` requieren información del autor. Las propuestas y los resultados esperados no equivalen a funcionalidades implementadas ni a pruebas realizadas.

## 1. Portada

| Campo | Contenido |
| --- | --- |
| Título propuesto | Playa: sistema web de gestión de estadías de un estacionamiento |
| Autor o integrantes | [Completar nombres y apellidos] |
| Carrera | Tecnicatura Universitaria en Programación |
| Institución académica | Universidad Tecnológica Nacional — Facultad Regional Tucumán |
| Institución o empresa vinculante | [Completar; indicar si se trata de un caso simulado] |
| Tutor/a académico/a | [Completar] |
| Fecha de presentación | [Completar fecha acordada] |
| Logotipos | [Incorporar los institucionales que correspondan] |

El año 2025 que figura en el pie de la guía corresponde a esa guía; la fecha de esta presentación debe confirmarse.

## 2. Índice

1. [Portada](#1-portada)
2. [Índice](#2-índice)
3. [Resumen ejecutivo](#3-resumen-ejecutivo)
4. [Introducción](#4-introducción)
5. [Estado del arte](#5-estado-del-arte)
6. [Descripción del proyecto](#6-descripción-del-proyecto)
7. [Metodología](#7-metodología)
8. [Recursos necesarios](#8-recursos-necesarios)
9. [Plan de trabajo](#9-plan-de-trabajo)
10. [Resultados esperados](#10-resultados-esperados)
11. [Referencias](#11-referencias)
12. [Anexos](#12-anexos)

La numeración de páginas debe generarse al preparar la versión final para impresión, después de incorporar portada, imágenes y anexos.

## 3. Resumen ejecutivo

Playa es una aplicación web orientada al registro de entradas y salidas de vehículos en un estacionamiento. Integra la consulta de plazas disponibles, la asignación de una plaza y una tarifa, el cierre de estadías y un resumen de ocupación y recaudación del día.

El objetivo general propuesto es centralizar el control operativo de las estadías y mantener un registro persistente de sus movimientos. La implementación actual utiliza React y Vite para la interfaz, una API con Node.js, Express y TypeScript, y PostgreSQL mediante Prisma. El README identifica Neon como proveedor de la base de datos; la conexión no fue verificada durante esta revisión.

Se propone continuar mediante entregas incrementales que incluyan implementación, pruebas y documentación. La primera versión a completar prioriza la consistencia de las entradas y salidas, la administración de datos necesarios para operar y la consulta del historial.

El código ya contiene el circuito principal de ingreso y egreso. La conclusión provisional es que existe una base para desarrollar el proyecto académico, aunque todavía deben completarse validaciones, pruebas funcionales y evidencias. La conclusión final se redactará con los resultados obtenidos.

## 4. Introducción

### Contexto y antecedentes

El caso de trabajo es la operación de un estacionamiento que necesita identificar vehículos, conocer la disponibilidad de plazas y registrar el importe correspondiente a cada estadía. Debe confirmarse con la institución vinculante si este escenario representa su operación real.

Pendiente de relevamiento: nombre y ubicación del establecimiento, cantidad y tipos de plazas, responsables de operación, mecanismo actual de registro, reglas de cobro y dificultades observadas. No se realizaron entrevistas ni se midieron tiempos de atención para este borrador.

### Justificación

La propuesta reúne información de vehículos, clientes, plazas, tarifas y estadías en una aplicación. Su utilidad se evaluará mediante escenarios de uso y la revisión del responsable del establecimiento, si corresponde. No se atribuyen mejoras cuantitativas sin mediciones.

### Objetivo general propuesto

Desarrollar y validar un sistema web que permita gestionar las entradas, salidas y ocupación de un estacionamiento, conservando la información de las estadías y sus importes.

### Objetivos específicos propuestos

- Registrar entradas vinculando vehículo, cliente, plaza y tarifa.
- Impedir asignaciones incompatibles y estadías activas duplicadas, incluso ante solicitudes simultáneas.
- Registrar salidas y calcular su importe conforme a una regla de cobro documentada.
- Administrar clientes, vehículos, plazas y tarifas desde la interfaz.
- Consultar movimientos históricos y métricas diarias con criterios de fecha explícitos.
- Verificar el circuito con pruebas y documentar instalación, operación y resultados.

## 5. Estado del arte

Esta sección requiere investigación y referencias antes de la entrega. No se realizó todavía una comparación de productos ni se afirma que la solución sea innovadora.

Se propone comparar el proceso actual del establecimiento y al menos dos soluciones de gestión de estacionamientos. Para cada alternativa se deben registrar nombre, versión o fecha de consulta, fuente y evidencia de las funciones observadas.

| Criterio de comparación | Evidencia a reunir |
| --- | --- |
| Registro de entradas y salidas | Flujo, datos solicitados y restricciones |
| Ocupación de plazas | Forma de representar disponibilidad y tipos de vehículo |
| Tarifas y cobros | Reglas admitidas, confirmación y comprobantes |
| Historial e informes | Filtros, períodos y posibilidades de exportación |
| Acceso y puesta en marcha | Usuarios, permisos, requisitos y costos publicados |
| Adecuación al caso | Necesidades cubiertas y limitaciones para el establecimiento |

El aporte propuesto es adaptar el circuito al caso relevado y demostrar la integración entre interfaz, API y persistencia. Su diferenciación debe fundamentarse con la comparación, no solo con las tecnologías elegidas.

## 6. Descripción del proyecto

### Problemática y solución propuesta

La necesidad planteada es disponer de un registro consistente de qué vehículo ocupa cada plaza, cuándo ingresó y qué importe corresponde al salir. La solución propuesta es una interfaz de operación conectada a una API y una base relacional. La problemática concreta y sus efectos deben validarse con el relevamiento.

### Alcance y estado observado

| Función | Estado en el código | Trabajo pendiente |
| --- | --- | --- |
| Panel de plazas y métricas | Implementado en API e interfaz | Validar datos, zona horaria y estados sin información |
| Entrada de vehículos | Implementada con transacción | Validar solicitudes y proteger asignaciones concurrentes |
| Salida y cálculo de importe | Implementados con transacción | Confirmar regla de cobro, proteger cierres simultáneos y mostrar importe antes de confirmar |
| Administración de vehículos | CRUD en API | Incorporar interfaz y revisar validaciones y restricciones |
| Clientes, plazas y tarifas | Modelos y consultas para el panel | Incorporar administración en API e interfaz |
| Movimientos recientes | Panel limitado a ocho estadías | Incorporar historial paginado con filtros |
| Usuarios y permisos | No implementados en el código revisado | Definir necesidad con tutor y establecimiento antes de exposición pública |
| Pruebas automáticas | Sin scripts de pruebas en los paquetes revisados | Incorporar pruebas de reglas y de integración |

La revisión está basada en código y documentación; no certifica el funcionamiento contra la base de datos.

### Reglas actuales que deben confirmarse

- Tipos de vehículo: auto, moto y camioneta.
- Una plaza puede estar libre u ocupada y puede restringir el tipo de vehículo.
- La entrada exige un cliente, una tarifa y una plaza existentes.
- El servicio intenta impedir que un vehículo tenga dos estadías activas; falta reforzar la garantía ante concurrencia.
- El cobro actual redondea hacia arriba a horas completas, con un mínimo de una hora.
- El importe se calcula usando el precio de la tarifa al salir; debe definirse y conservarse el precio aplicable para que una modificación de tarifas no cambie estadías ya iniciadas.
- Los indicadores diarios usan actualmente el comienzo del día según la zona horaria del servidor; debe definirse la zona del establecimiento.

### Límites propuestos para la primera versión

Un solo estacionamiento, operación manual y cobro registrado por el operador. Quedan fuera del alcance inicial la lectura automática de patentes, barreras físicas, reservas, abonos, múltiples sucursales, pagos en línea y facturación fiscal. Estos límites son una propuesta para acordar con el tutor y la institución.

## 7. Metodología

### Forma de trabajo propuesta

Trabajar por incrementos: relevar una necesidad, definir su criterio de aceptación, implementar el cambio, verificarlo y actualizar la documentación. No se atribuye al proyecto una metodología formal como Scrum sin evidencia de sus prácticas.

### Tecnologías y estructura actuales

| Capa | Tecnología y responsabilidad |
| --- | --- |
| Interfaz | React y Vite; página de estadías, componentes y estado mediante hooks |
| API | Express y TypeScript; rutas, controladores y middlewares de error |
| Negocio | Servicios de estadías, vehículos y estacionamiento |
| Persistencia | Prisma y PostgreSQL; esquema y migración inicial incluidos |
| Comprobaciones disponibles | ESLint en frontend y TypeScript en backend |

La estructura separa carpetas de dominio, negocio, API e infraestructura. Los servicios de negocio acceden directamente a Prisma; no se presenta esa organización como una separación completa mediante repositorios.

### Verificación

Las pruebas propuestas están en el anexo B. Cada ejecución debe registrar fecha, entorno sin credenciales, datos utilizados, resultado y evidencia. Los comandos de lint no reemplazan las pruebas funcionales o de integración.

## 8. Recursos necesarios

| Tipo | Recurso o responsabilidad |
| --- | --- |
| Autor o equipo | Relevamiento, desarrollo, pruebas y documentación; [asignar responsables] |
| Tutor académico | Revisión de alcance, entregables y presentación; [completar nombre] |
| Referente del establecimiento | Validación del proceso y reglas de cobro; [confirmar participación] |
| Equipo de desarrollo | Computadora, navegador, Node.js y npm compatibles con el proyecto |
| Datos y alojamiento | Base PostgreSQL; conectividad para Neon si se mantiene el proveedor |
| Entorno de pruebas | Base separada de la operativa y datos ficticios |
| Control de versiones | Configurar repositorio Git; no se encontró `.git` en esta carpeta durante la revisión |

No incluir credenciales, documentos personales ni datos de clientes reales en capturas, ejemplos o anexos. Los costos y recursos contratados se completarán con información confirmada.

## 9. Plan de trabajo

Secuencia propuesta, pendiente de asignar responsables y fechas según disponibilidad y entrega académica. No constituye un cronograma aprobado.

| Etapa | Trabajo | Entregable y criterio de cierre | Fecha |
| --- | --- | --- | --- |
| 1. Relevamiento y alcance | Completar datos académicos, establecimiento y reglas | Alcance y criterios de cobro acordados con tutor/referente | [Completar] |
| 2. Consistencia operativa | Validaciones, conflictos concurrentes, precio aplicable y zona horaria | Pruebas de entradas, salidas y cobros satisfactorias | [Completar] |
| 3. Administración | Clientes, vehículos, plazas y tarifas | Operador puede preparar datos desde la app; cambios respetan el historial | [Completar] |
| 4. Consulta y cobro | Historial con filtros, paginación y confirmación del importe | Se localiza una estadía anterior y se revisa el monto antes de cerrar | [Completar] |
| 5. Validación e instalación | Pruebas integrales, instrucciones y condiciones de acceso | Circuito reproducible en entorno de prueba; defectos críticos resueltos | [Completar] |
| 6. Presentación | Comparativa, referencias, capturas, diagramas y conclusiones | Carpeta revisada, paginada y consistente con la versión demostrada | [Completar] |

La siguiente unidad técnica recomendada es **validación y consistencia de entradas/salidas**, con sus pruebas. La gestión de tarifas debe preservar el precio aplicable a las estadías; no conviene habilitar cambios de precios sin resolver esa regla.

## 10. Resultados esperados

Se espera entregar una aplicación demostrable, su código fuente, instrucciones de instalación y operación, pruebas documentadas y esta carpeta académica completa.

| Resultado esperado | Evidencia de aceptación |
| --- | --- |
| Entrada persistente | Registrar vehículo, recargar y comprobar su plaza y estadía activa |
| Ocupación consistente | Solicitudes simultáneas no generan dos estadías activas para una plaza o vehículo |
| Salida verificable | Cobro acorde a la regla acordada, cierre único y liberación de plaza |
| Administración operativa | Preparar clientes, plazas y tarifas sin editar manualmente la base |
| Consulta histórica | Buscar una estadía cerrada por patente y período |
| Resumen diario correcto | Verificar totales y cambio de día en la zona del establecimiento |
| Presentación reproducible | Ejecutar la demostración con datos ficticios siguiendo las instrucciones |

El impacto académico esperado es aplicar desarrollo web, modelado relacional, reglas de negocio y pruebas a un caso integrado. El impacto operativo se evaluará con el referente; no hay mediciones que permitan afirmar ahorros de tiempo o reducción de errores.

## 11. Referencias

Referencia provisional basada en el título y pie del PDF local; verificar autoría y datos editoriales antes de la entrega:

Universidad Tecnológica Nacional, Facultad Regional Tucumán. (2025). *Guía para la carpeta de presentación del proyecto PPS/TFI* [Guía académica].

Pendiente: incorporar las fuentes efectivamente consultadas para el estado del arte y la fundamentación técnica. Registrar autor institucional, fecha, título, URL y, cuando corresponda, fecha de recuperación según APA 7. No se agregan referencias de productos que todavía no se investigaron.

## 12. Anexos

### A. Evidencia técnica disponible

- [Modelo de datos y relaciones](../backend/src/domain/MODELADO.md).
- [Esquema Prisma](../backend/src/infrastructure/database/prisma/schema.prisma).
- [Servicio de entradas, salidas y panel](../backend/src/business/services/EstadiaService.ts).
- [Página de estadías](../frontend/src/pages/EstadiasPage/EstadiasPage.jsx).
- [Guía de ejecución del proyecto](../README.md).

Los apuntes `03`, `05` y `06` de `docs/` son material de desarrollo. Deben revisarse antes de anexarlos: algunos nombres de componentes y descripciones de actualización de estado ya difieren de la implementación actual.

### B. Casos de prueba propuestos

Todos pendientes de ejecución documentada. Utilizar datos ficticios y una base de pruebas.

| Caso | Resultado esperado |
| --- | --- |
| Entrada válida | Una estadía activa y plaza ocupada; persiste después de recargar |
| Campos faltantes, identificadores inválidos o tipo desconocido | Rechazo controlado sin cambios parciales |
| Plaza ocupada o incompatible | Rechazo sin crear estadía |
| Vehículo ya ingresado | Rechazo del segundo ingreso |
| Dos entradas simultáneas a una plaza | Solo una se confirma; la otra recibe un conflicto controlado |
| Dos entradas simultáneas del mismo vehículo a plazas distintas | Solo una se confirma |
| Salida normal y salida repetida o simultánea | Un único cierre y cobro; no modifica una ocupación posterior |
| Límites de cobro y modificación de tarifa | Importe según regla y precio acordados para la estadía |
| Cambio de día del establecimiento | Los indicadores incluyen únicamente los cierres del día correspondiente |
| API no disponible o respuesta fallida | Error visible y posibilidad de retomar la operación sin duplicarla |

### C. Material pendiente para la entrega

- Capturas con datos ficticios de ingreso, ocupación, salida e historial.
- Diagrama de arquitectura y diagrama entidad-relación de la versión final.
- Manual de operación y configuración reproducible sin secretos.
- Registro de pruebas ejecutadas, defectos corregidos y limitaciones conocidas.
- Validación del referente o tutor, si corresponde.
- Portada completa, referencias APA revisadas e índice con páginas definitivas.
