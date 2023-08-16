const router = require('express').Router();
const {getAllPokemons} = require("../Controllers/getAllPokemons");
const { Pokemon, Type } = require("../db");

//* Maneja las rutas GET, POST y DELETE para los Pokémon.


//* Ruta para obtener todos los Pokémon o buscar por nombre
router.get('', async (req, res)=>{
    const {name} = req.query; 
    const totalPokemons = await getAllPokemons();
    if (name){
        const pokemonName = totalPokemons.filter(ele=>ele.name.toLowerCase().includes(name.toLowerCase()))
        if(pokemonName.length){
            return res.status(200).send(pokemonName);
        } return res.send({error: 'Pokemon not found'})
    } else {
        try{
            return res.status(200).send(totalPokemons);
        } catch(error){
            res.send(error)
        }
        
    }
});



//* Ruta para obtener un Pokémon por su ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const totalPokemons = await getAllPokemons();
    const pokemonId = totalPokemons.find(pokeId => pokeId.id == id);
    if (pokemonId) {
      try {
        return res.status(200).send([pokemonId]);
      } catch (error) {
        res.send(error);
      }
    } else {
      return res.send({ error: 'Pokemon not found' });
    }
  });


  //* Ruta para obtener un Pokémon por su nombre
  router.get('/pokemon/:name', async (req, res) => {
    const { name } = req.params;
    const allPokemons = await getAllPoke();
    try {
        if (name) {
            const pokemonName = await allPokemons.filter(e => e.name == name);
            pokemonName.length ?
                res.status(200).json(pokemonName) :
                res.status(404).send('Pokemon no encontrado')
        }
    } catch (error) {
        console.log(error);
    }
})

//* Ruta para crear un nuevo Pokémon
router.post('', async (req, res)=>{
    const {
        img, name, type, id, hp, attack, defense, speed, weight, height, createdInDb
    } = req.body;
    
    try{
        const newPokemon = await Pokemon.create({
            img, name, id, hp, attack, defense, speed, weight, height, createdInDb
        });
    
        const typeDb = await Type.findAll({
            where: {
                name: type
            }
        });
        console.log(typeDb)
        await newPokemon.addType(typeDb);
        res.send('newPokemon');
    } catch (error){
        res.send(error);
    }
    
})


//* Ruta para eliminar un Pokémon por su ID
router.delete('/:id', async (req, res)=>{
    try{
       const {id} = req.params;
       res.json(await Pokemon.destroy({
            where: {id} 
       }))
    } catch(error){
        res.send(error)
    }
})

module.exports = router;


