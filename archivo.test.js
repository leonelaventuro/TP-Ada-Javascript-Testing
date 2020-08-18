const vendedoras = [ "Ada" , "Grace" , "Hedy" , "Sheryl" ];

const ventas = [
    [ 100000000 , 4 , 2 , 2019 , 'Grace' , 'Centro' , ['Monitor GPRS 3000' ,'Motherboard ASUS 1500' ] ],
    [ 100000001 , 1 , 1 , 2019 , 'Ada' , 'Centro' , ['Monitor GPRS 3000', 'Motherboard ASUS 1500' ] ],
    [ 100000002 , 2 , 1 , 2019 , 'Grace' , 'Caballito' , [ 'Monitor ASC 543', 'Motherboard MZI' , 'HDD Toyiva' ] ],
    [ 100000003 , 10 , 1 , 2019 , 'Ada' , 'Centro' , [ 'Monitor ASC 543', 'Motherboard ASUS 1200' ] ],
    [ 100000004 , 12 , 1 , 2019 , 'Grace' , 'Caballito' , [ 'Monitor GPRS 3000', 'Motherboard ASUS 1200' ] ],
    [ 100000005 , 21 , 3 , 2019 , 'Hedy' , 'Caballito' , [ 'Monitor ASC 543', 'Motherboard ASUS 1200' , 'RAM Quinston' ] ]
];

const precios = [
    [ 'Monitor GPRS 3000' , 200 ],
    [ 'Motherboard ASUS 1500' , 120 ],
    [ 'Monitor ASC 543' , 250 ],
    [ 'Motherboard ASUS 1200' , 100 ],
    [ 'Motherboard MZI' , 30 ],
    [ 'HDD Toyiva' , 90 ],
    [ 'HDD Wezter Dishital' , 75 ],
    [ 'RAM Quinston' , 110 ],
    [ 'RAM Quinston Fury' , 230 ]
];

const sucursales = [ 'Centro' , 'Caballito' ];

/*REQUISITOS
- Se deben respetar los nombres de las funciones
- Buena tabulación del código
- Usar nombres claros para las variables
- Utilizar solo let o const, y arrow functions
- Todas las funciones deben tener test unitarios utilizando Jest, para verificar el
correcto funcionamiento*/


//////// ej 1 
/*1. precioMaquina(componentes): recibe un array de componentes y devuelve el
precio de la máquina que se puede armar con esos componentes, que es la suma
de los precios de cada componente incluido.*/


const buscarPrecioPorComponente = (componente) => {
    const indexPrecio = precios.findIndex(precioComponente => precioComponente[0] === componente);
    if (indexPrecio === -1) throw new Error('El o los componentes ingresados no existen. Verificar errores de tipeo ;)')
    return precios[indexPrecio][1];
};

const precioMaquina = (componentes) => {
    if (typeof componentes !== "object") throw new Error("El tipo de dato ingresado para el o los componentes no es válido. Debe tener formato de array.");
    return componentes.reduce((acumulador, componente) => acumulador + buscarPrecioPorComponente(componente), 0);
};



/////// ej 2
/*2. cantidadVentasComponente(componente): recibe el nombre de un componente y
devuelve la cantidad de veces que fue vendido. La lista de ventas no se pasa por
parámetro, se asume que está identificada por la variable ventas.*/


const idxComponent = component => precios.findIndex(element => element[0] === component);

const checkComponent = element => {
    if(typeof element !== "string") throw new Error("El tipo de dato ingresado para el componente no es válido. Debe ser un string.");
    if(idxComponent(element) === -1) throw new Error("El componente ingresado no existe. Verificar errores de tipeo ;)");
};

const cantidadVentasComponente = component => {
    checkComponent(component);
    let timesSold = 0;
    ventas.forEach(venta => {
            if(venta[6].includes(component)) timesSold++;
        });
    return timesSold;
};

 ///////ej 3
/* 3. ventasVendedora(nombre): recibe por parámetro el nombre de una vendedora y
retorna el importe total de ventas realizadas por dicha vendedora*/

const idxForSeller = name => vendedoras.findIndex(element => element === name);

