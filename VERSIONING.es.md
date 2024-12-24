# <img src="https://swiftlystatic.vercel.app/airacloud/favicon.svg" height="30px" width="30px"> Versionado de AiraCloud

> También disponible en inglés (VERSIONING.md).

### <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=help-circle&fill=whitesmoke&regular=true" height="25px" width="25px"> ¿Qué es el versionado?

> El versionado se refiere al tener controlada cada versión de AiraCloud según vamos actualizando el código para hacer cambios, mejoras, correciones, etc... Es útil ya que ayuda a identificar dónde y cúando se cometió un fallo en el caso de un error.
> Esta guía te enserá a anotar los cambios a AiraCloud en nuestro registro de cambios (CHANGELOG) de forma semántica.

### <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=checkmark-circle&fill=whitesmoke&regular=true" height="25px" width="25px"> Registrando una nueva versión.

> Cada versión de AiraCloud luce así: `A`.`B`.`C`

> Cojamos el número de versión actual, imagina que es 6.7.13
>
> Si hiciste una actualización para **arreglar un error**, o **añadir funcionalidad**, o **hacer una mejora** -> Añade 1 a la `C` (6.7.**14**)
>
> Si hiciste una actualización que implica **cambios significantes al funcionamiento de AiraCloud** -> Añade 1 a la `B` y reestablece la `C` (6.**8**.0)
>
> Si de algún modo te las has apañado y acabas de hacer un nuevo AiraCloud -> Añade 1 a la `A` y reestablece la `B` y la `C` (**7**)

> Básicamente, la mayor parte del tiempo sólo estarás subiendo a la `C`. Recuerda que es perfectamente normal que llegue a números de tres o cuatro cifras.

> Además, recuerda agrupar las _commits_ - esto quiere decir, si haces una _commit_ que sólo añade una cosa a los ajustes (por ejemplo), no hagas una nueva versión, mantente haciendo contribuciones hasta que tengas algo lo suficientemente bueno como para hacer una nueva versión.

> Como extra, puedes añadir etiquetas.
>
> `A`.`B`.`C`-`ALPHA` -> `A`.`B`.`C`-`BETA` -> `A`.`B`.`C`-`RC`
>
> **Cómo usar las etiquetas**
>
> Las etiquetas se utilizan sobre todo para los lanzamientos, no para los registros internos.
> 
> - ALPHA: Primera versión de una actualización (no probada, puede (y probablemente) tendrá algún error). Piensa en ello como las versiones de prueba de los navegadores (Firefox Nightly, MS Edge Canary...) o en el programa Windows Insiders - reciben actualizaciones prácticamente todos los días para que los usuarios las vayan probando y detectando errores.
> - BETA: Lo que viene justo después de la ALPHA, cuando se van corrigiendo errores y se empieza a probar. Piensa en Discord, a veces lanzan funciones para un grupo de aleatorios las pueda probar, es lo que va justo después de la ALPHA.
> - RC (acortamiento del inglés _Release Candidate_ (candidato para lanzamiento)): Lo que viene justo después de la BETA y justo antes de la versión final / ESTABLE. Piensa en ello como las "betas" que apps como Discord publican ya para casi el 100% de los usuarios, para corregir el último bug y poder decir que es una versión "estable".
>
> Básicamente eso, las etiquetas representan el ciclo de vida de una actualización, que nace como una ALPHA y va pasando diferentes etapas (BETA y RC) antes de pasar a la final (PD: en esos casos se suele añadir la etiqueta "`-STABLE`" al número de versión).
>
> Las etiquetas deberían usarse para funciones que necesitarán de varias versiones para salir adelante, y que tengan un mínimo de relevancia. Una actualización sencilla como añadir una configuración de color (por ejemplO), aunque necesite más de una commit para corregir bugs o lo que sea, no se merece un ciclo ALPHA-BETA-RC-STABLE completo. Resérvalo para cuando haga falta.
