//ORM  Object Relational Mapper
//SELECT * FROM users WHERE user = "Eduardo"
//Person{name:String,password:string}.find("Eduardo")
//CREATE TABLE User (firstname VARCHAR(255))

const { Sequelize, DataTypes } = require("sequelize");

const sequalize = new Sequelize("users_seq", "root", "admin1234", {
  host: "localhost",
  dialect: "mysql",
});

//model
const User = sequalize.define(
  "User",
  {
    //define attributes
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "users",
  }
);
sequalize
  .sync({ alter: true })
  .then(() => {
    console.log("All the models were created in mysql");
  })
  .catch((err) => console.error("", err));

async function createUser() {
  //INSERT INTO (first...)VALUES()
  //Crear usuario con createUser()
  try {
    const newUser = await User.create({
      firstName: "Mariano",
      lastName: "Mariano",
      email: "Mariano@gmail.com",
    });
    console.log("User was created successfully", newUser.toJSON());
  } catch (err) {
    console.error("ERROR AL CREAR UN USUARIO", err);
  }
}
//se pueede hacer update, de email, firstName, lastName con la funcion updateUser
async function updateUser(userId, newEmail) {
  try {
    const userUpdated = await User.update(
      {
        email: newEmail,
      },
      { where: { id: userId } }
    );
    if (userUpdated[0] > 0) {
      console.log("user was updated successfully");
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error(err);
  }
}
async function deleteUser(userId) {
  try {
    const deleted = await User.destroy({
      where: { id: userId },
    });
    if (deleted) {
      console.log("User deleted");
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error(err);
  }
}

//Select
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      console.log("User found: ", user.toJSON());
    } else {
      console.log("User not found");
    }
  } catch (err) {
    console.error(err);
  }
}

// createUser();
//updateUser(4, "lalillo@gmail.com");

// createUser(); ////Para crear el usuario

// deleteUser(5); ////funcion de borrar

//findUserByEmail("john_doe@gmail.com");
