import PetDAO from '../daos/PetDAO.js';

class PetService {
    static async createPet(petData) {
        return await PetDAO.createPet(petData);
    }

    static async createMultiplePets(pets) {
        return await PetDAO.insertMany(pets);
    }

    static async getPetById(petId) {
        return await PetDAO.getPetById(petId);
    }

    static async updatePet(petId, updateData) {
        return await PetDAO.updatePetById(petId, updateData);
    }

    static async deletePet(petId) {
        return await PetDAO.deletePetById(petId);
    }

    static async getAllPets() {
        return await PetDAO.getAllPets();
    }
}

export default PetService;
