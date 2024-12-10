import { Router } from "express";
import UserRouter from "./userRouter.js";
import ProductRouter from "./productRouter.js";
import CartRouter from "./cartRouter.js";
import MocksRouter from "./mocks.router.js";

const indexRouter = Router();

const userRouter = new UserRouter();
const productRouter = new ProductRouter();
const cartRouter = new CartRouter();
const mocksRouter = new MocksRouter();

indexRouter.use("/sessions", userRouter.getRouter());
indexRouter.use("/products", productRouter.getRouter());
indexRouter.use("/carts", cartRouter.getRouter());
indexRouter.use("/mocks", mocksRouter.getRouter());

export default indexRouter;
