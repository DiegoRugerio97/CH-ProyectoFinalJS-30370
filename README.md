
# Proyecto Final Curso JS CoderHouse

En este repositorio se encuentran los archivos correspondientes al proyecto de JavaScript de CoderHouse, comisión 30370.

## Objetivo
El objetivo de esta aplicación web es proveer al usuario una colección de calculadoras financieras relacionadas a su actividad laboral, las cuales procesan cálculos normalmente realizados por un contador con conocimiento en el tema, tales como:

* Cálculo de aguinaldo
* Cálculo de la retención de impuestos del salario
* Registro de ingresos y gastos deducibles para el cálculo simplificado de la declaración anual
## Procesos a Simular

**Cálculo de aguinaldo**

En base al salario mensual, a los días de aguinaldo proporcionados por el patrón o empresa y al tiempo laborado, se realiza un cálculo para determinar la cantidad a recibir por el concepto de aguinaldo en el mes de Diciembre.
El calculo puede variar en caso de no haber trabajado el año completo en la empresa.

**Cálculo de la retención de impuestos del salario**
La Secretaria del Trabajo provee una tabla para segmentar el salario del trabajador y aplicar una cuota fija y un porcentaje sobre el excedente para calcular la retención del ISR.

**Registro de ingresos y gastos deducibles para el cálculo simplificado de la declaración anual**

Llevar un control de ingresos vs. Gastos deducibles libres de ISR, con el fin de simplificar el cálculo de la declaración anual de impuestos, la cual determina si es necesario pagar ISR diferencial o si el SAT debe regresar ISR a favor al contribuyente.

## Aplicación de conceptos vistos en el curso

**Objetos y Arrays. Métodos de Arrays.**

Aplicado en colecciones de variables, como el array objetos de clase Limite, utilizados para crear la tabla de segmentos o el array de objetos de clase Ingreso o Gasto para la declaración anual.
Se utilizaron métodos de arrays como filter, find y reduce.

**Generación del DOM de forma dinámica. Eventos.**

Cada interacción con el usuario tiene un impacto en el DOM en forma de eventos, como la validación de los campos de input, pintando el input en caso de que el valor no sea válido al dejar el input(blur).
En el caso de haber pasado las validaciones, el resultado de cada calculo será entregado al usuario a través de una card al DOM con información relevante al cálculo, al hacer click en el botón de cálculo.
Para la declaración anual, el usuario puede ir agregando gastos deducibles e ingresos, estos a su vez irán apareciendo como cards en el DOM y ser filtrados por mes registrado al cambiar el select del filtro (mes).

**Sintaxis avanzada.**
Uso del OR para obtener los datos del local storage, uso del operador ternario para la optimización de algunas instrucciones.


**Al menos una librería de uso relevante para el proyecto.**
Se incluyo la librería Toastify para notificarle al usuario acerca de errores en las validaciones o en el caso de haber fallado al realizar el FETCH a los datos externos.

**Manejo de promesas con fetch. **
**Carga de datos desde un JSON local o desde una API externa.**

Se cargaron los datos de los segmentos para el cálculo de la retención de ISR a una base de datos en Firebase, la cual es fetcheada como un json. A través de una cadena de promesas, then, se obtienen los datos y en caso de fallar, se maneja el error con un catch.


