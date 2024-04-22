const db = require('../../database/models')
const { Op } = require("sequelize");
const {validationResult} = require('express-validator')
const bcrypt = require("bcryptjs");
const { parse } = require("@formkit/tempo");


const userControllerApi = {
  // Listar todos los usuarios
  listUsers: async (req, res) => {
    let {page=1 ,limit=5 } = req.query;
    limit = parseInt(limit);
    const offSet = limit * (parseInt(page) -1);
    const query = {limit, offset:offSet, include:{association:'roles'}};

    const url = `http://localhost:3000/users/api/allUsers?page=${page}&limit=${limit}`
    const next = `http://localhost:3000/users/api/allUsers?page=${parseInt(page)+1}`
    const previous = `http://localhost:3000/users/api/allUsers?page=${parseInt(page)-1}`
    
    const countPage = (elements,limit)=> {
      if (elements % limit == 0) {
        return (elements/limit)
      } else {
        return (Math.ceil(elements/limit))
      }
    }

    try {
      const usersList = await db.Usuario.findAndCountAll(query)
      res.status(200).json({
        usersList,
        countRows : usersList.rows.length,
        pages: countPage(usersList.count,limit),
        url : url,
        previous : page > 1 ? previous : '',
        next : page < countPage(usersList.count,limit) ? next : ''
      })
    //   const usersList = await db.Usuario.findAndCountAll(query)
    //   const totalLength = total.length
    // await db.Usuario.findAll(query)
    // .then((usersList) => {
    //   return res.status(200).json({
    //     usersList,
    //     count: totalLength,
    //     countRows: usersList.length,
    //     pages: countPage(totalLength,limit),
    //     status: 200,
    //     url : url,
    //     previous : page > 1 ? previous : '',
    //     next : usersList.length < limit ? '' : next
    //   })
    //})
    } catch (error) {
      res.status(400).send(error.message)
    }
    
  },

  // Listar todos los clientes
  listClient: async (req, res) => {
    let {page=1 ,limit=5 } = req.query;
    limit = parseInt(limit);
    const offSet = limit * (parseInt(page) -1);
    const query = {limit, offset:offSet, include:{association:'roles'}, where:{rol_id : 1}};

    const url = `http://localhost:3000/users/api/allClients?page=${page}&limit=${limit}`
    const next = `http://localhost:3000/users/api/allClients?page=${parseInt(page)+1}`
    const previous = `http://localhost:3000/users/api/allClients?page=${parseInt(page)-1}`
    
    const countPage = (elements,limit)=> {
      if (elements % limit == 0) {
        return (elements/limit)
      } else {
        return (Math.ceil(elements/limit))
      }
    }

    try {
      const clientsList = await db.Usuario.findAndCountAll(query)
      res.status(200).json({
        clientsList,
        countRows : clientsList.rows.length,
        pages: countPage(clientsList.count,limit),
        url : url,
        previous : page > 1 ? previous : '',
        next : page < countPage(clientsList.count,limit) ? next : ''
      })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  // Listar todos los administradores
  listAdmin: async (req, res) => {
    let {page=1 ,limit=3 } = req.query;
    limit = parseInt(limit);
    const offSet = limit * (parseInt(page) -1);
    const query = {limit, offset:offSet, include:{association:'roles'}, where : {rol_id : {[Op.gt]:1}}};

    const url = `http://localhost:3000/users/api/allAdmin?page=${page}&limit=${limit}`
    const next = `http://localhost:3000/users/api/allAdmin?page=${parseInt(page)+1}`
    const previous = `http://localhost:3000/users/api/allAdmin?page=${parseInt(page)-1}`
    
    const countPage = (elements,limit)=> {
      if (elements % limit == 0) {
        return (elements/limit)
      } else {
        return (Math.ceil(elements/limit))
      }
    }

    try {
      const adminList = await db.Usuario.findAndCountAll(query)
      res.status(200).json({
        adminList,
        countRows : adminList.rows.length,
        pages: countPage(adminList.count,limit),
        url : url,
        previous : page > 1 ? previous : '',
        next : page < countPage(adminList.count,limit) ? next : ''
      })
      // const total = await db.Usuario.findAll({where : {rol_id : {[Op.gt]:1}}})
      // const totalLength = total.length
      // await db.Usuario.findAll(query)
      // .then((adminList) => {
      //   return res.status(200).json({
      //     adminList,
      //     count: totalLength,
      //     countRows: adminList.length,
      //     pages: countPage(totalLength,limit),
      //     status: 200,
      //     url : url,
      //     previous : page > 1 ? previous : '',
      //     next : adminList.length < limit ? '' : next
      //   })
      // })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  // Listar todos los vendedores
  listVendedores: async (req, res) => {
    let {page=1 ,limit=5 } = req.query;
    limit = parseInt(limit);
    const offSet = limit * (parseInt(page) -1);
    const query = {limit, offset:offSet, include:{association:'roles'}, where : {rol_id : 3}};

    const url = `http://localhost:3000/users/api/allSellers?page=${page}&limit=${limit}`
    const next = `http://localhost:3000/users/api/allSellers?page=${parseInt(page)+1}`
    const previous = `http://localhost:3000/users/api/allSellers?page=${parseInt(page)-1}`
    
    const countPage = (elements,limit)=> {
      if (elements % limit == 0) {
        return (elements/limit)
      } else {
        return (Math.ceil(elements/limit))
      }
    }

    try {
      const sellersList = await db.Usuario.findAndCountAll(query)
      res.status(200).json({
        sellersList,
        countRows : sellersList.rows.length,
        pages: countPage(sellersList.count,limit),
        url : url,
        previous : page > 1 ? previous : '',
        next : page < countPage(sellersList.count,limit) ? next : ''
      })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  //Detalle del usuario
  userDetail: async (req, res) => {
    const id = parseInt(req.params.id)

    try {
      const user = await db.Usuario.findByPk(id, {
        include: [
          { association : "direcciones"},
          { association : "telefonos"}
        ],
        attributes: {exclude: ['password']}
      })
      res.status(200).json({
        url:`http://localhost:3000/users/api/userDetail/${id}`,
        status: 200,
        user
      })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  //Registrar un cliente
  registerClient: async (req, res) => {
    const { nombre, apellido, email, password, fecha_nacimiento, nombre_calle, numero_calle } = req.body;
    const errors = validationResult(req)
    const file = req.files
    let fecha = parse({
      date: fecha_nacimiento,
      format: "DD-MM-YYYY"
    });

    try {
      if (errors.isEmpty()) {
        const createClient = {
          rol_id: 1,
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          imagen: file
            ? `/images/users/${req.file.filename}`
            : "/images/users/user-default.png",
          fecha_nacimiento: fecha,
          password: bcrypt.hashSync(password, 10),
        };
        const newClient =  await db.Usuario.create(createClient)
        const createAddres = {
          id_usuario: newClient.id,
          nombre_calle: nombre_calle,
          numero_calle: numero_calle,
        };
        const addressClient = await db.Direccion.create(createAddres)
        res.status(200).json({
          status: 200,
          create: 'Ok',
          url:'http://localhost:3000/users/api/registerClient',
          data:{
            client:newClient, 
            address:addressClient
          }
        })
      } else {
        const errorsMapped = errors.mapped()
        for (const key in errorsMapped) {
          delete errorsMapped[key].type;
          delete errorsMapped[key].location;
          delete errorsMapped[key].path;
        }
        const errorsJson = JSON.stringify(errorsMapped)
        throw new Error (errorsJson)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  //Registrar un administrador
  registerAdmin: async (req, res) => {
    const { nombre, apellido, email, password, fecha_nacimiento, nombre_calle, numero_calle, rol_id } = req.body;
    const errors = validationResult(req)
    const file = req.files
    let fecha = parse({
      date: fecha_nacimiento,
      format: "DD-MM-YYYY"
    });

    try {
      if (errors.isEmpty()) {
        const createAdmin = {
          rol_id,
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          imagen: file
            ? `/images/users/${req.file.filename}`
            : "/images/users/user-default.png",
          fecha_nacimiento: fecha,
          password: bcrypt.hashSync(password, 10),
        };
        const newAdmin =  await db.Usuario.create(createAdmin)
        const createAddres = {
          id_usuario: newAdmin.id,
          nombre_calle: nombre_calle,
          numero_calle: numero_calle,
        };
        const addressAdmin = await db.Direccion.create(createAddres)
        res.status(200).json({
          status: 200,
          create: 'Ok',
          url:'http://localhost:3000/users/api/registerAdmin',
          data:{
            admin:newAdmin, 
            address:addressAdmin
          }
        })
      } else {
        const errorsMapped = errors.mapped()
        for (const key in errorsMapped) {
          delete errorsMapped[key].type;
          delete errorsMapped[key].location;
          delete errorsMapped[key].path;
        }
        const errorsJson = JSON.stringify(errorsMapped)
        throw new Error (errorsJson)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  //Actualizar datos del cliente
  updateClient: async (req, res) => {
    const {
      nombre, apellido, prefijo, numero, numero_calle, nombre_calle, codigo_postal, localidad, provincia, email, fecha_nacimiento,
    } = req.body;
    
    const errors = validationResult(req);
    //const file = req.files
    let fecha = parse({
      date: fecha_nacimiento,
      format: "DD-MM-YYYY"
    });

    try {
      const clientUpdate = {
        rol_id: 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim(),
        fecha_nacimiento: fecha,
      };

      const addressUpdate = {
        id_usuario: req.session.user.id,
        nombre_calle: nombre_calle,
        numero_calle: numero_calle,
        codigo_postal: codigo_postal,
        localidad: localidad,
        provincia: provincia,
      };

      const telefUpdate = {
        id_usuario: req.session.user.id,
        numero: numero,
        prefijo: prefijo,
      };

      const updateClient = await db.Usuario.update(clientUpdate, {
        where: { id: req.session.user.id },
      });

      const updateAddress = await db.Direccion.update(addressUpdate, {
        where: { id_usuario: req.session.user.id },
      });

      async function telefono() {
        try {
          if (req.session.user.telefonos.length >= 1) {
            //Si existe un registro de telefono
            return await db.Telefono.update(telefUpdate, {
              where: { id_usuario: req.session.user.id },
            });
          } else {
            //Si no existe un registro de telefono
            return await db.Telefono.create(telefUpdate);
          }
        } catch (error) {
          throw new Error ('Error en el procesamiento del dato telefonico')
        }
      }

      const phoneClient = telefono()

      res.status(200).json({
        status: 200,
        update: 'Ok',
        client: updateClient,
        address: updateAddress,
        phone: phoneClient
      })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  //Actualizar datos del administrador
  updateAdmin: async (req, res) => {
    const id = parseInt(req.params.id)
    const errors = validationResult(req);
    const {
      nombre, apellido, rol_id, fecha_nacimiento, nombre_calle, numero_calle, codigo_postal, localidad, provincia, prefijo, numero, email,
    } = req.body;
    let fecha = parse({
      date: fecha_nacimiento,
      format: "DD/MM/YYYY",
    });
    const admin = await db.Usuario.findByPk(id,{
      include: [
        { association : "direcciones"},
        { association : "telefonos"}
      ]
    })

    try {
      if (errors.isEmpty()) {
        const adminUpdate = {
          rol_id,
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          email: email.trim(),
          fecha_nacimiento: fecha
        };
        const addressUpdate = {
          id_usuario: id,
          nombre_calle: nombre_calle,
          numero_calle: numero_calle,
          codigo_postal: codigo_postal,
          localidad: localidad,
          provincia: provincia,
        };
        const phoneUpdate = {
          id_usuario: id,
          numero: numero,
          prefijo: prefijo,
        };
        const updateAdmin = await db.Usuario.update(adminUpdate, {
          where: { id: id },
        });
  
        const updateAddress = await db.Direccion.update(addressUpdate, {
          where: { id_usuario: id },
        });

        async function telefono() {
          try {
            if (admin.telefonos.length >= 1) {
              //Si existe un registro de telefono
              return await db.Telefono.update(phoneUpdate, {
                where: { id_usuario: id },
              });
            } else {
              //Si no existe un registro de telefono
              return await db.Telefono.create(phoneUpdate);
            }
          } catch (error) {
            throw new Error(error)
          }
        }
  
        const updatePhone = telefono()

        res.status(200).json({
          status:200,
          update:'Ok',
          data: {
            admin:updateAdmin,
            address:updateAddress,
            phone:updatePhone
          }
        })
      } else {
        const errorsMapped = errors.mapped()
        for (const key in errorsMapped) {
          delete errorsMapped[key].type;
          delete errorsMapped[key].location;
          delete errorsMapped[key].path;
        }
        const errorsJson = JSON.stringify(errorsMapped)
        throw new Error (errorsJson)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

}

module.exports = userControllerApi