const checkSeller = name => {
    if(typeof name !== "string") throw new Error("El tipo de dato ingresado como nombre de vendedora no es válido. Debe ser un string.");
    if(idxForSeller(name) === -1) throw new Error("La vendedora ingresada no existe. Verificar errores de tipeo ;)");
};

const ventasVendedora = name => {
    checkSeller(name);
    let sales = 0;
    ventas.forEach(venta => {
            if(venta[4] === name) {
                sales += precioMaquina(venta[6])
            }
        });
    return sales;
};

///// ej 4
/*4. componenteMasVendido(): Devuelve el nombre del componente que más ventas
tuvo históricamente. El dato de la cantidad de ventas es el que indica la función
cantidadVentasComponente */


const componenteMasVendido = () => {
    const componentes = precios.map(precio => precio[0]);
    let mayor = 0;
    let masVendido;
    componentes.forEach(componente => {
        const cantidadVentas = cantidadVentasComponente(componente);
        if(cantidadVentas > mayor) {
            mayor = cantidadVentas;
            masVendido = componente;
        }
    });
    return masVendido;
};

//////// ej 5
/*5. ventasSucursal(sucursal): recibe por parámetro el nombre de una sucursal y
retorna el importe de las ventas totales realizadas por una sucursal sin límite de
fecha.*/


const indexSucursal = name => sucursales.findIndex(element => element === name);

const validarSucursal = name => {
    if(typeof name !== "string") throw new Error("El tipo de dato ingresado como nombre de sucursal no es válido. Debe ser un string.");
    if(indexSucursal(name) === -1) throw new Error("La sucursal ingresada no existe. Verificar errores de tipeo ;)");
};

 
 const ventasSucursal = (sucursal) => {
     validarSucursal(sucursal);
     let contador = 0;
     ventas.forEach (venta => {
         if(venta [5] === sucursal)
         contador += precioMaquina(venta [6]);
     });
     return contador;
 };


///////////  ej 6
/*6. mejorVendedora(): Devuelve el nombre de la vendedora que más ingresos generó*/

const mejorVendedora = () => {
    let mejor = ["", 0];
    vendedoras.forEach(vendedora => {
        let ventasPorVendedora = ventasVendedora(vendedora);
        if(mejor[1] < ventasPorVendedora) {
            mejor[0] = vendedora;
            mejor [1] = ventasPorVendedora;
        }
    });
    return mejor[0];
};

/////////// ej 7
/*
ventaPromedio(): Debe retornar el importe promedio por venta, 
como un número entero sin decimales redondeado siempre para abajo.
*/

const ventaPromedio = () => {
    let totalSales = 0;
    ventas.forEach(venta => totalSales += precioMaquina(venta[6]));
    return Math.floor(totalSales/ventas.length); 
};


////// ej 8
/*8. obtenerIdVenta(): Tiene que retornar un número aleatorio entre 100000000 y
999999999*/

const findIndexId = id => ventas.findIndex(venta => venta[0] === id);
const obtenerIdVenta = () => {
	let id = 0;
	do{
		id = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
	}
	while (findIndexId (id) > -1)
	return id;
};


//// ej 9
/*9. agregarVenta(dia, mes, anio, vendedora, sucursal, componentes): recibe por
parámetro todos los datos de una venta, y los agrega en el array de ventas. Al igual
que las ventas que ya están previamente creadas, además de estos datos
necesitamos agregar el primer dato que es un identificador de la venta. Para agregar
este dato, tenemos que usar la función desarrollada en el punto anterior
obtenerIdVenta*/


const validateDay = (dia) => {
    if (typeof dia != "number") throw new Error ("El valor ingresado para el día no corresponde a un número.");
    if (dia < 1 || dia > 31 ) throw new Error ("El número ingresado no corresponde a un día válido");
};

const validateMonth = (mes) => {
    if (typeof mes != "number") throw new Error ("El valor ingresado para el mes no corresponde a un número.");
    if (mes < 1 || mes > 13 ) throw new Error ("El número ingresado no corresponde a un mes válido");
};

