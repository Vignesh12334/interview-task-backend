import UserModel from "./user.module.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ 
          error: "Name, email and password are required",
          fields: {
            name: !name ? "Name is required" : null,
            email: !email ? "Email is required" : null,
            password: !password ? "Password is required" : null
          }
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await UserModel.create({ 
        name, 
        email, 
        password: hashedPassword 
      });

      // Generate access token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      });
    } catch (error) {
      console.error('User creation error:', error);
      
      if (error.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ 
          error: "Email already exists",
          field: "email"
        });
      }
      
      res.status(500).json({ 
        error: "Error creating user",
        details: error.message
      });
    }
  }
}

export default UserController;
