class PetDTO {
    constructor(pet) {
        this.id = pet._id;
        this.name = pet.name;
        this.type = pet.type;
        this.age = pet.age;
        this.adopted = pet.adopted;
        this.owner = pet.owner;
    }
}

export default PetDTO;
