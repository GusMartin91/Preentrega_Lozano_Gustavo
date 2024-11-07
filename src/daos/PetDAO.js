import petModel from "./models/petModel.js";

class PetDAO {
    async createPet(petData) {
        try {
            const newPet = await petModel.create(petData);
            return newPet;
        } catch (error) {
            throw new Error(`Error creating pet: ${error.message}`);
        }
    }

    async insertMany(pets) {
        try {
            return await petModel.insertMany(pets);
        } catch (error) {
            throw new Error(`Error inserting pets: ${error.message}`);
        }
    }

    async getPetById(petId) {
        try {
            const pet = await petModel.findById(petId);
            if (!pet) {
                throw new Error('Pet not found');
            }
            return pet;
        } catch (error) {
            throw new Error(`Error finding pet by ID: ${error.message}`);
        }
    }

    async updatePetById(petId, updateData) {
        try {
            const updatedPet = await petModel.findByIdAndUpdate(petId, updateData, { new: true });
            if (!updatedPet) {
                throw new Error('Pet not found');
            }
            return updatedPet;
        } catch (error) {
            throw new Error(`Error updating pet: ${error.message}`);
        }
    }

    async deletePetById(petId) {
        try {
            const deletedPet = await petModel.findByIdAndDelete(petId);
            if (!deletedPet) {
                throw new Error('Pet not found');
            }
            return { message: "Pet successfully deleted", pet: deletedPet };
        } catch (error) {
            throw new Error(`Error deleting pet: ${error.message}`);
        }
    }

    async getAllPets() {
        try {
            const pets = await petModel.find().lean();
            return pets;
        } catch (error) {
            throw new Error(`Error fetching pets: ${error.message}`);
        }
    }
}

export default new PetDAO();
