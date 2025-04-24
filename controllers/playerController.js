const Player = require('../models/player')

const PlayerController = {
  async create (req, res) {
    try {
        const player = await Player.create({...req.body})
        res.status(201).send(player)
    } catch (error) {
      console.log(error)
    }
  },
  async getAll (req, res) {
    try {
        const player = await Player.find();
        res.json(player);
    } catch (error) {
        console.log(error)
    }
  },
//   Esta es para ver el renderizado en SSR
  async getAllSSR (req, res) {
    try {
        const player = await Player.find();
        res.send(`<h1>Players</h1>
          ${player.map(player => {
            return (
              `<div>
                <h2>Nombre del jugador: ${player.title}</h2>
                
              </div>`
            )
          } ).join('')}
        </div>`);
    } catch (error) {
        console.log(error)
    }
  },
  async getByID (req, res) {
    try {
        const player = await Player.findById(req.params._id.trim());

        res.json(player)
    } catch (error) {
        console.log(error)
    }
  },
  async getByName(req, res) {
    try {
      const player= await Player.find({
        name: { $regex: new RegExp(`^${req.params.name.trim()}`, 'i') } // esto ayuda a ignorar mayúsculas/minúsculas ('i')
      });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      res.json(player);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving player' });
    }
  },
  async getByCountry(req, res) {
    try {
        const Country = await Player.find({
            country: { $regex: new RegExp(`^${req.params.country.trim()}`, 'i') } // esto ayuda a ignorar mayúsculas/minúsculas ('i')
          });
          
        if (Country.length === 0) {
            return res.status(404).json({ message: 'Country not found' });
          }
      
        res.json(Country);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error searching for players by country" });
    }
},
async getByTeam(req, res) {
    try {
        const Team = await Player.find({
            team: { $regex: new RegExp(`^${req.params.team.trim()}`, 'i') } // esto ayuda a ignorar mayúsculas/minúsculas ('i')
          });
        if (Team.length === 0) {
            return res.status(404).json({ message: 'Team not found' });
          }
      
        res.json(Team);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error searching for players by team" });
    }
},
  
  async updateByName(req, res) {
    try {
      const id = req.params._id.trim()
      const name = req.body.name
      const playerImg = req.body.playerImg
      const position = req.body.position
      const Age = req.body.Age
      const country = req.body.country
      const countryImg = req.body.countryImg
      const team = req.body.team
      const teamImg= req.body.teamImg
      const height= req.body.height
      const heightImg= req.body.heightImg
      const weight= req.body.weight
      const weightImg= req.body.weightImg
      const descripcion=req.body.descripcion
      
      const updatePlayer = await Player.findByIdAndUpdate(
        id, {
            name,
            playerImg,
            position,
            Age,
            country,
            countryImg,
            team,
            teamImg,
            height,
            heightImg,
            weight,
            weightImg,
            descripcion
        }, {new: true}
      )
      res.json(updatePlayer)
    } catch (error) {
      console.log(error)
    }
  },
  
  async deleteTask (req, res) {
    try {
      const id = req.params._id
      const deletedTask = await Player.findByIdAndDelete(id)
      if (!deletedTask) {
        return res.status(404).json({message: "Player with that id not found"})
      }  
      res.json({message: "Player deleted successfully", deletedTask})
    } catch (error) {
        console.log(error)
    }
}

}

module.exports = PlayerController