import fs from 'fs'

export default class ProductManager{
    constructor(){
        this.patch='./Products.json'
        this.Productos=[]
    }

    static id=0

    // creando productos
    AddProduct=async(title, description, price, thumbnail, code, stock)=>{
        ProductManager.id++
        let NewProduct={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }
        this.Productos.push(NewProduct)
        await fs.promises.writeFile(this.patch, JSON.stringify(this.Productos,null,2))
    }

    // funcion de llamado
    ReadProducts= async()=>{
        let llamado=await fs.promises.readFile(this.patch,'utf-8')
        return JSON.parse(llamado)

    }

    // obteniendo productos
    GetProduct=async()=>{
        let llamado2= await this.ReadProducts()
         return console.log(llamado2)
    }

    // obteniendo productos por id
    GetProductById= async(id)=>{
        let llamado3=await this.ReadProducts()
        if(!llamado3.find(Producto=>Producto.id===id)){
            console.log("Producto no encontrado por ID")
        }else{
            console.log(llamado3.find(Producto=>Producto.id===id))
        }
    
    }

    // borrar producto
    DeleteProductById=async(id)=>{
        let llamado3=await this.ReadProducts()
        let ProductFil=llamado3.filter(Products=>Products.id!=id)
        await fs.promises.writeFile(this.patch, JSON.stringify(ProductFil,null,2))
    }

    // actualizar producto
    UpdateProduct=async({id, ...Producto})=>{
        await this.DeleteProductById(id)
        let OldProduct= await this.ReadProducts()
        let ModProduct=[
            {...Producto, id},
            ...OldProduct
        ]
        await fs.promises.writeFile(this.patch, JSON.stringify(ModProduct,null,2))
    }
}




const Productos= new ProductManager

// Productos.AddProduct("product1","description1",1500,"url","abc123",500)
// Productos.AddProduct("product2","description2",2500,"url","abc122",1500)
// Productos.AddProduct("product3","description3",3500,"url","abc122",2500)

// Productos.GetProduct()

// Productos.GetProductById(2)

// Productos.DeleteProductById(2)

Productos.UpdateProduct({  title: 'product1',
description: 'description del id1',
price: 4500,
thumbnail: 'url',
code: 'abc123',
stock: 800,
id: 1})