const validateYear = (anio) => {
    if (typeof anio != "number") throw new Error ("El valor ingresado para el año no corresponde a un número.");
    if (anio < 2019 || anio > 2100 ) throw new Error ("El número ingresado no corresponde a un año válido.");
};

const findIndexComponent = (element) => index = precios.findIndex(component => component[0] === element);

const validateComponents = (componentes) => {
    if (typeof componentes != "object") throw new Error ("El tipo de dato ingresado para el o los componentes no es válido. Debe tener formato de array.");
    componentes.forEach(componente => {
        let index = findIndexComponent(componente);
        if (index == -1) throw new Error ("El o los componentes ingresados no existen. Verificar errores de tipeo ;)");
    })     
};

const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {
    validateDay(dia);
    validateMonth(mes);
    validateYear(anio);
    checkSeller(vendedora);
    validarSucursal(sucursal);
    validateComponents(componentes);

    let id = (obtenerIdVenta());
    ventas.push([id, dia, mes, anio, vendedora, sucursal, componentes]);
};



///////TESTING

describe("1. Testeo función precioMaquina(componentes)", () => {

    test("Precio de máquina de (Monitor GPRS 3000 + Motherboard ASUS 1500) debería devolver 320", () => {
        expect(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])).toBe(320);
    });
    test("Precio de máquina de (Monitor ASC 543 + Motherboard MZI + HDD Toyiva) debería devolver 370", () => {
        expect(precioMaquina(["Monitor ASC 543", "Motherboard MZI", "HDD Toyiva"])).toBe(370);
    });
    test("Precio de máquina de (Monitor ASC 543) debería devolver 250", () => {
        expect(precioMaquina(["Monitor ASC 543"])).toBe(250);
    });
    test("Precio de máquina de (true) tira error tipo de dato no válido", () => {
        expect(() => precioMaquina(true)).toThrow("El tipo de dato ingresado para el o los componentes no es válido. Debe tener formato de array.");
    });
    test("Precio de máquina de (5678) tira error tipo de dato no válido", () => {
        expect(() => precioMaquina(5678)).toThrow("El tipo de dato ingresado para el o los componentes no es válido. Debe tener formato de array.");
    });
    test("Precio de máquina de (Monitor ASC 500) tira error componente no existente", () => {
        expect(() => precioMaquina(["Monitor ASC 500"])).toThrow("El o los componentes ingresados no existen. Verificar errores de tipeo ;)");
    });
    test("Precio de máquina de (Meri) tira error componente no existente", () => {
        expect(() => precioMaquina(["Meri"])).toThrow("El o los componentes ingresados no existen. Verificar errores de tipeo ;)");
    });
});

describe("2. Testeo función cantidadVentasComponente(componentes)", () => {

    test("Cantidad de ventas de Monitor GPRS 3000 debería devolver 3", () => {
        expect(cantidadVentasComponente("Monitor GPRS 3000")).toBe(3);
    });
    test("Cantidad de ventas de Motherboard MZI debería devolver 1", () => {
        expect(cantidadVentasComponente("Motherboard MZI")).toBe(1);
    });
    test("Cantidad de ventas de Monitor ASC 543 debería devolver 3", () => {
        expect(cantidadVentasComponente("Monitor ASC 543")).toBe(3);
    });
    test("Cantidad de ventas de Monitor ASC 543 luego de agregar 2 ventas manuales debería ser 5", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor ASC 543"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor ASC 543"]);
        expect(cantidadVentasComponente("Monitor ASC 543")).toBe(5);
    });
    test("Cantidad de ventas de (true) tira error tipo de dato no válido", () => {
        expect(() => cantidadVentasComponente(true)).toThrow("El tipo de dato ingresado para el componente no es válido. Debe ser un string.");
    });
    test("Cantidad de ventas de (5678) tira error tipo de dato no válido", () => {
        expect(() => cantidadVentasComponente(5678)).toThrow("El tipo de dato ingresado para el componente no es válido. Debe ser un string.");
    });
    test("Cantidad de ventas de (Monitor ASC 500) tira error componente no existente", () => {
        expect(() => cantidadVentasComponente("Monitor ASC 500")).toThrow("El componente ingresado no existe. Verificar errores de tipeo ;)");
    });
    test("Cantidad de ventas de (Meri) tira error componente no existente", () => {
        expect(() => cantidadVentasComponente("Meri")).toThrow("El componente ingresado no existe. Verificar errores de tipeo ;)");
    });
    afterAll(() => {
        ventas.splice(6,2);
      });
});

