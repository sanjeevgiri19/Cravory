import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckOutSession,
  getOrders,
} from "../controller/order.controller";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrders);
router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckOutSession);

export default router;
