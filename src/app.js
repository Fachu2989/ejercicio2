import express from 'express';
import ProductManager from './components/ProductManager.js';

const app = express(); 
app.use(express.urlencoded({ extended: true }));

const productos= new ProductManager();
const ReadProducts=productos.ReadProducts() 


app.get('/productos',async (req, res) => {
    let limite=parseInt(req.query.limit)
    if(!limite) return res.send(await ReadProducts)
    let todos=await ReadProducts
    let productolimite=todos.slice(0,limite)
    res.send(productolimite);    
})

app.get('/productos/:id', async (req, res) => {
    let id=parseInt(req.params.id)
    let producto= await ReadProducts
    let productoId=producto.find(producto=>producto.id===id)
    if(!productoId) return res.send('Producto no encontrado')
    res.send(productoId);    
})



app.listen(8080, () => 
    console.log('Server corriendo en puerto 8080')
)