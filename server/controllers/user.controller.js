const { prisma } = require(`../prisma/prisma-client`);
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const dotenv = require(`dotenv`);

dotenv.config();

const UserController = {
  register: async (req, res) => {
    const { login, password, role } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: `Все поля обязательны!` });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ error: `Длинна пароля должна быть более 6 символов !` });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { login } });

      if (existingUser) {
        return res.status(400).json({ error: `Пользователь уже существует` });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          login,
          password: hashedPassword,
          role: role.toUpperCase() === `ADMIN` ? `ADMIN` : `USER`,
        },
      });

      res.json(user);
    } catch (error) {
      console.error(`Error in register`, error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  },
  login: async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: `Все поля обязательны!` });
    }

    try {
      const user = await prisma.user.findUnique({ where: { login } });

      if (!user) {
        return res.status(404).json({ error: `Неверный логин или пароль` });
      }

      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        return res.status(404).json({ error: `Неверный логин или пароль` });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

      res.json({ token, userId: user.id });
    } catch (error) {
      console.error(`Login error`, error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  },
  current: async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: `params is required` });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(400).json({ error: `Пользователь не найден` });
      }
      res.json(user);
    } catch (error) {
      console.error(`Get current error`, error);
      res.status(500).json({ error: `Entarnal server Error` });
    }
  },
  updateUser: async (req, res) => {
    const { login, password, role } = req.body;
    const { id } = req.query;
    try {
      const userCheck = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!userCheck) {
        return res.status(404).json({ error: `Пользователь не найден!` });
      }

      if (password.length < 6) {
        return res
          .status(401)
          .json({ error: `Длинна пароля должна быть более 6 символов !` });
      }

      const hashedPassword =
        password !== "" ? await bcrypt.hash(password, 10) : undefined;

      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          login: login || undefined,
          password: hashedPassword,
          role: role || undefined,
        },
      });

      res.json(user);
    } catch (error) {
      console.error(`Update user error`, error);
      res.status(500).json({ error: `Entarnal server Error` });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });

      res.json(users);
    } catch (error) {
      console.error(`get all mails error`, error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(404).json({ error: `Пользователь не найден!` });
      }

      await prisma.user.delete({ where: { id: Number(id) } });

      res.json({ message: `user ${user.login} deleted` });
    } catch (error) {
      console.error(`Error deleting comment`, error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  },
};

module.exports = UserController;