describe("3. Testeo función ventasVendedora(nombre)", () => {

    test("Importe de ventas de Grace debería devolver 990", () => {
        expect(ventasVendedora("Grace")).toBe(990);
    });
    test("Importe de ventas de Sheryl debería devolver 0", () => {
        expect(ventasVendedora("Sheryl")).toBe(0);
    });
    test("Importe de ventas de Ada debería devolver 670", () => {
        expect(ventasVendedora("Ada")).toBe(670);
    });
    test("Importe de ventas de Hedy debería devolver 670", () => {
        expect(ventasVendedora("Hedy")).toBe(460);
    });
    test("Importe de ventas de Hedy luego de agregar ventas manules debería devolver 1380", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(ventasVendedora("Hedy")).toBe(1380);
    });
    test("Importe de ventas de (true) tira error tipo de dato no válido", () => {
        expect(() => ventasVendedora(true)).toThrow("El tipo de dato ingresado como nombre de vendedora no es válido. Debe ser un string.");
    });
    test("Importe de ventas de (5678) tira error tipo de dato no válido", () => {
        expect(() => ventasVendedora(5678)).toThrow("El tipo de dato ingresado como nombre de vendedora no es válido. Debe ser un string.");
    });
    test("Importe de ventas de Heidy tira error vendedora no existente", () => {
        expect(() => ventasVendedora("Heidy")).toThrow("La vendedora ingresada no existe. Verificar errores de tipeo ;)");
    });
    test("Importe de ventas de Meri tira error vendedora no existente", () => {
        expect(() => ventasVendedora("Meri")).toThrow("La vendedora ingresada no existe. Verificar errores de tipeo ;)");
    });
    afterAll(() => {
        ventas.splice(6,2);
      });
});

describe("4. Testeo función componenteMasVendido()", () => {

    test("Componente más vendido con valores originales debería ser Monitor GPRS 3000", () => {
        expect(componenteMasVendido()).toBe("Monitor GPRS 3000");
    });
    test("Componente más vendido agregando 4 ventas de RAM Quinston debería ser RAM Quinston", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["RAM Quinston"]);
        expect(componenteMasVendido()).toBe("RAM Quinston");
    });
    test("Componente más vendido agregando 2 ventas de Monitor GPRS 3000 debería volver a ser Monitor GPRS 3000", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor GPRS 3000"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor GPRS 3000"]);
        expect(componenteMasVendido()).toBe("Monitor GPRS 3000");
    });
    afterAll(() => {
        ventas.splice(6,6);
      });
});

describe("5. Testeo función ventasSucursal(sucursal)", () => {

    test("Importe de ventas de sucursal Centro debería devolver 990", () => {
        expect(ventasSucursal("Centro")).toBe(990);
    });
    test("Importe de ventas de sucursal Caballito debería devolver 1130", () => {
        expect(ventasSucursal("Caballito")).toBe(1130);
    });
    test("Importe de ventas de Centro luego de agregar ventas manules debería devolver 1910", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(ventasSucursal("Centro")).toBe(1910);
    });
    test("Importe de ventas de Caballito luego de agregar ventas manules debería devolver 2050", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Hedy", "Caballito", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(ventasSucursal("Caballito")).toBe(2050);
    });    
    test("Importe de ventas de (true) tira error tipo de dato no válido", () => {
        expect(() => ventasSucursal(true)).toThrow("El tipo de dato ingresado como nombre de sucursal no es válido. Debe ser un string.");
    });
    test("Importe de ventas de (5678) tira error tipo de dato no válido", () => {
        expect(() => ventasSucursal(5678)).toThrow("El tipo de dato ingresado como nombre de sucursal no es válido. Debe ser un string.");
    });
    test("Importe de ventas de Caballit tira error sucursal no existente", () => {
        expect(() => ventasSucursal("Caballit")).toThrow("La sucursal ingresada no existe. Verificar errores de tipeo ;)");
    });
    test("Importe de ventas de Retiro tira error sucursal no existente", () => {
        expect(() => ventasSucursal("Retiro")).toThrow("La sucursal ingresada no existe. Verificar errores de tipeo ;)");
    });
    afterAll(() => {
        ventas.splice(6,4);
    });
});

