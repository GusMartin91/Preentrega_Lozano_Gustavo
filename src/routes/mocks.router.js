import { CustomRouter } from './router.js';
import { generateMockPets, generateMockUsers, generateMockProducts } from '../mocks.js';
import UserService from '../services/UserService.js';
import PetService from '../services/PetService.js';
import ProductService from '../services/ProductService.js';

export class MocksRouter extends CustomRouter {
    init() {
        this.get('/mockingpets', ['public'], (req, res) => {
            const mockPets = generateMockPets(100);
            res.success({ pets: mockPets });
        });

        this.get('/mockingusers', ['public'], (req, res) => {
            const users = generateMockUsers(50);
            res.success({ users });
        });

        this.post('/generateData', ['public'], async (req, res) => {
            const { users, pets } = req.body;

            try {
                const userCount = parseInt(users) || 0;
                const petCount = parseInt(pets) || 0;

                const generatedUsers = generateMockUsers(userCount);
                const generatedPets = generateMockPets(petCount);

                await UserService.createMultipleUsers(generatedUsers);
                await PetService.createMultiplePets(generatedPets);

                res.success({
                    message: `${userCount} users and ${petCount} pets generated and inserted successfully.`,
                });
            } catch (error) {
                res.internalerror(error.message);
            }
        });
        this.get('/users/:n', ['public'], async (req, res) => {
            const userCount = parseInt(req.params.n);
            
            if (isNaN(userCount) || userCount <= 0) {
                return res.badrequest("Please provide a valid number of users to generate.");
            }

            try {
                const generatedUsers = generateMockUsers(userCount);
                await UserService.createMultipleUsers(generatedUsers);
                
                res.success({
                    message: `${userCount} users generated and saved successfully in MongoDB.`,
                    users: generatedUsers
                });
            } catch (error) {
                res.internalerror(error.message);
            }
        });
        this.get('/products/:n', ['public'], async (req, res) => {
            const productCount = parseInt(req.params.n);
            
            if (isNaN(productCount) || productCount <= 0) {
                return res.badrequest("Please provide a valid number of products to generate.");
            }

            try {
                const generatedProducts = generateMockProducts(productCount);
                await ProductService.createMultipleProducts(generatedProducts);
                
                res.success({
                    message: `${productCount} products generated and saved successfully in MongoDB.`,
                    products: generatedProducts
                });
            } catch (error) {
                res.internalerror(error.message);
            }
        });
    }
}

export default MocksRouter;