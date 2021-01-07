# inventario-taller

Entidad: Descripción de lo que hay en la base de datos
Resgistro: Una sola instancia de una entidad

Todo registro tendrá:
Creado      -   datetime
Actualizado -   datetime
Borrado     -   datetime

soft deletes
INDEX on searching items

ENTIDADES EN ALMACÉN

[*] Operario
[*] Producto/Pieza
[*] Tipo de producto ( herramienta, rodamiento, etc)
[*] Ubicación asociada
[*] Proveedor asociado
[*] Remito asociado 



TIPO DE PRODUCTOS EN ALMACEN:

[ ] RODAMIENTOS 
[ ] PIEZAS MECANICAS
[ ] HERRAMIENTAS
[ ] 
[ ]


Al ingresar un artículo al almacén se le asigna un ID único.
Muchos artículos pueden tener el mismo codbar pero no el mismo ID.
¿Cómo saber qué ID está saliendo del almacén para generar la baja en base de datos?

Trazabilidad: se puede prescindir, no hay seguridad de que el ID que salió sea 
el mismo que se encuentra en sistema


Ver en database que sucede con los remitos, involucrar muchos artículos en un remito, ¿Cuántos 
registros de entidades se generan?





Because there are no foreign keys references this table is not dependant on any other table
that means that i can creat it first. Users.
