SET SERVEROUTPUT ON;
-- EJERCICIO 1
--Realice un cursor que imprima por pantalla el nombre  de los departamento y de los empleados que recibe los salarios más altos.

DECLARE
    CURSOR c_empleado IS
    SELECT d.nombre_depto, e.nombre FROM Departamento d JOIN Empleado e ON d.cod_depto = e.cod_dep
        WHERE e.salario = (SELECT MAX(salario) FROM Empleado WHERE cod_dep = d.cod_depto);
        
        v_nombreDep Departamento.nombre_depto%TYPE;
        v_nombreEmp Empleado.nombre%TYPE;
BEGIN
    OPEN c_empleado;
    
    LOOP 
        FETCH c_empleado INTO v_nombreDep , v_nombreEmp;
        EXIT WHEN c_empleado%NOTFOUND;
        
          DBMS_OUTPUT.PUT_LINE('Departamento = ' || v_nombreDep || ', Empleado = ' || v_nombreEmp);
    END LOOP;
    CLOSE c_empleado;
END;

-- EJERCICIO 2 
-- Realice un cursor que permita calcular la cantidad de empleados de cada departamento,  que reciban menos del sueldo ingresado por teclado, mostrando el resultado por pantalla

ACCEPT sueldo_ingresado NUMBER PROMPT 'Ingrese el sueldo: '
DECLARE 
    v_sueldo NUMBER := &sueldo_ingresado;
    CURSOR c_empleado IS
        SELECT d.nombre_depto , COUNT(cod_emp) as cant_emp FROM  Departamento d JOIN Empleado e ON d.cod_depto = e.cod_dep
        WHERE e.salario < v_sueldo
        GROUP BY d.nombre_depto;
    v_nombreDep Departamento.nombre_depto%TYPE;
    v_cantidad NUMBER;
BEGIN
    OPEN c_empleado;
    
    LOOP
        FETCH c_empleado INTO v_nombreDep, v_cantidad;
        EXIT WHEN c_empleado%NOTFOUND;      
            DBMS_OUTPUT.PUT_LINE('Departamento = ' || v_nombreDep || ', Cantidad = ' || v_cantidad);  
    END LOOP;
END;


-- Verificar que la informacion sea correcta
SELECT * FROM Departamento d JOIN Empleado e ON d.cod_depto = e.cod_dep 
WHERE salario  < 2500 AND d.nombre_depto = 'Marketing';


---------------------------------------------------------- GUIA 2----------------------------------------------------------------------------------------------------------

--Ejercicio 1
-- Muestre el nombre de los productos y la cantidad vendida durante la temporada de verano

DECLARE
    Cursor c_producto IS 
    SELECT p.nombre , COUNT(v.codigo) AS cantidad_vendida FROM Producto p
        JOIN venta v ON v.codigo= p.codigo
        JOIN Prod_Temp pt ON pt.codigo = p.codigo 
        JOIN temporada t ON t.codigo_temp =  pt.codigo_temp
    WHERE t.nombre_temp = 'verano'
    GROUP BY p.nombre;
    
    v_nombreprod Producto.nombre%TYPE;
    v_cantidad_vendida Number;
BEGIN 
    OPEN c_producto;
        LOOP
            FETCH c_producto  INTO v_nombreprod,v_cantidad_vendida;
            EXIT WHEN c_producto%NOTFOUND;
            
                DBMS_OUTPUT.PUT_LINE('Producto: ' || v_nombreprod || ' - Cantidad vendida: ' || v_cantidad_vendida);
        END LOOP;
    CLOSE c_producto;
END;

-- EJERCICIO 2
-- Imprima por pantalla el nombre de cada categoría y la rentabilidad en ventas (precio de venta-precio compra) que obtendría al vender todos sus productos. Además, indique cuál es la categoría que
-- obtendrá mayor rentabilidad.
3. Muestre por pantalla el valor en t
DECLARE
    CURSOR c_categoria  IS 
        SELECT c.nombre_cat,SUM((p.precio_venta - p.precio_compra)* p.stock) as rentabilidad FROM producto p 
        JOIN categoria c ON p.codigo_cat = c.codigo_cat
        GROUP BY c.nombre_cat;
        
     v_nombcat categoria.nombre_cat%TYPE;
     v_rentabilidad Number;
     
    v_max_rentabilidad  NUMBER := 0;
    v_cat_max_rentabilidad categoria.nombre_cat%TYPE;
BEGIN
    OPEN c_categoria;
        LOOP
            FETCH c_categoria INTO v_nombcat , v_rentabilidad;
             EXIT WHEN c_categoria%NOTFOUND;
             
             DBMS_OUTPUT.PUT_LINE('Categoria: ' || v_nombcat|| ' - Rentabilidad : ' || v_rentabilidad);
             
             IF v_rentabilidad > v_max_rentabilidad THEN
                v_max_rentabilidad := v_rentabilidad;
                v_cat_max_rentabilidad := v_nombcat;
            END IF;
        END LOOP;
    CLOSE c_categoria;
        -- Mostramos la categoría con mayor rentabilidad
    DBMS_OUTPUT.PUT_LINE('Categoría con mayor rentabilidad: ' || v_cat_max_rentabilidad || 
                         ' (Rentabilidad: ' || v_max_rentabilidad || ')');
END;