describe("6. Testeo función mejorVendedora()", () => {

    test("Mejor vendedora con valores originales debería ser Grace", () => {
        expect(mejorVendedora()).toBe("Grace");
    });
    test("Mejor vendedora agregando nueva venta a Ada por $460 debería ser Ada", () => {
        agregarVenta(1, 5, 2019, "Ada", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(mejorVendedora()).toBe("Ada");
    });
    test("Mejor vendedora agregando nueva venta a Grace por $460 debería volver a ser Grace", () => {
        agregarVenta(1, 5, 2019, "Grace", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(mejorVendedora()).toBe("Grace");
    });
    afterAll(() => {
        ventas.splice(6,2);
    });
});

describe("7. Testeo función ventaPromedio()", () => {

    test("Venta promedio con valores originales debería ser 353", () => {
        expect(ventaPromedio()).toBe(353);
    });
    test("Venta promedio agregando nueva venta por $460 debería ser 368", () => {
        agregarVenta(1, 5, 2019, "Ada", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(ventaPromedio()).toBe(368);
    });
    test("Venta promedio agregando 3 nuevas ventas por $110 cada una debería ser 291", () => {
        agregarVenta(1, 5, 2019, "Grace", "Centro", ["RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Grace", "Centro", ["RAM Quinston"]);
        agregarVenta(1, 5, 2019, "Grace", "Centro", ["RAM Quinston"]);
        expect(ventaPromedio()).toBe(291);
    });
    afterAll(() => {
        ventas.splice(6,4);
    });
});

describe("8. Testeo función obtenerIdVenta()", () => {
    test("ID random debería ser mayor a 100000000", () => {
        expect(obtenerIdVenta()).toBeGreaterThan(100000000);
    });
    test("ID random debería ser menor a 999999999", () => {
        expect(obtenerIdVenta()).toBeLessThan(999999999);
    });
    test("findIndexId(100000000) debería arrojar index 0", () => {
        expect(findIndexId(100000000)).toBe(0);
    });
});

describe("9. Testeo función agregarVenta", () => {

    test("Agregar venta nueva debería mostrar el incluir el nuevo string en array ventas generando length 7", () => {
        agregarVenta(1, 5, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
        expect(ventas.length).toBe(7);
        expect(ventas[6]).toContain(1, 5, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"]);
    });
    test("Ingresar un dato no numérico para día debería tirar error", () => {
        expect(() => agregarVenta(true, 5, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El valor ingresado para el día no corresponde a un número.");
    });
    test("Agregar un número mayor a 31 para día debería tirar error", () => {
        expect(() => agregarVenta(111, 5, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El número ingresado no corresponde a un día válido");
    });
    test("Ingresar un dato no numérico para mes debería tirar error", () => {
        expect(() => agregarVenta(11, false, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El valor ingresado para el mes no corresponde a un número.");
    });
    test("Agregar un número mayor a 12 para mes debería tirar error", () => {
        expect(() => agregarVenta(11, 50, 2019, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El número ingresado no corresponde a un mes válido");
    });
    test("Ingresar un dato no numérico para anio debería tirar error", () => {
        expect(() => agregarVenta(11, 5, "Meri", "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El valor ingresado para el año no corresponde a un número.");
    });
    test("Agregar un número mayor a 2100 para anio debería tirar error", () => {
        expect(() => agregarVenta(11, 5, 2300, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El número ingresado no corresponde a un año válido");
    });
    test("Agregar un número menor a 2019 para anio debería tirar error", () => {
        expect(() => agregarVenta(11, 5, 1900, "Hedy", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200", "RAM Quinston"])).toThrow("El número ingresado no corresponde a un año válido");
    });
    afterAll(() => {
        ventas.splice(6,1);
    });
});