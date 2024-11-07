import userModel from "./models/userModel.js";

class UsersDAO {
    async createUser(userData) {
        try {
            const newUser = await userModel.create(userData);
            return newUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }

    }

    async insertMany(users) {
        try {
            return await userModel.insertMany(users);
        } catch (error) {
            throw new Error(`Error inserting users: ${error.message}`);
        }
    }

    async getUserById(userId) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    async updateUserById(userId, updateData) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUserById(userId) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return { message: "User successfully deleted", user: deletedUser };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default new UsersDAO();