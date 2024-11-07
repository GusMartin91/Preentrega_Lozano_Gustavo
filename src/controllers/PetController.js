import { validationResult } from 'express-validator';
import PetService from '../services/PetService.js';
import PetDTO from '../dtos/PetDTO.js';

class PetController {
    static async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { name, type, age, adopted, owner } = req.body;

        try {
            const newPet = await PetService.createPet({ name, type, age, adopted, owner });
            return res.success({ message: 'Pet created successfully', pet: newPet });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async createMultiple(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { pets } = req.body;

        try {
            const newPets = await PetService.createMultiplePets(pets);
            return res.success({ message: `${newPets.length} pets created successfully`, pets: newPets });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async update(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { name, type, age, adopted, owner } = req.body;
        const petId = req.params.id;

        try {
            const updatedPet = await PetService.updatePet(petId, { name, type, age, adopted, owner });
            return res.success({ message: 'Pet updated successfully', pet: updatedPet });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async delete(req, res) {
        const petId = req.params.id;

        try {
            const deletedPet = await PetService.deletePet(petId);
            return res.success({ message: 'Pet deleted successfully', pet: deletedPet });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async getAll(req, res) {
        try {
            const pets = await PetService.getAllPets();
            return res.success({ pets });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async getPetById(req, res) {
        const petId = req.params.id;

        try {
            const pet = await PetService.getPetById(petId);
            return res.success({ pet });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }
}

export default PetController;
